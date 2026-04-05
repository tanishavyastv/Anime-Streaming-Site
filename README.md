# H!Anime Website

H!Anime is a static anime-themed website built with HTML, CSS, and vanilla JavaScript. It includes client-side login/register flows, a profile page, anime browsing pages, search suggestions, and a local-storage powered admin area for demo use.

## Project Summary

This project is now fully JavaScript-based on the frontend. Shared UI sections such as the navbar and footer are loaded as HTML fragments, while authentication, profile state, admin data, and activity logs are stored in `localStorage`.

The site is designed as a demo portfolio project rather than a production backend application.

## Features

- Login and registration modal loaded from the shared navbar
- Profile page with email, password, and profile image updates
- Client-side admin dashboard, user management, anime management, and activity log
- Anime category pages for movies, TV series, popular titles, and top airing
- Search suggestions and search results using the Jikan API
- Shared layout pieces loaded with JavaScript for easier reuse

## Tech Stack

- HTML5
- CSS3
- Bootstrap 5
- Vanilla JavaScript
- Browser `localStorage` for demo auth and admin state

## Main Files

```text
ANIME-WEBPAGE/
|-- admin/
|   |-- activity-log.html
|   |-- admin-nav.css
|   |-- admin-nav.html
|   |-- admin.css
|   |-- admin.js
|   |-- dashboard.css
|   |-- dashboard.html
|   |-- manage-anime.html
|   |-- manage-users.html
|   `-- manage.css
|-- photos/
|-- uploads/
|-- auth.js
|-- footer.html
|-- fullsite.css
|-- fullsite.html
|-- fullsite.js
|-- index.css
|-- index.html
|-- login-model.css
|-- main.css
|-- movies.html
|-- movies.js
|-- navbar.html
|-- popular.html
|-- popular.js
|-- profile.html
|-- profile.js
|-- search-results.html
|-- search-results.js
|-- series.html
|-- series.js
|-- site-shell.js
|-- top-airing.html
`-- top-airing.js
```

## Demo Admin Login

- Email: `admin@hanime.local`
- Password: `admin123`

## Run Locally

Use the included PowerShell script:

```powershell
.\run.ps1
```

Optional custom port:

```powershell
.\run.ps1 -Port 9000
```

Then open `http://localhost:8000/index.html` or your chosen port.

## Notes

- Authentication is client-side and intended only for demo or learning use.
- Admin data and profile data are stored in the browser, so clearing site storage resets them.
- The anime search experience depends on the external Jikan API.
