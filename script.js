const articles = window.SITE_ARTICLES || [];
const homepageBannerAd = window.HOMEPAGE_BANNER_AD || {
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

function isAdRenderableEnvironment() {
  const hostname = window.location.hostname;
  return window.location.protocol !== "file:" && hostname !== "localhost" && hostname !== "127.0.0.1";
}

function syncAdShellVisibility(shell, adUnit) {
  const status = adUnit.getAttribute("data-ad-status");
  if (status === "unfilled") {
    shell.classList.add("is-hidden");
    return;
  }
  shell.classList.remove("is-hidden");
}

function watchAdFill(shell, adUnit) {
  syncAdShellVisibility(shell, adUnit);

  const observer = new MutationObserver(() => {
    syncAdShellVisibility(shell, adUnit);
  });

  observer.observe(adUnit, {
    attributes: true,
    attributeFilter: ["data-ad-status"],
  });
}

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

const homepageAdShell = document.getElementById("homepageAdShell");
if (homepageAdShell && homepageBannerAd.enabled && homepageBannerAd.slot) {
  const adUnit = homepageAdShell.querySelector(".adsbygoogle");
  if (!isAdRenderableEnvironment()) {
    homepageAdShell.classList.add("is-hidden");
  }
  if (adUnit) {
    adUnit.setAttribute("data-ad-slot", String(homepageBannerAd.slot));
    if (isAdRenderableEnvironment()) {
      watchAdFill(homepageAdShell, adUnit);
    }
  }
  if (adUnit && isAdRenderableEnvironment()) {
    window.adsbygoogle = window.adsbygoogle || [];
    try {
      window.adsbygoogle.push({});
    } catch (error) {
      homepageAdShell.classList.add("is-hidden");
    }
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
