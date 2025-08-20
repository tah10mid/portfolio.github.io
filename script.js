// Simple theme toggle (optional)
const themeToggle = document.getElementById("themeToggle");
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    // Optional: Add simple theme switching if needed
    console.log("Theme toggle clicked");
  });
}

// Mobile nav
const navToggle = document.getElementById("navToggle");
const siteNav = document.getElementById("siteNav");
if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => siteNav.classList.toggle("show"));
}

// Year
const yearSpan = document.getElementById("year");
if (yearSpan) yearSpan.textContent = new Date().getFullYear();

// Load projects
async function loadProjects() {
  const grid = document.getElementById("projects-container");
  if (!grid) return;
  try {
    const res = await fetch("data.json", { cache: "no-store" });
    const data = await res.json();
    grid.innerHTML = data.projects.map(p => `
      <article class="card">
        <img src="${p.image || 'ocean.jpg'}" alt="">
        <div class="card-body">
          <h3>${p.title}</h3>
          <p>${p.summary}</p>
          <div class="tags">
            ${(p.tags||[]).map(t => `<span class="tag">${t}</span>`).join("")}
          </div>
          <div class="actions">
            ${p.demo ? `<a href="${p.demo}" target="_blank" rel="noreferrer">Live</a>` : ""}
            ${p.source ? `<a class="ghost" href="${p.source}" target="_blank" rel="noreferrer">Code</a>` : ""}
          </div>
        </div>
      </article>
    `).join("");
  } catch (e) {
    grid.innerHTML = `<p style="color:var(--muted)">Couldn’t load projects. Make sure <code>data.json</code> is in the same folder (GitHub Pages will work). If testing locally, run a local server instead of file://</p>`;
  }
}
loadProjects();

// Smooth scroll (nice UX)
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener("click", e => {
    const id = a.getAttribute("href");
    if (id.length > 1) {
      e.preventDefault();
      document.querySelector(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
      siteNav?.classList.remove("show");
    }
  });
});
