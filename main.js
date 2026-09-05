/* Loop & Bloom — main.js (nav, cart, wishlist, animation, shared UI) */

const LB = {
  CART_KEY: "lb_cart",
  WISH_KEY: "lb_wishlist",
};

/* ---------- storage helpers ---------- */
function getCart() {
  try { return JSON.parse(localStorage.getItem(LB.CART_KEY)) || []; }
  catch (e) { return []; }
}
function saveCart(cart) {
  localStorage.setItem(LB.CART_KEY, JSON.stringify(cart));
  updateCartBadge();
  renderCartDrawer();
}
function getWishlist() {
  try { return JSON.parse(localStorage.getItem(LB.WISH_KEY)) || []; }
  catch (e) { return []; }
}
function saveWishlist(list) {
  localStorage.setItem(LB.WISH_KEY, JSON.stringify(list));
  updateWishlistBadge();
  document.querySelectorAll("[data-wishlist-btn]").forEach(refreshWishlistBtnState);
}

function findProduct(id) {
  return (typeof PRODUCTS !== "undefined") ? PRODUCTS.find(p => p.id === id) : null;
}

function addToCart(id, qty, color) {
  qty = qty || 1;
  const cart = getCart();
  const existing = cart.find(i => i.id === id && i.color === (color || null));
  if (existing) { existing.qty += qty; }
  else { cart.push({ id, qty, color: color || null }); }
  saveCart(cart);
  showToast(`Added to cart — ${findProduct(id) ? findProduct(id).name : "item"}`);
  openCart();
}
function removeFromCart(index) {
  const cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
}
function changeQty(index, delta) {
  const cart = getCart();
  if (!cart[index]) return;
  cart[index].qty = Math.max(1, cart[index].qty + delta);
  saveCart(cart);
}
function toggleWishlist(id) {
  let list = getWishlist();
  if (list.includes(id)) list = list.filter(x => x !== id);
  else { list.push(id); showToast("Saved to wishlist"); }
  saveWishlist(list);
}
function cartCount() { return getCart().reduce((sum, i) => sum + i.qty, 0); }

function updateCartBadge() {
  const n = cartCount();
  document.querySelectorAll("[data-cart-count]").forEach(el => {
    el.textContent = n;
    el.classList.toggle("show", n > 0);
  });
}
function updateWishlistBadge() {
  const n = getWishlist().length;
  document.querySelectorAll("[data-wishlist-count]").forEach(el => {
    el.textContent = n;
    el.classList.toggle("show", n > 0);
  });
}
function refreshWishlistBtnState(btn) {
  const id = btn.getAttribute("data-wishlist-btn");
  btn.classList.toggle("active", getWishlist().includes(id));
}

