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

const addBtnList = document.querySelectorAll(".add-button");

addBtnList.forEach((button) => {
  button.onclick = () => {
    const id = parseInt(button.nextElementSibling.value);
    handleAddBookEvent(id);
    document.getElementById(
      "modalBody"
    ).firstElementChild.innerText = `"${Ao[0].name}"`;
  };
});
