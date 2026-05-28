export const limitSection = `
  <section id="limit" class="viewport-section" style="position: relative; padding: 6rem 5vw; min-height: 100vh; overflow: visible; display: flex; flex-direction: column; align-items: center; justify-content: center; background: #000000;">
    
    <!-- Mint leaf peeking from the left edge of this section -->
    <img src="/images/mint.png" style="position: absolute; left: -12vw; top: 90%; width: 28vw; max-width: 380px; z-index: 1; transform: rotate(90deg) scaleX(-1); opacity: 0.9; pointer-events: none; filter: hue-rotate(-10deg) brightness(0.85);" alt="" />

    <!-- Container for dynamic outlined LIMIT text & subtitle -->
    <div class="limit-canvas-container" style="width: calc(100% + 10vw); margin-left: -5vw; margin-right: -5vw; overflow: hidden; position: relative; display: flex; flex-direction: column; align-items: center; margin-bottom: 4rem; z-index: 5;">
      <div style="width: 100%; position: relative;">
        <canvas id="canvas-limit" style="width: 100%; height: auto; display: block; filter: drop-shadow(0 0 12px rgba(0, 255, 200, 0.1));"></canvas>
      </div>
      
      <!-- Subtitle styled in Agrandir Grand Light font -->
      <div class="font-light" style="font-size: clamp(1.2rem, 2.4vw, 2rem); color: #888888; font-family: var(--font-light); letter-spacing: 0.15em; margin-top: 1.2rem; text-align: center; font-weight: 300; text-transform: lowercase;">
        of efficiency beyond T<sub style="font-size: 0.6em; vertical-align: sub;">2</sub> and T<sub style="font-size: 0.6em; vertical-align: sub;">1</sub>
      </div>
    </div>

    <!-- Content Row -->
    <div class="top-grid-container" style="display: grid; grid-template-columns: 1fr 1.2fr; align-items: center; width: 100%; max-width: 1300px; gap: 4rem; z-index: 5;">
      
      <!-- Left Column: Hackathon context -->
      <div class="intro-text" style="display: flex; flex-direction: column; align-items: flex-start; text-align: left; padding-left: 2rem;">
        <p class="font-body" style="font-size: 1.05rem; color: #aaaaaa; max-width: 480px; line-height: 1.8; margin-bottom: 2rem;">
          
        
        
       Theoretical mathematics means nothing without implementation. Securing 1st Runner Up and cash prizes at PHYCATHON-2026 proved that my algorithmic research is deployable. I translated the <span style="font-family: 'Times New Roman', Times, serif; font-style: italic; font-weight: bold; color: #ffffff;">O(N)</span> linear time complexity of the ARGUS model into a fully functional, real-time particle tracking architecture, proving that the theoretical limits of computational physics can be engineered into working software.
        
        
          </p>
      </div>

      <!-- Right Column: Award Ceremony Image -->
      <div class="paper-visual" style="display: flex; justify-content: center; align-items: center; perspective: 1000px; width: 100%;">
        <div class="academic-paper-image" style="position: relative; z-index: 5;">
          <img src="/images/phycathon-1.jpg" alt="Phycathon-26 Award Ceremony" style="width: 100%; height: auto; display: block;" />
        </div>
      </div>

    </div>

    <!-- Decorative divider line mirroring the layout of the screenshot -->
    <div style="width: 50%; height: 2px; background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent); margin-top: 6rem; z-index: 1;"></div>

  </section>
`;
