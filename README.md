# H!Anime Website
**H!Anime** is a an anime streaming website featuring a variety of anime series and movies. Its built using HTML, CSS, Bootstrap, and JavaScript. It features dynamic content loading, modal trailers, search functionality, and smooth navigation through different categories like Movies, TV Series, Popular Anime, and Top Airing Anime.

## 📺 Demo
You can view the live demo here: [H!Anime](https://anime-webpage-tanishavyastvs-projects.vercel.app/)

## 📁 Folder Structure
```
H!Anime/
├── photos/                  # Anime image assets
├── index.html               # Home page
├── movies.html              # Movies listing
├── series.html              # TV Series listing
├── popular.html             # Popular anime page
├── top-airing.html          # Top airing anime
├── search-results.html      # Search results page
├── navbar.html              # Shared navigation bar
├── footer.html              # Shared footer
├── movies.js                # JS logic for Movies
├── series.js                # JS logic for TV Series
├── popular.js               # JS logic for Popular page
├── top-airing.js            # JS logic for Top Airing anime
├── search-results.js        # JS logic for search results
├── navbar.js                # Enhancements for navbar (if any)
├── main.css                 # Core styles
├── index.css                # Styles for Home page
├── fullsite.css             # Global or legacy styles
├── fullsite.js              # Global or legacy JS functionality
└── README.md                # Project documentation
```

## 💡 Features
- 📺 *Categorized pages:* Movies, Series, Popular, and Top Airing.
- 🔍 *Anime Search:* Search bar functionality with separate results page.
- 🎞️ *Modal-based* anime trailers and info popups.
- 🖼️ *Dynamic content* loading using JavaScript arrays.
- 🔄 *Reusable layout* with `navbar.html` and `footer.html`.
- 📱 *Fully responsive* layout using Bootstrap.
- 🚥 *Horizontal Carousel* for displaying featured anime.
- 🎴 *Anime Cards* with images, titles, descriptions, and watch buttons.
- 👐🏻 *Category Section* to browse anime by different genres.
- 🔥 *Stylish Animations* and hover effects to enhance user interaction.

## 🚀 How to Run Locally
1. Clone or download the repository.
2. Open `index.html` in your preferred browser.
3. Make sure all files remain in the correct folder structure.
4. To edit or add anime cards, update respective JS files (e.g., `movies.js`, `series.js`).

## 🛠️ Tech Stack
- **HTML5**: Structure and content of the webpage.
- **CSS3**: Styling, including Flexbox, transitions, and hover effects.
- **Bootstrap 5**: For responsive grid system and carousel component.
- **JavaScript (ES6)**: Dynamic content loading via jQuery and Bootstrap functionality.
- **jQuery**: For loading external content (Navbar and Footer).

## 📌 Notes
- Keep image paths consistent for dynamic loading to work correctly.
- Ensure trailers are embedded YouTube links using the `/embed/` format.
- Buttons and modals use Bootstrap classes for styling and responsiveness.