(function () {
  const product = window.LOCOFO_PRODUCT;
  const shortlist = window.LocofoShortlist;
  const ui = window.LocofoShortlistUI;

  const saveBtn = document.getElementById('saveShortlist');
  const tabs = [...document.querySelectorAll('.tabs .tab')];
  const panels = [...document.querySelectorAll('.tab-panel')];

  if (!tabs.length) return;

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

  function updateSaveButton() {
    if (!saveBtn) return;
    const saved = shortlist.has(product.id);
    saveBtn.textContent = saved ? 'Saved to shortlist' : 'Save to shortlist';
    saveBtn.classList.toggle('is-saved', saved);
  }

  if (ui) {
    ui.onRemove = updateSaveButton;
  }

  saveBtn?.addEventListener('click', () => {
    shortlist.add(product.id);
    ui?.renderShortlist();
    updateSaveButton();
    ui?.openDrawer();
  });

  updateSaveButton();
})();
