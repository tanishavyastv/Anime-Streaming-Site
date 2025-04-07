$(function () {
  $("#navbar").load("navbar.html");
  $("#footer").load("footer.html");
});

const tvSeries = [
  {
    title: "Attack on Titan",
    img: "photos/attackontitan.png",
    rating: "★★★★★",
    desc: "Humans fight for survival against man-eating giants.",
    trailer: "https://www.youtube.com/embed/MGRm4IzK1SQ"
  },
  {
    title: "Demon Slayer",
    img: "photos/demonslayer.png",
    rating: "★★★★★",
    desc: "A boy joins the Demon Slayer Corps to avenge his family.",
    trailer: "https://www.youtube.com/embed/VQGCKyvzIM4"
  },
  {
    title: "Blue Lock",
    img: "photos/bluelock.png",
    rating: "★★★★☆",
    desc: "High-stakes soccer tournament to find Japan's best striker.",
    trailer: "https://www.youtube.com/embed/IVsII3dLbWc"
  },
  {
    title: "Chainsaw Man",
    img: "photos/chainsaw.png",
    rating: "★★★★☆",
    desc: "A young man merges with a devil to become Chainsaw Man.",
    trailer: "https://www.youtube.com/embed/dFlDRhvM4L0"
  },
  {
    title: "Haikyuu!!",
    img: "photos/haikyuu.png",
    rating: "★★★★☆",
    desc: "A volleyball prodigy aims for the top.",
    trailer: "https://www.youtube.com/embed/JOGp2c7-cKc"
  },
  {
    title: "One Piece",
    img: "photos/onepiece.png",
    rating: "★★★★★",
    desc: "Follow Luffy and crew on their hunt for the One Piece treasure.",
    trailer: "https://www.youtube.com/embed/S8_YwFLCh4U",
  }
  ,
  {
    title: "Horimiya",
    img: "photos/horimiya.png",
    rating: "★★★★☆",
    desc: "A sweet and relatable high school romance between two opposites.",
    trailer: "https://www.youtube.com/embed/e4RCugyx5No"
  },
  {
    title: "Tokyo Revengers",
    img: "photos/tokyorevengers.png",
    rating: "★★★★☆",
    desc: "A young man travels back in time to save his ex-girlfriend from a gang.",
    trailer: "https://www.youtube.com/embed/4pL0DrkmNaQ"
  },
  {
    title: "The Case Study of Vanitas",
    img: "photos/vanitas.png",
    rating: "★★★★☆",
    desc: "A vampire and a human team up to save cursed vampires.",
    trailer: "https://www.youtube.com/embed/6SeeQsGtiUU"
  }
];

let displayed = 0;
const perLoad = 3;

function loadMoreSeries(button) {
  const container = document.getElementById("tvSeriesContainer");
  const nextSeries = tvSeries.slice(displayed, displayed + perLoad);
  nextSeries.forEach((series, i) => {
    const index = displayed + i;
    const card = `
        <div class="col-md-4">
          <div class="anime-card p-3 h-100 w-100">
            <img src="${series.img}" class="img-fluid rounded card-img-top" alt="${series.title}">
            <h5 class="mt-3">${series.title}</h5>
            <div class="rating mb-2">${series.rating}</div>
            <p class="card-text">${series.desc}</p>

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
                <h5 class="modal-title">${series.title} - Trailer</h5>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
            </div>
                <div class="modal-body">
                <iframe width="100%" height="400" src="${series.trailer}" frameborder="0" allowfullscreen></iframe>
              </div>
            </div>
          </div>
        </div>

        <!-- Info Modal -->
        <div class="modal fade" id="infoModal${index}" tabindex="-1" aria-hidden="true">
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content bg-dark text-white">
              <div class="modal-header">
                <h5 class="modal-title">${series.title} - Details</h5>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
              </div>
              <div class="modal-body">
                <p><strong>Description:</strong> ${series.desc}</p>
                <p><strong>Rating:</strong> ${series.rating}</p>
              </div>
            </div>
          </div>
        </div>
      `;
    container.insertAdjacentHTML('beforeend', card);
  });

  displayed += perLoad;
  if (displayed >= tvSeries.length) {
    button.style.display = "none";
  }
}
window.onload = () => loadMoreSeries();