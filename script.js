function toggleSidebar() {
  const sidebar = document.querySelector(".sidebar");
  const overlay = document.querySelector(".sidebar-overlay");

  sidebar.classList.toggle("active");
  overlay.classList.toggle("active");

  if (sidebar.classList.contains("active")) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
}

<<<<<<< HEAD
// toggle card
function toggleCart() {
  const cart = document.getElementById("cartSidebar");
  const overlay = document.getElementById("cartOverlay");

  cart.classList.toggle("active");
  overlay.classList.toggle("active");

  if (cart.classList.contains("active")) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "";
  }
=======
function toggleCart() {
  const cart = document.getElementById("cartSidebar");
  cart.classList.toggle("active");
}


let cart = [];
function addToCart(name, price) {
  cart.push({ name, price });

  renderCart();
  toggleCart(); // buka sidebar otomatis
}
function renderCart() {
  const cartContent = document.getElementById("cartContent");
  const subtotalText = document.querySelector(".cart-footer p");

  cartContent.innerHTML = "";

  if (cart.length === 0) {
    cartContent.innerHTML = `<p class="empty-text">Your cart is empty</p>`;
    subtotalText.innerText = "Subtotal: Rp 0";
    return;
  }

  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;

    cartContent.innerHTML += `
      <div class="cart-item">
        <div>
          <p>${item.name}</p>
          <span>Rp ${item.price.toLocaleString()}</span>
        </div>
        <button class="remove-btn" onclick="removeItem(${index})">✕</button>
      </div>
    `;
  });

  subtotalText.innerText = `Subtotal: Rp ${total.toLocaleString()}`;
}
function removeItem(index) {
  cart.splice(index, 1);
  renderCart();
}
function toggleCart() {
  const cart = document.getElementById("cartSidebar");
  cart.classList.toggle("active");
>>>>>>> 463469ecbbdd77402744dbbfc59f1d9107ec2955
}