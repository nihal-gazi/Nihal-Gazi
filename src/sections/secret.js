import { secretData } from '../data/secretData.js';

const sectionsHtml = secretData.sections.map(s => {
  let bodyFormatted = s.body
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    .replace(/\n/g, '<br>');
  return `
    <h3 class="blog-section-hdr font-heavy">${s.num}. ${s.title}</h3>
    <p class="blog-section-body font-body">${bodyFormatted}</p>
  `;
}).join('');

const introHtml = secretData.intro.replace(/\n/g, '<br>');

export const secretSection = `
  <div class="secret-container" style="background-color: #000000; min-height: 100vh; color: #ffffff; position: relative;">
    
    <!-- Phase 1: Cinematic Void Layer -->
    <div id="secret-void-layer" class="secret-void-layer">
      <!-- Top-right subtle skip button -->
      <button id="skip-to-blog-btn" class="skip-to-blog-btn font-subsub">[Skip to Blog ↗]</button>

      <!-- Cinematic centering text frame -->
      <div class="cinematic-text-wrapper">
        <div id="cinematic-text-1" class="cinematic-text font-light">
          ${secretData.dialogue[0].text}
        </div>
        <div id="cinematic-text-2" class="cinematic-text font-light" style="margin-top: 1rem;">
          ${secretData.dialogue[1].text}
        </div>
        <div id="cinematic-text-3" class="cinematic-text font-light">
          ${secretData.dialogue[2].text}
        </div>
      </div>
    </div>

    <!-- Phase 2: Minimalist Editorial Blog Layer -->
    <div id="secret-blog-layer" class="secret-blog-layer">
      <div class="editorial-blog-wrapper">
        
        <!-- Hero Header -->
        <div class="blog-hero">
          <h1 class="blog-hero-title font-heavy">${secretData.hero.title}</h1>
          <p class="blog-hero-sub font-subsub">${secretData.hero.citation}</p>
        </div>

        <div class="editorial-divider"></div>

        <!-- Left Aligned Body Content -->
        <div class="blog-body">
          <p class="font-body">${introHtml}</p>
          
          ${sectionsHtml}
        </div>

        <!-- Center Aligned Footer -->
        <div class="blog-footer">
          <p class="conclusion-text font-body">
            Sometimes, in life, we need to slow down, and just put a little <a href="${secretData.footer.arxivUrl}" target="_blank" rel="noopener noreferrer" class="hidden-attention-link">attention</a>. It's a good habit. And remember, every good habit, starts at <a href="#/" class="home-router-link">home</a>.
          </p>
        </div>
        
      </div>
    </div>
  </div>
`;

let secretTimeouts = [];

export function clearSecretTimeline() {
  secretTimeouts.forEach(t => clearTimeout(t));
  secretTimeouts = [];
}

export function transitionToPhase2() {
  clearSecretTimeline();
  
  const voidLayer = document.getElementById('secret-void-layer');
  const blogLayer = document.getElementById('secret-blog-layer');
  
  if (voidLayer && blogLayer) {
    voidLayer.style.opacity = '0';
    voidLayer.style.pointerEvents = 'none';
    
    // Dissolve into Phase 2 layout
    setTimeout(() => {
      voidLayer.style.display = 'none';
      blogLayer.style.display = 'block';
      
      setTimeout(() => {
        blogLayer.style.opacity = '1';
        document.body.style.overflow = ''; // Unlock scrolling
      }, 50);
    }, 1500);
  }
}

export function runSecretTimeline() {
  clearSecretTimeline();
  
  const voidLayer = document.getElementById('secret-void-layer');
  const blogLayer = document.getElementById('secret-blog-layer');
  const skipBtn = document.getElementById('skip-to-blog-btn');
  const text1 = document.getElementById('cinematic-text-1');
  const text2 = document.getElementById('cinematic-text-2');
  const text3 = document.getElementById('cinematic-text-3');
  
  if (voidLayer) {
    voidLayer.style.display = 'flex';
    voidLayer.style.opacity = '1';
    voidLayer.style.pointerEvents = 'auto';
  }
  
  if (blogLayer) {
    blogLayer.style.display = 'none';
    blogLayer.style.opacity = '0';
  }
  
  if (skipBtn) {
    skipBtn.style.opacity = '0.3';
    skipBtn.onclick = (e) => {
      e.preventDefault();
      transitionToPhase2();
    };
  }
  
  if (text1) text1.classList.remove('visible');
  if (text2) text2.classList.remove('visible');
  if (text3) text3.classList.remove('visible');
  
  // Sequence Timeouts
  // [0.0s] - Button visible (opacity 0.3 styled)
  
  // [1.0s] - Fade in first statement
  secretTimeouts.push(setTimeout(() => {
    if (text1) text1.classList.add('visible');
  }, 1000));
  
  // [3.5s] - Dual reveal: Fade in second statement right below it
  secretTimeouts.push(setTimeout(() => {
    if (text2) text2.classList.add('visible');
  }, 3500));
  
  // [6.0s] - Fade out both
  secretTimeouts.push(setTimeout(() => {
    if (text1) text1.classList.remove('visible');
    if (text2) text2.classList.remove('visible');
  }, 6000));
  
  // [7.5s] - Fade in third statement
  secretTimeouts.push(setTimeout(() => {
    if (text3) text3.classList.add('visible');
  }, 7500));
  
  // [9.5s] - Fade out third statement
  secretTimeouts.push(setTimeout(() => {
    if (text3) text3.classList.remove('visible');
  }, 9500));
  
  // [10.5s] - Trigger Phase 2 transition
  secretTimeouts.push(setTimeout(() => {
    transitionToPhase2();
  }, 10500));
}
