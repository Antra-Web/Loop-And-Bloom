/* Loop & Bloom — gallery.js */

let galleryFilter = "All";
let lightboxIndex = 0;
let visibleItems = [];

function renderGallery() {
  const grid = document.getElementById("masonryGrid");
  if (!grid) return;
  visibleItems = galleryFilter === "All" ? GALLERY_ITEMS : GALLERY_ITEMS.filter(i => i.category === galleryFilter);
  grid.innerHTML = GALLERY_ITEMS.map((item, idx) => {
    const isVisible = galleryFilter === "All" || item.category === galleryFilter;
    return `<div class="masonry-item ${isVisible ? "" : "hide"}" data-cat="${item.category}" data-global-idx="${idx}">
      <img src="${item.img}" alt="${item.caption}" loading="lazy">
      <span class="masonry-tag">${item.category}</span>
    </div>`;
  }).join("");
  grid.querySelectorAll(".masonry-item").forEach(el => {
    el.addEventListener("click", () => {
      const globalIdx = Number(el.getAttribute("data-global-idx"));
      const idxInVisible = visibleItems.findIndex(v => GALLERY_ITEMS.indexOf(v) === globalIdx);
      openLightbox(idxInVisible >= 0 ? idxInVisible : 0);
    });
  });
}

function openLightbox(idx) {
  lightboxIndex = idx;
  updateLightbox();
  document.getElementById("lightbox").classList.add("is-open");
  document.body.style.overflow = "hidden";
}
function closeLightbox() {
  document.getElementById("lightbox").classList.remove("is-open");
  document.body.style.overflow = "";
}
function updateLightbox() {
  const item = visibleItems[lightboxIndex];
  if (!item) return;
  document.getElementById("lightboxImg").src = item.img.replace(/w=\d+/, "w=1600");
  document.getElementById("lightboxImg").alt = item.caption;
  document.getElementById("lightboxCaption").textContent = `${item.caption} — ${item.category}`;
}
function lightboxNav(delta) {
  lightboxIndex = (lightboxIndex + delta + visibleItems.length) % visibleItems.length;
  updateLightbox();
}

function initGalleryPage() {
  renderGallery();
  document.querySelectorAll(".chip[data-gallery-filter]").forEach(chip => {
    chip.addEventListener("click", () => {
      galleryFilter = chip.getAttribute("data-gallery-filter");
      document.querySelectorAll(".chip[data-gallery-filter]").forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      renderGallery();
    });
  });
  document.getElementById("lightboxClose").addEventListener("click", closeLightbox);
  document.getElementById("lightboxPrev").addEventListener("click", () => lightboxNav(-1));
  document.getElementById("lightboxNext").addEventListener("click", () => lightboxNav(1));
  document.getElementById("lightbox").addEventListener("click", (e) => {
    if (e.target.id === "lightbox") closeLightbox();
  });
  document.addEventListener("keydown", (e) => {
    if (!document.getElementById("lightbox").classList.contains("is-open")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") lightboxNav(-1);
    if (e.key === "ArrowRight") lightboxNav(1);
  });
}

document.addEventListener("DOMContentLoaded", initGalleryPage);
