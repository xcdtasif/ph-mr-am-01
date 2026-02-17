// State
let allProducts = [];
let cart = JSON.parse(localStorage.getItem("swiftcart")) || [];
let currentProduct = null;

// API helpers
const BASE = "https://fakestoreapi.com";

async function fetchJSON(url) {
  const res = await fetch(url);
  return res.json();
}

// Toast
function showToast(msg) {
  const wrap = document.getElementById("toastWrap");
  const t = document.createElement("div");
  t.className = "toast";
  t.innerHTML = `✓ ${msg}`;
  wrap.appendChild(t);
  setTimeout(() => t.remove(), 3000);
}

// Stars helper
function renderStars(rate) {
  const full = Math.round(rate);
  return "★".repeat(full) + "☆".repeat(5 - full);
}

// Cart
function saveCart() {
  localStorage.setItem("swiftcart", JSON.stringify(cart));
}

function updateCartUI() {
  const count = cart.reduce((s, i) => s + i.qty, 0);
  document.getElementById("cartCount").textContent = count;

  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  document.getElementById("cartTotal").textContent = `$${total.toFixed(2)}`;

  const container = document.getElementById("cartItems");

  if (cart.length === 0) {
    container.innerHTML = `
            <div class="cart-empty">
              <div class="cart-empty-icon">🛒</div>
              <p style="font-size:0.9rem;font-weight:500;">Your cart is empty</p>
              <p style="font-size:0.8rem;margin-top:0.3rem;">Add some products to get started</p>
            </div>`;
    return;
  }

  container.innerHTML = cart
    .map(
      (item) => `
          <div class="cart-item">
            <img src="${item.image}" alt="${item.title}" class="cart-item-img" />
            <div class="cart-item-info">
              <div class="cart-item-name">${item.title}</div>
              <div class="cart-item-price">$${(item.price * item.qty).toFixed(2)}</div>
              <div style="font-size:0.75rem;color:#9ca3af;">Qty: ${item.qty}</div>
            </div>
            <button class="cart-remove" onclick="removeFromCart(${item.id})">✕</button>
          </div>`,
    )
    .join("");
}

function addToCart(product) {
  const existing = cart.find((i) => i.id === product.id);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  saveCart();
  updateCartUI();
  showToast(`${product.title.substring(0, 30)}... added`);
}

function removeFromCart(id) {
  cart = cart.filter((i) => i.id !== id);
  saveCart();
  updateCartUI();
}

// Cart sidebar toggle
const cartToggle = document.getElementById("cartToggle");
const cartSidebar = document.getElementById("cartSidebar");
const cartOverlay = document.getElementById("cartOverlay");
const cartClose = document.getElementById("cartClose");

function openCart() {
  cartSidebar.classList.add("open");
  cartOverlay.classList.add("open");
}
function closeCart() {
  cartSidebar.classList.remove("open");
  cartOverlay.classList.remove("open");
}

cartToggle.addEventListener("click", openCart);
cartClose.addEventListener("click", closeCart);
cartOverlay.addEventListener("click", closeCart);

// Details Modal
const modal = document.getElementById("detailsModal");
const modalClose = document.getElementById("modalClose");

function openModal(product) {
  currentProduct = product;
  document.getElementById("modalImg").src = product.image;
  document.getElementById("modalImg").alt = product.title;
  document.getElementById("modalTitle").textContent = product.title;
  document.getElementById("modalDesc").textContent = product.description;
  document.getElementById("modalPrice").textContent =
    `$${product.price.toFixed(2)}`;
  document.getElementById("modalBadge").textContent = product.category;
  document.getElementById("modalRating").textContent =
    `${renderStars(product.rating.rate)} (${product.rating.count} reviews)`;
  modal.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modal.classList.remove("open");
  document.body.style.overflow = "";
}

modalClose.addEventListener("click", closeModal);
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});

document.getElementById("modalCartBtn").addEventListener("click", () => {
  if (currentProduct) {
    addToCart(currentProduct);
    closeModal();
  }
});

document.getElementById("modalBuyBtn").addEventListener("click", () => {
  if (currentProduct) {
    addToCart(currentProduct);
    closeModal();
    openCart();
  }
});

// Render product card
function renderCard(p) {
  return `
          <div class="product-card">
            <div class="product-img-wrap">
              <span class="product-category-badge">${p.category}</span>
              <img src="${p.image}" alt="${p.title}" loading="lazy" />
            </div>
            <div class="product-info">
              <div class="product-title" title="${p.title}">${p.title}</div>
              <div class="product-rating">
                <span class="stars">${renderStars(p.rating.rate)}</span>
                <span class="rating-count">(${p.rating.count})</span>
              </div>
              <div class="product-price">$${p.price.toFixed(2)}</div>
              <div class="product-actions">
                <button class="btn-details" onclick='openModal(${JSON.stringify(p)})'>Details</button>
                <button class="btn-cart"    onclick='addToCart(${JSON.stringify(p)})'>+ Cart</button>
              </div>
            </div>
          </div>`;
}

// Render trending card
function renderTrendingCard(p, rank) {
  return `
          <div class="trending-card">
            <span class="trending-rank">${String(rank).padStart(2, "0")}</span>
            <img src="${p.image}" alt="${p.title}" class="trending-img" />
            <div class="trending-info">
              <div class="trending-title" title="${p.title}">${p.title}</div>
              <div class="stars" style="font-size:0.8rem;margin-bottom:0.25rem;">${renderStars(p.rating.rate)}</div>
              <div class="trending-price">$${p.price.toFixed(2)}</div>
            </div>
          </div>`;
}

// Load categories
async function loadCategories() {
  const cats = await fetchJSON(`${BASE}/products/categories`);
  const container = document.getElementById("categoryFilters");
  container.innerHTML = `<button class="filter-btn active" data-category="all">All</button>`;
  cats.forEach((cat) => {
    const btn = document.createElement("button");
    btn.className = "filter-btn";
    btn.dataset.category = cat;
    btn.textContent = cat;
    container.appendChild(btn);
  });

  // Delegate click
  container.addEventListener("click", (e) => {
    const btn = e.target.closest(".filter-btn");
    if (!btn) return;
    container
      .querySelectorAll(".filter-btn")
      .forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    filterProducts(btn.dataset.category);
  });
}

// Filter products
function filterProducts(category) {
  const filtered =
    category === "all"
      ? allProducts
      : allProducts.filter((p) => p.category === category);
  document.getElementById("productGrid").innerHTML = filtered
    .map(renderCard)
    .join("");
}

// Load all products
async function loadProducts() {
  const products = await fetchJSON(`${BASE}/products`);
  allProducts = products;

  // Product grid
  document.getElementById("productGrid").innerHTML = products
    .map(renderCard)
    .join("");

  // Trending (top 3 by rating)
  const trending = [...products]
    .sort((a, b) => b.rating.rate - a.rating.rate)
    .slice(0, 3);
  document.getElementById("trendingGrid").innerHTML = trending
    .map((p, i) => renderTrendingCard(p, i + 1))
    .join("");
}

// Init
async function init() {
  updateCartUI();
  await Promise.all([loadCategories(), loadProducts()]);
}

init();
