export class DiffusionRenderer {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d', { alpha: false }); // alpha:false for maximum performance
    
    this.particles = [];
    this.isVisible = false;
    
    // State machine for infinite loop
    this.state = 'converging'; // 'converging', 'stable', 'dispersing'
    this.stateTimer = 0;
    this.stateDuration = {
      converging: 2500, // 2.5s to gather
      stable: 5000,     // 5s of clean text with active perturbations
      dispersing: 2000  // 2s to melt into noise
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
          this.initParticles();
          if (this.isVisible) {
            this.state = 'converging';
            this.stateTimer = Date.now() + this.stateDuration.converging;
            this.resetToNoise();
          }
        }
      }, 250);
    };
    window.addEventListener('resize', this.resizeListener);
    
    if (document.fonts) {
      document.fonts.ready.then(() => this.initParticles());
    } else {
      this.initParticles();
    }
  }

  setupObserver() {
    this.observer = new IntersectionObserver((entries) => {
      const isIntersecting = entries[0].isIntersecting;
      
      // Reset state to gather again when scrolled into view
      if (isIntersecting && !this.isVisible) {
        this.state = 'converging';
        this.stateTimer = Date.now() + this.stateDuration.converging;
        this.resetToNoise();
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

  initParticles() {
    const isMobile = window.innerWidth < 768;
    this.canvas.width = isMobile ? window.innerWidth * 0.95 : window.innerWidth * 0.8;
    this.canvas.height = isMobile ? 120 : 180;
    
    // 1. Draw "TOWARDS" offscreen to extract its shape
    this.ctx.fillStyle = '#000000';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = '#FFFFFF';
    this.ctx.font = isMobile ? '800 11.5vw AgrandirHeavy, sans-serif' : '800 7.5vw AgrandirHeavy, sans-serif';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.fillText('TOWARDS', this.canvas.width / 2, this.canvas.height / 2);

    const imgData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height).data;
    
    // 2. Select valid pixels
    const step = 3; 
    const targets = [];
    
    for (let y = 0; y < this.canvas.height; y += step) {
      for (let x = 0; x < this.canvas.width; x += step) {
        const index = (y * this.canvas.width + x) * 4;
        if (imgData[index] > 128) {
          targets.push({ x, y });
        }
      }
    }

    // 3. Create particles with independent physics properties
    this.particles = targets.map((target) => {
      const noiseX = Math.random() * this.canvas.width;
      const noiseY = Math.random() * this.canvas.height;
      return {
        glyphX: target.x, // Permanent text target coord
        glyphY: target.y,
        noiseX: noiseX,   // Permanent noise target coord
        noiseY: noiseY,
        
        targetX: noiseX,  // Current active target
        targetY: noiseY,
        
        // Start scattered
        x: noiseX,
        y: noiseY,
        size: 2,
        noiseOffset: Math.random() * 100,
        speed: 0.05 + Math.random() * 0.05 // Ease speed factor
      };
    });
    
    this.stateTimer = Date.now() + this.stateDuration.converging;
    this.setTargets('glyph');
  }

  // Set active targets for all particles
  setTargets(mode) {
    for (let i = 0; i < this.particles.length; i++) {
      let p = this.particles[i];
      if (mode === 'glyph') {
        p.targetX = p.glyphX;
        p.targetY = p.glyphY;
      } else {
        p.targetX = p.noiseX;
        p.targetY = p.noiseY;
      }
    }
  }

  resetToNoise() {
    for (let i = 0; i < this.particles.length; i++) {
      let p = this.particles[i];
      p.x = p.noiseX;
      p.y = p.noiseY;
      p.targetX = p.glyphX;
      p.targetY = p.glyphY;
    }
  }

  // Constantly swaps targets between nearby particles to create a beautiful fluid perturbation shimmer
  applyTargetPerturbation() {
    if (this.particles.length < 2) return;
    
    // Perturb a few pairs each frame
    const swaps = 12;
    for (let k = 0; k < swaps; k++) {
      let i = Math.floor(Math.random() * this.particles.length);
      let j = Math.floor(Math.random() * this.particles.length);
      
      // Calculate squared distance between their permanent glyph positions
      let dx = this.particles[i].glyphX - this.particles[j].glyphX;
      let dy = this.particles[i].glyphY - this.particles[j].glyphY;
      let distSq = dx * dx + dy * dy;
      
      // Only swap if they are relatively close (within 35px) to maintain overall text legibility
      if (distSq < 1225) {
        // Swap their active targets
        let tempX = this.particles[i].targetX;
        let tempY = this.particles[i].targetY;
        this.particles[i].targetX = this.particles[j].targetX;
        this.particles[i].targetY = this.particles[j].targetY;
        
        let tempTargetX = this.particles[j].targetX;
        let tempTargetY = this.particles[j].targetY;
        this.particles[j].targetX = tempX;
        this.particles[j].targetY = tempY;
      }
    }
  }

  update(dt, time) {
    if (!this.isVisible || this.particles.length === 0) return;

    const now = Date.now();

    // Infinite state loop
    if (now > this.stateTimer) {
      if (this.state === 'converging') {
        this.state = 'stable';
        this.stateTimer = now + this.stateDuration.stable;
      } else if (this.state === 'stable') {
        this.state = 'dispersing';
        this.stateTimer = now + this.stateDuration.dispersing;
        this.setTargets('noise');
      } else if (this.state === 'dispersing') {
        this.state = 'converging';
        this.stateTimer = now + this.stateDuration.converging;
        this.setTargets('glyph');
      }
    }

    // Active perturbation swap during stable converged state
    if (this.state === 'stable') {
      this.applyTargetPerturbation();
    }

    // Render loop
    this.ctx.fillStyle = '#000000';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = '#ffffff';

    for (let i = 0; i < this.particles.length; i++) {
      let p = this.particles[i];
      
      // Decay brownian motion as we gather into text
      let factor = this.state === 'converging' 
        ? Math.max(0, (this.stateTimer - now) / this.stateDuration.converging)
        : (this.state === 'dispersing' ? Math.min(1, (this.stateTimer - now) / this.stateDuration.dispersing) : 0.0);
        
      let jitterStrength = factor * 15;
      let jitterX = Math.sin(time * 0.006 + p.noiseOffset) * jitterStrength;
      let jitterY = Math.cos(time * 0.006 + p.noiseOffset) * jitterStrength;
      
      // Standard dynamic physics ease-to-target equation
      p.x += (p.targetX - p.x) * p.speed + jitterX * 0.1;
      p.y += (p.targetY - p.y) * p.speed + jitterY * 0.1;
      
      // Draw small dot
      this.ctx.fillRect(p.x, p.y, p.size, p.size);
    }
  }
}