/* ---------- toast ---------- */
let toastTimer;
function showToast(msg) {
  let toast = document.querySelector(".toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast";
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
}

/* ---------- cart drawer ---------- */
function renderCartDrawer() {
  const itemsEl = document.getElementById("cartItems");
  const footEl = document.getElementById("cartFoot");
  if (!itemsEl) return;
  const cart = getCart();
  if (cart.length === 0) {
    itemsEl.innerHTML = `<div class="cart-empty">
      <p>Your cart is empty — for now.</p>
      <a href="shop.html" class="btn btn-secondary btn-sm" style="margin-top:16px;">Browse the shop</a>
    </div>`;
    if (footEl) footEl.style.display = "none";
    return;
  }
  if (footEl) footEl.style.display = "block";
  let subtotal = 0;
  itemsEl.innerHTML = cart.map((item, idx) => {
    const p = findProduct(item.id);
    if (!p) return "";
    subtotal += p.price * item.qty;
    return `
      <div class="cart-item">
        <img src="${p.images[0]}&w=200" alt="${p.name}">
        <div class="cart-item-info">
          <span class="name">${p.name}</span>
          <span class="meta">${item.color ? item.color + " · " : ""}$${p.price.toFixed(2)}</span>
          <div class="qty-row">
            <button class="qty-btn" aria-label="Decrease quantity" onclick="changeQty(${idx},-1)">−</button>
            <span>${item.qty}</span>
            <button class="qty-btn" aria-label="Increase quantity" onclick="changeQty(${idx},1)">+</button>
          </div>
          <button class="remove-btn" onclick="removeFromCart(${idx})">Remove</button>
        </div>
      </div>`;
  }).join("");
  const subtotalEl = document.getElementById("cartSubtotal");
  if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
}

function openCart() {
  document.getElementById("cartDrawer")?.classList.add("is-open");
  document.getElementById("cartOverlay")?.classList.add("is-open");
  document.body.style.overflow = "hidden";
}
function closeCart() {
  document.getElementById("cartDrawer")?.classList.remove("is-open");
  document.getElementById("cartOverlay")?.classList.remove("is-open");
  document.body.style.overflow = "";
}

/* ---------- nav / header behavior ---------- */
function initHeader() {
  const header = document.getElementById("siteHeader");
  if (header) {
    const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  const hamburger = document.getElementById("hamburgerBtn");
  const mobileNav = document.getElementById("mobileNav");
  const mobileClose = document.getElementById("mobileNavClose");
  function openMobile() {
    mobileNav?.classList.add("is-open");
    hamburger?.classList.add("is-open");
    document.body.style.overflow = "hidden";
  }
  function closeMobile() {
    mobileNav?.classList.remove("is-open");
    hamburger?.classList.remove("is-open");
    document.body.style.overflow = "";
  }
  hamburger?.addEventListener("click", () => {
    mobileNav?.classList.contains("is-open") ? closeMobile() : openMobile();
  });
  mobileClose?.addEventListener("click", closeMobile);
  mobileNav?.querySelectorAll("a").forEach(a => a.addEventListener("click", closeMobile));

  const searchBtn = document.getElementById("searchToggleBtn");
  const searchPanel = document.getElementById("searchPanel");
  searchBtn?.addEventListener("click", () => {
    searchPanel?.classList.toggle("is-open");
    if (searchPanel?.classList.contains("is-open")) {
      setTimeout(() => document.getElementById("searchInput")?.focus(), 350);
    }
  });
  const searchForm = document.getElementById("searchForm");
  searchForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const q = document.getElementById("searchInput").value.trim();
    window.location.href = "shop.html" + (q ? "?q=" + encodeURIComponent(q) : "");
  });

  document.getElementById("cartToggleBtn")?.addEventListener("click", openCart);
  document.getElementById("cartCloseBtn")?.addEventListener("click", closeCart);
  document.getElementById("cartOverlay")?.addEventListener("click", closeCart);

  // wishlist buttons (delegate)
  document.body.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-wishlist-btn]");
    if (btn) {
      e.preventDefault();
      toggleWishlist(btn.getAttribute("data-wishlist-btn"));
    }
    const addBtn = e.target.closest("[data-add-cart]");
    if (addBtn) {
      e.preventDefault();
      addToCart(addBtn.getAttribute("data-add-cart"));
    }
  });

  document.querySelectorAll("[data-wishlist-btn]").forEach(refreshWishlistBtnState);
  updateCartBadge();
  updateWishlistBadge();
  renderCartDrawer();

  // highlight active nav link
  const path = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a, .mobile-nav-links a").forEach(a => {
    const href = a.getAttribute("href");
    if (href === path || (path === "" && href === "index.html")) a.classList.add("active");
  });
}

/* ---------- scroll reveal ---------- */
function initReveal() {
  const items = document.querySelectorAll(".reveal, .reveal-mask, .stagger");
  if (!("IntersectionObserver" in window) || items.length === 0) {
    items.forEach(el => el.classList.add("in-view"));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14, rootMargin: "0px 0px -60px 0px" });
  items.forEach(el => io.observe(el));
}

/* ---------- custom cursor (desktop only, subtle) ---------- */
function initCursor() {
  if (window.matchMedia("(pointer: coarse)").matches) return;
  if (window.innerWidth < 900) return;
  const dot = document.createElement("div");
  dot.className = "cursor-dot";
  document.body.appendChild(dot);
  let active = false;
  window.addEventListener("mousemove", (e) => {
    dot.style.left = e.clientX + "px";
    dot.style.top = e.clientY + "px";
    if (!active) { dot.classList.add("active"); active = true; }
  });
  window.addEventListener("mouseout", () => dot.classList.remove("active"));
  document.querySelectorAll("a, button, .product-card, .insta-item, .masonry-item").forEach(el => {
    el.addEventListener("mouseenter", () => dot.classList.add("grow"));
    el.addEventListener("mouseleave", () => dot.classList.remove("grow"));
  });
}

/* ---------- newsletter (footer) ---------- */
function initNewsletter() {
  document.querySelectorAll(".newsletter-form").forEach(form => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = form.querySelector("input");
      if (!input.value.trim() || !input.value.includes("@")) {
        showToast("Add a valid email to subscribe");
        return;
      }
      showToast("You're on the list — welcome to the studio notes");
      input.value = "";
    });
  });
}

function setYear() {
  document.querySelectorAll("[data-year]").forEach(el => el.textContent = new Date().getFullYear());
}

/* ---------- scroll-to-section buttons ---------- */
function initScrollCue() {
  document.querySelectorAll("[data-scroll-to]").forEach(el => {
    el.addEventListener("click", (e) => {
      const target = document.querySelector(el.getAttribute("data-scroll-to"));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: "smooth" }); }
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initHeader();
  initReveal();
  initCursor();
  initNewsletter();
  setYear();
  initScrollCue();
});
