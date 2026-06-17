const articles = window.SITE_ARTICLES || [];
const manualTickerAd = window.MANUAL_TICKER_AD || {
  enabled: false,
  slot: "",
};
const lead = articles.find((item) => item.featured) || articles[0];
const secondary = articles.filter((item) => item.id !== lead.id);

const byType = (type) => articles.filter((item) => item.type === type);
const articleUrl = (article) => `./article.html?id=${encodeURIComponent(article.id)}`;
const text = (value) =>
  String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

function meta(article) {
  return `<p class="meta">${text(article.section)} / ${text(article.time)} / ${text(article.city || "Global")}</p>`;
}

function card(article, className = "story-card") {
  return `
    <a class="${className} story-link" href="${articleUrl(article)}">
      <img src="${text(article.image)}" alt="${text(article.imageAlt)}" loading="lazy" />
      <div>
        <span>${text(article.label)}</span>
        <h3>${text(article.title)}</h3>
        <p>${text(article.summary)}</p>
        ${meta(article)}
      </div>
    </a>
  `;
}

if (lead) {
  document.getElementById("leadStory").innerHTML = `
    <a class="story-link" href="${articleUrl(lead)}">
      <img src="${text(lead.image)}" alt="${text(lead.imageAlt)}" />
      <div class="lead-copy">
        <span>${text(lead.label)}</span>
        <h1>${text(lead.title)}</h1>
        <p>${text(lead.summary)}</p>
        ${meta(lead)}
      </div>
    </a>
  `;
}

const sponsorLink = document.getElementById("tickerSponsor");
if (sponsorLink && manualTickerAd.enabled && manualTickerAd.slot) {
  const adUnit = sponsorLink.querySelector(".adsbygoogle");
  if (adUnit) {
    adUnit.setAttribute("data-ad-slot", String(manualTickerAd.slot));
  }
  sponsorLink.classList.remove("is-hidden");
  if (adUnit) {
    window.adsbygoogle = window.adsbygoogle || [];
    window.adsbygoogle.push({});
  }
}

document.getElementById("tickerItems").innerHTML = articles
  .slice(0, 6)
  .map((article) => `<a href="${articleUrl(article)}">${text(article.title)}</a>`)
  .join("");

document.getElementById("stackColumn").innerHTML = secondary
  .slice(0, 3)
  .map((article) => card(article, "stack-card"))
  .join("");

document.getElementById("trackList").innerHTML = articles
  .flatMap((article) => article.tracks || [])
  .slice(0, 7)
  .map((track) => `<li><strong>${text(track.title)}</strong><span>${text(track.note)}</span></li>`)
  .join("");

document.getElementById("latestGrid").innerHTML = secondary
  .slice(1, 7)
  .map((article) => card(article))
  .join("");

document.getElementById("playlistGrid").innerHTML = byType("playlist")
  .slice(0, 3)
  .map(
    (article) => `
      <a class="playlist-chip" href="${articleUrl(article)}">
        <strong>${text(article.title)}</strong>
        <span>${text(article.kicker || article.section)}</span>
      </a>
    `
  )
  .join("");

document.getElementById("cityGrid").innerHTML = byType("city")
  .slice(0, 3)
  .map((article) => card(article, "city-card"))
  .join("");
