const thumbnails = document.querySelectorAll(".thumbnail-images img");
const mainImage = document.querySelector(".main-image img");

thumbnails.forEach((thumbnail) => {
  thumbnail.addEventListener("click", () => {
    mainImage.src = thumbnail.src;
  });
});

// Đảm bảo mã chạy sau khi toàn bộ DOM đã tải xong
document.addEventListener("DOMContentLoaded", () => {
  // Lấy các thành phần trong số lượng
  const decreaseBtn = document.querySelector(".quantity-btn.decrease");
  const increaseBtn = document.querySelector(".quantity-btn.increase");
  const quantityInput = document.querySelector(".quantity-input");

  // Kiểm tra nếu các phần tử tồn tại
  if (decreaseBtn && increaseBtn && quantityInput) {
    // Hàm để cập nhật số lượng
    const updateQuantity = (amount) => {
      let currentValue = parseInt(quantityInput.value) || 1; // Lấy giá trị hiện tại
      const newValue = currentValue + amount; // Tính giá trị mới

      // Đảm bảo số lượng không nhỏ hơn 1
      if (newValue >= 1) {
        quantityInput.value = newValue;
      }
    };

    // Sự kiện khi nhấn nút trừ
    decreaseBtn.addEventListener("click", () => updateQuantity(-1));

    // Sự kiện khi nhấn nút cộng
    increaseBtn.addEventListener("click", () => updateQuantity(1));
  } else {
    console.error("Không tìm thấy các nút cộng, trừ hoặc ô nhập!");
  }
});

// Lấy tất cả các nút size
const sizeButtons = document.querySelectorAll(".size-btn");

// Thêm sự kiện click vào mỗi nút size
sizeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Xóa class 'selected' khỏi tất cả các nút size
    sizeButtons.forEach((btn) => btn.classList.remove("selected"));

    // Thêm class 'selected' cho nút được nhấn
    button.classList.add("selected");

    // Lấy size đã chọn (nếu cần sử dụng ở các phần khác)
    const selectedSize = button.getAttribute("data-size");
    console.log("Size đã chọn:", selectedSize);
  });
});
