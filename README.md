# H!Anime Website 🎌
Anime Webpage is a dynamic anime streaming-style site with user login, profile updates, search, and categorized anime pages, built using HTML, CSS, JS, PHP, and MySQL.

## 📖 Project Description
Anime Webpage is a dynamic, anime-themed streaming-style website designed for users to explore, search, and view detailed information about movies, TV series, popular titles, and top-airing anime. The site includes user authentication features, allowing visitors to register, log in, manage their profiles, and update their credentials or profile picture. This project serves as a practical demonstration of full-stack web development using HTML, CSS, JavaScript, PHP, and MySQL with dynamic and reusable components.

The site structure mimics real-world platforms like Crunchyroll or Netflix, but with a focus on anime content. It's ideal for showcasing front-end styling, modular JavaScript, and secure back-end login systems with file upload capability.

## 💡 Use Cases
### 🔐 1. User Authentication
- **Login / Register Modal:** Users can log in or sign up directly from the navbar modal.
- **Sessions:** User sessions are maintained using PHP to display personalized messages and restrict unauthorized access.

### 👤 2. User Profile Management
- **Profile Page:** Logged-in users can:
- Update their email.
- Change their password.
- Upload or change their profile picture (image only).

### 🎬 3. Anime Content Browsing
- **Movies Section:** Displays anime movies.
- **TV Series Section:** Displays popular series.
- **Popular Page:** Highlights the most viewed or trending anime.
- **Top Airing Page:** Displays current top-airing anime series.

### 🔍 4. Search Functionality
- **Search Bar:** Allows users to type anime names and view results on a separate page (search-results.html).
- **Suggestions & Filters:** Helps users quickly find their favorite shows.

### 🧩 5. Reusable Components
- **Navbar/Footer:** Modular components (navbar.php, footer.html) are dynamically loaded for consistency across all pages.

### 📁 6. File Upload
- **Profile Picture Upload:** Only images are accepted and securely stored in the uploads/ folder.

## 📺 Demo
You can view the live demo here: [H!Anime](https://anime-webpage-tanishavyastvs-projects.vercel.app/)

## 📁 Folder Structure
```
anime-webpage/
│
├── photos/                   # Default static assets like fallback profile pictures
├── uploads/                  # Stores user-uploaded profile images
│
├── db.php                    # Database connection file
│
├── index.html                # Landing page
├── index.css                 # Styles for landing page
│
├── fullsite.html             # Full site UI
├── fullsite.css              # Styles for full site
├── fullsite.js               # JS for full site logic
│
├── login-model.css           # Styles for login modal
├── login-model.js            # JS to control modal behavior
├── login.php                 # Login handler
├── logout.php                # Logout script
├── login-model.php           # Login modal backend integration
│
├── profile.php               # User profile page (email/password/profile-pic updates)
│
├── navbar.php                # Common navigation bar
├── navbar.js                 # JS to load navbar dynamically
├── footer.html               # Common footer
├── main.css                  # Shared styles
│
├── movies.html               # Movies section
├── movies.js                 # JS for dynamic movie content
│
├── series.html               # Series section
├── series.js                 # JS for dynamic series content
│
├── popular.html              # Popular anime
├── popular.js                # JS for popular anime content
│
├── top-airing.html           # Top-airing anime
├── top-airing.js             # JS for top-airing section
│
├── search-results.html       # Displays search results
├── search-results.js         # JS for search functionality
│
└── README.md                 # Project documentation
```

## ✨ Features
* 🔐 *User Login & Registration (modal-based)*
* 👤 *Profile page with:*
** Email update
** Password change
** Profile picture upload
* 📺 *Dynamic Anime Sections:*
** Movies
** Series
** Popular
** Top Airing
* 🔍 *Search functionality*
* 🧩 *Reusable components* (navbar.php, footer.html)
* 🎞️ *Modal-based* anime trailers and info popups.
* 🚥 *Horizontal Carousel* for displaying featured anime.
* 🎴 *Anime Cards* with images, titles, descriptions, and watch buttons.
* 👐🏻 *Category Section* to browse anime by different genres.
* 🔥 *Stylish Animations* and hover effects to enhance user interaction.

## 🛠️ Tech Stack
- **Frontend**: HTML, CSS (Bootstrap + custom), JavaScript
- **Backend**: PHP, MySQL
- **Storage**: File system for images (uploads/), MySQL for user data