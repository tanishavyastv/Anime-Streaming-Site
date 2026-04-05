async function loadFragment(targetSelector, path) {
  const target = document.querySelector(targetSelector);
  if (!target) {
    return;
  }

  const response = await fetch(path, { cache: "no-store" });
  target.innerHTML = await response.text();
}

function ensureGlobalLoader() {
  let loader = document.getElementById("globalLoader");
  if (loader) {
    return loader;
  }

  loader = document.createElement("div");
  loader.id = "globalLoader";
  loader.className = "global-loader";
  loader.innerHTML = `
    <div class="global-loader__panel">
      <div class="global-loader__logo">
        <span>H</span><span class="global-loader__bang">!</span><span>Anime</span>
      </div>
      <div class="global-loader__spinner" aria-hidden="true"></div>
      <p class="global-loader__text">Loading your next anime stop...</p>
    </div>
  `;
  document.body.appendChild(loader);
  return loader;
}

function showGlobalLoader() {
  const loader = ensureGlobalLoader();
  document.body.classList.add("has-global-loader");
  loader.classList.remove("is-hidden");
}

function hideGlobalLoader() {
  const loader = document.getElementById("globalLoader");
  if (!loader) {
    document.body.classList.remove("has-global-loader");
    return;
  }

  loader.classList.add("is-hidden");
  document.body.classList.remove("has-global-loader");
}

function ensureStylesheet(href) {
  if (document.querySelector(`link[href="${href}"]`)) {
    return;
  }

  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = href;
  document.head.appendChild(link);
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  }[char]));
}

function showInlineMessage(id, message, isSuccess) {
  const element = document.getElementById(id);
  if (!element) {
    return;
  }

  element.textContent = message;
  element.style.display = "block";
  element.classList.toggle("text-success", isSuccess);
  element.classList.toggle("text-danger", !isSuccess);
}

function renderNavbarAuth() {
  const navLinks = document.getElementById("navbar-links");
  const authSlot = document.getElementById("navbar-auth-slot");
  if (!navLinks || !authSlot) {
    return;
  }

  const currentPath = window.location.pathname.split("/").pop() || "index.html";
  const navLinkClass = (href, extra = "") =>
    `nav-link nav-link-minimal${currentPath === href ? " is-active" : ""}${extra ? ` ${extra}` : ""}`;

  const currentUser = window.Auth.getCurrentUser();
  navLinks.innerHTML = `
    <li class="nav-item"><a class="${navLinkClass("index.html")}" href="index.html">Home</a></li>
    <li class="nav-item"><a class="${navLinkClass("movies.html")}" href="movies.html">Movies</a></li>
    <li class="nav-item"><a class="${navLinkClass("series.html")}" href="series.html">TV Series</a></li>
    <li class="nav-item"><a class="${navLinkClass("popular.html")}" href="popular.html">Popular</a></li>
    <li class="nav-item"><a class="${navLinkClass("top-airing.html")}" href="top-airing.html">Top Airing</a></li>
  `;

  if (!currentUser) {
    authSlot.innerHTML = `
      <a class="nav-link nav-chip nav-chip-accent nav-auth-link" href="#" data-bs-toggle="modal" data-bs-target="#loginModal">Login</a>
    `;
    return;
  }

  authSlot.innerHTML = `
    <div class="nav-auth-group">
      ${currentUser.isAdmin ? '<a class="nav-link nav-chip nav-chip-accent nav-auth-link" href="admin/dashboard.html">Admin</a>' : ""}
      <a class="nav-link nav-chip nav-chip-accent nav-auth-link" href="profile.html">Profile</a>
      <a class="nav-link nav-chip nav-chip-accent nav-auth-link" href="#" id="logout-link">Logout</a>
    </div>
    <span class="navbar-text nav-user-pill">Welcome, ${escapeHtml(currentUser.name)}</span>
  `;

  const logoutLink = document.getElementById("logout-link");
  if (logoutLink) {
    logoutLink.addEventListener("click", (event) => {
      event.preventDefault();
      window.Auth.logoutUser();
      window.location.href = "index.html";
    });
  }
}

function initAuthForms() {
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");

  if (loginForm) {
    loginForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(loginForm);
      const result = window.Auth.loginUser({
        email: formData.get("loginEmail"),
        password: formData.get("loginPassword")
      });

      showInlineMessage("loginMessage", result.message, result.status === "success");

      if (result.status === "success") {
        setTimeout(() => window.location.reload(), 600);
      }
    });
  }

  if (registerForm) {
    registerForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(registerForm);
      const result = window.Auth.registerUser({
        name: formData.get("registerName"),
        email: formData.get("registerEmail"),
        password: formData.get("registerPassword")
      });

      showInlineMessage("registerMessage", result.message, result.status === "success");

      if (result.status === "success") {
        registerForm.reset();
        setTimeout(() => window.location.reload(), 600);
      }
    });
  }
}

function initSearch() {
  const searchInput = document.querySelector(".search-bar");
  const searchButton = document.querySelector(".search-btn");
  const suggestionsBox = document.getElementById("search-suggestions");
  const searchContainer = document.querySelector(".search-shell");

  if (!searchInput || !searchButton || !suggestionsBox || !searchContainer) {
    return;
  }

  let debounceTimer;

  searchButton.addEventListener("click", () => {
    const query = searchInput.value.trim();
    if (query) {
      window.location.href = `search-results.html?query=${encodeURIComponent(query)}`;
    }
  });

  searchInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      searchButton.click();
    }
  });

  searchInput.addEventListener("input", () => {
    clearTimeout(debounceTimer);
    const query = searchInput.value.trim();

    if (query.length < 2) {
      suggestionsBox.innerHTML = "";
      return;
    }

    debounceTimer = setTimeout(() => {
      fetch(`https://api.jikan.moe/v4/anime?q=${encodeURIComponent(query)}&limit=6`)
        .then((response) => response.json())
        .then((data) => {
          const suggestions = Array.isArray(data.data) ? data.data : [];
          suggestionsBox.innerHTML = suggestions.map((anime) => `
            <div class="p-2 suggestion-item" style="cursor:pointer;" data-title="${escapeHtml(anime.title)}">
              ${escapeHtml(anime.title)}
            </div>
          `).join("");
        })
        .catch(() => {
          suggestionsBox.innerHTML = "";
        });
    }, 300);
  });

  suggestionsBox.addEventListener("click", (event) => {
    const item = event.target.closest(".suggestion-item");
    if (!item) {
      return;
    }

    const selectedTitle = item.getAttribute("data-title");
    searchInput.value = selectedTitle;
    suggestionsBox.innerHTML = "";
    window.location.href = `search-results.html?query=${encodeURIComponent(selectedTitle)}`;
  });

  document.addEventListener("click", (event) => {
    if (!searchContainer.contains(event.target)) {
      suggestionsBox.innerHTML = "";
    }
  });
}

async function initSiteShell() {
  showGlobalLoader();
  ensureStylesheet("login-model.css");

  await Promise.all([
    loadFragment("#navbar", "navbar.html"),
    loadFragment("#footer", "footer.html")
  ]);

  renderNavbarAuth();
  initAuthForms();
  initSearch();
  window.setTimeout(hideGlobalLoader, 180);
}

document.addEventListener("DOMContentLoaded", initSiteShell);
