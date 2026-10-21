(function () {
  const items = window.LOCOFO_CATALOG || [];
  const grid = document.getElementById('productGrid');
  const countEl = document.getElementById('listingCount');

  if (!grid) return;

  function thumbMarkup(item) {
    if (item.thumb) {
      return `<img class="card-img" src="${item.thumb}" alt="" width="320" height="240" loading="lazy" />`;
    }
    return `<div class="card-placeholder ${item.placeholder}" role="img" aria-label="Product image placeholder"></div>`;
  }

  function cardInner(item) {
    const priceLine = '<p class="card-price">Wholesale · price on request</p>';
    const meta = `<p class="card-ref">${item.ref} · ${item.variant}</p>`;
    const badge = `<span class="card-badge">${item.badge}</span>`;
    const title = `<h2 class="card-title">${item.name}</h2>`;

    if (item.live) {
      return `
        <a class="product-card product-card--live" href="${item.href}">
          <div class="card-media">${thumbMarkup(item)}${badge}</div>
          <div class="card-body">
            ${title}
            ${meta}
            ${priceLine}
            <span class="card-cta">View interactive PDP →</span>
          </div>
        </a>
      `;
    }

    return `
      <article class="product-card product-card--mock" aria-label="${item.name} — demo only">
        <div class="card-media">${thumbMarkup(item)}${badge}</div>
        <div class="card-body">
          ${title}
          ${meta}
          ${priceLine}
          <span class="card-demo-tag">Demo listing only</span>
        </div>
      </article>
    `;
  }

  grid.innerHTML = items.map((item) => `<li>${cardInner(item)}</li>`).join('');

  const liveCount = items.filter((i) => i.live).length;
  if (countEl) {
    countEl.textContent = `${items.length} styles shown · ${liveCount} with full interactive PDP in this demo`;
  }
})();
