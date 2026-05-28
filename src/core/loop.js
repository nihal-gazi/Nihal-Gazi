export class Engine {
  constructor() {
    this.callbacks = [];
    this.lastTime = performance.now();
    this.isRunning = false;
    this.maxDelta = 50; // Clamp at 50ms (~20fps minimum) to prevent physics explosions
  }

  add(callback) {
    this.callbacks.push(callback);
  }

  start() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.lastTime = performance.now();
    requestAnimationFrame((t) => this.tick(t));
  }

  stop() {
    this.isRunning = false;
  }

  clear() {
    this.callbacks = [];
  }

  tick(currentTime) {
    if (!this.isRunning) return;
    
    let dt = currentTime - this.lastTime;
    // Bounding the time-step to prevent chaotic jumps
    if (dt > this.maxDelta) dt = this.maxDelta; 
    this.lastTime = currentTime;

    // Execute all registered renderers
    for (const cb of this.callbacks) {
      cb(dt, currentTime);
    }
    
    requestAnimationFrame((t) => this.tick(t));
  }
}

export const loop = new Engine();