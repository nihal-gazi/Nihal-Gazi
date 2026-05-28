import { loop } from './core/loop.js';

// Import Home Sections
import { topSection } from './sections/top.js';
import { beyondSection } from './sections/beyond.js';
import { automationSection } from './sections/automation.js';
import { towardsSection } from './sections/towards.js';
import { theoreticalSection } from './sections/theoretical.js';
import { limitSection } from './sections/limit.js';
import { excellenceSection } from './sections/excellence.js';

// Import Data Room Sections
import { aboutSection } from './sections/about.js';
import { projectsSection } from './sections/projects.js';
import { honorsSection } from './sections/honors.js';
import { secretSection, runSecretTimeline, clearSecretTimeline } from './sections/secret.js';

// Import Canvas Renderers
import { AutomataRenderer } from './renderers/automata.js';
import { DiffusionRenderer } from './renderers/diffusion.js';
import { TheoreticalRenderer } from './renderers/theoretical.js';
import { LimitFluidRenderer } from './renderers/limitFluid.js';

console.log("System SPA Initialized: Excellence or nothing.");

// Active instances tracker for GC and cleanup
let automataInstance = null;
let diffusionInstance = null;
let theoreticalInstance = null;
let limitFluidInstance = null;

// unmounting and GC flushing
function cleanUpActiveView() {
  // 1. Terminate all secret timelines
  clearSecretTimeline();

  // 2. Terminate the physics loop
  loop.stop();
  loop.clear();

  // 3. Destroy and disconnect renderers
  if (automataInstance) {
    automataInstance.destroy();
    automataInstance = null;
  }
  if (diffusionInstance) {
    diffusionInstance.destroy();
    diffusionInstance = null;
  }
  if (theoreticalInstance) {
    theoreticalInstance.destroy();
    theoreticalInstance = null;
  }
  if (limitFluidInstance) {
    limitFluidInstance.destroy();
    limitFluidInstance = null;
  }
  
  // 3.8 Remove dynamic SEO JSON-LD block
  const seoScript = document.getElementById('about-jsonld');
  if (seoScript) {
    seoScript.remove();
  }

  // 4. Clean container and posture scroll position
  const container = document.getElementById('scroll-container');
  if (container) {
    container.innerHTML = '';
  }
  window.scrollTo({ top: 0, behavior: 'instant' });
  document.body.style.overflow = '';
}

// Router
function handleRoute() {
  cleanUpActiveView();

  const hash = window.location.hash || '#/';
  const container = document.getElementById('scroll-container');
  if (!container) return;

  // Toggle active class on Utopian Nav links
  const navItems = document.querySelectorAll('#nav-list li');
  navItems.forEach(item => {
    item.classList.remove('active');
    const text = item.textContent.trim().toLowerCase();
    
    if (hash === '#/' || hash === '#/home') {
      if (text === 'home') item.classList.add('active');
    } else {
      if (hash === '#/' + text) item.classList.add('active');
    }
  });

  if (hash === '#/' || hash === '#/home') {
    // 1. Mount Home Sections
    container.innerHTML = topSection + beyondSection + automationSection + towardsSection + theoreticalSection + limitSection + excellenceSection;

    // 2. Initialize Physics/Canvas Engines
    automataInstance = new AutomataRenderer('canvas-automation');
    diffusionInstance = new DiffusionRenderer('canvas-diffusion');
    theoreticalInstance = new TheoreticalRenderer('canvas-theoretical', 'hud-pid');
    limitFluidInstance = new LimitFluidRenderer('canvas-limit');

    // 3. Register callbacks in loop
    loop.add((dt, time) => {
      if (automataInstance) automataInstance.update(dt, time);
      if (diffusionInstance) diffusionInstance.update(dt, time);
      if (theoreticalInstance) theoreticalInstance.update(dt, time);
      if (limitFluidInstance) limitFluidInstance.update(dt, time);
    });

    // 4. Ignite
    loop.start();
  } else if (hash === '#/about') {
    container.innerHTML = aboutSection;
    
    // Dynamically calculate age based on DOB: November 9, 2006
    const ageEl = document.getElementById('dynamic-age');
    if (ageEl) {
      const birthDate = new Date('2006-11-09');
      const today = new Date();
      let calculatedAge = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        calculatedAge--;
      }
      ageEl.textContent = calculatedAge;
    }

    // Inject dynamic JSON-LD Schema into head for Google Knowledge Panel SEO
    let script = document.getElementById('about-jsonld');
    if (!script) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = 'about-jsonld';
      script.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Nihal Gazi",
        "jobTitle": [
          "AI Researcher",
          "Hardware Engineer",
          "Founder"
        ],
        "worksFor": {
          "@type": "Organization",
          "name": "KindSynapse"
        },
        "alumniOf": {
          "@type": "EducationalOrganization",
          "name": "Institute of Engineering and Management"
        },
        "homeLocation": {
          "@type": "Place",
          "name": "Kolkata, West Bengal, India"
        },
        "description": "AI Researcher specializing in CPU-efficient neural architectures, 1-bit weight quantization, and computational physics.",
        "sameAs": [
          "https://huggingface.co/NihalGazi",
          "https://github.com/nihal-gazi",
          "https://x.com/NihalGazi_",
          "https://www.linkedin.com/in/nihal-gazi/"
        ]
      }, null, 2);
      document.head.appendChild(script);
    }
  } else if (hash === '#/projects') {
    container.innerHTML = projectsSection;
  } else if (hash === '#/honors') {
    container.innerHTML = honorsSection;
  } else if (hash === '#/secret') {
    document.body.style.overflow = 'hidden';
    container.innerHTML = secretSection;
    runSecretTimeline();
  } else {
    // Standard fallback route
    window.location.hash = '#/';
  }
}

// 3. Bind routing events
window.addEventListener('hashchange', handleRoute);
window.addEventListener('DOMContentLoaded', handleRoute);

// 4. Bind navbar item clicks to trigger hash routing
const navItems = document.querySelectorAll('#nav-list li');
navItems.forEach(item => {
  item.addEventListener('click', () => {
    const route = item.textContent.trim().toLowerCase();
    if (route === 'home') {
      window.location.hash = '#/home';
    } else {
      window.location.hash = '#/' + route;
    }
  });
});

// 5. Mobile hamburger menu toggle
const hamburger = document.getElementById('mobile-hamburger');
const nav = document.getElementById('utopian-nav');

if (hamburger && nav) {
  hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    nav.classList.toggle('open');
  });
  
  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target)) {
      nav.classList.remove('open');
    }
  });

  navItems.forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
    });
  });
}