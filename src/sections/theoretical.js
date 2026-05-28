export const theoreticalSection = `
  <section id="theoretical" class="viewport-section" style="position: relative; padding: 6rem 5vw; min-height: 100vh; overflow: visible; display: flex; align-items: center; justify-content: center;">
    
    <!-- White Lily Sidebar peeking from the right viewport edge -->
    <img src="/images/bg-leaf-2.png" style="position: absolute; right: 0; top: 19vh; width: 22vw; max-width: 320px; z-index: 1; pointer-events: none; filter: brightness(0.95) contrast(1.05);" alt="" />
    
    <!-- Mint leaf peeking from the bottom-left corner of this section -->
    <img src="/images/mint.png" style="position: absolute; left: -8vw; bottom: -8vh; width: 32vw; max-width: 420px; z-index: 1; transform: rotate(45deg); opacity: 0.25; pointer-events: none; filter: hue-rotate(15deg) brightness(0.9);" alt="" />

    <div class="top-grid-container" style="display: grid; grid-template-columns: 1.2fr 1fr; align-items: center; width: 100%; max-width: 1300px; gap: 4rem; z-index: 5;">
      
      <div class="intro-text" style="display: flex; flex-direction: column; align-items: flex-start; text-align: left;">
        <!-- Canvas container for warping/wobbling theoretical text -->
        <div style="width: 100%; min-height: 120px; position: relative;">
          <canvas id="canvas-theoretical" style="width: 100%; height: auto; display: block; filter: drop-shadow(0 0 8px rgba(255,255,255,0.15));"></canvas>
        </div>
        
        <!-- HUD PID values display -->
        <div id="hud-pid" class="font-body" style="font-size: 0.85rem; color: #888888; font-family: monospace; letter-spacing: 0.1em; margin-top: 0.5rem; margin-bottom: 1.5rem; width: 100%;">
          P = 0.034 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; I = 0.014 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; D = -1.034
        </div>
        
        <!-- Script/calligraphy sub-heading -->
        <h3 class="font-display" style="font-size: clamp(2rem, 4.5vw, 3.8rem); line-height: 1.1; margin-bottom: 2rem; color: #a8e6cf; letter-spacing: -0.01em; font-weight: normal;">
          boundaries of Information Theory and Entropy
        </h3>
        


        <p class="font-body" style="font-size: 0.95rem; color: #aaaaaa; max-width: 500px; line-height: 1.8; margin-bottom: 1.5rem; z-index: 2;">
          

Quantization is a fight against entropy. My research in <i>"Native Binarization"</i> prevents model collapse in 1-bit diffusion networks, preserving structural dominance at extreme compression. With this architecture accepted for upcoming publication (Spectrum 2026), my work navigates the absolute boundaries of information retention, proving that generative capabilities can survive and scale under extreme algorithmic stripping.



        </p>
      
      
      
      
        </div>

      <div class="paper-visual" style="display: flex; justify-content: center; align-items: center; perspective: 1000px; width: 100%; position: relative; z-index: 5;">
        <!-- nature-bar-1 slightly at top right of the paper behind (z-index: 1) -->
        <img src="/images/nature-bar-1.png" style="position: absolute; right: -8%; top: -3%; width: 50%; z-index: 1; pointer-events: none;" alt="" />
        
        <!-- nature-bar-2 at bottom left infront of paper (z-index: 10) -->
        <img src="/images/nature-bar-2.png" style="position: absolute; left: -10%; bottom: -6%; width: 55%; z-index: 10; pointer-events: none;" alt="" />

        <!-- Styled floating 1-bit diffusion paper thumbnail -->
        <div class="academic-paper-image" style="position: relative; z-index: 5;">
          <img src="/images/1bitdiffusion_paper_thumb.png" alt="1-Bit Diffusion Paper" style="width: 100%; height: auto; display: block;" />
        </div>
      </div>

    </div>
  </section>
`;
