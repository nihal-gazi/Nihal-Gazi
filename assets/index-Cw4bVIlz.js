(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=new class{constructor(){this.callbacks=[],this.lastTime=performance.now(),this.isRunning=!1,this.maxDelta=50}add(e){this.callbacks.push(e)}start(){this.isRunning||(this.isRunning=!0,this.lastTime=performance.now(),requestAnimationFrame(e=>this.tick(e)))}stop(){this.isRunning=!1}clear(){this.callbacks=[]}tick(e){if(!this.isRunning)return;let t=e-this.lastTime;t>this.maxDelta&&(t=this.maxDelta),this.lastTime=e;for(let n of this.callbacks)n(t,e);requestAnimationFrame(e=>this.tick(e))}},t=`
  <section id="top" class="viewport-section" style="position: relative; min-height: 100vh; overflow: visible; padding: 6rem 5vw 0 5vw; box-sizing: border-box; margin-bottom: 12vh;">
    
    <img class="aloe-bg" src="/images/aloe.png" style="position: absolute; right: 0vw; top: 10vh; height: 80vh; max-width: 25vw; object-fit: contain; z-index: 0; pointer-events: none;" alt="" />
 
    <div class="top-grid-container" style="display: grid; position: relative; z-index: 5; grid-template-columns: 1fr 1fr; align-items: center; width: 100%; height: 100%; gap: 2rem;">
      
      <div class="intro-text" style="z-index: 10; padding-top: 2rem;">
        <div style="display: flex; align-items: baseline; gap: 1rem; margin-bottom: 2rem; flex-wrap: wrap;">
          <span class="font-display" style="font-size: clamp(1.5rem, 3vw, 2.5rem);">Hi I am</span>
          <h1 class="font-display" style="font-size: clamp(3rem, 8vw, 6.5rem); line-height: 1; margin: 0;">Nihal Gazi</h1>
        </div>
        
        <p class="font-body" style="font-size: 0.95rem; color: #aaaaaa; max-width: 400px; line-height: 1.7;">
          An AI Researcher, Developer and Founder of KindSynapse based in India. I engineer CPU-efficient neural architectures, 1-bit weight quantization models, and novel machine learning solutions. My work stretches <b>beyond automation, towards theoretical limit excellence </b>, stripping away computational bloat to build artificial intelligence that operates elegantly under absolute physical constraints.
        </p>

        <div class="social-links">
          ${[{platform:`Hugging Face`,href:`https://huggingface.co/NihalGazi`,class:`social-icon hf-icon`,isSvg:!0,viewBox:`0 0 24 24`,path:`M12.025 1.13c-5.77 0-10.449 4.647-10.449 10.378 0 1.112.178 2.181.503 3.185.064-.222.203-.444.416-.577a.96.96 0 0 1 .524-.15c.293 0 .584.124.84.284.278.173.48.408.71.694.226.282.458.611.684.951v-.014c.017-.324.106-.622.264-.874s.403-.487.762-.543c.3-.047.596.06.787.203s.31.313.4.467c.15.257.212.468.233.542.01.026.653 1.552 1.657 2.54.616.605 1.01 1.223 1.082 1.912.055.537-.096 1.059-.38 1.572.637.121 1.294.187 1.967.187.657 0 1.298-.063 1.921-.178-.287-.517-.44-1.041-.384-1.581.07-.69.465-1.307 1.081-1.913 1.004-.987 1.647-2.513 1.657-2.539.021-.074.083-.285.233-.542.09-.154.208-.323.4-.467a1.08 1.08 0 0 1 .787-.203c.359.056.604.29.762.543s.247.55.265.874v.015c.225-.34.457-.67.683-.952.23-.286.432-.52.71-.694.257-.16.547-.284.84-.285a.97.97 0 0 1 .524.151c.228.143.373.388.43.625l.006.04a10.3 10.3 0 0 0 .534-3.273c0-5.731-4.678-10.378-10.449-10.378M8.327 6.583a1.5 1.5 0 0 1 .713.174 1.487 1.487 0 0 1 .617 2.013c-.183.343-.762-.214-1.102-.094-.38.134-.532.914-.917.71a1.487 1.487 0 0 1 .69-2.803m7.486 0a1.487 1.487 0 0 1 .689 2.803c-.385.204-.536-.576-.916-.71-.34-.12-.92.437-1.103.094a1.487 1.487 0 0 1 .617-2.013 1.5 1.5 0 0 1 .713-.174m-10.68 1.55a.96.96 0 1 1 0 1.921.96.96 0 0 1 0-1.92m13.838 0a.96.96 0 1 1 0 1.92.96.96 0 0 1 0-1.92M8.489 11.458c.588.01 1.965 1.157 3.572 1.164 1.607-.007 2.984-1.155 3.572-1.164.196-.003.305.12.305.454 0 .886-.424 2.328-1.563 3.202-.22-.756-1.396-1.366-1.63-1.32q-.011.001-.02.006l-.044.026-.01.008-.03.024q-.018.017-.035.036l-.032.04a1 1 0 0 0-.058.09l-.014.025q-.049.088-.11.19a1 1 0 0 1-.083.116 1.2 1.2 0 0 1-.173.18q-.035.029-.075.058a1.3 1.3 0 0 1-.251-.243 1 1 0 0 1-.076-.107c-.124-.193-.177-.363-.337-.444-.034-.016-.104-.008-.2.022q-.094.03-.216.087-.06.028-.125.063l-.13.074q-.067.04-.136.086a3 3 0 0 0-.135.096 3 3 0 0 0-.26.219 2 2 0 0 0-.12.121 2 2 0 0 0-.106.128l-.002.002a2 2 0 0 0-.09.132l-.001.001a1.2 1.2 0 0 0-.105.212q-.013.036-.024.073c-1.139-.875-1.563-2.317-1.563-3.203 0-.334.109-.457.305-.454m.836 10.354c.824-1.19.766-2.082-.365-3.194-1.13-1.112-1.789-2.738-1.789-2.738s-.246-.945-.806-.858-.97 1.499.202 2.362c1.173.864-.233 1.45-.685.64-.45-.812-1.683-2.896-2.322-3.295s-1.089-.175-.938.647 2.822 2.813 2.562 3.244-1.176-.506-1.176-.506-2.866-2.567-3.49-1.898.473 1.23 2.037 2.16c1.564.932 1.686 1.178 1.464 1.53s-3.675-2.511-4-1.297c-.323 1.214 3.524 1.567 3.287 2.405-.238.839-2.71-1.587-3.216-.642-.506.946 3.49 2.056 3.522 2.064 1.29.33 4.568 1.028 5.713-.624m5.349 0c-.824-1.19-.766-2.082.365-3.194 1.13-1.112 1.789-2.738 1.789-2.738s.246-.945.806-.858.97 1.499-.202 2.362c-1.173.864.233 1.45.685.64.451-.812 1.683-2.896 2.322-3.295s1.089-.175.938.647-2.822 2.813-2.562 3.244 1.176-.506 1.176-.506 2.866-2.567 3.49-1.898-.473 1.23-2.037 2.16c-1.564.932-1.686 1.178-1.464 1.53s3.675-2.511 4-1.297c.323 1.214-3.524 1.567-3.287 2.405.238.839 2.71-1.587 3.216-.642.506.946-3.49 2.056-3.522 2.064-1.29.33-4.568 1.028-5.713-.624`},{platform:`X (Twitter)`,href:`https://x.com/NihalGazi_`,class:`social-icon`,isSvg:!0,viewBox:`0 0 24 24`,path:`M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z`},{platform:`Instagram`,href:`https://www.instagram.com/nihal_gazi_io/`,class:`social-icon`,isSvg:!0,viewBox:`0 0 24 24`,path:`M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z`},{platform:`LinkedIn`,href:`https://www.linkedin.com/in/nihal-gazi/`,class:`social-icon`,isSvg:!0,viewBox:`0 0 24 24`,path:`M22.23 0H1.77C.8 0 0 .77 0 1.72v20.56C0 23.23.8 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.2 0 22.23 0zM7.12 20.45H3.56V9h3.56v11.45zM5.34 7.43c-1.14 0-2.06-.92-2.06-2.06 0-1.14.92-2.06 2.06-2.06 1.14 0 2.06.92 2.06 2.06 0 1.14-.92 2.06-2.06 2.06zm15.11 13.02h-3.56v-5.6c0-1.34-.03-3.05-1.86-3.05-1.86 0-2.14 1.45-2.14 2.95v5.7H9.33V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29z`},{platform:`Email`,href:`mailto:info@nihalgazi.com`,class:`social-icon`,isSvg:!1,text:`info@nihalgazi.com`}].map(e=>e.isSvg?`
      <a href="${e.href}" target="_blank" rel="noopener noreferrer" class="${e.class}">
        <svg viewBox="${e.viewBox}">
          <title>${e.platform}</title>
          <path d="${e.path}"/>
        </svg>
      </a>
    `:`
      <a href="${e.href}" class="${e.class}" style="font-family: var(--font-body, sans-serif); font-size: 0.9rem; text-decoration: none; font-weight: 500; display: inline-flex; align-items: center; height: 24px; margin-left: 0.2rem;">
        ${e.text}
      </a>
    `).join(``)}
        </div>
      </div>
 
      <div class="hero-visuals" style="position: relative; height: 65vh; display: flex; justify-content: center; align-items: center; overflow: visible;">
        
        <div class="portrait-wrapper" style="position: relative; width: 80%; display: flex; justify-content: center; align-items: center; overflow: visible;">
          <!-- Forest background is set to 110% height of this wrapper (which matches the portrait's height), shifting it by -5% top to peek 5% on top and bottom -->
          <img src="/images/bg-forest.jpg" alt="" style="position: absolute; width: 87.5%; height: 110%; top: -5%; object-fit: cover; z-index: 1; filter: brightness(0.6);" />
          
          <img src="/images/portrait.jpg" alt="Nihal Gazi" style="position: relative; width: 100%; height: auto; display: block; z-index: 2; filter: grayscale(100%);" />
          
          <!-- Leaf is slightly smaller, lifted slightly upward, and peeks into the transition gap -->
          <img src="/images/mint.png" alt="" style="position: absolute; left: -10%; bottom: -22%; width: 40%; object-fit: contain; z-index: 20;" />
        </div>
        
      </div>
    </div>
  </section>
`,n=`
  <section id="beyond" class="viewport-section" style="display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh; padding: 10vh 5vw; position: relative; overflow: hidden;">
    
    <h2 class="font-heavy" style="font-size: 11vw; color: #1a1a1a; white-space: nowrap; letter-spacing: -0.05em; margin: 0; line-height: 0.8; user-select: none;">
      BBBBBBEYONDDDDD
    </h2>
    
    <div style="position: relative; z-index: 10; width: 100%; max-width: 1200px; margin-top: -4vw;">
      
      <h3 class="font-heavy" style="font-size: clamp(2.5rem, 6vw, 4.5rem); margin-bottom: clamp(2rem, 5vw, 4rem); letter-spacing: -0.02em;">
        What the Frontiers are making
      </h3>
      
      <div class="beyond-flex-container" style="display: flex; flex-wrap: wrap; gap: 4rem; justify-content: space-between; align-items: flex-start;">
        
        <div class="font-body" style="flex: 1 1 400px; font-size: 1rem; color: #cccccc; line-height: 1.7;">
          <p style="margin-bottom: 1.5rem;">
          
          
          
          
          </p>
          
          <p>
          
          Global AI development is an active struggle against algorithmic ceilings and not just about parameter scaling. Ranked #21 globally on the Hugging Face TCTF Leaderboard for individual open-source contributions (Dec 2025), I actively push the frontiers of edge computing, model compression, and accessible artificial intelligence.
          </p>
        
        
        
          </div>

        <!-- Unified Academic Paper Image Holder for Hugging Face Proof -->
        <div class="academic-paper-image" style="flex: 1 1 450px; position: relative;">
          <img src="/images/matt-hf.png" alt="Added to HF Top Contributors" style="width: 100%; height: auto; display: block;" />
        </div>
        
      </div>
    </div>
  </section>
`,r=`
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
`,i=`
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
`,a=`
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
`,o=`
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
`,s=`
  <section id="excellence" class="viewport-section" style="position: relative; padding: 8rem 5vw; min-height: 100vh; overflow: hidden; display: flex; flex-direction: column; align-items: center; justify-content: center; background: #000000; text-align: center;">
    
    <!-- Mint leaf peeking from the top-right corner of this final section -->
    <img src="/images/mint.png" style="position: absolute; right: -10vw; top: 0vh; width: 28vw; max-width: 360px; z-index: 1; transform: rotate(200deg); opacity: 0.95; pointer-events: none; filter: hue-rotate(5deg) brightness(0.85);" alt="" />

    <!-- Stark Centered Visual Copy -->
    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; width: 100%; max-width: 1000px; z-index: 5; margin-bottom: 4rem;">
      
      <!-- Big Outlined/Sleek Title EXCELLENCE -->
      <h2 class="font-light" style="font-size: clamp(3.5rem, 8vw, 6.5rem); color: #444444; font-family: var(--font-light); letter-spacing: 0.18em; line-height: 1; text-transform: uppercase; margin-bottom: 0.4rem; font-weight: 300; user-select: none;">
        EXCELLENCE
      </h2>
      
      <!-- Subtitle -->
      <h3 class="font-light" style="font-size: clamp(1.2rem, 2.8vw, 2.2rem); color: #888888; font-family: var(--font-light); letter-spacing: 0.12em; text-transform: lowercase; margin-bottom: 2.5rem; font-weight: 300; margin-top: 0; user-select: none;">
        or nothing else.
      </h3>
      
      <!-- Vision statement -->
      <p class="font-body" style="font-size: 0.9rem; color: #ffffff; font-family: var(--font-body); letter-spacing: 0.05em; max-width: 600px; line-height: 1.8; opacity: 0.85;">
       
      
      
      I do not view excellence as a rare achievement; it is simply the quiet, uncompromising baseline required to turn theoretical limits into physical reality.
      
      
        </p>

    </div>

    <!-- Solid horizontal white divider line touching the bottom part of the section layout -->
    <div style="width: 50%; height: 2px; background: #ffffff; z-index: 5;"></div>

  </section>
`,c={dob:`2006-11-09`,name:`Nihal Gazi`,subtitle:`AI Developer, Researcher & VFX Creator`,location:`Kolkata, India`,summary:`I am a 19-year-old AI researcher with a strong focus on data science, mathematics, and efficient artificial intelligence. My work centers on 1-bit weight quantization, sparse neural architectures, and building high-performance models that run effectively with limited resources. I am the founder of KindSynapse, an open-source AI research collective. I am currently pursuing a B.Tech in Computer Science and Engineering (AI & ML) at the Institute of Engineering and Management (IEM), Kolkata (Class of 2029).`,journey:`My passion for technology started early. From a young age, I explored coding, visual effects, and 3D modeling while maintaining strong academic performance. In high school, I scored 93.6% in Class 10 and 94.25% in Class 12. At 15, I began developing my own AI tools. At 17, I created Azinet, a complete neural network library written from scratch in Java with no external dependencies [PROOF_LINK:https://github.com/nihal-gazi/Azinet-Simple-Java-Neural-Network-library-for-beginners:GitHub ↗]. These early projects helped me build a deep understanding of mathematics and algorithms behind machine learning.`,achievementsHeader:`Education & Key Achievements`,achievementsSub:`Since joining IEM in July 2025, I have focused on turning ideas into impactful work:`,achievementsList:[`SCNTSE 2025 National Talent Search: Ranked in National Top 10 with my CPU-only FaceFlux architecture and received a ₹1 Lakh grant [PROOF_LINK:https://www.youtube.com/watch?v=qo0qlc-pUe0:Award News ↗].`,`Hugging Face Contributions: My Text-to-Speech Space reached 300K+ visits and was featured as Space of the Week [PROOF_LINK:https://huggingface.co/spaces/NihalGazi/Text-To-Speech-Unlimited:HF Space ↗]. My FLUX Pro Unlimited Space has surpassed 536K+ visits [PROOF_LINK:https://huggingface.co/spaces/NihalGazi/FLUX-Unlimited:HF Space ↗].`,`Ranked #21 globally on the Hugging Face TCTF Leaderboard (November 2025) [PROOF_LINK:https://tctf-tctf.static.hf.space/spaces.html:Leaderboard ↗].`,`GSoC Mentor for Pollinations.ai. [PROOF_LINK:https://gsoc.pollinations.ai/mentors:PollinationsAI↗]`,`Achieved a 9.40 SGPA in my first semester.`],achievementsHeader2026:`In 2026, my research progressed significantly:`,achievementsList2026:[`Awarded Gold Medal at IEMPHYS-26 International Conference for the ARGUS Project (O(N) sparse vision transformer for track reconstruction).`,`1st Runner Up at Phycathon-26 [PROOF_LINK_DISABLED:Phycathon ↗].`,`Top 10 Best Poster at Spectrum 2026 for Native Binarization in 1-bit diffusion networks.`],foundingClosing:`In April 2026, I founded KindSynapse to foster open collaboration in efficient AI and data science.`,focusHeader:`Current Focus`,focusText:`I work at the intersection of data science, mathematics, and machine learning optimization. My primary interests include low-bit quantization, efficient neural network design, and exploring the theoretical limits of AI models. Through KindSynapse, I aim to contribute to open-source tools that make advanced AI more accessible and computationally efficient.`,factsHeader:`Quick Facts`,quickFacts:[{label:`Location`,value:`Kolkata, India`},{label:`Education`,value:`B.Tech CSE (AI & ML), IEM Kolkata (2025–2029)`},{label:`Core Interests`,value:`Novel AI Algorithms, Edge Computation, Data Science, Mathematical Optimization, 1-bit Quantization, Sparse Neural Architectures`}],evidenceLedger:[{label:`Hugging Face TCTF Leaderboard ↗`,url:`https://tctf-tctf.static.hf.space/spaces.html`},{label:`SCNTSE 2025 Press Release ↗`,url:`https://huggingface.co/spaces/NihalGazi/FaceFlux-Face-Swapper`},{label:`IEMPHYS-26 Proceedings ↗`,url:`#`,disabled:!0},{label:`Spectrum 2026 Proceedings ↗`,url:`#`,disabled:!0},{label:`GitHub: azinet Core ↗`,url:`https://github.com/nihal-gazi/Azinet-Simple-Java-Neural-Network-library-for-beginners`},{label:`GitHub: ARGUS Transformer ↗`,url:`#`,disabled:!0}]};function l(e){let t=e.replace(/\[PROOF_LINK:([^\]]+?):([^:]+)\]/g,(e,t,n)=>`<a href="${t}" target="_blank" rel="noopener noreferrer" class="inline-proof-link">${n}</a>`);return t=t.replace(/\[PROOF_LINK_DISABLED:([^\]]+)\]/g,(e,t)=>`<a href="#" class="inline-proof-link disabled" onclick="return false;">${t}</a>`),t}var u=c.achievementsList.map(e=>`
  <li class="font-body">${l(e)}</li>
`).join(``),d=c.achievementsList2026.map(e=>`
  <li class="font-body">${l(e)}</li>
`).join(``),f=c.quickFacts.map(e=>`
  <tr>
    <td class="font-subsub">${e.label}:</td>
    <td class="font-light">${e.value}</td>
  </tr>
`).join(``),p=c.evidenceLedger.map(e=>`
  <a href="${e.url}" ${e.disabled?`class="ledger-btn disabled font-subsub" onclick="return false;"`:`target="_blank" rel="noopener noreferrer" class="ledger-btn font-subsub"`}>
    ${e.label}
  </a>
`).join(``),m=`
  <section class="dataroom-layout animate-fade-in">
    <div class="dataroom-header">
      <div class="dossier-tag font-subsub">ABOUT ME</div>
      <h1 class="dataroom-title font-heavy">${c.name}</h1>
      <p class="font-light" style="font-size: 1.15rem; color: #a8e6cf; margin-top: 0.5rem; letter-spacing: 0.05em;">
        ${c.subtitle} &nbsp;|&nbsp; <span style="color: #888888;">${c.location}</span>
      </p>
    </div>
    
    <div class="about-pivot-grid">
      
      <!-- Left Column: The Factual & Tightened Dossier -->
      <div class="about-text-column">
        
        <!-- Factual Summary Block -->
        <div class="factual-summary-card glass-panel">
          <p class="summary-text font-light">
            I am a <span id="dynamic-age" class="highlight-val">--</span>-year-old AI researcher with a strong focus on data science, mathematics, and efficient artificial intelligence. My work centers on 1-bit weight quantization, sparse neural architectures, and building high-performance models that run effectively with limited resources. I am the founder of KindSynapse, an open-source AI research collective. I am currently pursuing a B.Tech in Computer Science and Engineering (AI & ML) at the Institute of Engineering and Management (IEM), Kolkata (Class of 2029).
          </p>
        </div>
        
        <!-- The Journey Prose Section -->
        <div class="narrative-journal glass-panel">
          <div class="narrative-phase-block">
            <h3 class="phase-hdr font-heavy" style="margin-bottom: 1rem;">My Journey</h3>
            <p class="narrative-p font-body">
              ${l(c.journey)}
            </p>
          </div>
        </div>

        <!-- Education & Key Achievements Dossier -->
        <div class="narrative-journal glass-panel" style="gap: 1.5rem;">
          <h3 class="phase-hdr font-heavy" style="margin-bottom: 0.5rem;">${c.achievementsHeader}</h3>
          <p class="narrative-p font-body" style="color: #888888; margin-bottom: 0.5rem;">
            ${c.achievementsSub}
          </p>
          <div class="duality-split" style="gap: 0;">
            <ul style="margin-bottom: 1.5rem;">
              ${u}
            </ul>
          </div>
          <div class="duality-divider" style="margin-bottom: 1rem;"></div>
          <p class="narrative-p font-body" style="color: #888888; margin-bottom: 0.5rem;">
            ${c.achievementsHeader2026}
          </p>
          <div class="duality-split" style="gap: 0;">
            <ul style="margin-bottom: 1rem;">
              ${d}
            </ul>
          </div>
          <p class="narrative-p font-body" style="margin-top: 0.5rem;">
            ${c.foundingClosing}
          </p>
        </div>

        <!-- Current Focus Section -->
        <div class="narrative-journal glass-panel">
          <div class="narrative-phase-block">
            <h3 class="phase-hdr font-heavy" style="margin-bottom: 1rem;">${c.focusHeader}</h3>
            <p class="narrative-p font-body">
              ${c.focusText}
            </p>
          </div>
        </div>

        <!-- Quick Facts dossier -->
        <div class="dataroom-card glass-panel" style="margin-bottom: 0;">
          <div class="card-header" style="margin-bottom: 1rem;">
            <span class="card-tag font-subsub">// ${c.factsHeader.toUpperCase()} //</span>
          </div>
          <div class="card-body">
            <table class="dossier-table">
              ${f}
            </table>
          </div>
        </div>

        <!-- Outbound Evidence Ledger -->
        <div class="evidence-ledger-card glass-panel">
          <div class="ledger-header">
            <span class="card-tag font-subsub">// VERIFIABLE EVIDENCE LEDGER //</span>
          </div>
          <div class="ledger-grid">
            ${p}
          </div>
        </div>

      </div>
      
      <!-- Right Column: Clean Monochrome PortraitVisual Panel -->
      <div class="about-visual-column">
        <div class="layered-visual-node glass-panel">
          <div class="dossier-visual-meta font-subsub">SEC_CORE_VISUAL::LAYER_INDEX</div>
          
          <div class="layered-portrait-container">
            <!-- Layers of background and monochrome portrait (Floating botanical assets fully removed) -->
            <img src="/images/bg-forest.jpg" alt="" class="visual-layer layer-forest" />
            <img src="/images/portrait.jpg" alt="Nihal Gazi" class="visual-layer layer-portrait" style="width: 100%; height: 100%; object-fit: cover;" />
          </div>
          
          <div class="visual-footer font-subsub" style="justify-content: center;">
            <span>[PORTRAIT DOSSIER NODE]</span>
          </div>
        </div>
      </div>

    </div>
  </section>
`,h=[{id:`[01]`,category:`DEEP SPEECH / scaling`,title:`Text-To-Speech Unlimited`,pitch:`A highly realistic and CPU-efficient TTS model, reverse-engineered and scaled single-handedly. Hit 300K+ total visits and won "Space of the Week" on Hugging Face.`,constraints:[`300K+ Total Visits`,`10K+ Weekly Scale`],url:`https://huggingface.co/spaces/NihalGazi/Text-To-Speech-Unlimited`},{id:`[02]`,category:`NEURAL INFERENCE / EDGE`,title:`FaceFlux Face Swapper`,pitch:`High-performance, CPU-only face-swapping architecture engineered for low-latency inference on general CPU edge devices.`,constraints:[`CPU-Only Execution`,`Zero GPU Latency Reliance`],url:`https://huggingface.co/spaces/NihalGazi/FaceFlux-Face-Swapper`},{id:`[03]`,category:`MEDIA / DISSEMINATION`,title:`dotTV Broadcast Interview`,pitch:`A comprehensive broadcast feature detailing my open-source AI architectures, SCNTSE national recognition, and software engineering ideology.`,constraints:[`National Broadcast Feature`,`AI Education`],url:`https://www.youtube.com/watch?v=qo0qlc-pUe0`},{id:`[04]`,category:`ALGEBRA / COMPILER THEORY`,title:`Azinet Neural Network Library`,pitch:`A complete, custom neural network library built entirely from scratch in pure Java during high school. Implements backpropagation and matrix kernels without external frameworks.`,constraints:[`Pure Java JDK 8`,`Zero External Libraries`],url:`https://github.com/nihal-gazi/Azinet-Simple-Java-Neural-Network-library-for-beginners`},{id:`[05]`,category:`PHYSICS / COMPUTER VISION`,title:`ARGUS (Research Project)`,pitch:`Hierarchical Sparse Vision Transformers designed for real-time particle track reconstruction in high-energy physics. Secured the Gold Medal at IEMPHYS-26.`,constraints:[`O(N) Linear Time Complexity`,`Theoretical Sparse Attention`],url:`#`,disabled:!0},{id:`[06]`,category:`GENERATIVE AI / DEVREL`,title:`FLUX Pro Unlimited`,pitch:`Highly realistic, unconstrained image synthesis pipeline on Hugging Face, achieving massive visual scale and securing nearly 1K likes.`,constraints:[`~1K HF Likes`,`High Concurrency Tuning`],url:`https://huggingface.co/spaces/NihalGazi/FLUX-Unlimited`},{id:`[07]`,category:`MATHS / IMAGE PROCESSING`,title:`Fast Color Transfer Algorithm`,pitch:`A novel and extremely fast mathematical non-neural algorithm for transferring color profiles between target images without using neural layers.`,constraints:[`Pure Non-Neural Math`,`0ms Latency Bounds`],url:`https://nihalgazi.com/fast%20color%20transfer.html`},{id:`[08]`,category:`CURVES / SPATIAL SYNTHESIS`,title:`Fast Non-Neural Handwriting Generator`,pitch:`A novel handwriting generation algorithm built without neural nets (Zero GAN). Recreates cursive writing profiles through basic curve fitting and clever coordinate manipulation.`,constraints:[`Zero GAN reliance`,`Mathematical Curve Fitting`],url:`#`,disabled:!0}];function g(e,t){return t?e===`#`?`Technical Blueprint`:`Academic Dossier`:e.includes(`huggingface.co/spaces`)?`Access HF Space`:e.includes(`youtube.com`)?`Watch Interview`:e.includes(`github.com`)?`Access Repository`:e.includes(`nihalgazi.com`)?`Access Page`:`Access Project`}var _=`
  <section class="dataroom-layout animate-fade-in">
    <div class="dataroom-header">
      <div class="dossier-tag font-subsub">METRIC_LOG::PROJECT_LEDGER</div>
      <h1 class="dataroom-title font-heavy">The Data Grid</h1>
    </div>
    
    <div class="projects-ledger">
      ${h.map(e=>`
  <!-- Project Item ${e.id} -->
  <div class="project-row glass-panel">
    <div class="project-meta">
      <span class="project-id font-subsub">${e.id}</span>
      <span class="project-category font-subsub">${e.category}</span>
    </div>
    <div class="project-main">
      <h3 class="project-title font-heavy">${e.title}</h3>
      <p class="project-pitch font-body">${e.pitch}</p>
      <div class="constraint-badge-row">
        <span class="constraint-label font-subsub">CONSTRAINTS:</span>
        ${e.constraints.map(e=>`
          <span class="constraint-badge font-subsub">${e}</span>
        `).join(``)}
      </div>
    </div>
    <div class="project-actions">
      <a href="${e.url}" ${e.disabled?`class="btn-terminal disabled font-subsub" onclick="return false;"`:`target="_blank" rel="noopener noreferrer" class="btn-terminal font-subsub"`}>
        ${g(e.url,e.disabled)}
      </a>
    </div>
  </div>
