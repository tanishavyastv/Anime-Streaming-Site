# H!Anime Website 🎌
Anime Webpage is a dynamic anime streaming-style site with user login, profile updates, search, and categorized anime pages, built using HTML, CSS, JS, PHP, and MySQL.

## 📖 Project Description
Anime Webpage is a dynamic, anime-themed streaming-style website designed for users to explore, search, and view detailed information about movies, TV series, popular titles, and top-airing anime. The site includes user authentication features, allowing visitors to register, log in, manage their profiles, and update their credentials or profile picture. This project serves as a practical demonstration of full-stack web development using HTML, CSS, JavaScript, PHP, and MySQL with dynamic and reusable components.

The site structure mimics real-world platforms like Crunchyroll or Netflix, but with a focus on anime content. It's ideal for showcasing front-end styling, modular JavaScript, and secure back-end login systems with file upload capability.

## 💡 Use Cases
### 🔐 1. User Authentication
- **Login / Register Modal:** Users can log in or sign up directly from the navbar.
- **Session Handling:** Maintains user sessions using PHP for secure access control.
- **Personalized Experience:** Logged-in users are greeted with custom messages and gain access to profile features.

### 👤 2. User Profile Management
- **Edit Profile:** Users can update their email and password.
- **Profile Picture Upload:** Users can upload or change their profile image (image files only).
- **Secure Data Handling:** All updates are securely validated and stored in the database.

### 🎬 3. Anime Content Browsing
- **Dedicated Sections:**
    - **Movies Page:** Lists anime movies.
    - **TV Series Page:** Lists anime series.
    - **Popular Page:** Displays trending anime.
    - **Top Airing Page:** Shows currently airing popular anime.
- **Dynamic Cards:** Each anime has a card with title, image, description, and trailer modal.

### 🔍 4. Search Functionality
- **Global Search Bar:** Located in the navbar and accessible from any page.
- **Search Results Page:** Dynamically lists anime matching the query.
- **Quick Navigation:** Allows users to find their favorite shows efficiently.

### 🧑‍💻 5. Admin Dashboard
- **Dashboard Overview:** Admin can access a centralized dashboard for management.
- **Manage Anime:** Add, update, or delete anime entries in the database.
- **Manage Users:** View all registered users and their details.
- **Activity Log:** Monitor user/admin actions for transparency and control.
- **Modular Design:** Clean, separate sections styled with custom CSS.

### 🧩 6. Modular Components
- **Navbar and Footer:** Included using PHP/JS for reusability and consistency.
- **Scalable Design:** Makes adding new pages or sections easier with consistent layout.

### 📁 7. File Upload
- **Profile Picture Upload:** Users can upload images which are securely saved to the `uploads/` directory.
- **Validated Uploads:** Backend validation ensures only image types are accepted.

## 📺 Demo
You can view the live demo here: [H!Anime](https://anime-webpage-tanishavyastvs-projects.vercel.app/)

## 📁 Folder Structure
```
ANIME-WEBPAGE/
│
├── admin/                     # Admin dashboard and management tools
│   ├── activity-log.php       # View admin activity logs
│   ├── admin-nav.css          # Styles for admin navbar
│   ├── admin-nav.php          # Reusable admin navigation bar
│   ├── dashboard.php          # Admin dashboard overview
│   ├── dashboard.css          # Styles for dashboard
│   ├── manage-anime.php       # Admin page to manage anime content
│   ├── manage-users.php       # Admin page to manage registered users
│   └── manage.css             # Shared styles for admin pages
│
├── photos/                    # Default assets (e.g., fallback profile pics)
├── uploads/                   # Uploaded user profile images
│
├── db.php                     # Database connection
│
├── index.html                 # Landing page
├── index.css                  # Styles for landing page
│
├── fullsite.html              # Core site layout
├── fullsite.css               # Styling for main layout
├── fullsite.js                # JS for dynamic section handling
│
├── login-model.php            # Login/registration modal backend
├── login-model.css            # Modal styles
├── login-model.js             # Modal control JS
│
├── login.php                  # Login handler script
├── logout.php                 # Logout handler
│
├── profile.php                # User profile update page
│
├── navbar.php                 # Navbar template
├── navbar.js                  # JS to load navbar dynamically
├── footer.html                # Footer template
│
├── main.css                   # Shared styles for all pages
│
├── movies.html                # Anime movies page
├── movies.js                  # Movies content generator
│
├── series.html                # TV series page
├── series.js                  # Series content logic
│
├── popular.html               # Popular anime page
├── popular.js                 # Popular anime logic
│
├── top-airing.html            # Top airing anime page
├── top-airing.js              # Logic for top airing section
│
├── search-results.html        # Search results display
├── search-results.js          # JS for searching anime
│
└── README.md                  # Project documentation
```

## ✨ Features
- 🔐 **User Authentication**
    - Login / Register Modal directly from the navbar.
    - PHP session-based login system for security and personalized experiences.
    - Logout functionality to end sessions securely.
- 👤 **Profile Management**
    - Dedicated profile page where users can:
        - Update their email address.
        - Change their password.
        - Upload or change their profile picture (supports only images).
- 📺 **Anime Content Browsing**
    - *Movies Page:* Explore anime movie cards with trailers and descriptions.
    - *TV Series Page:* View top anime series.
    - *Popular Page:* Browse trending or most viewed anime.
    - *Top Airing Page:* Check out currently airing popular titles.
- 🔍 **Search functionality**
    - *Live Search Bar:* Users can search anime by name.
    - *Search Results Page:* Shows filtered results with dynamic content.
    - *Auto-suggestions & filtering* improve search experience.
- 🧩 **Reusable & Modular Components**
    - *Navbar* and *footer* are modular and loaded dynamically using JavaScript/PHP.
    - Ensures consistency across all pages and easy maintenance.
- **🧑‍💻 Admin Dashboard**
    - *Admin Login Interface* (planned or in future scope).
    - *Manage Users:* View and control registered users.
    - *Manage Anime:* Add, edit, or remove anime content.
    - *View Activity Logs:* Track actions done by the admin.
    - Clean and styled using custom admin CSS modules.
- **🗂️ File Upload Support**
    - Secure *image uploads* for profile pictures.
    - Stored in the `uploads/` folder and validated on the backend.
- **🎞️ Interactive UI Elements**
    - *Modal-based trailers* and detailed anime info popups.
    - *Horizontal carousels* for featured anime.
    - *Category Section* to explore by genres or types.
- **💅 Visual & UX Enhancements**
    - Custom *hover effects*, *animations*, and *responsive layout*.
    - Styled using *Bootstrap*, custom *CSS*, and interactive *JavaScript*.

## 🛠️ Tech Stack
### 🌐 Frontend
- **HTML5 –** For semantic and structured content layout
- **CSS3 –** Custom styles for pages and components
- **Bootstrap –** Responsive grid and UI components
- **JavaScript (Vanilla) –** Dynamic interactivity, modal control, content rendering
- **Modular JS –** Separated `.js` files for each section (movies, series, search, etc.)

### 🔙 Backend
- **PHP –** Server-side scripting for login, registration, profile, and admin operations
- **MySQL –** Relational database for storing user credentials, anime data, and admin logs
- **Session Management –** PHP sessions for login persistence and access control

### 🗃️ Database & File Handling
- **MySQL Tables –** For users, anime content, and admin activity logs
- **Uploads Folder –** For storing user-uploaded profile pictures (with validation)
- **CRUD Operations –** Admin can perform Create, Read, Update, Delete actions on anime and user data
