import { projectsData } from '../data/projectsData.js';

function getButtonLabel(url, disabled) {
  if (disabled) {
    if (url === '#') return 'Technical Blueprint';
    return 'Academic Dossier';
  }
  if (url.includes('huggingface.co/spaces')) return 'Access HF Space';
  if (url.includes('youtube.com')) return 'Watch Interview';
  if (url.includes('github.com')) return 'Access Repository';
  if (url.includes('nihalgazi.com')) return 'Access Page';
  return 'Access Project';
}

const projectsHtml = projectsData.map(p => `
  <!-- Project Item ${p.id} -->
  <div class="project-row glass-panel">
    <div class="project-meta">
      <span class="project-id font-subsub">${p.id}</span>
      <span class="project-category font-subsub">${p.category}</span>
    </div>
    <div class="project-main">
      <h3 class="project-title font-heavy">${p.title}</h3>
      <p class="project-pitch font-body">${p.pitch}</p>
      <div class="constraint-badge-row">
        <span class="constraint-label font-subsub">CONSTRAINTS:</span>
        ${p.constraints.map(c => `
          <span class="constraint-badge font-subsub">${c}</span>
        `).join('')}
      </div>
    </div>
    <div class="project-actions">
      <a href="${p.url}" ${p.disabled ? 'class="btn-terminal disabled font-subsub" onclick="return false;"' : 'target="_blank" rel="noopener noreferrer" class="btn-terminal font-subsub"'}>
        ${getButtonLabel(p.url, p.disabled)}
      </a>
    </div>
  </div>
`).join('');

export const projectsSection = `
  <section class="dataroom-layout animate-fade-in">
    <div class="dataroom-header">
      <div class="dossier-tag font-subsub">METRIC_LOG::PROJECT_LEDGER</div>
      <h1 class="dataroom-title font-heavy">The Data Grid</h1>
    </div>
    
    <div class="projects-ledger">
      ${projectsHtml}
    </div>
  </section>
`;
