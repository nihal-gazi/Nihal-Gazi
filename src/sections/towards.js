export const towardsSection = `
  <section id="towards" class="viewport-section" style="position: relative; padding: 6rem 5vw; min-height: 100vh; overflow: visible; display: flex; align-items: center; justify-content: center;">
    
    <!-- Flat-edge Solarpunk Leaves peeking from the left and right viewport edges -->
    <img src="/images/nature-bar-1.png" style="position: absolute; left: 0; top: 10vh; width: 20vw; max-width: 280px; z-index: 1; pointer-events: none; filter: brightness(0.9) contrast(1.05);" alt="" />
    <img src="/images/bg-leaf-1.png" style="position: absolute; right: 0; top: -5vh; width: 24vw; max-width: 350px; z-index: 1; pointer-events: none; filter: brightness(0.85) contrast(1.15);" alt="" />

    <div class="top-grid-container" style="display: grid; grid-template-columns: 1.2fr 1fr; align-items: center; width: 100%; max-width: 1300px; gap: 4rem; z-index: 5;">
      
      <div class="intro-text" style="display: flex; flex-direction: column; align-items: flex-start; text-align: left;">
        <!-- Canvas container for reverse diffusion text -->
        <div style="width: 100%; min-height: 120px; position: relative;">
          <canvas id="canvas-diffusion" style="width: 100%; height: auto; display: block; filter: drop-shadow(0 0 8px rgba(255,255,255,0.15));"></canvas>
        </div>
        
        <h3 class="font-light" style="font-size: clamp(1.8rem, 3.5vw, 2.8rem); line-height: 1.2; margin-top: 1.5rem; margin-bottom: 2rem; letter-spacing: -0.02em;">
          Computation under <span class="font-heavy" style="font-style: italic;">extreme</span> constraints
        </h3>
        
        <p class="font-body" style="font-size: 0.95rem; color: #aaaaaa; max-width: 500px; line-height: 1.8; margin-bottom: 1.5rem; z-index: 2;">
          
        
        Developing advanced computer vision models to run flawlessly on extreme edge hardwares like standard CPUs does demand extreme optimization. FaceFlux, a highly optimized CPU-only face-swapping architecture, secured a National Top 10 Rank at SCNTSE 2025. By building neural network libraries from scratch in pure Java, I eliminate framework dependencies to master foundational machine learning logic.
        
        </p>
      </div>

      <div class="paper-visual" style="display: flex; justify-content: center; align-items: center; perspective: 1000px; width: 100%; position: relative; z-index: 5;">
        <!-- Styled floating award/project showcase image -->
        <div class="academic-paper-image" style="position: relative; z-index: 5;">
          <img src="/images/scntse-1.jpg" alt="FaceFlux SCNTSE Award" style="width: 100%; height: auto; display: block; filter: contrast(1.05);" />
        </div>
      </div>

    </div>
  </section>
`;
