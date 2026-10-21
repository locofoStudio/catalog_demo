(function () {
  const items = window.LocofoCatalog?.getListing() || [];
  const grid = document.getElementById('productGrid');
  const countEl = document.getElementById('listingCount');

  if (!grid) return;

  const PLACEHOLDER_LABELS = {
    mh500: 'MH500',
    af: 'AF',
    a100: 'A100',
    e500: 'E500',
  };

  function thumbMarkup(item) {
    if (item.thumb) {
      return `<img class="card-img" src="${item.thumb}" alt="" width="320" height="240" loading="lazy" />`;
    }
    const key = item.placeholder || 'sample';
    const label = PLACEHOLDER_LABELS[key] || 'Demo';
    return `<div class="card-placeholder card-placeholder--${key}" role="img" aria-label="Demo sample placeholder"><span>${label}</span></div>`;
  }

  function cardInner(item) {
    const priceLine = '<p class="card-price">Price on request</p>';
    const meta = `<p class="card-ref">${item.subtitle}</p>`;
    const tags = `<p class="card-tags">${item.tags}</p>`;
    const title = `<h2 class="card-title">${item.title}</h2>`;

    if (item.interactive) {
      const demoBadge =
        '<span class="card-demo-badge card-demo-badge--interactive">Interactive demo</span>';
      return `
        <a class="product-card product-card--interactive" href="${item.href}">
          <div class="card-media">${thumbMarkup(item)}${demoBadge}</div>
          <div class="card-body">
            ${title}
            ${meta}
            ${tags}
            ${priceLine}
          </div>
        </a>
      `;
    }

    return `
      <article class="product-card product-card--sample" aria-label="${item.title} — demo sample">
        <div class="card-media">${thumbMarkup(item)}</div>
        <div class="card-body">
          ${title}
          ${meta}
          ${tags}
          ${priceLine}
          <span class="card-demo-tag">Demo sample</span>
        </div>
      </article>
    `;
  }

  grid.innerHTML = items.map((item) => `<li>${cardInner(item)}</li>`).join('');

  if (countEl) {
    countEl.textContent =
      'B2B catalog sample for buyer presentations — only MH900 is interactive; other cards are mock samples.';
  }
})();
