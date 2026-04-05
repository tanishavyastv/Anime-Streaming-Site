function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    if (!file) {
      resolve("");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function showProfileMessage(message, isSuccess) {
  const element = document.getElementById("profileMessage");
  if (!element) {
    return;
  }

  element.textContent = message;
  element.className = `alert ${isSuccess ? "alert-success" : "alert-danger"}`;
  element.classList.remove("d-none");
}

function renderProfile(user) {
  document.getElementById("profileHeading").textContent = `Welcome to Your Profile, ${user.name}`;
  document.getElementById("user_name").value = user.name;
  document.getElementById("email").value = user.email;

  const image = document.getElementById("profileImage");
  const imageWrapper = document.getElementById("profileImageWrapper");

  if (user.profilePic) {
    image.src = user.profilePic;
    imageWrapper.classList.remove("d-none");
  } else {
    imageWrapper.classList.add("d-none");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const user = window.Auth.requireAuth({ redirect: "index.html" });
  if (!user) {
    return;
  }

  renderProfile(user);

  const form = document.getElementById("profileForm");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const profilePicFile = document.getElementById("profilePic").files[0];
    const profilePic = await readFileAsDataUrl(profilePicFile);

    const result = window.Auth.updateProfile({
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
      profilePic
    });

    showProfileMessage(result.message, result.status === "success");

    if (result.status === "success") {
      form.reset();
      renderProfile(result.user);
      document.getElementById("password").value = "";
    }
  });
});
