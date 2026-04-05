const popularAnime = [
  {
    title: "Naruto",
    img: "photos/naruto.png",
    rating: "5.0 / 5",
    desc: "A young ninja dreams of becoming the strongest in his village.",
    trailer: "https://www.youtube.com/embed/-G9BqkgZXRA"
  },
  {
    title: "One Piece",
    img: "photos/onepiece.png",
    rating: "5.0 / 5",
    desc: "Follow Luffy and crew on their hunt for the One Piece treasure.",
    trailer: "https://www.youtube.com/embed/S8_YwFLCh4U"
  },
  {
    title: "Demon Slayer",
    img: "photos/demonslayer.png",
    rating: "5.0 / 5",
    desc: "A boy joins the Demon Slayer Corps to avenge his family.",
    trailer: "https://www.youtube.com/embed/VQGCKyvzIM4"
  },
  {
    title: "Death Note",
    img: "photos/deathnote.png",
    rating: "5.0 / 5",
    desc: "A student gains the power to kill anyone by writing their name.",
    trailer: "https://www.youtube.com/embed/tJZtOrm-WPk"
  },
  {
    title: "Attack on Titan",
    img: "photos/attackontitan.png",
    rating: "5.0 / 5",
    desc: "Humans fight for survival against man-eating giants.",
    trailer: "https://www.youtube.com/embed/MGRm4IzK1SQ"
  },
  {
    title: "Jujutsu Kaisen",
    img: "photos/jjk.png",
    rating: "5.0 / 5",
    desc: "A high school student joins a secret organization to battle curses.",
    trailer: "https://www.youtube.com/embed/pkKu9hLT-t8"
  },
  {
    title: "Tokyo Ghoul",
    img: "photos/tokyo-ghoul.png",
    rating: "4.5 / 5",
    desc: "A college student becomes half-ghoul after a deadly encounter.",
    trailer: "https://www.youtube.com/embed/vGuQeQsoRgU"
  },
  {
    title: "Bleach",
    img: "photos/bleach.png",
    rating: "4.5 / 5",
    desc: "Ichigo becomes a Soul Reaper to protect the living and the dead.",
    trailer: "https://www.youtube.com/embed/KPL8K8Rfyxc"
  },
  {
    title: "One Punch Man",
    img: "photos/onepunchman.png",
    rating: "5.0 / 5",
    desc: "A hero defeats any opponent with a single punch.",
    trailer: "https://www.youtube.com/embed/Poo5lqoWSGw"
  }
];

let displayedPopular = 0;
const perLoadPopular = 3;

function loadMorePopular(button) {
  const container = document.getElementById("popularAnimeContainer");
  const loadMoreButton = button || document.querySelector('button[onclick="loadMorePopular(this)"]');
  const nextAnime = popularAnime.slice(displayedPopular, displayedPopular + perLoadPopular);

  nextAnime.forEach((anime, i) => {
    const index = displayedPopular + i;
    const card = `
      <div class="col-md-6 col-xl-4">
        <div class="anime-card p-3 h-100 w-100">
          <img src="${anime.img}" class="img-fluid rounded card-img-top" alt="${anime.title}" loading="lazy" decoding="async">
          <h5 class="mt-3">${anime.title}</h5>
          <div class="rating mb-2">${anime.rating}</div>
          <p class="card-text">${anime.desc}</p>

          <div class="mt-auto d-flex justify-content-between">
            <button class="btn btn-sm btn-outline-light">Watch Now</button>
            <button class="btn btn-sm btn-outline-warning" data-bs-toggle="modal" data-bs-target="#trailerModalPopular${index}">Watch Trailer</button>
            <button class="btn btn-sm btn-pink" data-bs-toggle="modal" data-bs-target="#infoModalPopular${index}">More Info</button>
          </div>
        </div>
      </div>

      <div class="modal fade" id="trailerModalPopular${index}" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered">
          <div class="modal-content bg-dark text-white">
            <div class="modal-header">
              <h5 class="modal-title">${anime.title} - Trailer</h5>
              <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
              <iframe width="100%" height="400" src="${anime.trailer}" frameborder="0" loading="lazy" allowfullscreen></iframe>
            </div>
          </div>
        </div>
      </div>

      <div class="modal fade" id="infoModalPopular${index}" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content bg-dark text-white">
            <div class="modal-header">
              <h5 class="modal-title">${anime.title} - Details</h5>
              <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
              <p><strong>Description:</strong> ${anime.desc}</p>
              <p><strong>Rating:</strong> ${anime.rating}</p>
            </div>
          </div>
        </div>
      </div>
    `;
    container.insertAdjacentHTML("beforeend", card);
  });

  displayedPopular += perLoadPopular;
  if (loadMoreButton && displayedPopular >= popularAnime.length) {
    loadMoreButton.style.display = "none";
  }
}

window.addEventListener("load", () => loadMorePopular());
