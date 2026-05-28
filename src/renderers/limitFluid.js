export class LimitFluidRenderer {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    
    this.isVisible = false;
    this.particles = [];
    this.maxParticles = 1000; // Increased volume for rich fluid aesthetics
    this.particleRadius = 1.5; // Spatial collision size
    this.interactionRadius = 2; // Fluid cohesion/repulsion size
    
    // Physics parameters
    this.gravity = 0.22;
    this.viscosity = 0.08;
    this.friction = 0.98; // General velocity drag
    this.restitution = 0.45; // Bounce absorption
    
    // Grid collision map
    this.cellSize = 5; // Size of collision grid cell in pixels
    this.cols = 0;
    this.rows = 0;
    this.collisionGrid = null;
    this.nearestInsideGrid = null;
    
    // Offscreen canvas elements for liquid metaball mask rendering
    this.offscreen = document.createElement('canvas');
    this.offCtx = this.offscreen.getContext('2d');
    this.maskCanvas = document.createElement('canvas');
    this.maskCtx = this.maskCanvas.getContext('2d');
    this.fluidCanvas = document.createElement('canvas');
    this.fluidCtx = this.fluidCanvas.getContext('2d');
    
    // Splash management
    this.nextSplashTime = Date.now() + 3000;
    this.splashLabel = "";
    this.splashLabelOpacity = 0;
    
    this.setupObserver();
    
    // Handle responsive sizing
    this.fontLoaded = false;
    this.lastWidth = 0;
    this.resizeDebounce = null;
    this.resizeListener = () => {
      clearTimeout(this.resizeDebounce);
      this.resizeDebounce = setTimeout(() => {
        const width = window.innerWidth;
        if (Math.abs(width - this.lastWidth) > 15) {
          this.initCanvas(false);
        }
      }, 250);
    };
    window.addEventListener('resize', this.resizeListener);
    
    // Initialize
    if (document.fonts) {
      document.fonts.ready.then(() => this.initCanvas(true));
    } else {
      this.initCanvas(true);
    }
  }
  
  setupObserver() {
    this.observer = new IntersectionObserver((entries) => {
      this.isVisible = entries[0].isIntersecting;
      if (this.isVisible && this.particles.length === 0) {
        this.spawnParticles();
      }
    }, { threshold: 0.1 });
    this.observer.observe(this.canvas);
  }
  
  destroy() {
    window.removeEventListener('resize', this.resizeListener);
    if (this.observer) {
      this.observer.disconnect();
    }
  }
  
  initCanvas(force = false) {
    const width = window.innerWidth; // Span 100% of the screen width
    
    // Prevent redundant resizes if the width hasn't changed (stops infinite scrollbar reflow loops!)
    if (width === this.lastWidth && !force) return;
    this.lastWidth = width;
    
    const height = Math.floor(width * 0.32); // Perfectly proportional height to prevent vertical clipping
    
    this.canvas.width = width;
    this.canvas.height = height;
    
    this.offscreen.width = width;
    this.offscreen.height = height;
    
    this.maskCanvas.width = width;
    this.maskCanvas.height = height;
    
    this.fluidCanvas.width = width;
    this.fluidCanvas.height = height;
    
    // Dynamically calculate font size to span exactly 100% of the canvas width
    // We measure a 100px text width first with AgrandirHeavy
    this.offCtx.font = '900 100px "AgrandirHeavy", "Arial Black", sans-serif';
    const measuredW = this.offCtx.measureText('LIMIT').width;
    
    // Overlap factors to perfectly touch screen boundaries by bleeding letter bearings
    const marginOverlapFactor = 1.055;
    this.fontSize = Math.floor((width / measuredW) * 100 * marginOverlapFactor);
    this.fontString = `900 ${this.fontSize}px "AgrandirHeavy", "Arial Black", sans-serif`;
    
    // Draw solid text offscreen to extract the collision boundary mask
    this.offCtx.fillStyle = '#000000';
    this.offCtx.fillRect(0, 0, width, height);
    this.offCtx.fillStyle = '#FFFFFF';
    this.offCtx.font = this.fontString;
    this.offCtx.textAlign = 'center';
    this.offCtx.textBaseline = 'middle';
    this.offCtx.fillText('LIMIT', width / 2, height / 2);
    
    // Setup collision grid
    this.cols = Math.ceil(width / this.cellSize);
    this.rows = Math.ceil(height / this.cellSize);
    const totalCells = this.cols * this.rows;
    this.collisionGrid = new Uint8Array(totalCells);
    this.nearestInsideGrid = new Int32Array(totalCells);
    
    const imgData = this.offCtx.getImageData(0, 0, width, height).data;
    
    // 1. Build initial collision mask
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        const idx = r * this.cols + c;
        const px = Math.min(width - 1, Math.floor(c * this.cellSize + this.cellSize / 2));
        const py = Math.min(height - 1, Math.floor(r * this.cellSize + this.cellSize / 2));
        const pixelIdx = (py * width + px) * 4;
        
        // White pixels represent the letter interiors
        if (imgData[pixelIdx] > 128) {
          this.collisionGrid[idx] = 1;
        } else {
          this.collisionGrid[idx] = 0;
        }
      }
    }
    
    // 2. Precalculate the nearest inside cell index for rapid O(1) boundary resolution
    const maxSearch = 45; // Max grid search radius
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        const idx = r * this.cols + c;
        if (this.collisionGrid[idx] === 1) {
          this.nearestInsideGrid[idx] = idx;
          continue;
        }
        
        // Search in expanding square rings to find the nearest white pixel grid cell
        let foundIdx = -1;
        let minDistSq = Infinity;
        
        for (let d = 1; d <= maxSearch; d++) {
          // Check top & bottom lines of the ring
          for (let dc = -d; dc <= d; dc++) {
            const nc = c + dc;
            if (nc >= 0 && nc < this.cols) {
              // Top line
              const nrTop = r - d;
              if (nrTop >= 0) {
                const nIdx = nrTop * this.cols + nc;
                if (this.collisionGrid[nIdx] === 1) {
                  const distSq = dc * dc + d * d;
                  if (distSq < minDistSq) {
                    minDistSq = distSq;
                    foundIdx = nIdx;
                  }
                }
              }
              // Bottom line
              const nrBot = r + d;
              if (nrBot < this.rows) {
                const nIdx = nrBot * this.cols + nc;
                if (this.collisionGrid[nIdx] === 1) {
                  const distSq = dc * dc + d * d;
                  if (distSq < minDistSq) {
                    minDistSq = distSq;
                    foundIdx = nIdx;
                  }
                }
              }
            }
          }
          // Check left & right lines of the ring
          for (let dr = -d + 1; dr < d; dr++) {
            const nr = r + dr;
            if (nr >= 0 && nr < this.rows) {
              // Left line
              const ncLeft = c - d;
              if (ncLeft >= 0) {
                const nIdx = nr * this.cols + ncLeft;
                if (this.collisionGrid[nIdx] === 1) {
                  const distSq = d * d + dr * dr;
                  if (distSq < minDistSq) {
                    minDistSq = distSq;
                    foundIdx = nIdx;
                  }
                }
              }
              // Right line
              const ncRight = c + d;
              if (ncRight < this.cols) {
                const nIdx = nr * this.cols + ncRight;
                if (this.collisionGrid[nIdx] === 1) {
                  const distSq = d * d + dr * dr;
                  if (distSq < minDistSq) {
                    minDistSq = distSq;
                    foundIdx = nIdx;
                  }
                }
              }
            }
          }
          // If we found any inside cell in this ring layer, stop expanding
          if (foundIdx !== -1) {
            break;
          }
        }
        
        this.nearestInsideGrid[idx] = foundIdx;
      }
    }
    
    // Spawn particles inside
    this.spawnParticles();
  }
  
  spawnParticles() {
    this.particles = [];
    const width = this.canvas.width;
    const height = this.canvas.height;
    
    let attempts = 0;
    while (this.particles.length < this.maxParticles && attempts < 15000) {
      attempts++;
      const rx = Math.random() * width;
      const ry = Math.random() * height;
      
      const c = Math.floor(rx / this.cellSize);
      const r = Math.floor(ry / this.cellSize);
      
      if (c >= 0 && c < this.cols && r >= 0 && r < this.rows) {
        const idx = r * this.cols + c;
        if (this.collisionGrid[idx] === 1) {
          this.particles.push({
            x: rx,
            y: ry,
            vx: (Math.random() - 0.5) * 1.5,
            vy: Math.random() * 2,
            px: rx, // Previous x for Verlet-like behavior
            py: ry
          });
        }
      }
    }
  }
  
  // Position-Based Dynamics (PBD) density and volume preservation solver
  solvePBDConstraints() {
    const binSize = this.interactionRadius;
    const bins = new Map();
    
    // 1. Group particles into spatial bins for fast O(N) neighbor lookup
    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      const bx = Math.floor(p.x / binSize);
      const by = Math.floor(p.y / binSize);
      const key = `${bx},${by}`;
      if (!bins.has(key)) {
        bins.set(key, []);
      }
      bins.get(key).push(p);
    }
    
    const R = this.interactionRadius;
    const R_sq = R * R;
    const stiffness = 0.28; // Fluid incompressibility correction weight
    const targetDensity = 2.4; // Homeostasis constant
    
    // We execute 2 solver iterations for high elasticity and solid fluid cohesion
    for (let iter = 0; iter < 2; iter++) {
      const dxs = new Float32Array(this.particles.length);
      const dys = new Float32Array(this.particles.length);
      const densities = new Float32Array(this.particles.length);
      
      // A. Calculate local density at each particle
      for (let i = 0; i < this.particles.length; i++) {
        const p1 = this.particles[i];
        const bx = Math.floor(p1.x / binSize);
        const by = Math.floor(p1.y / binSize);
        
        let dens = 0;
        
        for (let ox = -1; ox <= 1; ox++) {
          for (let oy = -1; oy <= 1; oy++) {
            const key = `${bx + ox},${by + oy}`;
            const neighbors = bins.get(key);
            if (!neighbors) continue;
            
            for (let n = 0; n < neighbors.length; n++) {
              const p2 = neighbors[n];
              if (p1 === p2) continue;
              
              const dx = p2.x - p1.x;
              const dy = p2.y - p1.y;
              const distSq = dx * dx + dy * dy;
              
              if (distSq < R_sq) {
                const dist = Math.sqrt(distSq);
                const t = 1 - dist / R;
                dens += t * t; // Smooth kernel approximation
              }
            }
          }
        }
        densities[i] = dens;
      }
      
      // B. Compute pressure displacement corrections to resolve density constraints
      for (let i = 0; i < this.particles.length; i++) {
        const p1 = this.particles[i];
        const bx = Math.floor(p1.x / binSize);
        const by = Math.floor(p1.y / binSize);
        
        const dens1 = densities[i];
        const C = dens1 - targetDensity; // Density constraint function
        if (C <= 0) continue; // Skip if not compressed
        
        const lambda = C * stiffness;
        
        for (let ox = -1; ox <= 1; ox++) {
          for (let oy = -1; oy <= 1; oy++) {
            const key = `${bx + ox},${by + oy}`;
            const neighbors = bins.get(key);
            if (!neighbors) continue;
            
            for (let n = 0; n < neighbors.length; n++) {
              const p2 = neighbors[n];
              if (p1 === p2) continue;
              
              const dx = p2.x - p1.x;
              const dy = p2.y - p1.y;
              const distSq = dx * dx + dy * dy;
              
              if (distSq < R_sq && distSq > 0.01) {
                const dist = Math.sqrt(distSq);
                const t = 1 - dist / R;
                
                const pushX = (dx / dist) * lambda * t;
                const pushY = (dy / dist) * lambda * t;
                
                // Displace mutually in opposite directions
                dxs[i] -= pushX * 0.5;
                dys[i] -= pushY * 0.5;
              }
            }
          }
        }
      }
      
      // C. Apply displacement corrections & enforce rigid hollow boundary containment
      const width = this.canvas.width;
      const height = this.canvas.height;
      
      for (let i = 0; i < this.particles.length; i++) {
        const p = this.particles[i];
        p.x += dxs[i];
        p.y += dys[i];
        
        // Fast Grid Boundary containment check
        const c = Math.floor(p.x / this.cellSize);
        const r = Math.floor(p.y / this.cellSize);
        
        if (c >= 0 && c < this.cols && r >= 0 && r < this.rows) {
          const idx = r * this.cols + c;
          if (this.collisionGrid[idx] === 0) {
            const targetIdx = this.nearestInsideGrid[idx];
            if (targetIdx !== -1) {
              const targetC = targetIdx % this.cols;
              const targetR = Math.floor(targetIdx / this.cols);
              
              const targetX = targetC * this.cellSize + this.cellSize / 2;
              const targetY = targetR * this.cellSize + this.cellSize / 2;
              
              const dx = targetX - p.x;
              const dy = targetY - p.y;
              const dist = Math.sqrt(dx * dx + dy * dy);
              if (dist > 0.1) {
                p.x = targetX + (dx / dist) * 0.5;
                p.y = targetY + (dy / dist) * 0.5;
              }
            }
          }
        }
        
        // Screen bounds fallback clamp
        if (p.x < 2) p.x = 2;
        if (p.x > width - 2) p.x = width - 2;
        if (p.y < 2) p.y = 2;
        if (p.y > height - 2) p.y = height - 2;
      }
    }
  }
  
  triggerSplash() {
    const width = this.canvas.width;
    const height = this.canvas.height;
    
    // Pick a random style of splash event
    const rand = Math.random();
    
    if (rand < 0.35) {
      // 1. High Velocity Wind Gust (Sideways surge)
      const forceX = (Math.random() > 0.5 ? 1 : -1) * (5 + Math.random() * 4);
      this.splashLabel = `PERTURBATION: ${forceX > 0 ? "RIGHT" : "LEFT"} VECTOR BLOW`;
      for (const p of this.particles) {
        p.vx += forceX * (0.6 + Math.random() * 0.6);
        p.vy -= 1 + Math.random() * 2;
      }
    } else if (rand < 0.7) {
      // 2. High Pressure Vortex Blast (Radial explosion)
      const blastX = width * 0.15 + Math.random() * (width * 0.7);
      const blastY = height * 0.4 + Math.random() * (height * 0.4);
      const radius = 90;
      const blastForce = 6.5;
      
      this.splashLabel = "IMPULSE: THERMAL VORTEX IGNITION";
      
      for (const p of this.particles) {
        const dx = p.x - blastX;
        const dy = p.y - blastY;
        const distSq = dx * dx + dy * dy;
        if (distSq < radius * radius && distSq > 1) {
          const dist = Math.sqrt(distSq);
          const falloff = 1 - dist / radius;
          p.vx += (dx / dist) * blastForce * falloff * (0.8 + Math.random() * 0.4);
          p.vy += (dy / dist) * blastForce * falloff * (0.8 + Math.random() * 0.4) - 2;
        }
      }
    } else {
      // 3. Bottom Geyser Blast (Upward wave)
      this.splashLabel = "SYSTEM LIMIT: THERMODYNAMIC UPRUSH";
      const upForce = 6 + Math.random() * 3;
      for (const p of this.particles) {
        // Particles lower in the container get a stronger upward kick
        if (p.y > height * 0.6) {
          p.vy -= upForce * (0.7 + Math.random() * 0.6);
          p.vx += (Math.random() - 0.5) * 4;
        }
      }
    }
    
    this.splashLabelOpacity = 1.0;
  }
  
  update(dt, time) {
    if (!this.isVisible || this.particles.length === 0) return;
    
    // Check if our custom font loaded late, and force a rebuild to align coordinates perfectly!
    if (!this.fontLoaded) {
      this.offCtx.font = '900 100px "AgrandirHeavy", sans-serif';
      const wCustom = this.offCtx.measureText('LIMIT').width;
      this.offCtx.font = '900 100px sans-serif';
      const wFallback = this.offCtx.measureText('LIMIT').width;
      
      if (Math.abs(wCustom - wFallback) > 5) {
        this.fontLoaded = true;
        this.initCanvas(true);
      }
    }
    
    const now = Date.now();
    if (now > this.nextSplashTime) {
      this.triggerSplash();
      this.nextSplashTime = now + 4000 + Math.random() * 4000;
    }
    
    // Decay splash text HUD opacity
    if (this.splashLabelOpacity > 0) {
      this.splashLabelOpacity -= 0.015;
    }
    
    // Step 1: Verlet Integration & Position Prediction
    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      p.px = p.x;
      p.py = p.y;
      
      p.vy += this.gravity;
      p.vx *= this.friction;
      p.vy *= this.friction;
      
      p.x += p.vx;
      p.y += p.vy;
    }
    
    // Step 2: Solve PBD constant-density Constraints & boundary projection
    this.solvePBDConstraints();
    
    // Step 3: Update Velocities from actual displacements (Verlet velocity update)
    const width = this.canvas.width;
    const height = this.canvas.height;
    
    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      p.vx = p.x - p.px;
      p.vy = p.y - p.py;
      
      // Fast boundary collision response checks
      const c = Math.floor(p.x / this.cellSize);
      const r = Math.floor(p.y / this.cellSize);
      
      if (c >= 0 && c < this.cols && r >= 0 && r < this.rows) {
        const idx = r * this.cols + c;
        if (this.collisionGrid[idx] === 0) {
          const targetIdx = this.nearestInsideGrid[idx];
          if (targetIdx !== -1) {
            const targetC = targetIdx % this.cols;
            const targetR = Math.floor(targetIdx / this.cols);
            
            const targetX = targetC * this.cellSize + this.cellSize / 2;
            const targetY = targetR * this.cellSize + this.cellSize / 2;
            
            const dx = targetX - p.x;
            const dy = targetY - p.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            if (dist > 0.1) {
              const nx = dx / dist;
              const ny = dy / dist;
              
              p.x = targetX + nx * 0.5;
              p.y = targetY + ny * 0.5;
              
              const dot = p.vx * nx + p.vy * ny;
              if (dot < 0) {
                p.vx = (p.vx - (1.0 + this.restitution) * dot * nx);
                p.vy = (p.vy - (1.0 + this.restitution) * dot * ny);
              }
            }
          }
        }
      }
    }
    
    // Step 4: RENDER THE LIQUID (Blur & Contrast Metaball stencil pipeline)
    this.renderLiquid();
  }
  
  renderLiquid() {
    const width = this.canvas.width;
    const height = this.canvas.height;
    
    // Clear screen
    this.ctx.fillStyle = '#000000';
    this.ctx.fillRect(0, 0, width, height);
    
    // 1. Draw crisp outlined glass containers representing hollow text LIMIT
    this.ctx.lineWidth = 3.5;
    this.ctx.strokeStyle = 'rgba(0, 255, 200, 0.4)';
    this.ctx.font = this.fontString || '900 12vw "AgrandirHeavy", "Arial Black", sans-serif';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.strokeText('LIMIT', width / 2, height / 2);
    
    // 2. Draw flat liquid particles on offscreen fluidCanvas
    this.fluidCtx.clearRect(0, 0, width, height);
    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];
      const rad = this.particleRadius * 2.3;
      this.fluidCtx.fillStyle = '#0077FF';
      this.fluidCtx.beginPath();
      this.fluidCtx.arc(p.x, p.y, rad, 0, Math.PI * 2);
      this.fluidCtx.fill();
    }
    
    // 3. Draw solid mask text on maskCanvas
    this.maskCtx.fillStyle = '#000000';
    this.maskCtx.fillRect(0, 0, width, height);
    this.maskCtx.fillStyle = '#FFFFFF';
    this.maskCtx.font = this.fontString || '900 12vw "AgrandirHeavy", "Arial Black", sans-serif';
    this.maskCtx.textAlign = 'center';
    this.maskCtx.textBaseline = 'middle';
    this.maskCtx.fillText('LIMIT', width / 2, height / 2);
    
    // Mask fluid particles to only render INSIDE the LIMIT characters
    this.maskCtx.globalCompositeOperation = 'source-in';
    this.maskCtx.drawImage(this.fluidCanvas, 0, 0);
    this.maskCtx.globalCompositeOperation = 'source-over';
    
    // 4. Paint masked metaballs to main canvas applying dynamic high-contrast threshold filter
    this.ctx.save();
    this.ctx.filter = 'contrast(240%) brightness(1.05)';
    this.ctx.drawImage(this.maskCanvas, 0, 0);
    this.ctx.restore();
  }
  
  cleanup() {
    window.removeEventListener('resize', this.resizeListener);
    clearTimeout(this.resizeDebounce);
    this.particles = [];
  }
}
