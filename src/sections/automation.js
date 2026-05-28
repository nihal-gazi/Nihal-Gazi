export const automationSection = `
  <section id="automation" class="viewport-section" style="position: relative; padding: 6rem 5vw; min-height: 100vh; overflow: visible; display: flex; align-items: center; justify-content: center;">
    
    <div class="top-grid-container" style="display: grid; grid-template-columns: 1.2fr 1fr; align-items: center; width: 100%; max-width: 1300px; gap: 4rem; z-index: 5;">
      
      <div class="intro-text" style="display: flex; flex-direction: column; align-items: flex-start; text-align: left;">
        <!-- Canvas container for cellular automata text -->
        <div style="width: 100%; min-height: 120px; position: relative;">
          <canvas id="canvas-automation" style="width: 100%; height: auto; display: block; filter: drop-shadow(0 0 8px rgba(255,255,255,0.15));"></canvas>
        </div>
        
        <h3 class="font-light" style="font-size: clamp(1.8rem, 3.5vw, 2.8rem); line-height: 1.2; margin-top: 1.5rem; margin-bottom: 2rem; letter-spacing: -0.02em;">
          that performs tasks at <span class="font-heavy" style="font-style: italic;">breakneck</span> speeds
        </h3>
        
        <p class="font-body" style="font-size: 0.95rem; color: #aaaaaa; max-width: 500px; line-height: 1.8; margin-bottom: 1.5rem;">
          
        
        A true automation can outpace standard computational bottlenecks. For the ARGUS Project, I developed Hierarchical Sparse Vision Transformers for real-time particle track reconstruction. Achieving <span style="font-family: 'Times New Roman', Times, serif; font-style: italic; font-weight: bold; color: #ffffff;">O(N)</span> linear time complexity, this architecture won the Gold Medal at the IEMPHYS-26 International Conference, redefining high-energy physics computations.
        
          </p>
      </div>

      <div class="paper-visual" style="display: flex; justify-content: center; align-items: center; perspective: 1000px; width: 100%; position: relative;">
        <!-- Mint leaf peeking from the top-right edge, strictly behind the paper (z-index: 1) -->
        <img src="/images/mint.png" alt="" style="position: absolute; right: -6%; top: -22%; width: 55%; z-index: 1; pointer-events: none;" />

        <!-- Simplified image-based Academic Paper (z-index: 5) -->
        <div class="academic-paper-image" style="position: relative; z-index: 5;">
          <img src="/images/argus_paper_thumb.png" alt="ARGUS Paper" style="width: 100%; height: auto; display: block;" />
        </div>
      </div>

    </div>
  </section>
`;