/* =========================
   SIDEBAR NAVIGATION
========================= */
function toggleSidebar() {
  const sidebar = document.querySelector(".sidebar");
  const overlay = document.querySelector(".sidebar-overlay");
  const isActive = sidebar.classList.contains("active");

  closeCart();

  if (isActive) {
    sidebar.classList.remove("active");
    overlay.classList.remove("active");
    document.body.style.overflow = "";
  } else {
    sidebar.classList.add("active");
    overlay.classList.add("active");
    document.body.style.overflow = "hidden";
  }
}


/* =========================
   HELPER: TUTUP SIDEBAR
========================= */
function closeSidebar() {
  document.querySelector(".sidebar").classList.remove("active");
  document.querySelector(".sidebar-overlay").classList.remove("active");
  document.body.style.overflow = "";
}


/* =========================
   CART SIDEBAR TOGGLE
========================= */
function toggleCart() {
  const cartSidebar = document.getElementById("cartSidebar");
  const cartOverlay = document.getElementById("cartOverlay");
  const isActive = cartSidebar.classList.contains("active");

  closeSidebar();

  if (isActive) {
    closeCart();
  } else {
    cartSidebar.classList.add("active");
    cartOverlay.classList.add("active");
    document.body.style.overflow = "hidden";
  }
}


/* =========================
   HELPER: TUTUP CART
========================= */
function closeCart() {
  document.getElementById("cartSidebar").classList.remove("active");
  document.getElementById("cartOverlay").classList.remove("active");
  document.body.style.overflow = "";
}


/* =========================
   DATA CART
========================= */
let cart = [];


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

  if (!document.getElementById("cartSidebar").classList.contains("active")) {
    toggleCart();
  }
}


/* =========================
   RENDER CART UI
========================= */
function renderCart() {
  const cartContent = document.getElementById("cartContent");
  const subtotalText = document.querySelector(".cart-footer p");

  cartContent.innerHTML = "";

  if (cart.length === 0) {
    cartContent.innerHTML = `<p class="empty-text">Anda Belum Memesan</p>`;
    subtotalText.innerText = "Total: Rp 0";
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
            <button onclick="changeQty(${index}, -1)">-</button>
            <span>${item.qty}</span>
            <button onclick="changeQty(${index}, 1)">+</button>
          </div>
        </div>
        <button class="remove-btn" onclick="removeItem(${index})">✕</button>
      </div>
    `;
  });

  subtotalText.innerText = "Subtotal: Rp " + total.toLocaleString();
  updateCartBadge();
}


/* =========================
   UBAH KUANTITAS ITEM
========================= */
function changeQty(index, change) {
  cart[index].qty += change;

  if (cart[index].qty < 1) {
    cart[index].qty = 1;
  }

  renderCart();
  updateCartBadge();
}


/* =========================
   HAPUS ITEM
========================= */
function removeItem(index) {
  cart.splice(index, 1);
  renderCart();
  updateCartBadge();
}


/* =========================
   UPDATE BADGE CART
========================= */
function updateCartBadge() {
  const badge = document.getElementById("cartBadge");
  if (!badge) return;

  let totalQty = 0;
  cart.forEach(item => {
    totalQty += item.qty;
  });

  badge.innerText = totalQty;
  badge.style.display = totalQty === 0 ? "none" : "flex";
}