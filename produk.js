let cart = [];
let currentCategory = "all"; // Menyimpan kategori yang sedang dipilih

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

function closeSidebar() {
  const sidebar = document.querySelector(".sidebar");
  const overlay = document.querySelector(".sidebar-overlay");
  if (sidebar) sidebar.classList.remove("active");
  if (overlay) overlay.classList.remove("active");
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

function closeCart() {
  const cartSidebar = document.getElementById("cartSidebar");
  const cartOverlay = document.getElementById("cartOverlay");
  if (cartSidebar) cartSidebar.classList.remove("active");
  if (cartOverlay) cartOverlay.classList.remove("active");
  document.body.style.overflow = "";
}

/* =========================
   CART LOGIC (SINKRON DENGAN INDEX)
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

function renderCart() {
  const cartContent = document.getElementById("cartContent");
  const subtotalText = document.querySelector(".cart-footer p");
  cartContent.innerHTML = "";

  if (cart.length === 0) {
    cartContent.innerHTML = `<p class="empty-text">Anda Belum Memesan</p>`;
    subtotalText.innerText = "Total: Rp 0";
    updateCartBadge();
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
        <button class="remove-btn" onclick="removeItem(${index})"> ✕ </button>
      </div>
    `;
  });
  subtotalText.innerText = "Subtotal: Rp " + total.toLocaleString();
  updateCartBadge();
}

function changeQty(index, change) {
  cart[index].qty += change;
  if (cart[index].qty < 1) {
    cart[index].qty = 1;
  }
  renderCart();
}

function removeItem(index) {
  cart.splice(index, 1);
  renderCart();
}

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

/* =========================
   SEARCH & FILTER LOGIC (DIPERBARUI)
========================= */

// Fungsi Utama untuk Menerapkan Semua Filter (Search + Kategori)
function applyFilters() {
  const keyword = document.getElementById("searchInput").value.toLowerCase();
  const cards = document.querySelectorAll(".menu-card");

  cards.forEach(card => {
    const name = card.querySelector(".menu-name").innerText.toLowerCase();
    const categoryAttr = card.dataset.category;

    let matchesCategory = false;

    // Logika pengelompokan kategori
    if (currentCategory === "all") {
      matchesCategory = true;
    } else if (currentCategory === "sachet") {
      // Masukkan Ramen Sachet (Small) dan Signature (Ramen Big) ke dalam filter Sachet
      matchesCategory = (categoryAttr === "sachet" || categoryAttr === "signature");
    } else if (currentCategory === "signature" || currentCategory === "bundle") {
      // Biarkan kosong untuk sementara karena belum ada produknya
      matchesCategory = false;
    } else {
      // Untuk cup dan merch
      matchesCategory = (categoryAttr === currentCategory);
    }

    const matchesSearch = name.includes(keyword);

    if (matchesCategory && matchesSearch) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}

/**
 * Fungsi untuk memfilter berdasarkan kategori
 * @param {string} category - ID kategori (sachet, cup, merch, dll)
 * @param {HTMLElement} element - Elemen kartu yang diklik untuk efek visual
 */
function filterCategory(category, element) {
  if (currentCategory === category) {
    currentCategory = "all";
  } else {
    currentCategory = category;
  }
  
  // Efek visual: Tandai kartu kategori yang aktif
  const allCatCards = document.querySelectorAll(".kategori-card");
  allCatCards.forEach(c => {
    c.style.backgroundColor = ""; 
    c.style.transform = ""; 
  });

  if (element && currentCategory !== "all") {
    element.style.backgroundColor = "var(--yellow)"; 
    element.style.transform = "translate(-4px, -4px)";
  }
  
  applyFilters();
}

// Inisialisasi: Menghubungkan Klik Kategori Card secara otomatis
document.addEventListener("DOMContentLoaded", () => {
  const catCards = document.querySelectorAll(".kategori-card");
  
  catCards.forEach(card => {
    card.addEventListener("click", function() {
      const text = this.querySelector("p").innerText.toLowerCase();
      let cat = "all";
      
      if (text.includes("sachet")) cat = "sachet";
      else if (text.includes("cup")) cat = "cup";
      else if (text.includes("signature")) cat = "signature";
      else if (text.includes("bundles")) cat = "bundle";
      else if (text.includes("merchandise")) cat = "merch";
      
      filterCategory(cat, this);
    });
  });
});

// Event Listener untuk Kolom Pencarian
document.getElementById("searchInput").addEventListener("input", applyFilters);