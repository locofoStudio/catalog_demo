(function () {
  const product = window.LOCOFO_PRODUCT;
  const shortlist = window.LocofoShortlist;
  const ui = window.LocofoShortlistUI;

  const saveBtn = document.getElementById('saveShortlist');
  if (!product || !saveBtn) return;

  function updateSaveButton() {
    const saved = shortlist.has(product.id);
    saveBtn.textContent = saved ? 'Saved to shortlist' : 'Save to shortlist';
    saveBtn.classList.toggle('is-saved', saved);
  }

  if (ui) {
    ui.onRemove = updateSaveButton;
  }

  saveBtn.addEventListener('click', () => {
    shortlist.add(product.id);
    ui?.renderShortlist();
    updateSaveButton();
    ui?.openDrawer();
  });

  updateSaveButton();
})();
