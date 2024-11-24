const cartList = document.getElementById("cartList");
const checkoutButton = document.getElementById("checkoutButton");

function initCart() {
  if (cartCount.innerText === "0") {
    let noti = document.createElement("h6");
    noti.innerText =
      "Giỏ hàng của bạn trống. Quay lại cửa hàng để lựa chọn sản phẩm";
    cartList.appendChild(noti);
    checkoutButton.classList.add("disabled");
  } else {
    cart.forEach((item) => {
      if (item != null) {
        const id = item.id;
        let newBook = document.createElement("div");
        newBook.innerHTML = `
          <div class="row mb-4 d-flex justify-content-between align-items-center pb-4 border-bottom">
            <div class="col-4 col-xl-2 px-0 px-sm-2">
              <img
                src="../assets/images/Ao/${Ao[id].url}.jpg"
                class="img-fluid rounded-3" alt="clothing">
            </div>
            <div class="row col-6 col-xl-9">
              <div class="col-xl-4">
                <h6 class="text-black mb-0 mb-xl-1">${Ao[id].name}</h6>
              </div>
              <div class="col-xl-4 my-2 d-flex align-items-center">
                <input type="text" class="d-none" value="${id}" />
                <div class="btn-group btn-group-sm" role="group" aria-label="Basic example">
                  <button type="button" class="plus-button btn btn-outline-dark">
                    <i class="bi bi-dash"></i>
                  </button>
                  <button type="button" class="btn btn-outline-dark opacity-100" disabled>${item.amount}</button>
                  <button type="button" class="minus-button btn btn-outline-dark">
                    <i class="bi bi-plus"></i>
                  </button>
                </div>
              </div>
              <div class="col-xl-4 d-flex align-items-center">
                <h6 class="mb-0">${Ao[id].price}.000₫</h6>
              </div>
            </div>
            
            <div class="col-2 col-xl-1 px-0">
              <button class="remove-button btn btn-outline-light text-black fs-4">
                <i class="bi bi-x"></i>
              </button>
              <input type="text" class="d-none" value="${id}" />
            </div>
          </div>
        `;
        cartList.appendChild(newBook);
      }
    });
  }
}

initCart();

const totalPrice = document.getElementById("totalPrice");

function updateTotalPrice() {
  const count = cart.reduce((accumulator, currentValue) => {
    if (currentValue != null) {
      return accumulator + Ao[currentValue.id].price * currentValue.amount;
    }
    return accumulator;
  }, 0);
  totalPrice.innerText = `${formatPrice(count)}.000₫`;
}

updateTotalPrice();

document.querySelectorAll(".plus-button").forEach((e) => {
  if (parseInt(e.nextElementSibling.innerText) === 1) e.disabled = true;
  e.addEventListener("click", () => {
    const id = parseInt(e.parentElement.previousElementSibling.value);
    let amount = parseInt(e.nextElementSibling.innerText);
    if (amount > 1) e.nextElementSibling.innerText = amount - 1;
    if (amount - 1 === 1) e.disabled = true;
    cart[id].amount = amount - 1;
    updateCart();
    updateTotalPrice();

    localStorage.setItem("cart", JSON.stringify(cart));
  });
});

document.querySelectorAll(".minus-button").forEach((e) => {
  e.addEventListener("click", () => {
    let amount = parseInt(e.previousElementSibling.innerText);
    e.previousElementSibling.innerText = amount + 1;
    e.previousElementSibling.previousElementSibling.disabled = false;

    const id = parseInt(e.parentElement.previousElementSibling.value);
    cart[id].amount = amount + 1;
    updateCart();
    updateTotalPrice();

    localStorage.setItem("cart", JSON.stringify(cart));
  });
});

document.querySelectorAll(".remove-button").forEach((e) => {
  e.addEventListener("click", () => {
    const id = parseInt(e.nextElementSibling.value);
    cart[id] = null;
    e.parentElement.parentElement.remove();
    updateCart();

    if (cartCount.innerText === "0") {
      let noti = document.createElement("h6");
      noti.innerText =
        "Giỏ hàng của bạn trống. Quay lại cửa hàng để lựa chọn sản phẩm.";
      cartList.appendChild(noti);
      checkoutButton.classList.add("disabled");
    }

    updateTotalPrice();

    localStorage.setItem("cart", JSON.stringify(cart));
  });
});
