(function () {
  const product = window.LOCOFO_PRODUCT;
  const shortlist = window.LocofoShortlist;

  const countEl = document.getElementById('shortlistCount');
  const drawer = document.getElementById('shortlistDrawer');
  const backdrop = document.getElementById('drawerBackdrop');
  const listEl = document.getElementById('shortlistItems');
  const drawerStatus = document.getElementById('drawerStatus');
  const drawerExport = document.getElementById('drawerExport');
  const openNav = document.getElementById('openShortlistNav');
  const closeBtn = document.getElementById('closeShortlist');

  function productCardHtml() {
    return `
      <article class="shortlist-card" data-id="${product.id}">
        <img class="shortlist-thumb" src="${product.thumb}" alt="" width="72" height="72" />
        <div class="shortlist-meta">
          <p class="shortlist-title">${product.title}</p>
          <p class="shortlist-sub">${product.id} · ${product.variant}</p>
          <a class="shortlist-view" href="product.html">View product</a>
          <button type="button" class="link-remove" data-remove="${product.id}">Remove</button>
        </div>
      </article>
    `;
  }

  function renderShortlist() {
    const ids = shortlist.getIds();
    const count = ids.length;
    if (countEl) countEl.textContent = String(count);

    if (listEl) {
      if (count === 0) {
        listEl.innerHTML =
          '<p class="shortlist-empty">No products yet. Open the MH900 card from Products and save to shortlist.</p>';
      } else {
        listEl.innerHTML = ids.includes(product.id) ? productCardHtml() : '';
      }
      listEl.querySelectorAll('[data-remove]').forEach((btn) => {
        btn.addEventListener('click', () => {
          shortlist.remove(btn.dataset.remove);
          renderShortlist();
          window.LocofoShortlistUI?.onRemove?.();
        });
      });
    }

    const label = count === 1 ? '1 product' : `${count} products`;
    if (drawerStatus) {
      drawerStatus.textContent =
        count === 0 ? '0 products ready to export' : `${count} product${count === 1 ? '' : 's'} ready to export`;
    }
    if (drawerExport) {
      drawerExport.textContent = `Export PDF · ${label}`;
      drawerExport.setAttribute('aria-disabled', count === 0 ? 'true' : 'false');
      drawerExport.classList.toggle('is-disabled', count === 0);
    }
  }

  function openDrawer() {
    if (!drawer || !backdrop) return;
    drawer.hidden = false;
    backdrop.hidden = false;
    document.body.classList.add('drawer-open');
    closeBtn?.focus();
  }

  function closeDrawer() {
    if (!drawer || !backdrop) return;
    drawer.hidden = true;
    backdrop.hidden = true;
    document.body.classList.remove('drawer-open');
  }

  openNav?.addEventListener('click', () => {
    renderShortlist();
    openDrawer();
  });

  closeBtn?.addEventListener('click', closeDrawer);
  backdrop?.addEventListener('click', closeDrawer);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.body.classList.contains('drawer-open')) {
      closeDrawer();
    }
  });

  window.LocofoShortlistUI = {
    renderShortlist,
    openDrawer,
    closeDrawer,
    onRemove: null,
  };

  renderShortlist();
})();
