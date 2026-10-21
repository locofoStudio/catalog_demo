(function () {
  const product = window.LOCOFO_PRODUCT;
  const shortlist = window.LocofoShortlist;

  const countEl = document.getElementById('shortlistCount');
  const drawer = document.getElementById('shortlistDrawer');
  const backdrop = document.getElementById('drawerBackdrop');
  const listEl = document.getElementById('shortlistItems');
  const drawerStatus = document.getElementById('drawerStatus');
  const drawerExport = document.getElementById('drawerExport');
  const saveBtn = document.getElementById('saveShortlist');
  const openNav = document.getElementById('openShortlistNav');
  const closeBtn = document.getElementById('closeShortlist');

  const tabs = [...document.querySelectorAll('.tabs .tab')];
  const panels = [...document.querySelectorAll('.tab-panel')];

  function switchTab(name) {
    tabs.forEach((tab) => {
      const on = tab.dataset.tab === name;
      tab.classList.toggle('on', on);
      tab.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    panels.forEach((panel) => {
      const on = panel.dataset.panel === name;
      panel.classList.toggle('active', on);
      panel.hidden = !on;
    });
  }

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => switchTab(tab.dataset.tab));
  });

  function productCardHtml() {
    return `
      <article class="shortlist-card" data-id="${product.id}">
        <img class="shortlist-thumb" src="${product.thumb}" alt="" width="72" height="72" />
        <div class="shortlist-meta">
          <p class="shortlist-title">${product.title}</p>
          <p class="shortlist-sub">${product.id} · ${product.variant}</p>
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
        listEl.innerHTML = '<p class="shortlist-empty">No products yet. Save MH900 from the product page.</p>';
      } else {
        listEl.innerHTML = ids.includes(product.id) ? productCardHtml() : '';
        ids
          .filter((id) => id !== product.id)
          .forEach(() => {
            /* future SKUs */
          });
      }
      listEl.querySelectorAll('[data-remove]').forEach((btn) => {
        btn.addEventListener('click', () => {
          shortlist.remove(btn.dataset.remove);
          renderShortlist();
          updateSaveButton();
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

  function updateSaveButton() {
    if (!saveBtn) return;
    const saved = shortlist.has(product.id);
    saveBtn.textContent = saved ? 'Saved to shortlist' : 'Save to shortlist';
    saveBtn.classList.toggle('is-saved', saved);
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

  saveBtn?.addEventListener('click', () => {
    shortlist.add(product.id);
    renderShortlist();
    updateSaveButton();
    openDrawer();
  });

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

  renderShortlist();
  updateSaveButton();
})();
