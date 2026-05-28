import { aboutData } from '../data/aboutData.js';

function parseTextWithProofs(text) {
  let formatted = text.replace(/\[PROOF_LINK:([^\]]+?):([^:]+)\]/g, (match, url, label) => {
    return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="inline-proof-link">${label}</a>`;
  });
  formatted = formatted.replace(/\[PROOF_LINK_DISABLED:([^\]]+)\]/g, (match, label) => {
    return `<a href="#" class="inline-proof-link disabled" onclick="return false;">${label}</a>`;
  });
  return formatted;
}

const achievementsHtml = aboutData.achievementsList.map(a => `
  <li class="font-body">${parseTextWithProofs(a)}</li>
`).join('');

const achievements2026Html = aboutData.achievementsList2026.map(a => `
  <li class="font-body">${parseTextWithProofs(a)}</li>
`).join('');

const factsHtml = aboutData.quickFacts.map(f => `
  <tr>
    <td class="font-subsub">${f.label}:</td>
    <td class="font-light">${f.value}</td>
  </tr>
`).join('');

const evidenceHtml = aboutData.evidenceLedger.map(b => `
  <a href="${b.url}" ${b.disabled ? 'class="ledger-btn disabled font-subsub" onclick="return false;"' : 'target="_blank" rel="noopener noreferrer" class="ledger-btn font-subsub"'}>
    ${b.label}
  </a>
`).join('');

export const aboutSection = `
  <section class="dataroom-layout animate-fade-in">
    <div class="dataroom-header">
      <div class="dossier-tag font-subsub">ABOUT ME</div>
      <h1 class="dataroom-title font-heavy">${aboutData.name}</h1>
      <p class="font-light" style="font-size: 1.15rem; color: #a8e6cf; margin-top: 0.5rem; letter-spacing: 0.05em;">
        ${aboutData.subtitle} &nbsp;|&nbsp; <span style="color: #888888;">${aboutData.location}</span>
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
              ${parseTextWithProofs(aboutData.journey)}
            </p>
          </div>
        </div>

        <!-- Education & Key Achievements Dossier -->
        <div class="narrative-journal glass-panel" style="gap: 1.5rem;">
          <h3 class="phase-hdr font-heavy" style="margin-bottom: 0.5rem;">${aboutData.achievementsHeader}</h3>
          <p class="narrative-p font-body" style="color: #888888; margin-bottom: 0.5rem;">
            ${aboutData.achievementsSub}
          </p>
          <div class="duality-split" style="gap: 0;">
            <ul style="margin-bottom: 1.5rem;">
              ${achievementsHtml}
            </ul>
          </div>
          <div class="duality-divider" style="margin-bottom: 1rem;"></div>
          <p class="narrative-p font-body" style="color: #888888; margin-bottom: 0.5rem;">
            ${aboutData.achievementsHeader2026}
          </p>
          <div class="duality-split" style="gap: 0;">
            <ul style="margin-bottom: 1rem;">
              ${achievements2026Html}
            </ul>
          </div>
          <p class="narrative-p font-body" style="margin-top: 0.5rem;">
            ${aboutData.foundingClosing}
          </p>
        </div>

        <!-- Current Focus Section -->
        <div class="narrative-journal glass-panel">
          <div class="narrative-phase-block">
            <h3 class="phase-hdr font-heavy" style="margin-bottom: 1rem;">${aboutData.focusHeader}</h3>
            <p class="narrative-p font-body">
              ${aboutData.focusText}
            </p>
          </div>
        </div>

        <!-- Quick Facts dossier -->
        <div class="dataroom-card glass-panel" style="margin-bottom: 0;">
          <div class="card-header" style="margin-bottom: 1rem;">
            <span class="card-tag font-subsub">// ${aboutData.factsHeader.toUpperCase()} //</span>
          </div>
          <div class="card-body">
            <table class="dossier-table">
              ${factsHtml}
            </table>
          </div>
        </div>

        <!-- Outbound Evidence Ledger -->
        <div class="evidence-ledger-card glass-panel">
          <div class="ledger-header">
            <span class="card-tag font-subsub">// VERIFIABLE EVIDENCE LEDGER //</span>
          </div>
          <div class="ledger-grid">
            ${evidenceHtml}
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
`;
