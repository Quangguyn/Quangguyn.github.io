function filterProducts() {
  const minPrice = parseInt(document.getElementById("min-price").value) || 0;
  const maxPrice =
    parseInt(document.getElementById("max-price").value) || Infinity;

  const products = document.querySelectorAll(".product");
  products.forEach((product) => {
    const price = parseInt(product.getAttribute("data-price"));
    if (price >= minPrice && price <= maxPrice) {
      product.classList.remove("hidden");
    } else {
      product.classList.add("hidden");
    }
  });
}
