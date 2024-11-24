document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("searchInput");
  const searchIcon = document.getElementById("searchIcon");
  const bookCards = document.querySelectorAll("#ourshelf .col");

  function filterAo() {
    const searchText = searchInput.value.trim().toLowerCase();

    bookCards.forEach((card) => {
      const bookTitle = card
        .querySelector(".fw-bold")
        .textContent.toLowerCase();
      if (bookTitle.includes(searchText)) {
        card.style.display = "";
      } else {
        card.style.display = "none";
      }
    });
  }
  searchIcon.addEventListener("click", function () {
    filterAo();
  });
  searchInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      filterAo();
    }
  });

  // Reset to initial state when search input is cleared
  searchInput.addEventListener("input", function (event) {
    const searchText = searchInput.value.trim().toLowerCase();
    if (searchText === "") {
      bookCards.forEach((card) => {
        card.style.display = ""; // Hiển thị lại tất cả các thẻ sách
      });
    }
  });
});
//HIỂN THỊ PHÂN TRANG
document.addEventListener("DOMContentLoaded", function () {
  const itemsPerPage = 8; // 2 rows * 4 items per row
  const bookCards = document.querySelectorAll("#ourshelf .col");
  const paginationContainer = document.getElementById("pagination");
  let currentPage = 1;

  function displayPage(page) {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    bookCards.forEach((card, index) => {
      if (index >= start && index < end) {
        card.style.display = "";
      } else {
        card.style.display = "none";
      }
    });
  }

  function setupPagination() {
    const totalPages = Math.ceil(bookCards.length / itemsPerPage);
    paginationContainer.innerHTML = "";
    for (let i = 1; i <= totalPages; i++) {
      const li = document.createElement("li");
      li.classList.add("page-item");
      li.innerHTML = `<a style="margin-right:1px ;" class="page-link" href="#">${i}</a>`;
      li.addEventListener("click", (event) => {
        event.preventDefault();
        currentPage = i;
        displayPage(currentPage);
        updatePagination();
      });
      const pageLink = li.querySelector("a");
      pageLink.style.backgroundColor = "black";
      pageLink.style.color = "white"; // Thêm màu chữ trắng
      pageLink.style.fontWeight = "bold"; // Thêm in đậm chữ
      paginationContainer.appendChild(li);
    }
    updatePagination();
  }

  function updatePagination() {
    const paginationItems = paginationContainer.querySelectorAll("li");
    paginationItems.forEach((item, index) => {
      if (index === currentPage - 1) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });
  }

  // Initialize the pagination
  displayPage(currentPage);
  setupPagination();
  const addBtnList = document.querySelectorAll(".add-button ");
  addBtnList.forEach((button) => {
    button.onclick = () => {
      const id = parseInt(button.nextElementSibling.value);
      handleAddBookEvent(id);
      document.getElementById(
        "modalBody"
      ).firstElementChild.innerText = `"${Ao[id].name}"`;
    };
  });
});
