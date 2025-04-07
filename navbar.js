document.querySelector('.search-btn').addEventListener('click', () => {
    const query = document.querySelector('.search-bar').value.trim();
    if (query) {
        window.location.href = `search-results.html?query=${encodeURIComponent(query)}`;
    }
});

document.querySelector('.search-bar').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        document.querySelector('.search-btn').click();
    }
});

const searchInput = document.querySelector('.search-bar');
const suggestionsBox = document.getElementById('search-suggestions');

let debounceTimer;

searchInput.addEventListener('input', () => {
    clearTimeout(debounceTimer);
    const query = searchInput.value.trim();

    if (query.length < 2) {
        suggestionsBox.innerHTML = '';
        return;
    }

    debounceTimer = setTimeout(() => {
        fetch(`https://api.jikan.moe/v4/anime?q=${query}&limit=6`)
            .then(response => response.json())
            .then(data => {
                const suggestions = data.data;
                suggestionsBox.innerHTML = suggestions.map(anime => `
                        <div class="p-2 suggestion-item" style="cursor:pointer;" data-title="${anime.title}">
                            ${anime.title}
                        </div>
                    `).join('');
            })
            .catch(() => {
                suggestionsBox.innerHTML = '';
            });
    }, 300); // debounce delay
});

suggestionsBox.addEventListener('click', (e) => {
    if (e.target.classList.contains('suggestion-item')) {
        const selectedTitle = e.target.getAttribute('data-title');
        searchInput.value = selectedTitle;
        suggestionsBox.innerHTML = '';
        window.location.href = `search-results.html?query=${encodeURIComponent(selectedTitle)}`;
    }
});

// Hide suggestions when clicking outside
document.addEventListener('click', (e) => {
    if (!document.querySelector('.d-flex').contains(e.target)) {
        suggestionsBox.innerHTML = '';
    }
});