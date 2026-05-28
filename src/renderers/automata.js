export class AutomataRenderer {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d', { alpha: false }); // alpha:false boosts performance
    
    this.cellSize = 5;
    this.grid = [];
    this.textGrid = []; // Stores the clean, baseline "AUTOMATION" text pixels
    this.nearText = []; // Stores a mask of pixels inside or close to the text body
    this.cols = 0;
    this.rows = 0;
    
    this.isVisible = false;
    this.lastTick = 0;
    this.tickRate = 80; // methodical, high-quality cellular movement rate

    // State Machine for the custom text distortion/dismantling effect
    this.state = 'stable'; // 'stable' (self-healing), 'chaos' (pure Conway), 'reconstructing' (pull back)
    this.stateTimer = 0;
    this.nextChaosTime = Date.now() + 6000 + Math.random() * 4000; // Trigger chaos every 6-10s
    
    // Ambient Conway configuration
    this.maxAmbientSeeds = 40; // Controls how many independent Conway seed structures can coexist in empty space while text is stable

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
          this.initGrid();
          if (this.isVisible) {
            this.state = 'chaos';
            this.stateTimer = 22;
            this.resetToStable();
            this.injectImmediateChaos();
          }
        }
      }, 250);
    };
    window.addEventListener('resize', this.resizeListener);
    
    // Ensure fonts are loaded before initializing grid to capture high-res baseline text
    if (document.fonts) {
      document.fonts.ready.then(() => this.initGrid());
    } else {
      this.initGrid();
    }
  }

  setupObserver() {
    this.observer = new IntersectionObserver((entries) => {
      const isIntersecting = entries[0].isIntersecting;
      if (isIntersecting && !this.isVisible) {
        // Trigger Conway chaos immediately on scroll-in!
        this.state = 'chaos';
        this.stateTimer = 22; // ~1.8s of pure Conway motion
        this.resetToStable();
        this.injectImmediateChaos();
      }
      this.isVisible = isIntersecting;
    }, { threshold: 0.1 });
    this.observer.observe(this.canvas);
  }

  destroy() {
    window.removeEventListener('resize', this.resizeListener);
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  initGrid() {
    const isMobile = window.innerWidth < 768;
    this.canvas.width = isMobile ? window.innerWidth * 0.95 * 2 : window.innerWidth * 0.8;
    this.canvas.height = isMobile ? 240 : 180;
    this.cols = Math.floor(this.canvas.width / this.cellSize);
    this.rows = Math.floor(this.canvas.height / this.cellSize);

    // 1. Draw crisp baseline text to read its pixels
    this.ctx.fillStyle = '#000000';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = '#FFFFFF';
    this.ctx.font = isMobile ? '800 19vw AgrandirHeavy, sans-serif' : '800 7.5vw AgrandirHeavy, sans-serif';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.fillText('AUTOMATION', this.canvas.width / 2, this.canvas.height / 2);

    // 2. Extract pixel data
    const imgData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height).data;
    
    this.textGrid = new Array(this.cols).fill(0).map(() => new Array(this.rows).fill(0));
    this.nearText = new Array(this.cols).fill(0).map(() => new Array(this.rows).fill(0));
    this.grid = new Array(this.cols).fill(0).map(() => new Array(this.rows).fill(0));
    
    // 3. Seed both grids with the perfect text mask
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        const pxY = y * this.cellSize;
        const pxX = x * this.cellSize;
        const index = (pxY * this.canvas.width + pxX) * 4;
        
        if (imgData[index] > 128) {
          this.textGrid[x][y] = 1;
          this.grid[x][y] = 1;
        }
      }
    }

    // 4. Precompute "near text" proximity mask (radius of 2 cells)
    // This allows active cells far from the text to run pure Conway, while cells touching the text heal.
    for (let x = 0; x < this.cols; x++) {
      for (let y = 0; y < this.rows; y++) {
        if (this.textGrid[x][y] === 1) {
          for (let dx = -2; dx <= 2; dx++) {
            for (let dy = -2; dy <= 2; dy++) {
              let nx = x + dx;
              let ny = y + dy;
              if (nx >= 0 && nx < this.cols && ny >= 0 && ny < this.rows) {
                this.nearText[nx][ny] = 1;
              }
            }
          }
        }
      }
    }

    // Start in chaos mode on first page load
    this.state = 'chaos';
    this.stateTimer = 22;
    this.injectImmediateChaos();
  }

  // Scrambles the baseline text pixels to kickstart Conway Game of Life chaos
  injectImmediateChaos() {
    if (!this.grid || this.grid.length === 0) return;
    for (let x = 0; x < this.cols; x++) {
      for (let y = 0; y < this.rows; y++) {
        if (this.textGrid[x][y] === 1) {
          if (Math.random() < 0.35) {
            // Displace original pixels
            this.grid[x][y] = 0;
            let nx = x + Math.floor((Math.random() - 0.5) * 6);
            let ny = y + Math.floor((Math.random() - 0.5) * 6);
            if (nx >= 0 && nx < this.cols && ny >= 0 && ny < this.rows) {
              this.grid[nx][ny] = 1;
            }
          }
        }
      }
    }
  }

  // Conway's Game of Life with selective text homeostasis
  computeNextGen(pullStrength = 0.0) {
    if (!this.grid || this.grid.length === 0) return;
    let nextGrid = new Array(this.cols).fill(0).map(() => new Array(this.rows).fill(0));
    
    for (let x = 1; x < this.cols - 1; x++) {
      for (let y = 1; y < this.rows - 1; y++) {
        let neighbors = 0;
        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            neighbors += this.grid[x + i][y + j];
          }
        }
        neighbors -= this.grid[x][y];

        // Standard Conway's Game of Life transitions
        let cell = this.grid[x][y];
        let nextCell = 0;
        if (cell === 1 && (neighbors === 2 || neighbors === 3)) {
          nextCell = 1;
        } else if (cell === 0 && neighbors === 3) {
          nextCell = 1;
        }

        // Apply homeostasis pull ONLY inside the text zone (nearText)
        // This lets cells in the empty space run 100% pure Conway!
        if (pullStrength > 0 && this.nearText[x][y]) {
          let isOriginal = this.textGrid[x][y];
          if (isOriginal === 1 && nextCell === 0) {
            // Restore text pixel
            nextCell = Math.random() < pullStrength ? 1 : 0;
          } else if (isOriginal === 0 && nextCell === 1) {
            // Kill stray pixel
            nextCell = Math.random() < pullStrength ? 0 : 1;
          }
        }

        nextGrid[x][y] = nextCell;
      }
    }
    this.grid = nextGrid;
  }

  // Injects minor random distortions on the boundaries of the text
  injectLocalGlitch() {
    for (let k = 0; k < 4; k++) {
      let x = Math.floor(Math.random() * (this.cols - 4)) + 2;
      let y = Math.floor(Math.random() * (this.rows - 4)) + 2;
      
      // Only glitch pixels close to or on the text body to keep it organic
      if (this.textGrid[x][y] === 1) {
        for (let i = -1; i <= 1; i++) {
          for (let j = -1; j <= 1; j++) {
            if (Math.random() > 0.4) {
              this.grid[x + i][y + j] = 1;
            }
          }
        }
      }
    }
  }

  // Spawns gliders/blinkers in the empty space up to the limit of maxAmbientSeeds
  spawnAmbientConway() {
    if (!this.grid || this.grid.length === 0) return;
    
    // Count active cells outside the text zone to make sure we don't overcrowd
    let ambientCount = 0;
    for (let x = 0; x < this.cols; x++) {
      for (let y = 0; y < this.rows; y++) {
        if (this.grid[x][y] === 1 && !this.nearText[x][y]) {
          ambientCount++;
        }
      }
    }
    
    // Each Conway seed (glider/blinker) consists of ~4.5 cells on average.
    // Calculate current running seeds, and check if we need to spawn more.
    let currentSeeds = Math.floor(ambientCount / 4.5);
    let seedsNeeded = this.maxAmbientSeeds - currentSeeds;
    if (seedsNeeded <= 0) return;

    // Spawn the required seeds to meet the limit
    for (let s = 0; s < seedsNeeded; s++) {
      // Pick a random spot far away from text
      let attempts = 0;
      while (attempts < 15) {
        let x = Math.floor(Math.random() * (this.cols - 12)) + 6;
        let y = Math.floor(Math.random() * (this.rows - 12)) + 6;
        
        // Ensure the spawning area is completely empty and far from text
        let safe = true;
        for (let dx = -3; dx <= 3; dx++) {
          for (let dy = -3; dy <= 3; dy++) {
            if (this.nearText[x + dx][y + dy] === 1 || this.grid[x + dx][y + dy] === 1) {
              safe = false;
              break;
            }
          }
          if (!safe) break;
        }

        if (safe) {
          let rand = Math.random();
          if (rand < 0.4) {
            // Glider
            this.grid[x][y+1] = 1;
            this.grid[x+1][y+2] = 1;
            this.grid[x+2][y] = 1;
            this.grid[x+2][y+1] = 1;
            this.grid[x+2][y+2] = 1;
          } else if (rand < 0.7) {
            // Blinker
            this.grid[x][y] = 1;
            this.grid[x][y+1] = 1;
            this.grid[x][y+2] = 1;
          } else {
            // Small line of 4 dots (generates nice chaos)
            this.grid[x][y] = 1;
            this.grid[x+1][y] = 1;
            this.grid[x+2][y] = 1;
            this.grid[x+3][y] = 1;
          }
          break; // successfully spawned one seed, break attempts to move to next seed
        }
        attempts++;
      }
    }
  }

  resetToStable() {
    for (let x = 0; x < this.cols; x++) {
      for (let y = 0; y < this.rows; y++) {
        this.grid[x][y] = this.textGrid[x][y];
      }
    }
  }

  update(dt, time) {
    if (!this.isVisible || !this.grid || this.grid.length === 0) return;

    // Throttle calculation rate
    if (time - this.lastTick > this.tickRate) {
      this.lastTick = time;

      if (this.state === 'stable') {
        // High self-healing pull keeps text clean, with occasional local glitches
        this.computeNextGen(0.92);

        // Glitch occasionally (random border cellular distortions)
        if (Math.random() < 0.12) {
          this.injectLocalGlitch();
        }

        // Spawn ambient particles in empty space with a 15% chance per tick
        if (Math.random() < 0.15) {
          this.spawnAmbientConway();
        }

        // Trigger full dismantle
        if (Date.now() > this.nextChaosTime) {
          this.state = 'chaos';
          this.stateTimer = 22; // ~1.8s of chaos motion (22 ticks)
        }
      } 
      else if (this.state === 'chaos') {
        // Pure unconstrained Conway chaos - text dissolves
        this.computeNextGen(0.0);
        this.stateTimer--;

        if (this.stateTimer <= 0) {
          this.state = 'reconstructing';
          this.stateTimer = 12; // 12 ticks to pull pixels back
        }
      } 
      else if (this.state === 'reconstructing') {
        // Progressively pull pixels back into place
        let progress = (12 - this.stateTimer) / 12;
        this.computeNextGen(0.1 + progress * 0.9);
        this.stateTimer--;

        if (this.stateTimer <= 0) {
          this.resetToStable();
          this.state = 'stable';
          // Schedule next chaos in 8-13 seconds
          this.nextChaosTime = Date.now() + 8000 + Math.random() * 5000;
        }
      }
    }

    // Render
    this.ctx.fillStyle = '#000000';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.ctx.fillStyle = '#ffffff';
    for (let x = 0; x < this.cols; x++) {
      for (let y = 0; y < this.rows; y++) {
        if (this.grid[x] && this.grid[x][y] === 1) {
          this.ctx.fillRect(x * this.cellSize, y * this.cellSize, this.cellSize - 1, this.cellSize - 1);
        }
      }
    }
  }
}