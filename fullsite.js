const genreMap = {
    1: "Action",
    2: "Adventure",
    10: "Fantasy",
    22: "Romance"
};

let currentGenreId = null;
let currentPage = 1;

// Genre click handlers
document.querySelectorAll('.genre-link').forEach(link => {
    link.addEventListener('click', async (e) => {
        e.preventDefault();
        currentGenreId = e.target.closest('a').dataset.genreId;
        currentPage = 1;
        fetchAnime(currentGenreId, currentPage);
    });
});

// Fetch anime by genre + page
async function fetchAnime(genreId, page) {
    const grid = document.getElementById('results-grid');
    grid.innerHTML = "";

    const response = await fetch(`https://api.jikan.moe/v4/anime?genres=${genreId}&page=${page}&limit=6`);
    const data = await response.json();

    data.data.forEach(anime => {
        const col = document.createElement('div');
        col.className = 'col-md-4';

        const genreTags = anime.genres.map(g => `<span class="genre-tag">${g.name}</span>`).join('');

        col.innerHTML = `
            <div class="anime-card-result">
                <div class="genre-tags">${genreTags}</div>
                <img src="${anime.images.jpg.image_url}" alt="${anime.title}">
                <h5 class="mt-2">${anime.title}</h5>
                <p>${anime.synopsis ? anime.synopsis.slice(0, 100) + "..." : "No description available."}</p>
                <a href="${anime.url}" target="_blank" class="btn btn-pink">Watch Now</a>
            </div>
        `;
        grid.appendChild(col);
    });

    // Scroll and show pagination
    document.getElementById('genre-results').scrollIntoView({ behavior: 'smooth' });
    document.getElementById('pagination-controls').classList.remove('d-none');

    // Update pagination controls
    document.getElementById('currentPage').textContent = `Page ${page}`;
    document.getElementById('prevPage').disabled = page === 1;
    document.getElementById('nextPage').disabled = !data.pagination.has_next_page;
}


// Pagination button handlers
document.getElementById('prevPage').addEventListener('click', () => {
    if (currentPage > 1 && currentGenreId) {
        currentPage--;
        fetchAnime(currentGenreId, currentPage);
    }
});

document.getElementById('nextPage').addEventListener('click', () => {
    if (currentGenreId) {
        currentPage++;
        fetchAnime(currentGenreId, currentPage);
    }
});