const SHIPPING_COST = 35;

const summaryList = document.getElementById("summaryList");
const totalPrice = document.getElementById("totalPrice");
const productCount = document.getElementById("productCount");

const form = document.querySelector("form");

form.addEventListener("submit", () => {
  localStorage.removeItem("cart");
});

function initOrderSummary() {
  cart.forEach((item) => {
    if (item != null) {
      const id = item.id;
      let newBook = document.createElement("li");
      newBook.classList.add("list-group-item");
      newBook.classList.add("border-bottom-0");
      newBook.innerHTML = `
        <div class="d-flex justify-content-between lh-sm">
          <div>
            <h6 class="my-0 pe-5">${Ao[id].name}</h6>
            <small class="text-muted">Quantity: ${item.amount}</small>
          </div>
          <span class="text-muted">${formatPrice(
            Ao[id].price * item.amount
          )}.000₫</span>
        </div>
      `;
      summaryList.insertBefore(newBook, document.getElementById("divider"));
    }
  });
  const count = cart.reduce((accumulator, currentValue) => {
    if (currentValue != null) {
      return accumulator + Ao[currentValue.id].price * currentValue.amount;
    }
    return accumulator;
  }, 0);
  totalPrice.innerText = `${formatPrice(count + SHIPPING_COST)}.000₫`;

  productCount.innerText = cart.reduce(
    (accumulator, currentValue) => accumulator + (currentValue == null ? 0 : 1),
    0
  );
}

initOrderSummary();
