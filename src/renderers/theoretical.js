export class TheoreticalRenderer {
  constructor(canvasId, pidTextId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d', { alpha: false });
    this.pidTextEl = document.getElementById(pidTextId);
    
    this.isVisible = false;
    this.lastTime = 0;
    
    // Create an offscreen canvas to render the crisp Times baseline text
    this.offscreen = document.createElement('canvas');
    this.offCtx = this.offscreen.getContext('2d', { alpha: false });
    
    // PID HUD parameters (for thematic aesthetic, matching the fluid convergence)
    this.P = 0.034;
    this.I = 0.014;
    this.D = -1.034;
    
    this.targetP = 1.000;
    this.targetI = 0.000;
    this.targetD = 0.000;

    // Grid sizes for Eulerian Fluid Sim (120x40 is optimal for high frame rate & fluid details)
    this.cols = 260;
    this.rows = 80;
    this.cellSize = 0; // Calculated on init
    
    // Eulerian Fluid Grids
    this.density = [];      // Smoke density field
    this.prevDensity = [];  // Previous density (for semi-Lagrangian advection)
    this.u = [];            // Horizontal velocity grid
    this.v = [];            // Vertical velocity grid
    this.textGrid = [];     // Target glyph density mask (1.0 for letter, 0.0 for empty)
    
    // State machine for fluid advection loop
    this.state = 'stable';  // 'stable', 'dissolving' (forward fluid), 'reversing' (inverse physics snapback)
    this.stateTimer = 0;
    this.stateDuration = {
      stable: 2000,      // 2s of clear static text
      dissolving: 3500,  // 3.5s of organic swirling forward fluid flow
      reversing: 5500    // 3.5s of inverse-physics streamline convergence
    };
    
    // Perturbation config: controls initial vortex injection and continuous turbulence
    this.perturbationConfig = {
      initialVorticesMin: 5,       // Min number of vortices to inject on dissolving start
      initialVorticesMax: 5,       // Max number of vortices to inject
      initialRadius: { min: 5, max: 12 },  // Vortex radius range
      initialForce: { min: 0.2, max: 0.2 },   // Vortex force magnitude range
      
      continuousFrequency: 0.8,    // Probability per frame to inject a continuous perturbation (0.0-1.0)
      continuousRadius: 6,         // Radius of continuous perturbations
      continuousForceRange: 0.1    // Force magnitude range for continuous perturbations
    };
    
    this.setupObserver();
    
    // Handle responsive sizing
    this.lastWidth = window.innerWidth;
    this.resizeDebounce = null;
    this.resizeListener = () => {
      clearTimeout(this.resizeDebounce);
      this.resizeDebounce = setTimeout(() => {
        const width = window.innerWidth;
        if (Math.abs(width - this.lastWidth) > 15) {
          this.lastWidth = width;
          this.initCanvas();
          if (this.isVisible) {
            this.state = 'dissolving';
            this.stateTimer = Date.now() + this.stateDuration.dissolving;
            this.resetFluid();
            // Inject immediate massive turbulence vortices
            const numVortices = 4 + Math.floor(Math.random() * 3);
            for (let i = 0; i < numVortices; i++) {
              const cx = 15 + Math.random() * (this.cols - 30);
              const cy = 8 + Math.random() * (this.rows - 16);
              const rad = 10 + Math.random() * 12;
              const force = (Math.random() > 0.5 ? 1.0 : -1.0) * (1.2 + Math.random() * 1.5);
              this.injectFluidVortex(cx, cy, rad, force);
            }
          }
        }
      }, 250);
    };
    window.addEventListener('resize', this.resizeListener);
    
    if (document.fonts) {
      document.fonts.ready.then(() => this.initCanvas());
    } else {
      this.initCanvas();
    }
  }

  setupObserver() {
    this.observer = new IntersectionObserver((entries) => {
      const isIntersecting = entries[0].isIntersecting;
      if (isIntersecting && !this.isVisible) {
        // Ignite as dissolving (turbulent) on scroll-in
        this.state = 'dissolving';
        this.stateTimer = Date.now() + this.stateDuration.dissolving;
        this.resetFluid();
        
        // Inject immediate massive turbulence vortices
        const numVortices = 4 + Math.floor(Math.random() * 3);
        for (let i = 0; i < numVortices; i++) {
          const cx = 15 + Math.random() * (this.cols - 30);
          const cy = 8 + Math.random() * (this.rows - 16);
          const rad = 10 + Math.random() * 12;
          const force = (Math.random() > 0.5 ? 1.0 : -1.0) * (1.2 + Math.random() * 1.5);
          this.injectFluidVortex(cx, cy, rad, force);
        }
      }
      this.isVisible = isIntersecting;
    }, { threshold: 0.15 });
    
    this.observer.observe(this.canvas);
  }

  destroy() {
    window.removeEventListener('resize', this.resizeListener);
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  initCanvas() {
    const isMobile = window.innerWidth < 768;
    this.canvas.width = isMobile ? window.innerWidth * 0.95 : window.innerWidth * 0.8;
    this.canvas.height = isMobile ? 110 : 160;
    
    this.offscreen.width = this.canvas.width;
    this.offscreen.height = this.canvas.height;
    
    // Draw baseline text once offscreen
    this.offCtx.fillStyle = '#000000';
    this.offCtx.fillRect(0, 0, this.offscreen.width, this.offscreen.height);
    this.offCtx.fillStyle = '#FFFFFF';
    this.offCtx.font = isMobile ? '800 11vw "Times New Roman", Times, serif' : '800 7.5vw "Times New Roman", Times, serif';
    this.offCtx.textAlign = 'center';
    this.offCtx.textBaseline = 'middle';
    this.offCtx.fillText('THEORETICAL', this.offscreen.width / 2, this.offscreen.height / 2);
    
    // Calculate grid details
    this.cellSize = this.canvas.width / this.cols;
    this.rows = Math.ceil(this.canvas.height / this.cellSize);
    
    // Allocate flat 1D arrays for optimal browser performance (prevents 2D array garbage collection delays)
    const totalCells = this.cols * this.rows;
    this.density = new Float32Array(totalCells);
    this.prevDensity = new Float32Array(totalCells);
    this.u = new Float32Array(totalCells);
    this.v = new Float32Array(totalCells);
    this.textGrid = new Float32Array(totalCells);
    
    // Extract pixel mask from offscreen text
    const imgData = this.offCtx.getImageData(0, 0, this.canvas.width, this.canvas.height).data;
    
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        const idx = r * this.cols + c;
        const pxX = Math.floor(c * this.cellSize + this.cellSize / 2);
        const pxY = Math.floor(r * this.cellSize + this.cellSize / 2);
        const pixelIdx = (pxY * this.canvas.width + pxX) * 4;
        
        if (imgData[pixelIdx] > 128) {
          this.textGrid[idx] = 1.0;
          this.density[idx] = 1.0;
        }
      }
    }
    
    // Start as dissolving (turbulent) immediately
    this.state = 'dissolving';
    this.stateTimer = Date.now() + this.stateDuration.dissolving;
    
    // Inject immediate massive turbulence vortices
    const numVortices = 4 + Math.floor(Math.random() * 3);
    for (let i = 0; i < numVortices; i++) {
      const cx = 15 + Math.random() * (this.cols - 30);
      const cy = 8 + Math.random() * (this.rows - 16);
      const rad = 10 + Math.random() * 12;
      const force = (Math.random() > 0.5 ? 1.0 : -1.0) * (1.2 + Math.random() * 1.5);
      this.injectFluidVortex(cx, cy, rad, force);
    }
  }

  resetFluid() {
    const totalCells = this.cols * this.rows;
    for (let i = 0; i < totalCells; i++) {
      this.density[i] = this.textGrid[i];
      this.u[i] = 0;
      this.v[i] = 0;
    }
    this.P = 1.000;
    this.I = 0.000;
    this.D = 0.000;
  }

  // Semi-Lagrangian Advection: Solves movement of density along the velocity field
  advectDensity() {
    // Copy current density to previous buffer
    this.prevDensity.set(this.density);
    
    const dt = 0.85; // Speed multiplier of fluid time-step
    
    for (let r = 1; r < this.rows - 1; r++) {
      for (let c = 1; c < this.cols - 1; c++) {
        const idx = r * this.cols + c;
        
        // Trace velocity backwards in time (Eulerian semi-Lagrangian backtrace)
        let prevX = c - this.u[idx] * dt;
        let prevY = r - this.v[idx] * dt;
        
        // Clamp bounds
        if (prevX < 0.5) prevX = 0.5;
        if (prevX > this.cols - 1.5) prevX = this.cols - 1.5;
        if (prevY < 0.5) prevY = 0.5;
        if (prevY > this.rows - 1.5) prevY = this.rows - 1.5;
        
        // Bilinear interpolation
        const x0 = Math.floor(prevX);
        const x1 = x0 + 1;
        const y0 = Math.floor(prevY);
        const y1 = y0 + 1;
        
        const s1 = prevX - x0;
        const s0 = 1 - s1;
        const t1 = prevY - y0;
        const t0 = 1 - t1;
        
        const row0 = y0 * this.cols;
        const row1 = y1 * this.cols;
        
        // Bilinear sample of previous density field
        this.density[idx] = 
          t0 * (s0 * this.prevDensity[row0 + x0] + s1 * this.prevDensity[row0 + x1]) +
          t1 * (s0 * this.prevDensity[row1 + x0] + s1 * this.prevDensity[row1 + x1]);
      }
    }
  }

  // Inject a high-velocity fluid vortex (rotational force) at a specific coordinate
  injectFluidVortex(cx, cy, radius, forceStrength) {
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        const idx = r * this.cols + c;
        const dx = c - cx;
        const dy = r - cy;
        const distSq = dx * dx + dy * dy;
        
        if (distSq < radius * radius && distSq > 0) {
          const dist = Math.sqrt(distSq);
          const falloff = 1.0 - dist / radius;
          
          // Tangential rotational forces
          this.u[idx] += -dy * falloff * forceStrength;
          this.v[idx] += dx * falloff * forceStrength;
        }
      }
    }
  }

  // Apply velocity field damping (friction/viscosity)
  applyViscosity(friction = 0.96) {
    const totalCells = this.cols * this.rows;
    for (let i = 0; i < totalCells; i++) {
      this.u[i] *= friction;
      this.v[i] *= friction;
    }
  }

  // Inject initial energetic vortices based on perturbation config
  injectInitialPerturbations() {
    const cfg = this.perturbationConfig;
    const numVortices = cfg.initialVorticesMin + Math.floor(Math.random() * (cfg.initialVorticesMax - cfg.initialVorticesMin + 1));
    
    for (let i = 0; i < numVortices; i++) {
      const cx = 15 + Math.random() * (this.cols - 30);
      const cy = 8 + Math.random() * (this.rows - 16);
      const rad = cfg.initialRadius.min + Math.random() * (cfg.initialRadius.max - cfg.initialRadius.min);
      const forceMagnitude = cfg.initialForce.min + Math.random() * (cfg.initialForce.max - cfg.initialForce.min);
      const force = (Math.random() > 0.5 ? 1.0 : -1.0) * forceMagnitude;
      this.injectFluidVortex(cx, cy, rad, force);
    }
  }

  // Inject continuous turbulent perturbations based on probability
  injectContinuousPerturbations() {
    const cfg = this.perturbationConfig;
    if (Math.random() < cfg.continuousFrequency) {
      const cx = Math.random() * this.cols;
      const cy = Math.random() * this.rows;
      const force = (Math.random() - 0.5) * cfg.continuousForceRange;
      this.injectFluidVortex(cx, cy, cfg.continuousRadius, force);
    }
  }

  // Inverse Physics steering: Forces fluid streamlines to steer directly back towards text pixels
  applyInversePhysicsPull(pullStrength = 0.08) {
    for (let r = 1; r < this.rows - 1; r++) {
      for (let c = 1; c < this.cols - 1; c++) {
        const idx = r * this.cols + c;
        
        // If this cell has density but is NOT in the original text,
        // or if it is an empty cell that SHOULD contain original text,
        // generate a steering force vector towards the nearest matching text cell.
        if (this.density[idx] > 0.05) {
          let isOriginal = this.textGrid[idx];
          if (isOriginal === 0.0) {
            // Find nearest text pixel to pull the scattered "smoke" back
            let nearestX = c;
            let nearestY = r;
            let minDistSq = 999999;
            
            // Search local 15x15 window for nearest target glyph cell
            const searchRad = 8;
            for (let dy = -searchRad; dy <= searchRad; dy++) {
              for (let dx = -searchRad; dx <= searchRad; dx++) {
                let nc = c + dx;
                let nr = r + dy;
                if (nc >= 0 && nc < this.cols && nr >= 0 && nr < this.rows) {
                  let nIdx = nr * this.cols + nc;
                  if (this.textGrid[nIdx] === 1.0) {
                    let dSq = dx * dx + dy * dy;
                    if (dSq < minDistSq) {
                      minDistSq = dSq;
                      nearestX = nc;
                      nearestY = nr;
                    }
                  }
                }
              }
            }
            
            // Apply steering velocity pulling the cell back home
            const steerX = nearestX - c;
            const steerY = nearestY - r;
            const len = Math.sqrt(steerX * steerX + steerY * steerY);
            if (len > 0) {
              this.u[idx] += (steerX / len) * pullStrength;
              this.v[idx] += (steerY / len) * pullStrength;
            }
          }
        }
        
        // Empty cells belonging to original text attract density back to themselves
        if (this.textGrid[idx] === 1.0 && this.density[idx] < 0.6) {
          // Search local active densities to pull them in
          let nearestC = c;
          let nearestR = r;
          let minDistSq = 999999;
          
          const searchRad = 8;
          for (let dy = -searchRad; dy <= searchRad; dy++) {
            for (let dx = -searchRad; dx <= searchRad; dx++) {
              let nc = c + dx;
              let nr = r + dy;
              if (nc >= 0 && nc < this.cols && nr >= 0 && nr < this.rows) {
                let nIdx = nr * this.cols + nc;
                if (this.density[nIdx] > 0.4 && this.textGrid[nIdx] === 0.0) {
                  let dSq = dx * dx + dy * dy;
                  if (dSq < minDistSq) {
                    minDistSq = dSq;
                    nearestC = nc;
                    nearestR = nr;
                  }
                }
              }
            }
          }
          
          const steerX = nearestC - c;
          const steerY = nearestR - r;
          const len = Math.sqrt(steerX * steerX + steerY * steerY);
          if (len > 0) {
            // Apply attractive gravitational pull on the velocity field
            this.u[idx] -= (steerX / len) * pullStrength * 0.7;
            this.v[idx] -= (steerY / len) * pullStrength * 0.7;
          }
        }
      }
    }
  }

  // Homeostasis density blending (helps solidify text and clean dust during stable/reversing state)
  blendHomeostasis(strength = 0.05) {
    const totalCells = this.cols * this.rows;
    for (let i = 0; i < totalCells; i++) {
      let target = this.textGrid[i];
      this.density[i] = this.density[i] * (1 - strength) + target * strength;
    }
  }

  lerp(start, end, amt) {
    return (1 - amt) * start + amt * end;
  }

  update(dt, time) {
    if (!this.isVisible || this.density.length === 0) return;
    
    const now = Date.now();
    
    if (now > this.stateTimer) {
      if (this.state === 'stable') {
        // Transition to dissolving forward fluid simulation
        this.state = 'dissolving';
        this.stateTimer = now + this.stateDuration.dissolving;
        
        // Inject initial perturbations
        this.injectInitialPerturbations();
      } 
      else if (this.state === 'dissolving') {
        // Transition to inverse-physics streamline reversal
        this.state = 'reversing';
        this.stateTimer = now + this.stateDuration.reversing;
      } 
      else if (this.state === 'reversing') {
        // Seamlessly snap back to fully clear stable text
        this.resetFluid();
        this.state = 'stable';
        this.stateTimer = now + this.stateDuration.stable;
      }
    }

    // STATE MACHINE PHYSICS INTEGRATION
    if (this.state === 'stable') {
      // Complete perfect text focus
      this.P = 1.000; this.I = 0.000; this.D = 0.000;
      this.blendHomeostasis(0.2); // quickly heal any stray values
      this.applyViscosity(0.8);  // halt fluid motion
    } 
    else if (this.state === 'dissolving') {
      // Forward Fluid simulation phase: advect density along velocity vectors
      let progress = 1 - Math.max(0, (this.stateTimer - now) / this.stateDuration.dissolving);
      
      // Destabilize PID HUD readings thematicly
      this.P = parseFloat(this.lerp(1.000, 0.034, progress).toFixed(3));
      this.I = parseFloat(this.lerp(0.000, 0.014, progress).toFixed(3));
      this.D = parseFloat(this.lerp(0.000, -1.034, progress).toFixed(3));
      
      // Inject continuous perturbations
      this.injectContinuousPerturbations();
      
      this.applyViscosity(0.97); // low friction makes fluid swirl longer
      this.advectDensity();
    } 
    else if (this.state === 'reversing') {
      // Reverse Physics snapback phase: apply streamline steering towards text letters
      let progress = 1 - Math.max(0, (this.stateTimer - now) / this.stateDuration.reversing);
      
      // Tune PID HUD readings back to perfect targets
      this.P = parseFloat(this.lerp(0.034, 1.000, progress).toFixed(3));
      this.I = parseFloat(this.lerp(0.014, 0.000, progress).toFixed(3));
      this.D = parseFloat((-1.034 + progress * 1.034).toFixed(3));
      
      // Apply the inverse physics steering pull
      this.applyInversePhysicsPull(0.12);
      
      // Gradually blend homeostasis back in to solidify the letters
      this.blendHomeostasis(0.02 + progress * 0.15);
      
      this.applyViscosity(0.93); // medium friction prevents overshooting during snapback
      this.advectDensity();
    }

    // Update PID HUD text elements
    if (this.pidTextEl) {
      const isMobile = window.innerWidth < 768;
      const space = isMobile ? '&nbsp;&nbsp;&nbsp;' : '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
      this.pidTextEl.innerHTML = `P = ${this.P.toFixed(3)}${space}I = ${this.I.toFixed(3)}${space}D = ${this.D.toFixed(3)}`;
    }

    // RENDER THE DENSITY FIELD
    // High-performance canvas fill
    this.ctx.fillStyle = '#000000';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Draw cells
    for (let r = 0; r < this.rows; r++) {
      for (let c = 0; c < this.cols; c++) {
        const idx = r * this.cols + c;
        const dens = this.density[idx];
        
        if (dens > 0.02) {
          // Map density directly to transparency for beautiful smoke-like look
          this.ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(1.0, dens)})`;
          this.ctx.fillRect(
            c * this.cellSize,
            r * this.cellSize,
            this.cellSize,
            this.cellSize
          );
        }
      }
    }
  }
}
