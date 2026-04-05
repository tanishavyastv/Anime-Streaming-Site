const urlParams = new URLSearchParams(window.location.search);
const query = urlParams.get("query");

const spinner = document.getElementById("loadingSpinner");
const container = document.getElementById("searchResultsGrid");
const summary = document.getElementById("searchResultsSummary");

spinner.style.display = "block";

if (query) {
  summary.textContent = `Showing matches for "${query}".`;

  fetch(`https://api.jikan.moe/v4/anime?q=${encodeURIComponent(query)}&order_by=title&sort=asc&limit=12`)
    .then((response) => response.json())
    .then((data) => {
      spinner.style.display = "none";

      const results = Array.isArray(data.data) ? data.data : [];
      if (results.length === 0) {
        summary.textContent = `No matches found for "${query}".`;
        container.innerHTML = '<p class="text-white">No results found.</p>';
        return;
      }

      summary.textContent = `${results.length} results for "${query}".`;

      results.forEach((anime) => {
        const col = document.createElement("div");
        col.className = "col-sm-6 col-lg-4 col-xl-3";
        const genres = anime.genres
          .map((genre) => `<span class="badge bg-secondary me-1">${genre.name}</span>`)
          .join("");

        col.innerHTML = `
          <div class="anime-card p-3 h-100 d-flex flex-column">
            <div class="genre-tags mb-2">${genres}</div>
            <img src="${anime.images.jpg.image_url}" alt="${anime.title}" class="mb-3" loading="lazy" decoding="async">
            <h5>${anime.title}</h5>
            <p class="card-desc">${anime.synopsis ? `${anime.synopsis.slice(0, 100)}...` : "No description available."}</p>
            <a href="${anime.url}" target="_blank" rel="noopener noreferrer" class="btn btn-pink mt-auto">Watch Now</a>
          </div>
        `;
        container.appendChild(col);
      });
    })
    .catch((error) => {
      spinner.style.display = "none";
      console.error(error);
      summary.textContent = "Search could not be completed right now.";
      container.innerHTML = '<p class="text-white">An error occurred. Please try again.</p>';
    });
} else {
  spinner.style.display = "none";
  summary.textContent = "Use the search bar above to find a title.";
  container.innerHTML = '<p class="text-white">No search query provided.</p>';
}
