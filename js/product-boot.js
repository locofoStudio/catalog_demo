(function () {
  const id = document.body.dataset.productId;
  if (!id) return;
  const product = window.LocofoCatalog?.getProduct(id);
  if (product) {
    window.LOCOFO_PRODUCT = product;
  }
})();
