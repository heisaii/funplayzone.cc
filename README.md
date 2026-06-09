# Kick & Bass

A static GitHub Pages template for a World Cup 2026 music, culture, playlist, and city-scene blog on `funplayzone.cc`.

## Files

- `index.html` - homepage
- `article.html` - article detail page
- `admin.html` - local draft preview helper
- `data/articles.js` - article metadata used by the homepage and article page
- `content/articles/*.md` - article body files
- `styles.css` - site styling

## Publish On GitHub Pages

1. Create a new GitHub repository.
2. Upload the contents of this folder as the repository root.
3. In GitHub, open Settings > Pages.
4. Choose `Deploy from a branch`.
5. Select `main` and `/root`.
6. Add `funplayzone.cc` as the custom domain if GitHub does not pick up `CNAME` automatically.
7. Open the Pages URL after the deploy finishes.

There is no build command.

## Replace Content

Edit `data/articles.js` for titles, summaries, sections, images, dates, and article paths. Edit the matching Markdown files in `content/articles/` for full article bodies.

Use official sources for facts, GNews for topic discovery, and music platform embeds for playable media.
