/* Loop & Bloom — product.js (product detail page) */

let pdState = { qty: 1, color: null, imgIndex: 0 };

function renderRelated(current) {
  const wrap = document.getElementById("relatedGrid");
  if (!wrap) return;
  const related = PRODUCTS.filter(p => p.category === current.category && p.id !== current.id).slice(0, 4);
  const fill = related.length < 4 ? PRODUCTS.filter(p => p.id !== current.id && !related.includes(p)).slice(0, 4 - related.length) : [];
  const list = related.concat(fill);
  wrap.innerHTML = list.map(productCardHTMLSimple).join("");
  document.querySelectorAll("#relatedGrid [data-wishlist-btn]").forEach(refreshWishlistBtnState);
  initReveal();
}

function productCardHTMLSimple(p) {
  const inWishlist = getWishlist().includes(p.id);
  return `
  <div class="product-card reveal">
    <div class="product-media">
      <button class="wishlist-btn ${inWishlist ? "active" : ""}" data-wishlist-btn="${p.id}" aria-label="Save ${p.name} to wishlist">
        <svg viewBox="0 0 24 24" stroke-width="1.8"><path d="M12 21s-7.5-4.6-10-9.3C.5 8 2 4 6 3.6c2.3-.2 4 1 6 3.4 2-2.4 3.7-3.6 6-3.4 4 .4 5.5 4.4 4 8.1-2.5 4.7-10 9.3-10 9.3z"/></svg>
      </button>
      <a href="product.html?id=${p.id}">
        <img class="img-a" src="${p.images[0]}&w=700" alt="${p.name}" loading="lazy">
        <img class="img-b" src="${p.images[1]}&w=700" alt="" loading="lazy">
      </a>
    </div>
    <a href="product.html?id=${p.id}" class="product-info-link">
      <div class="product-info">
        <span class="product-cat">${p.category}</span>
        <h3 class="product-name">${p.name}</h3>
        <div class="product-price-row">
          <span class="product-price">$${p.price.toFixed(2)}</span>
        </div>
      </div>
    </a>
  </div>`;
}

function renderProduct() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id") || PRODUCTS[0].id;
  const p = findProduct(id) || PRODUCTS[0];
  pdState.color = p.colors[0];
  document.title = `${p.name} — Loop & Bloom`;

  document.getElementById("pdBreadcrumbName").textContent = p.name;
  document.getElementById("pdCategory").textContent = p.category;
  document.getElementById("pdName").textContent = p.name;
  document.getElementById("pdTagline").textContent = p.tagline;
  document.getElementById("pdPrice").textContent = `$${p.price.toFixed(2)}`;
  document.getElementById("pdDescription").textContent = p.description;
  document.getElementById("pdIncluded").textContent = p.included;
  document.getElementById("pdMaterials").textContent = p.materials;
  document.getElementById("pdCare").textContent = p.care;
  document.getElementById("pdMadeToOrder").style.display = p.madeToOrder ? "flex" : "none";

  const mainImg = document.getElementById("pdMainImg");
  mainImg.src = p.images[0] + "&w=1000";
  mainImg.alt = p.name;

  const thumbsWrap = document.getElementById("pdThumbs");
  thumbsWrap.innerHTML = p.images.map((img, i) => `
    <button class="pd-thumb ${i === 0 ? "active" : ""}" data-idx="${i}" aria-label="View image ${i + 1}">
      <img src="${img}&w=200" alt="">
    </button>`).join("");
  thumbsWrap.querySelectorAll(".pd-thumb").forEach(btn => {
    btn.addEventListener("click", () => {
      const idx = Number(btn.getAttribute("data-idx"));
      mainImg.style.opacity = 0;
      setTimeout(() => { mainImg.src = p.images[idx] + "&w=1000"; mainImg.style.opacity = 1; }, 180);
      thumbsWrap.querySelectorAll(".pd-thumb").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
    });
  });

  const mainMedia = document.getElementById("pdMainMedia");
  mainMedia.addEventListener("click", () => mainMedia.classList.toggle("zoomed"));

  const colorWrap = document.getElementById("pdColors");
  colorWrap.innerHTML = p.colors.map((c, i) => `<button class="color-swatch ${i === 0 ? "active" : ""}" data-color="${c}">${c}</button>`).join("");
  colorWrap.querySelectorAll(".color-swatch").forEach(btn => {
    btn.addEventListener("click", () => {
      colorWrap.querySelectorAll(".color-swatch").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      pdState.color = btn.getAttribute("data-color");
    });
  });

  const wishlistBtn = document.getElementById("pdWishlistBtn");
  wishlistBtn.setAttribute("data-wishlist-btn", p.id);
  refreshWishlistBtnState(wishlistBtn);

  document.getElementById("pdQtyValue").textContent = pdState.qty;
  document.getElementById("pdQtyMinus").addEventListener("click", () => {
    pdState.qty = Math.max(1, pdState.qty - 1);
    document.getElementById("pdQtyValue").textContent = pdState.qty;
  });
  document.getElementById("pdQtyPlus").addEventListener("click", () => {
    pdState.qty += 1;
    document.getElementById("pdQtyValue").textContent = pdState.qty;
  });

  document.getElementById("pdAddCart").addEventListener("click", () => {
    addToCart(p.id, pdState.qty, pdState.color);
  });
  document.getElementById("pdBuyNow").addEventListener("click", () => {
    addToCart(p.id, pdState.qty, pdState.color);
    openCart();
  });

  // accordion
  document.querySelectorAll(".acc-item").forEach(item => {
    item.querySelector(".acc-head").addEventListener("click", () => {
      const wasOpen = item.classList.contains("open");
      document.querySelectorAll(".acc-item").forEach(i => i.classList.remove("open"));
      if (!wasOpen) item.classList.add("open");
    });
  });
  document.querySelector(".acc-item")?.classList.add("open");

  renderRelated(p);
  initReveal();
}

document.addEventListener("DOMContentLoaded", renderProduct);
