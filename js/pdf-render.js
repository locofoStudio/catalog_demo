(function () {
  const catalog = window.LocofoCatalog;
  const shortlist = window.LocofoShortlist;
  const root = document.getElementById('pdfSheets');
  const notice = document.getElementById('emptyNotice');

  if (!root || !catalog) return;

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function sheetHtml(product, pageNum, total) {
    const pdf = product.pdf;
    const bullets = pdf.bullets.map((b) => `<li>${escapeHtml(b)}</li>`).join('');
    const blocks = pdf.blocks
      .map(
        (block) => `
        <section class="spec-block">
          <h2>${escapeHtml(block.title)}</h2>
          ${block.lines.map((line) => `<p>${escapeHtml(line)}</p>`).join('')}
        </section>`
      )
      .join('');
    const thumbs = pdf.thumbs
      .map(
        (src, i) =>
          `<img src="${escapeHtml(src)}" alt="${escapeHtml(product.title)} angle ${i + 1}" width="140" height="105" />`
      )
      .join('');

    return `
      <article class="sheet">
        <div class="sheet-grid">
          <div class="sheet-visual">
            <img src="${escapeHtml(pdf.hero)}" alt="${escapeHtml(pdf.heroAlt)}" class="hero-img" />
            <ul class="feature-bullets">${bullets}</ul>
          </div>
          <div class="sheet-specs">
            <p class="sheet-kicker">CUBE-STYLE SPEC SHEET</p>
            <h1 class="sheet-title">${escapeHtml(pdf.sheetTitle)}</h1>
            <p class="sheet-meta">${escapeHtml(pdf.meta)}</p>
            <p class="sheet-summary">${escapeHtml(pdf.summary)}</p>
            <div class="thumb-row">${thumbs}</div>
            ${blocks}
          </div>
        </div>
        <footer class="sheet-footer">
          <span>${pageNum}</span>
          <span class="confidential">Locofo Catalog · PRIVATE AND CONFIDENTIAL</span>
        </footer>
      </article>
    `;
  }

  let ids = shortlist.getIds().filter((id) => catalog.getProduct(id));
  const isFallback = ids.length === 0;
  if (isFallback) {
    ids = [catalog.defaultPdfId];
    if (notice) notice.hidden = false;
  }

  const products = catalog.resolveShortlistIds(ids);
  root.innerHTML = products
    .map((p, i) => sheetHtml(p, i + 1, products.length))
    .join('');

  document.title =
    products.length === 1
      ? `Locofo Catalog — ${products[0].title}`
      : `Locofo Catalog — ${products.length} product spec sheets`;
})();
