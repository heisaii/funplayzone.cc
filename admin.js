const form = document.getElementById("draftForm");
const preview = document.getElementById("draftPreview");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const file = formData.get("image");
  const draft = {
    title: formData.get("title"),
    section: formData.get("section"),
    summary: formData.get("summary"),
    body: formData.get("body"),
  };

  const render = (imageUrl = "") => {
    preview.innerHTML = `
      ${imageUrl ? `<img src="${imageUrl}" alt="" />` : `<div class="placeholder-image"></div>`}
      <span>${escapeHtml(draft.section)} / Pending review</span>
      <h2>${escapeHtml(draft.title)}</h2>
      <p>${escapeHtml(draft.summary)}</p>
      <div class="draft-body">${escapeHtml(draft.body || "No body text added yet.")}</div>
    `;
  };

  if (file && file.size) {
    const reader = new FileReader();
    reader.onload = () => render(reader.result);
    reader.readAsDataURL(file);
  } else {
    render();
  }
});

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
