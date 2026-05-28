import { socialData } from '../data/socialData.js';

const socialHtml = socialData.map(s => {
  if (s.isSvg) {
    return `
      <a href="${s.href}" target="_blank" rel="noopener noreferrer" class="${s.class}">
        <svg viewBox="${s.viewBox}">
          <title>${s.platform}</title>
          <path d="${s.path}"/>
        </svg>
      </a>
    `;
  } else {
    return `
      <a href="${s.href}" class="${s.class}" style="font-family: var(--font-body, sans-serif); font-size: 0.9rem; text-decoration: none; font-weight: 500; display: inline-flex; align-items: center; height: 24px; margin-left: 0.2rem;">
        ${s.text}
      </a>
    `;
  }
}).join('');

export const topSection = `
  <section id="top" class="viewport-section" style="position: relative; min-height: 100vh; overflow: visible; padding: 6rem 5vw 0 5vw; box-sizing: border-box; margin-bottom: 12vh;">
    
    <img class="aloe-bg" src="/images/aloe.png" style="position: absolute; right: 0vw; top: 10vh; height: 80vh; max-width: 25vw; object-fit: contain; z-index: 0; pointer-events: none;" alt="" />
 
    <div class="top-grid-container" style="display: grid; position: relative; z-index: 5; grid-template-columns: 1fr 1fr; align-items: center; width: 100%; height: 100%; gap: 2rem;">
      
      <div class="intro-text" style="z-index: 10; padding-top: 2rem;">
        <div style="display: flex; align-items: baseline; gap: 1rem; margin-bottom: 2rem; flex-wrap: wrap;">
          <span class="font-display" style="font-size: clamp(1.5rem, 3vw, 2.5rem);">Hi I am</span>
          <h1 class="font-display" style="font-size: clamp(3rem, 8vw, 6.5rem); line-height: 1; margin: 0;">Nihal Gazi</h1>
        </div>
        
        <p class="font-body" style="font-size: 0.95rem; color: #aaaaaa; max-width: 400px; line-height: 1.7;">
          An AI Researcher, hardware engineer, and Founder of KindSynapse based in India. I engineer CPU-efficient neural architectures, 1-bit weight quantization models, and novel machine learning solutions. My work stretches <b>beyond automation, towards theoretical limit excellence </b>, stripping away computational bloat to build artificial intelligence that operates elegantly under absolute physical constraints.
        </p>

        <div class="social-links">
          ${socialHtml}
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
`;