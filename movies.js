const movies = [
  {
    title: "Your Name",
    img: "photos/your-name.png",
    rating: "★★★★★",
    desc: "Two teenagers share a profound connection despite never having met.",
    trailer: "https://www.youtube.com/embed/3KR8_igDs1Y"
  },
  {
    title: "A Silent Voice",
    img: "photos/silent-voice.png",
    rating: "★★★★☆",
    desc: "A former bully tries to make amends with a deaf girl he once tormented.",
    trailer: "https://www.youtube.com/embed/nfK6UgLra7g"
  },
  {
    title: "Spirited Away",
    img: "photos/spirited-away.png",
    rating: "★★★★★",
    desc: "A girl enters a magical world to save her parents from a mysterious spell.",
    trailer: "https://www.youtube.com/embed/ByXuk9QqQkk"
  },
  {
    title: "Weathering With You",
    img: "photos/weathering.png",
    rating: "★★★★☆",
    desc: "A boy runs away to Tokyo and meets a girl who can manipulate the weather.",
    trailer: "https://www.youtube.com/embed/Q6iK6DjV_iE"
  },
  {
    title: "The Garden of Words",
    img: "photos/garden-of-words.png",
    rating: "★★★★☆",
    desc: "A young man and an older woman form a bond during rainy season meetups.",
    trailer: "https://www.youtube.com/embed/udDIkl6z8X0"
  },
  {
    title: "Howl's Moving Castle",
    img: "photos/howls-castle.png",
    rating: "★★★★★",
    desc: "A young woman is cursed by a witch and finds refuge in a magical moving castle.",
    trailer: "https://www.youtube.com/embed/iwROgK94zcM"
  },
  {
    title: "Princess Mononoke",
    img: "photos/princess-mononoke.png",
    rating: "★★★★★",
    desc: "A young warrior becomes involved in a struggle between forest gods and humans.",
    trailer: "https://www.youtube.com/embed/4OiMOHRDs14"
  },
  {
    title: "I Want to Eat Your Pancreas",
    img: "photos/pancreas.png",
    rating: "★★★★☆",
    desc: "A boy discovers his classmate has a terminal illness and their friendship blossoms.",
    trailer: "https://www.youtube.com/embed/MmoBvmJA9XI"
  },
  {
    title: "The Boy and the Beast",
    img: "photos/boy-and-beast.png",
    rating: "★★★★☆",
    desc: "A boy lost in the world of beasts trains to become a warrior.",
    trailer: "https://www.youtube.com/embed/uifJLWoWv8c"
  }
];

let displayed = 0;
const perLoad = 3;

function loadMoreMovies() {
  const container = document.getElementById("movieCardsContainer");
  const nextMovies = movies.slice(displayed, displayed + perLoad);

  nextMovies.forEach((movie, i) => {
    const index = displayed + i;
    const card = `
          <div class="col-md-4">
            <div class="anime-card p-3 h-100 w-100">
              <img src="${movie.img}" class="img-fluid rounded card-img-top" alt="${movie.title}">
              <h5 class="mt-3">${movie.title}</h5>
              <div class="stars mb-2">${movie.rating}</div>
              <p class="card-text">${movie.desc}</p>
  
              <div class="mt-auto d-flex justify-content-between">
                <button class="btn btn-sm btn-outline-light">Watch Now</button>
                <button class="btn btn-sm btn-outline-warning" data-bs-toggle="modal"
                    data-bs-target="#trailerModal${index}">Watch Trailer</button>
                <button class="btn btn-sm btn-pink" data-bs-toggle="modal"
                    data-bs-target="#infoModal${index}">More Info</button>
              </div>
            </div>
          </div>
  
          <!-- Trailer Modal -->
          <div class="modal fade" id="trailerModal${index}" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-lg modal-dialog-centered">
              <div class="modal-content bg-dark text-white">
                <div class="modal-header">
                  <h5 class="modal-title">${movie.title} - Trailer</h5>
                  <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                  <iframe width="100%" height="400" src="${movie.trailer}" frameborder="0" allowfullscreen></iframe>
                </div>
              </div>
            </div>
          </div>
  
          <!-- Info Modal -->
          <div class="modal fade" id="infoModal${index}" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content bg-dark text-white">
                <div class="modal-header">
                  <h5 class="modal-title">${movie.title} - Details</h5>
                  <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                  <p>${movie.desc}</p>
                  <p><strong>Rating:</strong> ${movie.rating}</p>
                </div>
              </div>
            </div>
          </div>
        `;
    container.insertAdjacentHTML("beforeend", card);
  });

  displayed += perLoad;
  if (displayed >= movies.length) {
    event.target.style.display = "none";
  }
}
document.addEventListener("DOMContentLoaded", () => {
  loadMoreMovies();
});