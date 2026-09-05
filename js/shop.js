/* Loop & Bloom — shop.js */

const shopState = {
  category: "All",
  sort: "featured",
  query: "",
  maxPrice: 100,
};

function productCardHTML(p) {
  const inWishlist = getWishlist().includes(p.id);
  return `
  <div class="product-card reveal">
    <div class="product-media">
      <button class="wishlist-btn ${inWishlist ? "active" : ""}" data-wishlist-btn="${p.id}" aria-label="Save ${p.name} to wishlist">
        <svg viewBox="0 0 24 24" stroke-width="1.8"><path d="M12 21s-7.5-4.6-10-9.3C.5 8 2 4 6 3.6c2.3-.2 4 1 6 3.4 2-2.4 3.7-3.6 6-3.4 4 .4 5.5 4.4 4 8.1-2.5 4.7-10 9.3-10 9.3z"/></svg>
      </button>
      <a href="product.html?id=${p.id}" aria-label="View ${p.name}">
        <img class="img-a" src="${p.images[0]}&w=700" alt="${p.name}, a handmade ${p.category.toLowerCase()} piece from Loop &amp; Bloom" loading="lazy">
        <img class="img-b" src="${p.images[1]}&w=700" alt="" loading="lazy">
      </a>
      <div class="quick-add">
        <button onclick="openQuickView('${p.id}')">Quick view</button>
      </div>
    </div>
    <a href="product.html?id=${p.id}" class="product-info-link">
      <div class="product-info">
        <span class="product-cat">${p.category}</span>
        <h3 class="product-name">${p.name}</h3>
        <p class="product-desc">${p.tagline}</p>
        <div class="product-price-row">
          <span class="product-price">$${p.price.toFixed(2)}</span>
          <button class="add-cart-inline" data-add-cart="${p.id}">Add to cart</button>
        </div>
      </div>
    </a>
  </div>`;
}

function getFilteredProducts() {
  let list = PRODUCTS.slice();
  if (shopState.category !== "All") list = list.filter(p => p.category === shopState.category);
  if (shopState.query) {
    const q = shopState.query.toLowerCase();
    list = list.filter(p => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.tagline.toLowerCase().includes(q));
  }
  list = list.filter(p => p.price <= shopState.maxPrice);
  switch (shopState.sort) {
    case "price-low": list.sort((a, b) => a.price - b.price); break;
    case "price-high": list.sort((a, b) => b.price - a.price); break;
    case "name": list.sort((a, b) => a.name.localeCompare(b.name)); break;
    default: break; // featured = natural order
  }
  return list;
}

function renderShop() {
  const grid = document.getElementById("shopGrid");
  const countEl = document.getElementById("resultsCount");
  const list = getFilteredProducts();
  if (countEl) countEl.textContent = `${list.length} piece${list.length === 1 ? "" : "s"}${shopState.category !== "All" ? " in " + shopState.category : ""}${shopState.query ? ` matching “${shopState.query}”` : ""}`;
  if (!grid) return;
  if (list.length === 0) {
    grid.innerHTML = "";
    document.getElementById("noResults")?.classList.remove("hidden-force");
    document.getElementById("noResults") && (document.getElementById("noResults").style.display = "block");
    return;
  }
  const noRes = document.getElementById("noResults");
  if (noRes) noRes.style.display = "none";
  grid.innerHTML = list.map(productCardHTML).join("");
  document.querySelectorAll("#shopGrid [data-wishlist-btn]").forEach(refreshWishlistBtnState);
  initReveal();
}

function openQuickView(id) {
  const p = findProduct(id);
  if (!p) return;
  const overlay = document.getElementById("quickViewOverlay");
  const box = document.getElementById("quickViewBox");
  box.innerHTML = `
    <button class="modal-close" id="qvClose" aria-label="Close quick view">
      <svg width="16" height="16" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" fill="none"><path d="M6 6l12 12M18 6L6 18"/></svg>
    </button>
    <div class="modal-media"><img src="${p.images[0]}&w=800" alt="${p.name}"></div>
    <div class="modal-info">
      <span class="product-cat">${p.category}</span>
      <h3>${p.name}</h3>
      <span class="price">$${p.price.toFixed(2)}</span>
      <p class="desc">${p.description}</p>
      <div style="display:flex; gap:10px;">
        <button class="btn btn-primary" style="flex:1" data-add-cart="${p.id}">Add to cart</button>
        <a href="product.html?id=${p.id}" class="btn btn-secondary">Full details</a>
      </div>
    </div>`;
  overlay.classList.add("is-open");
  document.body.style.overflow = "hidden";
  document.getElementById("qvClose").addEventListener("click", closeQuickView);
}
function closeQuickView() {
  document.getElementById("quickViewOverlay")?.classList.remove("is-open");
  document.body.style.overflow = "";
}

function initShopPage() {
  const params = new URLSearchParams(window.location.search);
  if (params.get("category")) shopState.category = params.get("category");
  if (params.get("q")) shopState.query = params.get("q");

  document.querySelectorAll(".chip[data-category]").forEach(chip => {
    if (chip.getAttribute("data-category") === shopState.category) chip.classList.add("active");
    else chip.classList.remove("active");
    chip.addEventListener("click", () => {
      shopState.category = chip.getAttribute("data-category");
      document.querySelectorAll(".chip[data-category]").forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      renderShop();
    });
  });

  const sortSelect = document.getElementById("sortSelect");
  sortSelect?.addEventListener("change", () => { shopState.sort = sortSelect.value; renderShop(); });

  const shopSearchInput = document.getElementById("shopSearchInput");
  if (shopSearchInput) {
    shopSearchInput.value = shopState.query;
    shopSearchInput.addEventListener("input", () => { shopState.query = shopSearchInput.value; renderShop(); });
  }

  const priceRange = document.getElementById("priceRange");
  const priceLabel = document.getElementById("priceRangeLabel");
  priceRange?.addEventListener("input", () => {
    shopState.maxPrice = Number(priceRange.value);
    if (priceLabel) priceLabel.textContent = `$0 – $${priceRange.value}`;
    renderShop();
  });

  const filterToggle = document.getElementById("filterToggleBtn");
  filterToggle?.addEventListener("click", () => document.getElementById("filterPanel")?.classList.toggle("is-open"));

  document.getElementById("quickViewOverlay")?.addEventListener("click", (e) => {
    if (e.target.id === "quickViewOverlay") closeQuickView();
  });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeQuickView(); });

  renderShop();
}

document.addEventListener("DOMContentLoaded", initShopPage);
