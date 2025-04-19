<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Navigation Bar</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="main.css">
</head>

<body>
    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
            <!-- Logo -->
            <a class="navbar-brand" href="index.html">
                <img src="photos/logo.png" alt="h!anime" width="170">
            </a>
            <!-- Navbar Links -->
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                        <a class="nav-link active" href="index.html">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="movies.html">Movies</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="series.html">TV Series</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="popular.html">Most Popular</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="top-airing.html">Top Airing</a>
                    </li>
                    <li class="nav-item">
                        <?php session_start(); ?>
                        <?php if (!empty($_SESSION['user_name'])): ?>
                          <span class="navbar-text text-white mx-2">
                            Welcome, <?= htmlspecialchars($_SESSION['user_name']) ?>
                          </span>
                          <a class="nav-link" href="logout.php">Logout</a>
                        <?php else: ?>
                            <a class="nav-link" href="#" data-bs-toggle="modal" data-bs-target="#loginModal">Login</a>
                        <?php endif; ?>
                    </li>
                </ul>
            </div>

            <!-- Search Bar -->
            <div class="d-flex align-items-center position-relative" style="gap: 10px;">
                <div class="position-relative w-100">
                    <input type="text" class="form-control search-bar" placeholder="Search your favorite anime...">
                    <div id="search-suggestions" class="position-absolute bg-dark text-white rounded mt-1 w-100 shadow"
                        style="z-index: 1050;"></div>
                </div>
                <button class="btn btn-warning search-btn">
                    <img src="photos/search.png" alt="search" width="25">
                </button>
            </div>
        </div>
    </nav>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
    <script src="navbar.js"></script>
    <?php include 'login-model.html'; ?>
</body>

</html>