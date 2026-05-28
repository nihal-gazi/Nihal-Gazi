import { honorsData } from '../data/honorsData.js';

const honorsHtml = honorsData.map(h => {
  let proofsHtml = '';
  if (h.proofs && h.proofs.length > 0) {
    const isMultiple = h.proofs.length > 1;
    proofsHtml = `
      <div class="proof-gallery ${isMultiple ? 'multiple-proofs' : ''}">
        ${h.proofs.map(p => `
          <figure class="proof-figure">
            <img src="${p.src}" alt="${p.alt}" class="proof-image" />
            <figcaption class="proof-caption font-subsub">${p.caption}</figcaption>
          </figure>
        `).join('')}
      </div>
    `;
  }

  return `
    <!-- Honor Item: ${h.title} -->
    <div class="honor-row glass-panel">
      <div class="honor-metric font-subsub">${h.metric}</div>
      <div class="honor-details">
        <div class="honor-header-row">
          <h3 class="honor-title font-heavy">${h.title}</h3>
          <span class="honor-date font-subsub">${h.date}</span>
        </div>
        <p class="honor-desc font-body">${h.desc}</p>
        <div class="honor-hash font-mono">${h.hash}</div>
        ${proofsHtml}
      </div>
    </div>
  `;
}).join('');

export const honorsSection = `
  <section class="dataroom-layout animate-fade-in">
    <div class="dataroom-header">
      <div class="dossier-tag font-subsub">METRIC_LOG::HONORS_LEDGER</div>
      <h1 class="dataroom-title font-heavy">The Verification Room</h1>
    </div>
    
    <div class="honors-ledger">
      ${honorsHtml}
    </div>
  </section>
`;