`).join(``)}
    </div>
  </section>
`,v=`
  <section class="dataroom-layout animate-fade-in">
    <div class="dataroom-header">
      <div class="dossier-tag font-subsub">METRIC_LOG::HONORS_LEDGER</div>
      <h1 class="dataroom-title font-heavy">The Verification Room</h1>
    </div>
    
    <div class="honors-ledger">
      ${[{metric:`#21 GLOBAL`,title:`Hugging Face Leaderboard Standing`,date:`DEC_2025`,desc:`Ranked #21 globally for individual open-source contributions on the Hugging Face TCTF Leaderboard. Added by Hugging Face team members to the premium HF Top Contributors register.`,hash:`RECORD_HASH::HF-TCTF-2025-21`,proofs:[{src:`/images/matt-hf.png`,alt:`Hugging Face Leaderboard Verification`,caption:`CRYPTOGRAPHIC STANDING RECORD: @MattValoatto list addition`}]},{metric:`NAT_TOP_10`,title:`National SCNTSE Rank & ₹1 Lakh Prize`,date:`JUL_2025`,desc:`Secured National Top 10 Rank in the Dr. Satyajit Chakraborty National Talent Search (SCNTSE 2025) for FaceFlux CPU swapper. Awarded ₹1 Lakh on stage, covered by state newspapers. My father joined me on stage—one of my proudest milestones.`,hash:`RECORD_HASH::SCNTSE-NAT-10-₹1L`,proofs:[{src:`/images/scntse-1.jpg`,alt:`SCNTSE National Award Ceremony`,caption:`AWARD CEREMONY: stage verification with ₹1 Lakh reward`},{src:`/images/scntse-news-1.jpg`,alt:`SCNTSE News Coverage 01`,caption:`PRESS DOSSIER: regional news coverage clipping`},{src:`/images/scntse-news-2.jpg`,alt:`SCNTSE News Coverage 02`,caption:`PRESS DOSSIER: state award listing`}]},{metric:`GOLD MEDAL`,title:`Academic Research Excellence`,date:`FEB_2026`,desc:`Awarded the Gold Medal at the IEMPHYS-26 International Conference for the ARGUS project (Hierarchical Sparse Vision Transformer for $O(N)$ track reconstruction).`,hash:`RECORD_HASH::IEMPHYS26-GOLD-ARGUS`,proofs:[{src:`/images/iemphys.JPG`,alt:`IEMPHYS-26 Gold Medal Ceremony`,caption:`RESEARCH GOLD MEDAL: ceremony presentation & certificate signature`}]},{metric:`SILVER MEDAL`,title:`Applied Physical Computing`,date:`MAR_2026`,desc:`Awarded Silver Medal (1st Runner Up) at PHYCATHON-2026 for high-performance physics computation designs and logic circuit integrations.`,hash:`RECORD_HASH::PHYCATHON26-SILVER-LOGIC`,proofs:[{src:`/images/phycathon-1.jpg`,alt:`Phycathon 2026 Award Presentation`,caption:`TECHNICAL MEDAL RECORD: 1st Runner Up certificate & award presentation`}]},{metric:`TOP 10`,title:`Native Binarization Best Poster`,date:`APR_2026`,desc:`Research on "Native Binarization in 1-bit diffusion networks" accepted for the top 10 best poster presentation at the Spectrum 2026 symposium.`,hash:`RECORD_HASH::SPECTRUM26-POSTER-BINAR`,proofs:[{src:`/images/spectrum-1.jpg`,alt:`Spectrum 2026 Poster Presentation`,caption:`PRESENTATION RECORD: best poster exhibition panel`}]},{metric:`CHIEF_ENG`,title:`Professional Executive Appointment`,date:`APR_2026`,desc:`Appointed Chief Engineer at an AI psychological assessment startup, taking direct structural responsibility for scalable neural systems before finishing my freshman year.`,hash:`RECORD_HASH::APPOINT-CHIEF-ENG-AI`},{metric:`1ST RANK`,title:`All Bengal Tenshikan Karate Champion`,date:`ACTIVE`,desc:`State Karate Champion (1st Rank, Kata), demonstrating absolute physical and spatial discipline under extreme speed and force constraints.`,hash:`RECORD_HASH::KATA-STATE-CHAMP-01`}].map(e=>{let t=``;return e.proofs&&e.proofs.length>0&&(t=`
      <div class="proof-gallery ${e.proofs.length>1?`multiple-proofs`:``}">
        ${e.proofs.map(e=>`
          <figure class="proof-figure">
            <img src="${e.src}" alt="${e.alt}" class="proof-image" />
            <figcaption class="proof-caption font-subsub">${e.caption}</figcaption>
          </figure>
        `).join(``)}
      </div>
    `),`
    <!-- Honor Item: ${e.title} -->
    <div class="honor-row glass-panel">
      <div class="honor-metric font-subsub">${e.metric}</div>
      <div class="honor-details">
        <div class="honor-header-row">
          <h3 class="honor-title font-heavy">${e.title}</h3>
          <span class="honor-date font-subsub">${e.date}</span>
        </div>
        <p class="honor-desc font-body">${e.desc}</p>
        <div class="honor-hash font-mono">${e.hash}</div>
        ${t}
      </div>
    </div>
  `}).join(``)}
    </div>
  </section>
`,y={dialogue:[{delay:1e3,text:`Did you check what happens when you take the first word...`},{delay:3500,text:`...of every heading?`},{delay:7500,text:`Well, there is more...`}],hero:{title:`Nothing Here is Accidental.`,citation:`Attention is All You Need.`},intro:`There is a philosophy behind the design of the home page, which I can guarantee that you missed. You can say they are Easter eggs, and to catch them, attention is all you need.

Here is everything that you missed.`,sections:[{num:`1`,title:`The Double Entendre`,body:`The subheading above, *"Attention is All You Need,"* is the title of the landmark 2017 research paper that birthed modern Artificial Intelligence. But here, it serves a dual purpose. It is a subtle nod to the field I engineer in, and a very literal directive to you, the observer. To see the patterns, you have to pay attention.`},{num:`2`,title:`Hiding in Plain Sight`,body:`Let's look at the primary headers of the main page in their full form:

• **Beyond** what the frontiers are making.
• **Automation** that performs tasks at breakneck speeds.
• **Towards** computation under extreme constraints.
• **Theoretical** boundaries of Information Theory and Entropy.
• **Limit** of efficiency beyond T1 and T2.
• **Excellence** or nothing else.

If you isolate just the first word of every heading, they form a single, coherent manifesto: **"Beyond Automation, Towards Theoretical Limit Excellence."**

The beautiful part is that this wasn't a secret you had to dig for. It was hiding in plain sight the entire time. If you read the short introduction at the very top of the home page, you will find this exact sentence woven seamlessly into my biography. The map was handed to you before the journey even began.

But the rabbit hole goes one step deeper.`},{num:`3`,title:`The Acronym`,body:`Take those first words again. Read their first letters vertically:

**B**eyond
**A**utomation
**T**owards
**T**heoretical
**L**imit
**E**xcellence

It spells **BATTLE**. Every project I undertake, every algorithm I optimize, and every system I build is a battle against constraints. And what lies at the end of every BATTLE? The final letter, *E*, brings us to our ultimate conclusion: **Excellence**.`},{num:`4`,title:`Form Follows Function`,body:`The visual design of every single heading reflects its exact meaning:

• **Beyond:** The text literally stretches beyond the physical edges of your screen.
• **Towards:** It simulates a diffusion process, resolving from pure static noise *towards* a direction of perfect clarity.
• **Automation:** Driven by cellular automata, it is code autonomously computing its own growth.
• **Theoretical:** The PID variables constantly fluctuate underneath the text, simulating the manual, theoretical tuning required in research.
• **Limit:** The text stretches exactly from the left edge to the right edge, constrained by the screen. Inside, particles bounce frantically, completely *limited* by the borders of the letters.
• **Excellence:** Dead still. No animations, no movement. Because when I deliver a final product, I make sure it is sturdy, stable, and completely reliable.`},{num:`5`,title:`Beyond T1 and T2`,body:`In physics, $T_1$ and $T_2$ refer to thermodynamic efficiencies- the absolute physical limits of how much energy a system can perfectly convert. While I actively try to break theoretical limits in my software, I am not always successful. The laws of physics are unforgiving. But holding myself to this impossibly high benchmark is what motivates the relentless optimization behind everything I have built.`},{num:`6`,title:`The Interstellar Aesthetic`,body:`When Hans Zimmer composed the iconic score for *Interstellar*, Christopher Nolan didn't tell him it was a sci-fi space epic; he told Zimmer it was a story about the love between a father and a daughter. Zimmer wrote a deeply human, emotional piece of music. When that organic music was placed against the cold, infinite vacuum of space, it created a masterpiece.

I designed this website with the exact same philosophy. I initially built this architecture thinking about living beings and nature, and only later adapted it into a technical portfolio. That is why massive Aloe and Mint leaves intersect with rigid, high-entropy mathematical engines. It is the organic human element softening the coldness of computation.`}],footer:{text:`Sometimes, in life, we need to slow down, and just put a little `,linkText:`attention`,arxivUrl:`https://arxiv.org/abs/1706.03762`,postText:`. It's a good habit. And remember, every good habit, starts at `,homeText:`home`,homeUrl:`#home`,endText:`.`}},b=y.sections.map(e=>{let t=e.body.replace(/\*\*([^*]+)\*\*/g,`<strong>$1</strong>`).replace(/\*([^*]+)\*/g,`<em>$1</em>`).replace(/\$([A-Za-z]+)_\{?([0-9A-Za-z]+)\}?\$/g,`<span class="math-expr">$1<sub>$2</sub></span>`).replace(/\$([A-Za-z]+)\$/g,`<span class="math-expr">$1</span>`).replace(/\n/g,`<br>`);return`
    <h3 class="blog-section-hdr font-heavy">${e.num}. ${e.title}</h3>
    <p class="blog-section-body font-body">${t}</p>
  `}).join(``),x=y.intro.replace(/\n/g,`<br>`),S=`
  <style>
    .math-expr {
      font-family: "Times New Roman", Times, serif;
      font-size: 1.15em;
      font-style: italic;
      letter-spacing: 0.02em;
    }
    .math-expr sub {
      font-size: 0.75em;
      font-style: normal;
      position: relative;
      bottom: -0.25em;
      line-height: 0;
      vertical-align: baseline;
    }
  </style>
  <div class="secret-container" style="background-color: #000000; min-height: 100vh; color: #ffffff; position: relative;">
    
    <!-- Phase 1: Cinematic Void Layer -->
    <div id="secret-void-layer" class="secret-void-layer">
      <!-- Top-right subtle skip button -->
      <button id="skip-to-blog-btn" class="skip-to-blog-btn font-subsub">[Skip to Blog ↗]</button>

      <!-- Cinematic centering text frame -->
      <div class="cinematic-text-wrapper">
        <div id="cinematic-text-1" class="cinematic-text font-light">
          ${y.dialogue[0].text}
        </div>
        <div id="cinematic-text-2" class="cinematic-text font-light" style="margin-top: 1rem;">
          ${y.dialogue[1].text}
        </div>
        <div id="cinematic-text-3" class="cinematic-text font-light">
          ${y.dialogue[2].text}
        </div>
      </div>
    </div>

    <!-- Phase 2: Minimalist Editorial Blog Layer -->
    <div id="secret-blog-layer" class="secret-blog-layer">
      <div class="editorial-blog-wrapper">
        
        <!-- Hero Header -->
        <div class="blog-hero">
          <h1 class="blog-hero-title font-heavy">${y.hero.title}</h1>
          <p class="blog-hero-sub font-subsub">${y.hero.citation}</p>
        </div>

        <div class="editorial-divider"></div>

        <!-- Left Aligned Body Content -->
        <div class="blog-body">
          <p class="font-body">${x}</p>
          
          ${b}
        </div>

        <!-- Center Aligned Footer -->
        <div class="blog-footer">
          <p class="conclusion-text font-body">
            Sometimes, in life, we need to slow down, and just put a little <a href="${y.footer.arxivUrl}" target="_blank" rel="noopener noreferrer" class="hidden-attention-link">attention</a>. It's a good habit. And remember, every good habit, starts at <a href="https://nihalgazi.com" class="home-router-link">home</a>.
          </p>
        </div>
        
      </div>
    </div>
  </div>
`,C=[];function w(){C.forEach(e=>clearTimeout(e)),C=[]}function T(){w();let e=document.getElementById(`secret-void-layer`),t=document.getElementById(`secret-blog-layer`);e&&t&&(e.style.opacity=`0`,e.style.pointerEvents=`none`,setTimeout(()=>{e.style.display=`none`,t.style.display=`block`,setTimeout(()=>{t.style.opacity=`1`,document.body.style.overflow=``},50)},1500))}function E(){w();let e=document.getElementById(`secret-void-layer`),t=document.getElementById(`secret-blog-layer`),n=document.getElementById(`skip-to-blog-btn`),r=document.getElementById(`cinematic-text-1`),i=document.getElementById(`cinematic-text-2`),a=document.getElementById(`cinematic-text-3`);e&&(e.style.display=`flex`,e.style.opacity=`1`,e.style.pointerEvents=`auto`),t&&(t.style.display=`none`,t.style.opacity=`0`),n&&(n.style.opacity=`0.3`,n.onclick=e=>{e.preventDefault(),T()}),r&&r.classList.remove(`visible`),i&&i.classList.remove(`visible`),a&&a.classList.remove(`visible`),C.push(setTimeout(()=>{r&&r.classList.add(`visible`)},1e3)),C.push(setTimeout(()=>{i&&i.classList.add(`visible`)},3500)),C.push(setTimeout(()=>{r&&r.classList.remove(`visible`),i&&i.classList.remove(`visible`)},6e3)),C.push(setTimeout(()=>{a&&a.classList.add(`visible`)},7500)),C.push(setTimeout(()=>{a&&a.classList.remove(`visible`)},9500)),C.push(setTimeout(()=>{T()},10500))}var D=class{constructor(e){this.canvas=document.getElementById(e),this.ctx=this.canvas.getContext(`2d`,{alpha:!1}),this.cellSize=5,this.grid=[],this.textGrid=[],this.nearText=[],this.cols=0,this.rows=0,this.isVisible=!1,this.lastTick=0,this.tickRate=80,this.state=`stable`,this.stateTimer=0,this.nextChaosTime=Date.now()+6e3+Math.random()*4e3,this.maxAmbientSeeds=40,this.setupObserver(),this.lastWidth=window.innerWidth,this.resizeDebounce=null,this.resizeListener=()=>{clearTimeout(this.resizeDebounce),this.resizeDebounce=setTimeout(()=>{let e=window.innerWidth;Math.abs(e-this.lastWidth)>15&&(this.lastWidth=e,this.initGrid(),this.isVisible&&(this.state=`chaos`,this.stateTimer=22,this.resetToStable(),this.injectImmediateChaos()))},250)},window.addEventListener(`resize`,this.resizeListener),document.fonts?document.fonts.ready.then(()=>this.initGrid()):this.initGrid()}setupObserver(){this.observer=new IntersectionObserver(e=>{let t=e[0].isIntersecting;t&&!this.isVisible&&(this.state=`chaos`,this.stateTimer=22,this.resetToStable(),this.injectImmediateChaos()),this.isVisible=t},{threshold:.1}),this.observer.observe(this.canvas)}destroy(){window.removeEventListener(`resize`,this.resizeListener),this.observer&&this.observer.disconnect()}initGrid(){let e=window.innerWidth<768;this.canvas.width=e?window.innerWidth*.95*2:window.innerWidth*.8,this.canvas.height=e?240:180,this.cols=Math.floor(this.canvas.width/this.cellSize),this.rows=Math.floor(this.canvas.height/this.cellSize),this.ctx.fillStyle=`#000000`,this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height),this.ctx.fillStyle=`#FFFFFF`,this.ctx.font=e?`800 19vw AgrandirHeavy, sans-serif`:`800 7.5vw AgrandirHeavy, sans-serif`,this.ctx.textAlign=`center`,this.ctx.textBaseline=`middle`,this.ctx.fillText(`AUTOMATION`,this.canvas.width/2,this.canvas.height/2);let t=this.ctx.getImageData(0,0,this.canvas.width,this.canvas.height).data;this.textGrid=Array(this.cols).fill(0).map(()=>Array(this.rows).fill(0)),this.nearText=Array(this.cols).fill(0).map(()=>Array(this.rows).fill(0)),this.grid=Array(this.cols).fill(0).map(()=>Array(this.rows).fill(0));for(let e=0;e<this.rows;e++)for(let n=0;n<this.cols;n++){let r=e*this.cellSize,i=n*this.cellSize;t[(r*this.canvas.width+i)*4]>128&&(this.textGrid[n][e]=1,this.grid[n][e]=1)}for(let e=0;e<this.cols;e++)for(let t=0;t<this.rows;t++)if(this.textGrid[e][t]===1)for(let n=-2;n<=2;n++)for(let r=-2;r<=2;r++){let i=e+n,a=t+r;i>=0&&i<this.cols&&a>=0&&a<this.rows&&(this.nearText[i][a]=1)}this.state=`chaos`,this.stateTimer=22,this.injectImmediateChaos()}injectImmediateChaos(){if(!(!this.grid||this.grid.length===0)){for(let e=0;e<this.cols;e++)for(let t=0;t<this.rows;t++)if(this.textGrid[e][t]===1&&Math.random()<.35){this.grid[e][t]=0;let n=e+Math.floor((Math.random()-.5)*6),r=t+Math.floor((Math.random()-.5)*6);n>=0&&n<this.cols&&r>=0&&r<this.rows&&(this.grid[n][r]=1)}}}computeNextGen(e=0){if(!this.grid||this.grid.length===0)return;let t=Array(this.cols).fill(0).map(()=>Array(this.rows).fill(0));for(let n=1;n<this.cols-1;n++)for(let r=1;r<this.rows-1;r++){let i=0;for(let e=-1;e<=1;e++)for(let t=-1;t<=1;t++)i+=this.grid[n+e][r+t];i-=this.grid[n][r];let a=this.grid[n][r],o=0;if((a===1&&(i===2||i===3)||a===0&&i===3)&&(o=1),e>0&&this.nearText[n][r]){let t=this.textGrid[n][r];t===1&&o===0?o=+(Math.random()<e):t===0&&o===1&&(o=Math.random()<e?0:1)}t[n][r]=o}this.grid=t}injectLocalGlitch(){for(let e=0;e<4;e++){let e=Math.floor(Math.random()*(this.cols-4))+2,t=Math.floor(Math.random()*(this.rows-4))+2;if(this.textGrid[e][t]===1)for(let n=-1;n<=1;n++)for(let r=-1;r<=1;r++)Math.random()>.4&&(this.grid[e+n][t+r]=1)}}spawnAmbientConway(){if(!this.grid||this.grid.length===0)return;let e=0;for(let t=0;t<this.cols;t++)for(let n=0;n<this.rows;n++)this.grid[t][n]===1&&!this.nearText[t][n]&&e++;let t=Math.floor(e/4.5),n=this.maxAmbientSeeds-t;if(!(n<=0))for(let e=0;e<n;e++){let e=0;for(;e<15;){let t=Math.floor(Math.random()*(this.cols-12))+6,n=Math.floor(Math.random()*(this.rows-12))+6,r=!0;for(let e=-3;e<=3;e++){for(let i=-3;i<=3;i++)if(this.nearText[t+e][n+i]===1||this.grid[t+e][n+i]===1){r=!1;break}if(!r)break}if(r){let e=Math.random();e<.4?(this.grid[t][n+1]=1,this.grid[t+1][n+2]=1,this.grid[t+2][n]=1,this.grid[t+2][n+1]=1,this.grid[t+2][n+2]=1):e<.7?(this.grid[t][n]=1,this.grid[t][n+1]=1,this.grid[t][n+2]=1):(this.grid[t][n]=1,this.grid[t+1][n]=1,this.grid[t+2][n]=1,this.grid[t+3][n]=1);break}e++}}}resetToStable(){for(let e=0;e<this.cols;e++)for(let t=0;t<this.rows;t++)this.grid[e][t]=this.textGrid[e][t]}update(e,t){if(!(!this.isVisible||!this.grid||this.grid.length===0)){if(t-this.lastTick>this.tickRate){if(this.lastTick=t,this.state===`stable`)this.computeNextGen(.92),Math.random()<.12&&this.injectLocalGlitch(),Math.random()<.15&&this.spawnAmbientConway(),Date.now()>this.nextChaosTime&&(this.state=`chaos`,this.stateTimer=22);else if(this.state===`chaos`)this.computeNextGen(0),this.stateTimer--,this.stateTimer<=0&&(this.state=`reconstructing`,this.stateTimer=12);else if(this.state===`reconstructing`){let e=(12-this.stateTimer)/12;this.computeNextGen(.1+e*.9),this.stateTimer--,this.stateTimer<=0&&(this.resetToStable(),this.state=`stable`,this.nextChaosTime=Date.now()+8e3+Math.random()*5e3)}}this.ctx.fillStyle=`#000000`,this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height),this.ctx.fillStyle=`#ffffff`;for(let e=0;e<this.cols;e++)for(let t=0;t<this.rows;t++)this.grid[e]&&this.grid[e][t]===1&&this.ctx.fillRect(e*this.cellSize,t*this.cellSize,this.cellSize-1,this.cellSize-1)}}},O=class{constructor(e){this.canvas=document.getElementById(e),this.ctx=this.canvas.getContext(`2d`,{alpha:!1}),this.particles=[],this.isVisible=!1,this.state=`converging`,this.stateTimer=0,this.stateDuration={converging:2500,stable:5e3,dispersing:2e3},this.setupObserver(),this.lastWidth=window.innerWidth,this.resizeDebounce=null,this.resizeListener=()=>{clearTimeout(this.resizeDebounce),this.resizeDebounce=setTimeout(()=>{let e=window.innerWidth;Math.abs(e-this.lastWidth)>15&&(this.lastWidth=e,this.initParticles(),this.isVisible&&(this.state=`converging`,this.stateTimer=Date.now()+this.stateDuration.converging,this.resetToNoise()))},250)},window.addEventListener(`resize`,this.resizeListener),document.fonts?document.fonts.ready.then(()=>this.initParticles()):this.initParticles()}setupObserver(){this.observer=new IntersectionObserver(e=>{let t=e[0].isIntersecting;t&&!this.isVisible&&(this.state=`converging`,this.stateTimer=Date.now()+this.stateDuration.converging,this.resetToNoise()),this.isVisible=t},{threshold:.15}),this.observer.observe(this.canvas)}destroy(){window.removeEventListener(`resize`,this.resizeListener),this.observer&&this.observer.disconnect()}initParticles(){let e=window.innerWidth<768;this.canvas.width=e?window.innerWidth*.95:window.innerWidth*.8,this.canvas.height=e?120:180,this.ctx.fillStyle=`#000000`,this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height),this.ctx.fillStyle=`#FFFFFF`,this.ctx.font=e?`800 11.5vw AgrandirHeavy, sans-serif`:`800 7.5vw AgrandirHeavy, sans-serif`,this.ctx.textAlign=`center`,this.ctx.textBaseline=`middle`,this.ctx.fillText(`TOWARDS`,this.canvas.width/2,this.canvas.height/2);let t=this.ctx.getImageData(0,0,this.canvas.width,this.canvas.height).data,n=[];for(let e=0;e<this.canvas.height;e+=3)for(let r=0;r<this.canvas.width;r+=3)t[(e*this.canvas.width+r)*4]>128&&n.push({x:r,y:e});this.particles=n.map(e=>{let t=Math.random()*this.canvas.width,n=Math.random()*this.canvas.height;return{glyphX:e.x,glyphY:e.y,noiseX:t,noiseY:n,targetX:t,targetY:n,x:t,y:n,size:2,noiseOffset:Math.random()*100,speed:.05+Math.random()*.05}}),this.stateTimer=Date.now()+this.stateDuration.converging,this.setTargets(`glyph`)}setTargets(e){for(let t=0;t<this.particles.length;t++){let n=this.particles[t];e===`glyph`?(n.targetX=n.glyphX,n.targetY=n.glyphY):(n.targetX=n.noiseX,n.targetY=n.noiseY)}}resetToNoise(){for(let e=0;e<this.particles.length;e++){let t=this.particles[e];t.x=t.noiseX,t.y=t.noiseY,t.targetX=t.glyphX,t.targetY=t.glyphY}}applyTargetPerturbation(){if(!(this.particles.length<2))for(let e=0;e<12;e++){let e=Math.floor(Math.random()*this.particles.length),t=Math.floor(Math.random()*this.particles.length),n=this.particles[e].glyphX-this.particles[t].glyphX,r=this.particles[e].glyphY-this.particles[t].glyphY;if(n*n+r*r<1225){let n=this.particles[e].targetX,r=this.particles[e].targetY;this.particles[e].targetX=this.particles[t].targetX,this.particles[e].targetY=this.particles[t].targetY,this.particles[t].targetX,this.particles[t].targetY,this.particles[t].targetX=n,this.particles[t].targetY=r}}}update(e,t){if(!this.isVisible||this.particles.length===0)return;let n=Date.now();n>this.stateTimer&&(this.state===`converging`?(this.state=`stable`,this.stateTimer=n+this.stateDuration.stable):this.state===`stable`?(this.state=`dispersing`,this.stateTimer=n+this.stateDuration.dispersing,this.setTargets(`noise`)):this.state===`dispersing`&&(this.state=`converging`,this.stateTimer=n+this.stateDuration.converging,this.setTargets(`glyph`))),this.state===`stable`&&this.applyTargetPerturbation(),this.ctx.fillStyle=`#000000`,this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height),this.ctx.fillStyle=`#ffffff`;for(let e=0;e<this.particles.length;e++){let r=this.particles[e],i=(this.state===`converging`?Math.max(0,(this.stateTimer-n)/this.stateDuration.converging):this.state===`dispersing`?Math.min(1,(this.stateTimer-n)/this.stateDuration.dispersing):0)*15,a=Math.sin(t*.006+r.noiseOffset)*i,o=Math.cos(t*.006+r.noiseOffset)*i;r.x+=(r.targetX-r.x)*r.speed+a*.1,r.y+=(r.targetY-r.y)*r.speed+o*.1,this.ctx.fillRect(r.x,r.y,r.size,r.size)}}},k=class{constructor(e,t){this.canvas=document.getElementById(e),this.ctx=this.canvas.getContext(`2d`,{alpha:!1}),this.pidTextEl=document.getElementById(t),this.isVisible=!1,this.lastTime=0,this.offscreen=document.createElement(`canvas`),this.offCtx=this.offscreen.getContext(`2d`,{alpha:!1}),this.P=.034,this.I=.014,this.D=-1.034,this.targetP=1,this.targetI=0,this.targetD=0,this.cols=260,this.rows=80,this.cellSize=0,this.density=[],this.prevDensity=[],this.u=[],this.v=[],this.textGrid=[],this.state=`stable`,this.stateTimer=0,this.stateDuration={stable:2e3,dissolving:3500,reversing:5500},this.perturbationConfig={initialVorticesMin:5,initialVorticesMax:5,initialRadius:{min:5,max:12},initialForce:{min:.2,max:.2},continuousFrequency:.8,continuousRadius:6,continuousForceRange:.1},this.setupObserver(),this.lastWidth=window.innerWidth,this.resizeDebounce=null,this.resizeListener=()=>{clearTimeout(this.resizeDebounce),this.resizeDebounce=setTimeout(()=>{let e=window.innerWidth;if(Math.abs(e-this.lastWidth)>15&&(this.lastWidth=e,this.initCanvas(),this.isVisible)){this.state=`dissolving`,this.stateTimer=Date.now()+this.stateDuration.dissolving,this.resetFluid();let e=4+Math.floor(Math.random()*3);for(let t=0;t<e;t++){let e=15+Math.random()*(this.cols-30),t=8+Math.random()*(this.rows-16),n=10+Math.random()*12,r=(Math.random()>.5?1:-1)*(1.2+Math.random()*1.5);this.injectFluidVortex(e,t,n,r)}}},250)},window.addEventListener(`resize`,this.resizeListener),document.fonts?document.fonts.ready.then(()=>this.initCanvas()):this.initCanvas()}setupObserver(){this.observer=new IntersectionObserver(e=>{let t=e[0].isIntersecting;if(t&&!this.isVisible){this.state=`dissolving`,this.stateTimer=Date.now()+this.stateDuration.dissolving,this.resetFluid();let e=4+Math.floor(Math.random()*3);for(let t=0;t<e;t++){let e=15+Math.random()*(this.cols-30),t=8+Math.random()*(this.rows-16),n=10+Math.random()*12,r=(Math.random()>.5?1:-1)*(1.2+Math.random()*1.5);this.injectFluidVortex(e,t,n,r)}}this.isVisible=t},{threshold:.15}),this.observer.observe(this.canvas)}destroy(){window.removeEventListener(`resize`,this.resizeListener),this.observer&&this.observer.disconnect()}initCanvas(){let e=window.innerWidth<768;this.canvas.width=e?window.innerWidth*.95:window.innerWidth*.8,this.canvas.height=e?110:160,this.offscreen.width=this.canvas.width,this.offscreen.height=this.canvas.height,this.offCtx.fillStyle=`#000000`,this.offCtx.fillRect(0,0,this.offscreen.width,this.offscreen.height),this.offCtx.fillStyle=`#FFFFFF`,this.offCtx.font=e?`800 11vw "Times New Roman", Times, serif`:`800 7.5vw "Times New Roman", Times, serif`,this.offCtx.textAlign=`center`,this.offCtx.textBaseline=`middle`,this.offCtx.fillText(`THEORETICAL`,this.offscreen.width/2,this.offscreen.height/2),this.cellSize=this.canvas.width/this.cols,this.rows=Math.ceil(this.canvas.height/this.cellSize);let t=this.cols*this.rows;this.density=new Float32Array(t),this.prevDensity=new Float32Array(t),this.u=new Float32Array(t),this.v=new Float32Array(t),this.textGrid=new Float32Array(t);let n=this.offCtx.getImageData(0,0,this.canvas.width,this.canvas.height).data;for(let e=0;e<this.rows;e++)for(let t=0;t<this.cols;t++){let r=e*this.cols+t,i=Math.floor(t*this.cellSize+this.cellSize/2);n[(Math.floor(e*this.cellSize+this.cellSize/2)*this.canvas.width+i)*4]>128&&(this.textGrid[r]=1,this.density[r]=1)}this.state=`dissolving`,this.stateTimer=Date.now()+this.stateDuration.dissolving;let r=4+Math.floor(Math.random()*3);for(let e=0;e<r;e++){let e=15+Math.random()*(this.cols-30),t=8+Math.random()*(this.rows-16),n=10+Math.random()*12,r=(Math.random()>.5?1:-1)*(1.2+Math.random()*1.5);this.injectFluidVortex(e,t,n,r)}}resetFluid(){let e=this.cols*this.rows;for(let t=0;t<e;t++)this.density[t]=this.textGrid[t],this.u[t]=0,this.v[t]=0;this.P=1,this.I=0,this.D=0}advectDensity(){this.prevDensity.set(this.density);let e=.85;for(let t=1;t<this.rows-1;t++)for(let n=1;n<this.cols-1;n++){let r=t*this.cols+n,i=n-this.u[r]*e,a=t-this.v[r]*e;i<.5&&(i=.5),i>this.cols-1.5&&(i=this.cols-1.5),a<.5&&(a=.5),a>this.rows-1.5&&(a=this.rows-1.5);let o=Math.floor(i),s=o+1,c=Math.floor(a),l=c+1,u=i-o,d=1-u,f=a-c,p=1-f,m=c*this.cols,h=l*this.cols;this.density[r]=p*(d*this.prevDensity[m+o]+u*this.prevDensity[m+s])+f*(d*this.prevDensity[h+o]+u*this.prevDensity[h+s])}}injectFluidVortex(e,t,n,r){for(let i=0;i<this.rows;i++)for(let a=0;a<this.cols;a++){let o=i*this.cols+a,s=a-e,c=i-t,l=s*s+c*c;if(l<n*n&&l>0){let e=1-Math.sqrt(l)/n;this.u[o]+=-c*e*r,this.v[o]+=s*e*r}}}applyViscosity(e=.96){let t=this.cols*this.rows;for(let n=0;n<t;n++)this.u[n]*=e,this.v[n]*=e}injectInitialPerturbations(){let e=this.perturbationConfig,t=e.initialVorticesMin+Math.floor(Math.random()*(e.initialVorticesMax-e.initialVorticesMin+1));for(let n=0;n<t;n++){let t=15+Math.random()*(this.cols-30),n=8+Math.random()*(this.rows-16),r=e.initialRadius.min+Math.random()*(e.initialRadius.max-e.initialRadius.min),i=e.initialForce.min+Math.random()*(e.initialForce.max-e.initialForce.min),a=(Math.random()>.5?1:-1)*i;this.injectFluidVortex(t,n,r,a)}}injectContinuousPerturbations(){let e=this.perturbationConfig;if(Math.random()<e.continuousFrequency){let t=Math.random()*this.cols,n=Math.random()*this.rows,r=(Math.random()-.5)*e.continuousForceRange;this.injectFluidVortex(t,n,e.continuousRadius,r)}}applyInversePhysicsPull(e=.08){for(let t=1;t<this.rows-1;t++)for(let n=1;n<this.cols-1;n++){let r=t*this.cols+n;if(this.density[r]>.05&&this.textGrid[r]===0){let i=n,a=t,o=999999;for(let e=-8;e<=8;e++)for(let r=-8;r<=8;r++){let s=n+r,c=t+e;if(s>=0&&s<this.cols&&c>=0&&c<this.rows){let t=c*this.cols+s;if(this.textGrid[t]===1){let t=r*r+e*e;t<o&&(o=t,i=s,a=c)}}}let s=i-n,c=a-t,l=Math.sqrt(s*s+c*c);l>0&&(this.u[r]+=s/l*e,this.v[r]+=c/l*e)}if(this.textGrid[r]===1&&this.density[r]<.6){let i=n,a=t,o=999999;for(let e=-8;e<=8;e++)for(let r=-8;r<=8;r++){let s=n+r,c=t+e;if(s>=0&&s<this.cols&&c>=0&&c<this.rows){let t=c*this.cols+s;if(this.density[t]>.4&&this.textGrid[t]===0){let t=r*r+e*e;t<o&&(o=t,i=s,a=c)}}}let s=i-n,c=a-t,l=Math.sqrt(s*s+c*c);l>0&&(this.u[r]-=s/l*e*.7,this.v[r]-=c/l*e*.7)}}}blendHomeostasis(e=.05){let t=this.cols*this.rows;for(let n=0;n<t;n++){let t=this.textGrid[n];this.density[n]=this.density[n]*(1-e)+t*e}}lerp(e,t,n){return(1-n)*e+n*t}update(e,t){if(!this.isVisible||this.density.length===0)return;let n=Date.now();if(n>this.stateTimer&&(this.state===`stable`?(this.state=`dissolving`,this.stateTimer=n+this.stateDuration.dissolving,this.injectInitialPerturbations()):this.state===`dissolving`?(this.state=`reversing`,this.stateTimer=n+this.stateDuration.reversing):this.state===`reversing`&&(this.resetFluid(),this.state=`stable`,this.stateTimer=n+this.stateDuration.stable)),this.state===`stable`)this.P=1,this.I=0,this.D=0,this.blendHomeostasis(.2),this.applyViscosity(.8);else if(this.state===`dissolving`){let e=1-Math.max(0,(this.stateTimer-n)/this.stateDuration.dissolving);this.P=parseFloat(this.lerp(1,.034,e).toFixed(3)),this.I=parseFloat(this.lerp(0,.014,e).toFixed(3)),this.D=parseFloat(this.lerp(0,-1.034,e).toFixed(3)),this.injectContinuousPerturbations(),this.applyViscosity(.97),this.advectDensity()}else if(this.state===`reversing`){let e=1-Math.max(0,(this.stateTimer-n)/this.stateDuration.reversing);this.P=parseFloat(this.lerp(.034,1,e).toFixed(3)),this.I=parseFloat(this.lerp(.014,0,e).toFixed(3)),this.D=parseFloat((-1.034+e*1.034).toFixed(3)),this.applyInversePhysicsPull(.12),this.blendHomeostasis(.02+e*.15),this.applyViscosity(.93),this.advectDensity()}if(this.pidTextEl){let e=window.innerWidth<768?`&nbsp;&nbsp;&nbsp;`:`&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`;this.pidTextEl.innerHTML=`P = ${this.P.toFixed(3)}${e}I = ${this.I.toFixed(3)}${e}D = ${this.D.toFixed(3)}`}this.ctx.fillStyle=`#000000`,this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);for(let e=0;e<this.rows;e++)for(let t=0;t<this.cols;t++){let n=e*this.cols+t,r=this.density[n];r>.02&&(this.ctx.fillStyle=`rgba(255, 255, 255, ${Math.min(1,r)})`,this.ctx.fillRect(t*this.cellSize,e*this.cellSize,this.cellSize,this.cellSize))}}},A=class{constructor(e){this.canvas=document.getElementById(e),this.canvas&&(this.ctx=this.canvas.getContext(`2d`),this.isVisible=!1,this.particles=[],this.maxParticles=1e3,this.particleRadius=1.5,this.interactionRadius=2,this.gravity=.22,this.viscosity=.08,this.friction=.98,this.restitution=.45,this.cellSize=5,this.cols=0,this.rows=0,this.collisionGrid=null,this.nearestInsideGrid=null,this.offscreen=document.createElement(`canvas`),this.offCtx=this.offscreen.getContext(`2d`),this.maskCanvas=document.createElement(`canvas`),this.maskCtx=this.maskCanvas.getContext(`2d`),this.fluidCanvas=document.createElement(`canvas`),this.fluidCtx=this.fluidCanvas.getContext(`2d`),this.nextSplashTime=Date.now()+3e3,this.splashLabel=``,this.splashLabelOpacity=0,this.setupObserver(),this.fontLoaded=!1,this.lastWidth=0,this.resizeDebounce=null,this.resizeListener=()=>{clearTimeout(this.resizeDebounce),this.resizeDebounce=setTimeout(()=>{let e=window.innerWidth;Math.abs(e-this.lastWidth)>15&&this.initCanvas(!1)},250)},window.addEventListener(`resize`,this.resizeListener),document.fonts?document.fonts.ready.then(()=>this.initCanvas(!0)):this.initCanvas(!0))}setupObserver(){this.observer=new IntersectionObserver(e=>{this.isVisible=e[0].isIntersecting,this.isVisible&&this.particles.length===0&&this.spawnParticles()},{threshold:.1}),this.observer.observe(this.canvas)}destroy(){window.removeEventListener(`resize`,this.resizeListener),this.observer&&this.observer.disconnect()}initCanvas(e=!1){let t=window.innerWidth;if(t===this.lastWidth&&!e)return;this.lastWidth=t;let n=Math.floor(t*.32);this.canvas.width=t,this.canvas.height=n,this.offscreen.width=t,this.offscreen.height=n,this.maskCanvas.width=t,this.maskCanvas.height=n,this.fluidCanvas.width=t,this.fluidCanvas.height=n,this.offCtx.font=`900 100px "AgrandirHeavy", "Arial Black", sans-serif`;let r=this.offCtx.measureText(`LIMIT`).width;this.fontSize=Math.floor(t/r*100*1.055),this.fontString=`900 ${this.fontSize}px "AgrandirHeavy", "Arial Black", sans-serif`,this.offCtx.fillStyle=`#000000`,this.offCtx.fillRect(0,0,t,n),this.offCtx.fillStyle=`#FFFFFF`,this.offCtx.font=this.fontString,this.offCtx.textAlign=`center`,this.offCtx.textBaseline=`middle`,this.offCtx.fillText(`LIMIT`,t/2,n/2),this.cols=Math.ceil(t/this.cellSize),this.rows=Math.ceil(n/this.cellSize);let i=this.cols*this.rows;this.collisionGrid=new Uint8Array(i),this.nearestInsideGrid=new Int32Array(i);let a=this.offCtx.getImageData(0,0,t,n).data;for(let e=0;e<this.rows;e++)for(let r=0;r<this.cols;r++){let i=e*this.cols+r,o=Math.min(t-1,Math.floor(r*this.cellSize+this.cellSize/2));a[(Math.min(n-1,Math.floor(e*this.cellSize+this.cellSize/2))*t+o)*4]>128?this.collisionGrid[i]=1:this.collisionGrid[i]=0}for(let e=0;e<this.rows;e++)for(let t=0;t<this.cols;t++){let n=e*this.cols+t;if(this.collisionGrid[n]===1){this.nearestInsideGrid[n]=n;continue}let r=-1,i=1/0;for(let n=1;n<=45;n++){for(let a=-n;a<=n;a++){let o=t+a;if(o>=0&&o<this.cols){let t=e-n;if(t>=0){let e=t*this.cols+o;if(this.collisionGrid[e]===1){let t=a*a+n*n;t<i&&(i=t,r=e)}}let s=e+n;if(s<this.rows){let e=s*this.cols+o;if(this.collisionGrid[e]===1){let t=a*a+n*n;t<i&&(i=t,r=e)}}}}for(let a=-n+1;a<n;a++){let o=e+a;if(o>=0&&o<this.rows){let e=t-n;if(e>=0){let t=o*this.cols+e;if(this.collisionGrid[t]===1){let e=n*n+a*a;e<i&&(i=e,r=t)}}let s=t+n;if(s<this.cols){let e=o*this.cols+s;if(this.collisionGrid[e]===1){let t=n*n+a*a;t<i&&(i=t,r=e)}}}}if(r!==-1)break}this.nearestInsideGrid[n]=r}this.spawnParticles()}spawnParticles(){this.particles=[];let e=this.canvas.width,t=this.canvas.height,n=0;for(;this.particles.length<this.maxParticles&&n<15e3;){n++;let r=Math.random()*e,i=Math.random()*t,a=Math.floor(r/this.cellSize),o=Math.floor(i/this.cellSize);if(a>=0&&a<this.cols&&o>=0&&o<this.rows){let e=o*this.cols+a;this.collisionGrid[e]===1&&this.particles.push({x:r,y:i,vx:(Math.random()-.5)*1.5,vy:Math.random()*2,px:r,py:i})}}}solvePBDConstraints(){let e=this.interactionRadius,t=new Map;for(let n=0;n<this.particles.length;n++){let r=this.particles[n],i=`${Math.floor(r.x/e)},${Math.floor(r.y/e)}`;t.has(i)||t.set(i,[]),t.get(i).push(r)}let n=this.interactionRadius,r=n*n;for(let i=0;i<2;i++){let i=new Float32Array(this.particles.length),a=new Float32Array(this.particles.length),o=new Float32Array(this.particles.length);for(let i=0;i<this.particles.length;i++){let a=this.particles[i],s=Math.floor(a.x/e),c=Math.floor(a.y/e),l=0;for(let e=-1;e<=1;e++)for(let i=-1;i<=1;i++){let o=`${s+e},${c+i}`,u=t.get(o);if(u)for(let e=0;e<u.length;e++){let t=u[e];if(a===t)continue;let i=t.x-a.x,o=t.y-a.y,s=i*i+o*o;if(s<r){let e=1-Math.sqrt(s)/n;l+=e*e}}}o[i]=l}for(let s=0;s<this.particles.length;s++){let c=this.particles[s],l=Math.floor(c.x/e),u=Math.floor(c.y/e),d=o[s]-2.4;if(d<=0)continue;let f=d*.28;for(let e=-1;e<=1;e++)for(let o=-1;o<=1;o++){let d=`${l+e},${u+o}`,p=t.get(d);if(p)for(let e=0;e<p.length;e++){let t=p[e];if(c===t)continue;let o=t.x-c.x,l=t.y-c.y,u=o*o+l*l;if(u<r&&u>.01){let e=Math.sqrt(u),t=1-e/n,r=o/e*f*t,c=l/e*f*t;i[s]-=r*.5,a[s]-=c*.5}}}}let s=this.canvas.width,c=this.canvas.height;for(let e=0;e<this.particles.length;e++){let t=this.particles[e];t.x+=i[e],t.y+=a[e];let n=Math.floor(t.x/this.cellSize),r=Math.floor(t.y/this.cellSize);if(n>=0&&n<this.cols&&r>=0&&r<this.rows){let e=r*this.cols+n;if(this.collisionGrid[e]===0){let n=this.nearestInsideGrid[e];if(n!==-1){let e=n%this.cols,r=Math.floor(n/this.cols),i=e*this.cellSize+this.cellSize/2,a=r*this.cellSize+this.cellSize/2,o=i-t.x,s=a-t.y,c=Math.sqrt(o*o+s*s);c>.1&&(t.x=i+o/c*.5,t.y=a+s/c*.5)}}}t.x<2&&(t.x=2),t.x>s-2&&(t.x=s-2),t.y<2&&(t.y=2),t.y>c-2&&(t.y=c-2)}}}triggerSplash(){let e=this.canvas.width,t=this.canvas.height,n=Math.random();if(n<.35){let e=(Math.random()>.5?1:-1)*(5+Math.random()*4);this.splashLabel=`PERTURBATION: ${e>0?`RIGHT`:`LEFT`} VECTOR BLOW`;for(let t of this.particles)t.vx+=e*(.6+Math.random()*.6),t.vy-=1+Math.random()*2}else if(n<.7){let n=e*.15+e*.7*Math.random(),r=t*.4+t*.4*Math.random(),i=6.5;this.splashLabel=`IMPULSE: THERMAL VORTEX IGNITION`;for(let e of this.particles){let t=e.x-n,a=e.y-r,o=t*t+a*a;if(o<8100&&o>1){let n=Math.sqrt(o),r=1-n/90;e.vx+=t/n*i*r*(.8+Math.random()*.4),e.vy+=a/n*i*r*(.8+Math.random()*.4)-2}}}else{this.splashLabel=`SYSTEM LIMIT: THERMODYNAMIC UPRUSH`;let e=6+Math.random()*3;for(let n of this.particles)n.y>t*.6&&(n.vy-=e*(.7+Math.random()*.6),n.vx+=(Math.random()-.5)*4)}this.splashLabelOpacity=1}update(e,t){if(!this.isVisible||this.particles.length===0)return;if(!this.fontLoaded){this.offCtx.font=`900 100px "AgrandirHeavy", sans-serif`;let e=this.offCtx.measureText(`LIMIT`).width;this.offCtx.font=`900 100px sans-serif`;let t=this.offCtx.measureText(`LIMIT`).width;Math.abs(e-t)>5&&(this.fontLoaded=!0,this.initCanvas(!0))}let n=Date.now();n>this.nextSplashTime&&(this.triggerSplash(),this.nextSplashTime=n+4e3+Math.random()*4e3),this.splashLabelOpacity>0&&(this.splashLabelOpacity-=.015);for(let e=0;e<this.particles.length;e++){let t=this.particles[e];t.px=t.x,t.py=t.y,t.vy+=this.gravity,t.vx*=this.friction,t.vy*=this.friction,t.x+=t.vx,t.y+=t.vy}this.solvePBDConstraints(),this.canvas.width,this.canvas.height;for(let e=0;e<this.particles.length;e++){let t=this.particles[e];t.vx=t.x-t.px,t.vy=t.y-t.py;let n=Math.floor(t.x/this.cellSize),r=Math.floor(t.y/this.cellSize);if(n>=0&&n<this.cols&&r>=0&&r<this.rows){let e=r*this.cols+n;if(this.collisionGrid[e]===0){let n=this.nearestInsideGrid[e];if(n!==-1){let e=n%this.cols,r=Math.floor(n/this.cols),i=e*this.cellSize+this.cellSize/2,a=r*this.cellSize+this.cellSize/2,o=i-t.x,s=a-t.y,c=Math.sqrt(o*o+s*s);if(c>.1){let e=o/c,n=s/c;t.x=i+e*.5,t.y=a+n*.5;let r=t.vx*e+t.vy*n;r<0&&(t.vx-=(1+this.restitution)*r*e,t.vy-=(1+this.restitution)*r*n)}}}}}this.renderLiquid()}renderLiquid(){let e=this.canvas.width,t=this.canvas.height;this.ctx.fillStyle=`#000000`,this.ctx.fillRect(0,0,e,t),this.ctx.lineWidth=3.5,this.ctx.strokeStyle=`rgba(0, 255, 200, 0.4)`,this.ctx.font=this.fontString||`900 12vw "AgrandirHeavy", "Arial Black", sans-serif`,this.ctx.textAlign=`center`,this.ctx.textBaseline=`middle`,this.ctx.strokeText(`LIMIT`,e/2,t/2),this.fluidCtx.clearRect(0,0,e,t);for(let e=0;e<this.particles.length;e++){let t=this.particles[e],n=this.particleRadius*2.3;this.fluidCtx.fillStyle=`#0077FF`,this.fluidCtx.beginPath(),this.fluidCtx.arc(t.x,t.y,n,0,Math.PI*2),this.fluidCtx.fill()}this.maskCtx.fillStyle=`#000000`,this.maskCtx.fillRect(0,0,e,t),this.maskCtx.fillStyle=`#FFFFFF`,this.maskCtx.font=this.fontString||`900 12vw "AgrandirHeavy", "Arial Black", sans-serif`,this.maskCtx.textAlign=`center`,this.maskCtx.textBaseline=`middle`,this.maskCtx.fillText(`LIMIT`,e/2,t/2),this.maskCtx.globalCompositeOperation=`source-in`,this.maskCtx.drawImage(this.fluidCanvas,0,0),this.maskCtx.globalCompositeOperation=`source-over`,this.ctx.save(),this.ctx.filter=`contrast(240%) brightness(1.05)`,this.ctx.drawImage(this.maskCanvas,0,0),this.ctx.restore()}cleanup(){window.removeEventListener(`resize`,this.resizeListener),clearTimeout(this.resizeDebounce),this.particles=[]}};console.log(`System SPA Initialized: Excellence or nothing.`);var j=null,M=null,N=null,P=null;function F(){w(),e.stop(),e.clear(),j&&=(j.destroy(),null),M&&=(M.destroy(),null),N&&=(N.destroy(),null),P&&=(P.destroy(),null);let t=document.getElementById(`scroll-container`);t&&(t.innerHTML=``),window.scrollTo({top:0,behavior:`instant`}),document.body.style.overflow=``}function I(){F();let c=window.location.pathname||`/`,l=document.getElementById(`scroll-container`);if(!l)return;let u=c===`/`||c===`/home`||c.endsWith(`/index.html`);if(document.querySelectorAll(`#nav-list li`).forEach(e=>{e.classList.remove(`active`);let t=e.textContent.trim().toLowerCase();u?t===`home`&&e.classList.add(`active`):(c===`/`+t||c.endsWith(`/`+t))&&e.classList.add(`active`)}),u)document.title=`Nihal Gazi - AI Researcher, Developer & Founder`,l.innerHTML=t+n+r+i+a+o+s,j=new D(`canvas-automation`),M=new O(`canvas-diffusion`),N=new k(`canvas-theoretical`,`hud-pid`),P=new A(`canvas-limit`),e.add((e,t)=>{j&&j.update(e,t),M&&M.update(e,t),N&&N.update(e,t),P&&P.update(e,t)}),e.start();else if(c===`/about`||c.endsWith(`/about`)){document.title=`About Nihal Gazi - AI Research & Core Philosophy`,l.innerHTML=m;let e=document.getElementById(`dynamic-age`);if(e){let t=new Date(`2006-11-09`),n=new Date,r=n.getFullYear()-t.getFullYear(),i=n.getMonth()-t.getMonth();(i<0||i===0&&n.getDate()<t.getDate())&&r--,e.textContent=r}}else c===`/projects`||c.endsWith(`/projects`)?(document.title=`Nihal Gazi - AI Projects & Custom Architectures`,l.innerHTML=_):c===`/honors`||c.endsWith(`/honors`)?(document.title=`Nihal Gazi - Honors, Awards & Academic Research`,l.innerHTML=v):c===`/secret`||c.endsWith(`/secret`)?(document.title=`Nihal Gazi - Deep Sandbox & Hidden Timeline`,document.body.style.overflow=`hidden`,l.innerHTML=S,E()):(window.history.replaceState(null,``,`/`),I())}window.addEventListener(`popstate`,I),window.addEventListener(`DOMContentLoaded`,I);var L=document.querySelectorAll(`#nav-list li`);L.forEach(e=>{e.addEventListener(`click`,()=>{let t=e.textContent.trim().toLowerCase(),n=t===`home`?`/`:`/`+t;window.location.pathname!==n&&(window.history.pushState(null,``,n),I())})});var R=document.getElementById(`mobile-hamburger`),z=document.getElementById(`utopian-nav`);R&&z&&(R.addEventListener(`click`,e=>{e.stopPropagation(),z.classList.toggle(`open`)}),document.addEventListener(`click`,e=>{z.contains(e.target)||z.classList.remove(`open`)}),L.forEach(e=>{e.addEventListener(`click`,()=>{z.classList.remove(`open`)})}));