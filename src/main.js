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
import { publicationsSection } from './sections/publications.js';
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
  
  // Prune publications custom JSON-LD block
  const pubSchema = document.getElementById('publications-jsonld');
  if (pubSchema) pubSchema.remove();

  // Note: Global static JSON-LD block is kept in index.html to ensure complete indexing on all page accesses.

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

  const path = window.location.pathname || '/';
  const container = document.getElementById('scroll-container');
  if (!container) return;

  const isHome = path === '/' || path === '/home' || path.endsWith('/index.html');

  // Toggle active class on Utopian Nav links
  const navItems = document.querySelectorAll('#nav-list li');
  navItems.forEach(item => {
    item.classList.remove('active');
    const text = item.textContent.trim().toLowerCase();
    
    if (isHome) {
      if (text === 'home') item.classList.add('active');
    } else {
      if (path === '/' + text || path.endsWith('/' + text)) item.classList.add('active');
    }
  });

  if (isHome) {
    document.title = "Nihal Gazi - AI Researcher, Developer & Founder";
    
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
  } else if (path === '/about' || path.endsWith('/about')) {
    document.title = "About Nihal Gazi - AI Research & Core Philosophy";
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
  } else if (path === '/projects' || path.endsWith('/projects')) {
    document.title = "Nihal Gazi - AI Projects & Custom Architectures";
    container.innerHTML = projectsSection;
  } else if (path === '/publications' || path.endsWith('/publications')) {
    document.title = "Nihal Gazi - Peer-Reviewed Academic Publications & Research";
    container.innerHTML = publicationsSection;
    
    // Inject dynamic ScholarlyArticle JSON-LD schema
    if (!document.getElementById('publications-jsonld')) {
      const script = document.createElement('script');
      script.id = 'publications-jsonld';
      script.type = 'application/ld+json';
      script.text = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ScholarlyArticle",
        "headline": "ARGUS: The AI Eye for CERN - Solving Extreme Computational Physics",
        "author": [
          {
            "@type": "Person",
            "name": "Nihal Gazi"
          },
          {
            "@type": "Person",
            "name": "Aditya K. Biswas"
          },
          {
            "@type": "Person",
            "name": "Aihik Basu"
          },
          {
            "@type": "Person",
            "name": "Anirban Chattopadhyay"
          },
          {
            "@type": "Person",
            "name": "Sayan Pratihar"
          }
        ],
        "publisher": {
          "@type": "Organization",
          "name": "EPJ Web of Conferences"
        },
        "datePublished": "2026-05-29",
        "isPartOf": {
          "@type": "PublicationIssue",
          "issueNumber": "370"
        },
        "sameAs": "https://doi.org/10.1051/epjconf/202637001032"
      }, null, 2);
      document.head.appendChild(script);
    }
  } else if (path === '/honors' || path.endsWith('/honors')) {
    document.title = "Nihal Gazi - Honors, Awards & Academic Research";
    container.innerHTML = honorsSection;
  } else if (path === '/secret' || path.endsWith('/secret')) {
    document.title = "Nihal Gazi - Deep Sandbox & Hidden Timeline";
    document.body.style.overflow = 'hidden';
    container.innerHTML = secretSection;
    runSecretTimeline();
  } else {
    // Standard fallback route
    window.history.replaceState(null, '', '/');
    handleRoute();
  }
}

// 3. Bind routing events
window.addEventListener('popstate', handleRoute);
window.addEventListener('DOMContentLoaded', handleRoute);

// 4. Bind navbar item clicks to trigger history routing
const navItems = document.querySelectorAll('#nav-list li');
navItems.forEach(item => {
  item.addEventListener('click', () => {
    const route = item.textContent.trim().toLowerCase();
    const targetPath = route === 'home' ? '/' : '/' + route;
    if (window.location.pathname !== targetPath) {
      window.history.pushState(null, '', targetPath);
      handleRoute();
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