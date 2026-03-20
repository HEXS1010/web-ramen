/* =========================
  SIDEBAR NAVIGATION
========================= */
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


/* =========================
  CART SIDEBAR TOGGLE
========================= */
function toggleCart() {
  const cart = document.getElementById("cartSidebar");
  cart.classList.toggle("active");
}


/* =========================
   (DATA) keranjng
========================= */
let cart = [];


/* =========================
   ADD TO CART
========================= */
function addToCart(name, price) {
  cart.push({ name, price });

  renderCart();
  toggleCart(); // buka sidebar otomatis
}


/* =========================
   RENDER CART UI
========================= */
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
    total += item.price * item.qty;

    cartContent.innerHTML += `
      <div class="cart-item">
        <div>
          <p class="cart-item-name">${item.name}</p>
          <span class="cart-item-price">Rp ${(item.price * item.qty).toLocaleString()}</span>

          <div class="qty-control">
            <button onclick="decreaseQty(${index})">-</button>
            <span>${item.qty}</span>
            <button onclick="increaseQty(${index})">+</button>
          </div>
        </div>

        <button class="remove-btn" onclick="removeItem(${index})">✕</button>
      </div>
    `;
  });

  subtotalText.innerText = `Subtotal: Rp ${total.toLocaleString()}`;

  // update badge setiap render
  updateCartBadge();
}


/* =========================
   UPDATE BADGE 
========================= */
function updateCartBadge() {
  const badge = document.getElementById("cartBadge");

  let totalItems = 0;
  cart.forEach(item => {
    totalItems += item.qty;
  });

  badge.innerText = totalItems;
}


/* =========================
   QUANTITY CONTROL
========================= */
function increaseQty(index) {
  cart[index].qty += 1;
  renderCart();
}

function decreaseQty(index) {
  if (cart[index].qty > 1) {
    cart[index].qty -= 1;
  } else {
    cart.splice(index, 1);
  }
  renderCart();
}


/* =========================
   REMOVE ITEM
========================= */
function removeItem(index) {
  cart.splice(index, 1);
  renderCart();
  updateCartBadge();
}


/* =========================
   ADD TO CART 
========================= */
function addToCart(name, price) {
  const existingItem = cart.find(item => item.name === name);

  if (existingItem) {
    existingItem.qty += 1;
  } else {
    cart.push({ name, price, qty: 1 });
  }

  renderCart();
  updateCartBadge();
  toggleCart();
}


/* =========================
   UPDATE BADGE yg bru
========================= */
function updateCartBadge() {
  const badge = document.getElementById("cartBadge");

  let totalQty = 0;
  cart.forEach(item => {
    totalQty += item.qty;
  });

  badge.innerText = totalQty;

  if (totalQty === 0) {
    badge.style.display = "none";
  } else {
    badge.style.display = "flex";
  }
}


/* =========================
  flexsibel qty 
========================= */
function changeQty(index, change) {
  cart[index].qty += change;

  if (cart[index].qty <= 0) {
    cart.splice(index, 1);
  }

  renderCart();
  updateCartBadge(); 
}