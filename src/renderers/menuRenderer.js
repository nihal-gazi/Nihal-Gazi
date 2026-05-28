import { harmonicNoise } from '../physics/noise.js';

export class MolecularMenu {
  constructor() {
    this.nodes = Array.from(document.querySelectorAll('#nav-chain li'));
    this.svg = document.getElementById('nav-bonds');
    
    // Create the SVG lines dynamically based on node count
    this.svg.innerHTML = '';
    this.lines = [];
    for (let i = 0; i < this.nodes.length - 1; i++) {
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.setAttribute('stroke', 'rgba(255, 255, 255, 0.4)');
      line.setAttribute('stroke-width', '1.5');
      this.svg.appendChild(line);
      this.lines.push(line);
    }

    this.baseSeed = 142;
    this.vibrationRadiusX = 4; // Toned down slightly so text remains readable
    this.vibrationRadiusY = 2;
    this.thermalSpeed = 0.0006;
    
    this.calculateBasePositions();
    
    // Recalculate if window resizes
    window.addEventListener('resize', () => this.calculateBasePositions());
  }

  calculateBasePositions() {
    const svgRect = this.svg.getBoundingClientRect();
    
    this.basePositions = this.nodes.map(node => {
      // Remove any existing transform to get the true rest position
      node.style.transform = 'none'; 
      const rect = node.getBoundingClientRect();
      
      return {
        // Calculate exact center relative to the SVG container
        x: (rect.left + rect.width / 2) - svgRect.left,
        y: (rect.top + rect.height / 2) - svgRect.top
      };
    });
  }

  update(dt, time) {
    const currentPositions = [];

    // Apply physics
    this.nodes.forEach((node, index) => {
      const noiseX = harmonicNoise(time, index * this.baseSeed, this.thermalSpeed, this.vibrationRadiusX);
      const noiseY = harmonicNoise(time, (index + 5) * this.baseSeed, this.thermalSpeed, this.vibrationRadiusY);
      
      node.style.transform = `translate(${noiseX}px, ${noiseY}px)`;
      
      currentPositions.push({
        x: this.basePositions[index].x + noiseX,
        y: this.basePositions[index].y + noiseY
      });
    });

    // Draw the bonds
    this.lines.forEach((line, i) => {
      line.setAttribute('x1', currentPositions[i].x);
      line.setAttribute('y1', currentPositions[i].y);
      line.setAttribute('x2', currentPositions[i+1].x);
      line.setAttribute('y2', currentPositions[i+1].y);
    });
  }
}