let currentPage = 1;
const itemsPerPage = 8; // Mỗi trang sẽ hiển thị 8 sản phẩm
let filteredProducts = Ao; // Mảng lưu trữ các sản phẩm sau khi lọc (ban đầu là tất cả sản phẩm)

// Hàm hiển thị sản phẩm
function displayProducts(products) {
  const productContainer = document.getElementById("ourshelf");
  const paginationContainer = document.getElementById("pagination");
  productContainer.innerHTML = ""; // Xóa hết sản phẩm cũ

  // Nếu không có sản phẩm nào, hiển thị thông báo "Không có sản phẩm nào"
  if (products.length === 0) {
    productContainer.innerHTML =
      '<p class="notification">Không có sản phẩm nào phù hợp với bộ lọc.</p>';
    paginationContainer.innerHTML = ""; // Nếu không có sản phẩm, không hiển thị phân trang
    return;
  }

  // Tính toán số trang cần có
  const totalPages = Math.ceil(products.length / itemsPerPage);

  // Lấy sản phẩm theo trang hiện tại
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const productsToShow = products.slice(startIndex, endIndex);

  // Hiển thị các sản phẩm của trang hiện tại
  productsToShow.forEach((product) => {
    const productCard = `
  <div class="mb-5 col">
    <div class="card d-block hvr-glow">
      <a href="../pages/chitietsp.html">
        <div class="image-hover-container">
          <img src="../assets/images/Ao/${product.url}.jpg" alt="${
      product.name
    }" class="default-image" />
          <img src="../assets/images/Ao/${
            product.url
          }.jpg" alt="Hover Image" class="hover-image" />
        </div>
        <div class="card-body ms-1">
          <div class="text-start">
            <p class="text-decoration-none text-truncate d-block fw-bold mb-2">${
              product.name
            }</p>
            <div class="d-flex justify-content-start small text-warning mb-2">
              ${"★".repeat(product.rating)}${"☆".repeat(5 - product.rating)}
            </div>
            <p>${product.price.toLocaleString()},000₫</p>
          </div>
        </div>
      </a>
      <div class="card-footer py-4 pt-0 border-top-0 bg-transparent d-flex">
        <div class="me-3">
          <button
            class="add-button btn btn-outline-dark mt-auto"
            data-id="${product.id}" 
          >Thêm vào giỏ
          </button>
        </div>
        <div class="text-start">
          <a class="btn btn-dark mt-auto" href="">Mua ngay</a>
        </div>
      </div>
    </div>
  </div>
`;
    productContainer.innerHTML += productCard;
  });

  // Hiển thị phân trang
  paginationContainer.innerHTML = "";
  for (let page = 1; page <= totalPages; page++) {
    const pageItem = document.createElement("li");
    pageItem.classList.add("page-item");
    pageItem.innerHTML = `<a class="page-link" href="#">${page}</a>`;
    paginationContainer.appendChild(pageItem);

    // Thêm sự kiện khi nhấn vào một trang
    pageItem.querySelector("a").addEventListener("click", (e) => {
      e.preventDefault();
      currentPage = page;
      displayProducts(filteredProducts); // Cập nhật lại sản phẩm khi thay đổi trang
    });
  }
}
function updateProducts() {
  filterProducts(); // Lọc sản phẩm
  displayProducts(filteredProducts); // Cập nhật hiển thị
}

// Hàm lọc sản phẩm theo dải giá
function filterProducts() {
  const searchInput = document.getElementById("searchInput");
  const searchText = searchInput.value.trim().toLowerCase(); // Lấy giá trị tìm kiếm
  let selectedPriceRanges = [];

  document.querySelectorAll(".price-filter:checked").forEach((checkbox) => {
    selectedPriceRanges.push(checkbox.value);
  });

  filteredProducts = Ao.filter((product) => {
    // Kiểm tra sản phẩm có khớp với bộ lọc giá không
    const matchesPrice =
      selectedPriceRanges.length === 0 ||
      selectedPriceRanges.some((range) => {
        switch (range) {
          case "under-150":
            return product.price < 150;
          case "150-250":
            return product.price >= 150 && product.price <= 250;
          case "250-350":
            return product.price >= 250 && product.price <= 350;
          case "350-500":
            return product.price >= 350 && product.price <= 500;
          case "above-500":
            return product.price > 500;
          default:
            return false;
        }
      });

    // Kiểm tra sản phẩm có khớp với từ khóa tìm kiếm không
    const matchesSearch = product.name.toLowerCase().includes(searchText);

    return matchesPrice && matchesSearch; // Kết hợp cả hai điều kiện
  });

  currentPage = 1; // Reset về trang đầu khi lọc lại
  displayProducts(filteredProducts); // Hiển thị lại sản phẩm
}

// Gọi hàm hiển thị sản phẩm khi trang được tải
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");

  searchInput.addEventListener("input", filterProducts); // Lọc sản phẩm khi nhập
  searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      filterProducts(); // Lọc sản phẩm khi nhấn Enter
    }
  });

  // Hiển thị sản phẩm ban đầu
  displayProducts(filteredProducts);
});

// Gắn sự kiện cho các checkbox để lọc khi người dùng thay đổi
document.querySelectorAll(".price-filter").forEach((checkbox) => {
  checkbox.addEventListener("change", filterProducts);
});
