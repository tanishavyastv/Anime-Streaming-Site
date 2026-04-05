const STORAGE_KEYS = {
  users: "animeSite.users",
  currentUserId: "animeSite.currentUserId",
  activityLog: "animeSite.activityLog",
  managedAnime: "animeSite.managedAnime"
};

function readJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (error) {
    console.error(`Failed to read ${key} from storage.`, error);
    return fallback;
  }
}

function writeJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function createId(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function normalizeEmail(email) {
  return String(email || "").trim().toLowerCase();
}

function getUsers() {
  return readJson(STORAGE_KEYS.users, []);
}

function saveUsers(users) {
  writeJson(STORAGE_KEYS.users, users);
}

function getActivityLog() {
  return readJson(STORAGE_KEYS.activityLog, []);
}

function saveActivityLog(logs) {
  writeJson(STORAGE_KEYS.activityLog, logs);
}

function getManagedAnime() {
  return readJson(STORAGE_KEYS.managedAnime, []);
}

function saveManagedAnime(items) {
  writeJson(STORAGE_KEYS.managedAnime, items);
}

function logActivity(userEmail, action) {
  const logs = getActivityLog();
  logs.unshift({
    id: createId("log"),
    userEmail,
    action,
    timestamp: new Date().toISOString()
  });
  saveActivityLog(logs);
}

function getCurrentUser() {
  const userId = localStorage.getItem(STORAGE_KEYS.currentUserId);
  if (!userId) {
    return null;
  }

  return getUsers().find((user) => user.id === userId) || null;
}

function setCurrentUser(userId) {
  if (userId) {
    localStorage.setItem(STORAGE_KEYS.currentUserId, userId);
  } else {
    localStorage.removeItem(STORAGE_KEYS.currentUserId);
  }
}

function seedData() {
  const users = getUsers();
  if (!users.length) {
    saveUsers([{
      id: createId("user"),
      name: "Admin",
      email: "admin@hanime.local",
      password: "admin123",
      isAdmin: true,
      profilePic: "",
      createdAt: new Date().toISOString()
    }]);
  }

  if (!localStorage.getItem(STORAGE_KEYS.activityLog)) {
    saveActivityLog([]);
  }

  if (!localStorage.getItem(STORAGE_KEYS.managedAnime)) {
    saveManagedAnime([]);
  }
}

function registerUser({ name, email, password }) {
  const users = getUsers();
  const normalizedEmail = normalizeEmail(email);

  if (!name.trim() || !normalizedEmail || !password) {
    return { status: "error", message: "Please fill out every field." };
  }

  if (users.some((user) => normalizeEmail(user.email) === normalizedEmail)) {
    return { status: "error", message: "Email already registered." };
  }

  const user = {
    id: createId("user"),
    name: name.trim(),
    email: normalizedEmail,
    password,
    isAdmin: false,
    profilePic: "",
    createdAt: new Date().toISOString()
  };

  users.push(user);
  saveUsers(users);
  setCurrentUser(user.id);
  logActivity(user.email, "New user registered");

  return { status: "success", message: "Registration successful!", user };
}

function loginUser({ email, password }) {
  const normalizedEmail = normalizeEmail(email);
  const user = getUsers().find((entry) => normalizeEmail(entry.email) === normalizedEmail);

  if (!user) {
    return { status: "error", message: "Email not registered." };
  }

  if (user.password !== password) {
    return { status: "error", message: "Wrong password." };
  }

  setCurrentUser(user.id);

  if (user.isAdmin) {
    logActivity(user.email, "Admin logged in");
  }

  return { status: "success", message: "Login successful!", user };
}

function logoutUser() {
  setCurrentUser(null);
}

function updateProfile({ email, password, profilePic }) {
  const currentUser = getCurrentUser();
  if (!currentUser) {
    return { status: "error", message: "You need to log in first." };
  }

  const users = getUsers();
  const userIndex = users.findIndex((user) => user.id === currentUser.id);
  if (userIndex === -1) {
    return { status: "error", message: "User not found." };
  }

  const normalizedEmail = normalizeEmail(email);
  const emailTaken = users.some(
    (user) => user.id !== currentUser.id && normalizeEmail(user.email) === normalizedEmail
  );

  if (emailTaken) {
    return { status: "error", message: "That email is already in use." };
  }

  users[userIndex] = {
    ...users[userIndex],
    email: normalizedEmail,
    password: password ? password : users[userIndex].password,
    profilePic: profilePic || users[userIndex].profilePic
  };

  saveUsers(users);
  logActivity(users[userIndex].email, "Updated profile");

  return { status: "success", message: "Profile updated successfully!", user: users[userIndex] };
}

function requireAuth({ adminOnly = false, redirect = "index.html" } = {}) {
  const currentUser = getCurrentUser();
  if (!currentUser || (adminOnly && !currentUser.isAdmin)) {
    window.location.href = redirect;
    return null;
  }
  return currentUser;
}

function addUser({ name, email, password, isAdmin }) {
  const admin = getCurrentUser();
  const previousUserId = admin?.id || null;
  const result = registerUser({ name, email, password });
  if (result.status === "error") {
    return result;
  }

  const users = getUsers();
  const userIndex = users.findIndex((user) => user.id === result.user.id);
  users[userIndex].isAdmin = Boolean(isAdmin);
  saveUsers(users);

  if (previousUserId) {
    setCurrentUser(previousUserId);
    logActivity(admin.email, `Added new user (Email: ${users[userIndex].email}, Admin: ${users[userIndex].isAdmin ? 1 : 0})`);
  }

  return { status: "success", message: "User added successfully.", user: users[userIndex] };
}

function updateUser(userId, payload) {
  const users = getUsers();
  const userIndex = users.findIndex((user) => user.id === userId);
  if (userIndex === -1) {
    return { status: "error", message: "User not found." };
  }

  const normalizedEmail = normalizeEmail(payload.email);
  const emailTaken = users.some(
    (user) => user.id !== userId && normalizeEmail(user.email) === normalizedEmail
  );

  if (emailTaken) {
    return { status: "error", message: "That email is already in use." };
  }

  users[userIndex] = {
    ...users[userIndex],
    name: payload.name.trim(),
    email: normalizedEmail,
    isAdmin: Boolean(payload.isAdmin),
    password: payload.password ? payload.password : users[userIndex].password
  };

  saveUsers(users);

  const currentUser = getCurrentUser();
  if (currentUser?.id === userId) {
    setCurrentUser(userId);
  }

  if (currentUser) {
    logActivity(currentUser.email, `Updated user info with ID ${userId} (Email: ${normalizedEmail})`);
  }

  return { status: "success", message: "User updated successfully." };
}

function deleteUser(userId) {
  const users = getUsers();
  const user = users.find((entry) => entry.id === userId);
  if (!user) {
    return { status: "error", message: "User not found." };
  }

  saveUsers(users.filter((entry) => entry.id !== userId));

  const currentUser = getCurrentUser();
  if (currentUser?.id === userId) {
    logoutUser();
  } else if (currentUser) {
    logActivity(currentUser.email, `Deleted user with ID ${userId} (Email: ${user.email})`);
  }

  return { status: "success", message: "User deleted successfully." };
}

function addAnime({ title, description, imageUrl }) {
  const anime = {
    id: createId("anime"),
    title: title.trim(),
    description: description.trim(),
    imageUrl: imageUrl.trim()
  };

  const items = getManagedAnime();
  items.unshift(anime);
  saveManagedAnime(items);

  const currentUser = getCurrentUser();
  if (currentUser) {
    logActivity(currentUser.email, `Added anime: ${anime.title}`);
  }

  return { status: "success", message: "Anime added successfully." };
}

function updateAnime(animeId, payload) {
  const items = getManagedAnime();
  const index = items.findIndex((entry) => entry.id === animeId);
  if (index === -1) {
    return { status: "error", message: "Anime not found." };
  }

  items[index] = {
    ...items[index],
    title: payload.title.trim(),
    description: payload.description.trim(),
    imageUrl: payload.imageUrl.trim()
  };
  saveManagedAnime(items);

  const currentUser = getCurrentUser();
  if (currentUser) {
    logActivity(currentUser.email, `Updated anime ID ${animeId}: ${items[index].title}`);
  }

  return { status: "success", message: "Anime updated successfully." };
}

function deleteAnime(animeId) {
  const items = getManagedAnime();
  const anime = items.find((entry) => entry.id === animeId);
  if (!anime) {
    return { status: "error", message: "Anime not found." };
  }

  saveManagedAnime(items.filter((entry) => entry.id !== animeId));

  const currentUser = getCurrentUser();
  if (currentUser) {
    logActivity(currentUser.email, `Deleted anime ID ${animeId}: ${anime.title}`);
  }

  return { status: "success", message: "Anime deleted successfully." };
}

seedData();

window.Auth = {
  getUsers,
  getCurrentUser,
  getActivityLog,
  getManagedAnime,
  loginUser,
  logoutUser,
  registerUser,
  updateProfile,
  requireAuth,
  addUser,
  updateUser,
  deleteUser,
  addAnime,
  updateAnime,
  deleteAnime
};
