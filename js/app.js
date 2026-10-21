(function () {
  const product = window.LOCOFO_PRODUCT;
  const catalog = window.LOCOFO_PRODUCTS || {};
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

  const tabOrder = ['desc', 'details', 'weight', 'colors'];
  const tabFrameIndex = { desc: 0, details: 1, weight: 2, colors: 3 };
  const panelStack = document.querySelector('.tab-panels');
  let activeTab = tabs.find((tab) => tab.classList.contains('on'))?.dataset.tab || 'desc';

  function fitPanelStack() {
    if (!panelStack || !panels.length) return;
    let max = 0;
    panels.forEach((panel) => {
      max = Math.max(max, panel.scrollHeight);
    });
    if (max) panelStack.style.height = `${max}px`;
  }

  panels.forEach((panel) => {
    panel.hidden = false;
    const on = panel.classList.contains('active');
    panel.inert = !on;
    panel.setAttribute('aria-hidden', on ? 'false' : 'true');
  });
  fitPanelStack();
  document.fonts?.ready.then(fitPanelStack);
  window.addEventListener('resize', fitPanelStack);

  function highlightTab(name) {
    if (!name || name === activeTab || !panels.length) return;
    const dir = tabOrder.indexOf(name) > tabOrder.indexOf(activeTab) ? 1 : -1;
    activeTab = name;

    tabs.forEach((tab) => {
      const on = tab.dataset.tab === name;
      tab.classList.toggle('on', on);
      tab.setAttribute('aria-selected', on ? 'true' : 'false');
    });

    panels.forEach((panel) => {
      const on = panel.dataset.panel === name;
      if (on) {
        panel.classList.remove('leave-up', 'leave-down');
        panel.inert = false;
        panel.setAttribute('aria-hidden', 'false');
        panel.style.transition = 'none';
        panel.style.transform = `translateY(${dir * 18}px)`;
        panel.style.opacity = '0';
        panel.classList.add('active');
        panel.offsetHeight;
        panel.style.transition = '';
        panel.style.transform = '';
        panel.style.opacity = '';
      } else {
        if (panel.classList.contains('active')) {
          panel.classList.add(dir > 0 ? 'leave-up' : 'leave-down');
        }
        panel.classList.remove('active');
        panel.inert = true;
        panel.setAttribute('aria-hidden', 'true');
      }
    });
  }

  function switchTab(name) {
    highlightTab(name);
    const frame = tabFrameIndex[name];
    if (frame != null && window.LocofoSpin) {
      window.LocofoSpin.setFrame(frame);
    }
  }

  window.LocofoSpin?.onFrame((index) => {
    const name = tabOrder[Math.min(index, tabOrder.length - 1)];
    if (name) highlightTab(name);
  });

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => switchTab(tab.dataset.tab));
  });

  function stepTab(direction) {
    const index = tabOrder.indexOf(activeTab);
    const next = tabOrder[index + direction];
    if (!next) return false;
    switchTab(next);
    return true;
  }

  const scrollRoot = document.getElementById('pdp');
  if (scrollRoot && tabs.length) {
    let wheelAccum = 0;
    let lastWheel = 0;
    let lockedUntil = 0;
    const wheelThreshold = 48;
    const lockMs = 560;

    function canStep(direction) {
      const index = tabOrder.indexOf(activeTab);
      return direction > 0 ? index < tabOrder.length - 1 : index > 0;
    }

    function wheelPixels(event) {
      if (event.deltaMode === 1) return event.deltaY * 16;
      if (event.deltaMode === 2) return event.deltaY * window.innerHeight;
      return event.deltaY;
    }

    function tryStep(direction) {
      if (!canStep(direction)) return false;
      const now = performance.now();
      if (now < lockedUntil) return true;
      if (!stepTab(direction)) return false;
      lockedUntil = now + lockMs;
      return true;
    }

    scrollRoot.addEventListener(
      'wheel',
      (event) => {
        if (document.body.classList.contains('drawer-open')) return;
        if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;

        const delta = wheelPixels(event);
        if (!delta) return;
        const direction = delta > 0 ? 1 : -1;
        if (!canStep(direction)) return;

        event.preventDefault();
        const now = performance.now();
        if (now < lockedUntil) return;
        if (now - lastWheel > 140) wheelAccum = 0;
        lastWheel = now;
        if (wheelAccum && Math.sign(wheelAccum) !== direction) wheelAccum = 0;
        wheelAccum += delta;
        if (Math.abs(wheelAccum) < wheelThreshold) return;
        wheelAccum = 0;
        tryStep(direction);
      },
      { passive: false }
    );

    let touchY = 0;
    let touchX = 0;
    let touchArmed = false;

    scrollRoot.addEventListener(
      'touchstart',
      (event) => {
        if (event.touches.length !== 1) return;
        touchY = event.touches[0].clientY;
        touchX = event.touches[0].clientX;
        touchArmed = true;
      },
      { passive: true }
    );

    scrollRoot.addEventListener(
      'touchmove',
      (event) => {
        if (!touchArmed || event.touches.length !== 1) return;
        if (document.body.classList.contains('drawer-open')) return;
        const dy = touchY - event.touches[0].clientY;
        const dx = touchX - event.touches[0].clientX;
        if (Math.abs(dy) < 42 || Math.abs(dx) > Math.abs(dy)) return;
        touchArmed = false;
        const direction = dy > 0 ? 1 : -1;
        if (tryStep(direction)) event.preventDefault();
      },
      { passive: false }
    );

    scrollRoot.addEventListener('touchend', () => {
      touchArmed = false;
    });
    scrollRoot.addEventListener('touchcancel', () => {
      touchArmed = false;
    });
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function productCardHtml(p) {
    return `
      <article class="shortlist-card" data-id="${escapeHtml(p.id)}">
        <img class="shortlist-thumb" src="${escapeHtml(p.thumb)}" alt="" width="72" height="72" />
        <div class="shortlist-meta">
          <p class="shortlist-title">${escapeHtml(p.title)}</p>
          <p class="shortlist-sub">${escapeHtml(p.id)} · ${escapeHtml(p.variant)}</p>
          <button type="button" class="link-remove" data-remove="${escapeHtml(p.id)}">Remove</button>
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
          '<p class="shortlist-empty">No products yet. Open MH900, MH500, or Anti-Fog and save it to shortlist.</p>';
      } else {
        listEl.innerHTML = ids
          .map((id) => {
            const p = catalog[id];
            return p ? productCardHtml(p) : '';
          })
          .join('');
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
        count === 0
          ? '0 products ready to export'
          : `${count} product${count === 1 ? '' : 's'} ready to export`;
    }
    if (drawerExport) {
      drawerExport.textContent = `Export PDF · ${label}`;
      drawerExport.setAttribute('aria-disabled', count === 0 ? 'true' : 'false');
      drawerExport.classList.toggle('is-disabled', count === 0);
    }
  }

  function updateSaveButton() {
    if (!saveBtn || !product) return;
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
    if (!product) return;
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
