let cart, loginToken;

try {
  cart =
    localStorage.getItem("cart") === null
      ? []
      : JSON.parse(localStorage.getItem("cart"));
  loginToken =
    localStorage.getItem("login") === null
      ? ""
      : JSON.parse(localStorage.getItem("login"));
} catch (error) {
  console.error(error);
}

// Update first navbar
const loggedInButton = document.getElementById("loggedIn");
const notLoggedInButton = document.getElementById("notLoggedIn");
const usernam = document.getElementById("username");

function updateLoginButton() {
  if (loginToken === "") {
    loggedInButton.classList.add("d-none");
    notLoggedInButton.classList.remove("d-none");
  } else {
    loggedInButton.classList.remove("d-none");
    notLoggedInButton.classList.add("d-none");

    usernam.innerText = loginToken;
  }
}

// Log out function
// const logOut = document.getElementById("logOut");

// logOut.addEventListener("click", () => {
//   localStorage.removeItem("login");
// });

// Display amount of items in cart
const cartCount = document.getElementById("cartCount");
const cartCount2 = document.getElementById("cartCount2");

function updateCart() {
  const total = cart.reduce(
    (accumulator, currentValue) => accumulator + (currentValue == null ? 0 : 1),
    0
  );
  cartCount.innerText = total;
  if (cartCount2 != null) {
    cartCount2.innerText = total;
  }
}

// Fixed cart button
const fixedCart = document.getElementById("fixedCart");

if (fixedCart != null) {
  window.addEventListener("scroll", () => {
    if (window.scrollY >= 200) {
      fixedCart.classList.remove("d-none");
    } else {
      fixedCart.classList.add("d-none");
    }
  });
}

function handleAddBookEvent(id) {
  if (cart[id] == null) {
    cart[id] = {
      id: id,
      amount: 1,
    };
  } else {
    cart[id].amount = cart[id].amount + 1;
  }
  localStorage.setItem("cart", JSON.stringify(cart));

  updateCart();
}

function formatPrice(price) {
  let preRes = new Intl.NumberFormat().format(price);
  return preRes.replaceAll(",", ".");
}

// updateLoginButton();
updateCart();

document.addEventListener("DOMContentLoaded", () => {
  const productContainer = document.getElementById("ourshelf");

  // Lắng nghe sự kiện click trên container chứa các sản phẩm
  productContainer.addEventListener("click", (event) => {
    // Kiểm tra xem phần tử được click có phải là nút "Thêm vào giỏ" không
    const button = event.target.closest(".add-button");
    if (!button) return;

    // Lấy ID sản phẩm từ thuộc tính data-id của nút
    const id = parseInt(button.getAttribute("data-id"));
    const product = filteredProducts.find((item) => item.id === id);

    if (product) {
      // Gọi hàm xử lý thêm sản phẩm vào giỏ
      handleAddBookEvent(id);

      // Cập nhật nội dung trong modal
      document.getElementById("modalBody").firstElementChild.innerText = `"${product.name}" đã thêm vào giỏ hàng!`;

      // Hiển thị modal
      const addBookModal = new bootstrap.Modal(document.getElementById("addBookModal"));
      addBookModal.show();
    } else {
      console.error("Sản phẩm không tìm thấy, id:", id);
    }
  });
});
