$("#navbar").load("navbar.php");
$("#footer").load("footer.html");

const airingAnime = [
    {
        title: "Solo Leveling",
        img: "photos/sololeveling.png",
        rating: "★★★★★",
        desc: "A weak hunter gains powers to level up like in a game.",
        trailer: "https://www.youtube.com/embed/byJ7pxxhaDY"
    },
    {
        title: "Mashle: Magic and Muscles",
        img: "photos/mashle.png",
        rating: "★★★★☆",
        desc: "In a world of magic, one boy relies on his strength alone.",
        trailer: "https://www.youtube.com/embed/9rVKos-oGnQ"
    },
    {
        title: "Jujutsu Kaisen Season 2",
        img: "photos/jujutsukaisen2.png",
        rating: "★★★★★",
        desc: "Gojo's past and Shibuya arc unravel dark secrets.",
        trailer: "https://www.youtube.com/embed/9OhV3IWUsxE"
    },
    {
        title: "Frieren: Beyond Journey's End",
        img: "photos/frieren.png",
        rating: "★★★★★",
        desc: "An elf mage explores emotions after her party's quest ends.",
        trailer: "https://www.youtube.com/embed/Iwr1aLEDpe4"
    },
    {
        title: "Oshi no Ko",
        img: "photos/oshinoko.png",
        rating: "★★★★☆",
        desc: "Reincarnated as the child of an idol, a doctor seeks the truth.",
        trailer: "https://www.youtube.com/embed/zntY4A4GPU0"
    },
    {
        title: "Bungou Stray Dogs 5",
        img: "photos/bungou.png",
        rating: "★★★★☆",
        desc: "Armed detectives face off against terrorists and traitors.",
        trailer: "https://www.youtube.com/embed/IgNZGQPi1N0"
    },
    {
        title: "The Apothecary Diaries",
        img: "photos/apothecary.png",
        rating: "★★★★☆",
        desc: "A clever girl solves medical mysteries in the imperial court.",
        trailer: "https://www.youtube.com/embed/XYNGkSvFT8c"
    },
    {
        title: "The Dangers in My Heart",
        img: "photos/dangersinmyheart.png",
        rating: "★★★★☆",
        desc: "A loner boy’s dark thoughts shift as he gets closer to a cheerful girl.",
        trailer: "https://www.youtube.com/embed/rXHkPOJP8ug"
    },
    {
        title: "Spy x Family Season 2",
        img: "photos/spyxfamily2.png",
        rating: "★★★★★",
        desc: "The Forger family continues hilarious spy missions and heartfelt moments.",
        trailer: "https://www.youtube.com/embed/W2tMsaAVjD0"
    }

];

let aired = 0;
const perLoad = 3;

function loadMoreAiring(event) {
    const container = document.getElementById("airingContainer");
    const nextBatch = airingAnime.slice(aired, aired + perLoad);

    nextBatch.forEach((anime, i) => {
        const index = aired + i;
        const card = `
                <div class="col-md-4">
                    <div class="anime-card p-3 h-100 w-100">
                        <img src="${anime.img}" class="img-fluid rounded card-img-top" alt="${anime.title}">
                        <h5 class="mt-3">${anime.title}</h5>
                        <div class="rating mb-2">${anime.rating}</div>
                        <p class="card-text">${anime.desc}</p>
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
                                <h5 class="modal-title">${anime.title} - Trailer</h5>
                                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                            </div>
                            <div class="modal-body">
                                <iframe width="100%" height="400" src="${anime.trailer}" frameborder="0" allowfullscreen></iframe>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Info Modal -->
                <div class="modal fade" id="infoModal${index}" tabindex="-1" aria-hidden="true">
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
        container.insertAdjacentHTML('beforeend', card);
    });

    aired += perLoad;
    if (aired >= airingAnime.length) {
        event.target.style.display = "none";
    }
}

window.onload = () => loadMoreAiring();