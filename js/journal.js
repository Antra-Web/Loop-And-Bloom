/* Loop & Bloom — journal.js */

function articleCardHTML(a) {
  return `
  <a href="article.html?slug=${a.slug}" class="article-card reveal">
    <div class="article-card-media"><img src="${a.image}&w=700" alt="${a.title}" loading="lazy"></div>
    <div class="article-card-meta"><span>${a.date}</span><span>·</span><span>${a.readTime}</span></div>
    <h3>${a.title}</h3>
    <p>${a.excerpt}</p>
  </a>`;
}

function renderJournalList() {
  const grid = document.getElementById("articleGrid");
  if (!grid) return;
  grid.innerHTML = ARTICLES.map(articleCardHTML).join("");
  initReveal();
}

function renderArticle() {
  const params = new URLSearchParams(window.location.search);
  const slug = params.get("slug") || ARTICLES[0].slug;
  const a = ARTICLES.find(x => x.slug === slug) || ARTICLES[0];
  document.title = `${a.title} — Loop & Bloom Journal`;
  document.getElementById("articleTitle").textContent = a.title;
  document.getElementById("articleDate").textContent = a.date;
  document.getElementById("articleReadTime").textContent = a.readTime;
  document.getElementById("articleHeroImg").src = a.image + "&w=1400";
  document.getElementById("articleHeroImg").alt = a.title;
  document.getElementById("articleBody").innerHTML = a.body.map(p => `<p>${p}</p>`).join("");
  document.getElementById("metaDescription")?.setAttribute("content", a.excerpt);

  const related = ARTICLES.filter(x => x.slug !== a.slug).slice(0, 3);
  const relatedGrid = document.getElementById("relatedArticles");
  if (relatedGrid) relatedGrid.innerHTML = related.map(articleCardHTML).join("");
  initReveal();
}
