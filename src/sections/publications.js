import { publicationsData } from '../data/publicationsData.js';

const publicationsHtml = publicationsData.map(pub => {
  const formattedAuthors = pub.authors.map(author => {
    if (author.isMe) {
      return `<strong>${author.name}</strong>`;
    }
    return author.name;
  }).join(', ');

  const metaHtml = `
    <span><strong>Journal / Publisher:</strong> ${pub.publisher}</span>
    <span><strong>Conference:</strong> ${pub.conference}</span>
    <span><strong>Scope:</strong> ${pub.scope}</span>
  `;

  const actionsHtml = pub.actions ? `
    <div class="pub-actions">
      ${pub.actions.map(act => `
        <a href="${act.url}" target="_blank" rel="noopener noreferrer" class="btn-academic ${act.isSecondary ? 'secondary' : ''} font-subsub">
          ${act.label}
        </a>
      `).join('')}
    </div>
  ` : '';

  return `
    <!-- Publication Item: ${pub.id} -->
    <div class="publication-card">
      <div class="pub-status-row">
        <span class="pub-tag ${pub.status}">${pub.statusLabel}</span>
        <span class="pub-date font-subsub">${pub.date}</span>
      </div>
      <h2 class="pub-title font-heavy">${pub.title}</h2>
      <p class="pub-authors font-body">
        ${formattedAuthors}
      </p>
      <div class="pub-meta-info font-body">
        ${metaHtml}
      </div>
      ${actionsHtml}
    </div>
  `;
}).join('');

export const publicationsSection = `
  <section class="dataroom-layout animate-fade-in">
    <div class="dataroom-header">
      <div class="dossier-tag font-subsub">INDEX_LOG::ACADEMIC_LEDGER</div>
      <h1 class="dataroom-title font-heavy">Scholarly Index</h1>
    </div>
    
    <div class="publications-ledger">
      ${publicationsHtml}
    </div>
  </section>
`;
