$("#navbar").load("navbar.php");
$("#footer").load("footer.html");

const urlParams = new URLSearchParams(window.location.search);
const query = urlParams.get('query');

const spinner = document.getElementById("loadingSpinner");
const container = document.getElementById("searchResultsGrid");

spinner.style.display = "block"; // Show spinner initially

if (query) {
    fetch(`https://api.jikan.moe/v4/anime?q=${query}&order_by=title&sort=asc&limit=12`)
        .then(response => response.json())
        .then(data => {
            spinner.style.display = "none"; // Hide spinner after loading

            const results = data.data;
            if (results.length === 0) {
                container.innerHTML = '<p class="text-white">No results found.</p>';
                return;
            }

            results.forEach(anime => {
                const col = document.createElement('div');
                col.className = 'col-6 col-md-4 col-lg-2 mb-4';
                const genres = anime.genres.map(g => `<span class="badge bg-secondary me-1">${g.name}</span>`).join('');
                col.innerHTML = `
                    <div class="anime-card p-3 h-100 d-flex flex-column">
                        <div class="genre-tags mb-2">${genres}</div>
                        <img src="${anime.images.jpg.image_url}" alt="${anime.title}" class="mb-3">
                        <h5>${anime.title}</h5>
                        <p class="card-desc">${anime.synopsis ? anime.synopsis.slice(0, 100) + "..." : "No description available."}</p>
                        <a href="${anime.url}" target="_blank" class="btn btn-pink mt-auto">Watch Now</a>
                    </div>
                `;
                container.appendChild(col);
            });
        })
        .catch(err => {
            spinner.style.display = "none"; // Hide on error too
            console.error(err);
            container.innerHTML = '<p class="text-white">An error occurred. Please try again.</p>';
        });
}