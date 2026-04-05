async function loadAdminNav() {
  const target = document.getElementById("adminNav");
  if (!target) {
    return;
  }

  const response = await fetch("admin-nav.html");
  target.innerHTML = await response.text();

  const logoutLink = document.getElementById("adminLogoutLink");
  if (logoutLink) {
    logoutLink.addEventListener("click", (event) => {
      event.preventDefault();
      window.Auth.logoutUser();
      window.location.href = "../index.html";
    });
  }
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
      <p class="global-loader__text">Loading control center...</p>
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

function formatDate(value) {
  return new Date(value).toLocaleString();
}

document.addEventListener("DOMContentLoaded", async () => {
  showGlobalLoader();
  const user = window.Auth.requireAuth({ adminOnly: true, redirect: "../index.html" });
  if (!user) {
    return;
  }

  await loadAdminNav();

  const welcome = document.getElementById("adminWelcome");
  if (welcome) {
    welcome.textContent = `Welcome, ${user.name}!`;
  }

  const usersTable = document.getElementById("usersTableBody");
  const usersMessage = document.getElementById("usersMessage");

  function setUsersMessage(message, isSuccess) {
    if (!usersMessage) {
      return;
    }

    usersMessage.textContent = message;
    usersMessage.className = `alert ${isSuccess ? "alert-success" : "alert-danger"}`;
    usersMessage.classList.remove("d-none");
  }

  function renderUsers() {
    if (!usersTable) {
      return;
    }

    usersTable.innerHTML = window.Auth.getUsers().slice().reverse().map((entry) => `
      <tr>
        <td>${entry.id}</td>
        <td><input type="text" class="form-control form-control-sm" data-field="name" data-user-id="${entry.id}" value="${entry.name}"></td>
        <td><input type="email" class="form-control form-control-sm" data-field="email" data-user-id="${entry.id}" value="${entry.email}"></td>
        <td><input type="password" class="form-control form-control-sm" data-field="password" data-user-id="${entry.id}" placeholder="Leave blank"></td>
        <td class="text-center"><input type="checkbox" class="form-check-input" data-field="isAdmin" data-user-id="${entry.id}" ${entry.isAdmin ? "checked" : ""}></td>
        <td>
          <button class="btn btn-success btn-sm" data-action="update-user" data-user-id="${entry.id}">Update</button>
          <button class="btn btn-danger btn-sm" data-action="delete-user" data-user-id="${entry.id}">Delete</button>
        </td>
      </tr>
    `).join("");
  }

  const addUserForm = document.getElementById("addUserForm");
  if (addUserForm) {
    addUserForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const result = window.Auth.addUser({
        name: document.getElementById("new_name").value,
        email: document.getElementById("new_email").value,
        password: document.getElementById("new_password").value,
        isAdmin: document.getElementById("new_is_admin").checked
      });

      setUsersMessage(result.message, result.status === "success");
      if (result.status === "success") {
        addUserForm.reset();
        renderUsers();
      }
    });
  }

  if (usersTable) {
    usersTable.addEventListener("click", (event) => {
      const button = event.target.closest("button");
      if (!button) {
        return;
      }

      const userId = button.dataset.userId;
      if (button.dataset.action === "delete-user") {
        const result = window.Auth.deleteUser(userId);
        setUsersMessage(result.message, result.status === "success");
        if (result.status === "success") {
          renderUsers();
        }
        return;
      }

      if (button.dataset.action === "update-user") {
        const fields = [...usersTable.querySelectorAll(`[data-user-id="${userId}"]`)];
        const payload = {
          name: fields.find((field) => field.dataset.field === "name").value,
          email: fields.find((field) => field.dataset.field === "email").value,
          password: fields.find((field) => field.dataset.field === "password").value,
          isAdmin: fields.find((field) => field.dataset.field === "isAdmin").checked
        };

        const result = window.Auth.updateUser(userId, payload);
        setUsersMessage(result.message, result.status === "success");
        if (result.status === "success") {
          renderUsers();
        }
      }
    });
  }

  const animeTable = document.getElementById("animeTableBody");
  const animeMessage = document.getElementById("animeMessage");

  function setAnimeMessage(message, isSuccess) {
    if (!animeMessage) {
      return;
    }

    animeMessage.textContent = message;
    animeMessage.className = `alert ${isSuccess ? "alert-success" : "alert-danger"}`;
    animeMessage.classList.remove("d-none");
  }

  function renderAnime() {
    if (!animeTable) {
      return;
    }

    animeTable.innerHTML = window.Auth.getManagedAnime().map((entry) => `
      <tr>
        <td>${entry.id}</td>
        <td><input type="text" class="form-control" data-field="title" data-anime-id="${entry.id}" value="${entry.title}"></td>
        <td><textarea class="form-control" rows="2" data-field="description" data-anime-id="${entry.id}">${entry.description}</textarea></td>
        <td>
          <input type="text" class="form-control mb-2" data-field="imageUrl" data-anime-id="${entry.id}" value="${entry.imageUrl}">
          <a href="${entry.imageUrl}" target="_blank" rel="noreferrer">
            <img src="${entry.imageUrl}" alt="${entry.title}" loading="lazy" decoding="async" style="width: 80px; height: auto; border-radius: 4px; box-shadow: 0 0 4px rgba(0,0,0,0.3); cursor: pointer;">
          </a>
        </td>
        <td>
          <button class="btn btn-success btn-sm mb-1" data-action="update-anime" data-anime-id="${entry.id}">Update</button>
          <button class="btn btn-danger btn-sm" data-action="delete-anime" data-anime-id="${entry.id}">Delete</button>
        </td>
      </tr>
    `).join("");
  }

  const addAnimeForm = document.getElementById("addAnimeForm");
  if (addAnimeForm) {
    addAnimeForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const result = window.Auth.addAnime({
        title: document.getElementById("new_title").value,
        description: document.getElementById("new_description").value,
        imageUrl: document.getElementById("new_image_url").value
      });

      setAnimeMessage(result.message, result.status === "success");
      if (result.status === "success") {
        addAnimeForm.reset();
        renderAnime();
      }
    });
  }

  if (animeTable) {
    animeTable.addEventListener("click", (event) => {
      const button = event.target.closest("button");
      if (!button) {
        return;
      }

      const animeId = button.dataset.animeId;
      if (button.dataset.action === "delete-anime") {
        const result = window.Auth.deleteAnime(animeId);
        setAnimeMessage(result.message, result.status === "success");
        if (result.status === "success") {
          renderAnime();
        }
        return;
      }

      if (button.dataset.action === "update-anime") {
        const fields = [...animeTable.querySelectorAll(`[data-anime-id="${animeId}"]`)];
        const payload = {
          title: fields.find((field) => field.dataset.field === "title").value,
          description: fields.find((field) => field.dataset.field === "description").value,
          imageUrl: fields.find((field) => field.dataset.field === "imageUrl").value
        };

        const result = window.Auth.updateAnime(animeId, payload);
        setAnimeMessage(result.message, result.status === "success");
        if (result.status === "success") {
          renderAnime();
        }
      }
    });
  }

  const activityLogBody = document.getElementById("activityLogBody");
  if (activityLogBody) {
    activityLogBody.innerHTML = window.Auth.getActivityLog().map((entry) => `
      <tr>
        <td>${entry.id}</td>
        <td>${entry.userEmail}</td>
        <td>${entry.action}</td>
        <td>${formatDate(entry.timestamp)}</td>
      </tr>
    `).join("") || `
      <tr>
        <td colspan="4" class="text-center">No activity logs available.</td>
      </tr>
    `;
  }

  renderUsers();
  renderAnime();
  window.setTimeout(hideGlobalLoader, 180);
});
