const SHIPPING_COST = 35;

const summaryList = document.getElementById("summaryList");
const totalPrice = document.getElementById("totalPrice");
const productCount = document.getElementById("productCount");
const form = document.querySelector("form");

// Xóa giỏ hàng khỏi localStorage khi người dùng gửi đơn hàng
form.addEventListener("submit", () => {
  localStorage.removeItem("cart");
});

function initOrderSummary() {
  // Xóa các mục trong danh sách để cập nhật lại
  summaryList.innerHTML = "";

  // Tính tổng tiền hàng
  let totalItemsPrice = 0;
  cart.forEach((item) => {
    if (item != null) {
      const id = item.id;
      totalItemsPrice += Ao[id].price * item.amount;

      // Tạo danh sách chi tiết sản phẩm
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

  // Xác định phí vận chuyển
  const shippingCost = totalItemsPrice > 500 ? 0 : SHIPPING_COST;

  // Thêm mục hiển thị phí vận chuyển
  let shippingItem = document.createElement("li");
  shippingItem.classList.add("list-group-item", "d-flex", "justify-content-between");
  shippingItem.innerHTML = `
    <span>Shipping Cost</span>
    <strong>${shippingCost === 0 ? "Free" : `${formatPrice(shippingCost)}.000₫`}</strong>
  `;
  summaryList.appendChild(shippingItem);

  // Hiển thị tổng tiền (bao gồm phí vận chuyển)
  totalPrice.innerText = `${formatPrice(totalItemsPrice + shippingCost)}.000₫`;

  // Hiển thị số lượng sản phẩm
  productCount.innerText = cart.reduce(
    (accumulator, currentValue) => accumulator + (currentValue == null ? 0 : 1),
    0
  );
}

initOrderSummary();
