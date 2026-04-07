<?php
session_start();
require '../db.php';

if (!isset($_SESSION['is_admin']) || $_SESSION['is_admin'] != 1) {
    header('Location: login-model.php');
    exit;
}

// Delete anime
if (isset($_GET['delete'])) {
    $id = intval($_GET['delete']);
    $stmt = $conn->prepare("DELETE FROM anime WHERE id = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();

    // ✅ Log deletion
    $adminEmail = $_SESSION['email'];
    $action = "Deleted anime ID $id: $animeTitle";
    $logStmt = $conn->prepare("INSERT INTO activity_log (user_email, action) VALUES (?, ?)");
    $logStmt->bind_param("ss", $adminEmail, $action);
    $logStmt->execute();
    $logStmt->close();
    
    header("Location: manage-anime.php");
    exit;
}

// Update anime
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['edit_id'])) {
    $id = $_POST['edit_id'];
    $title = $_POST['title'];
    $description = $_POST['description'];
    $image = $_POST['image_url'];

    $stmt = $conn->prepare("UPDATE anime SET title = ?, description = ?, image_url = ? WHERE id = ?");
    $stmt->bind_param("sssi", $title, $description, $image, $id);
    $stmt->execute();

    // ✅ Log the update
    $adminEmail = $_SESSION['email'];
    $action = "Updated anime ID $id: $title";
    $logStmt = $conn->prepare("INSERT INTO activity_log (user_email, action) VALUES (?, ?)");
    $logStmt->bind_param("ss", $adminEmail, $action);
    $logStmt->execute();
    $logStmt->close();
}

// Add new anime
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['add_anime'])) {
    $title = $_POST['new_title'];
    $description = $_POST['new_description'];
    $image_url = $_POST['new_image_url'];

    $stmt = $conn->prepare("INSERT INTO anime (title, description, image_url) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $title, $description, $image_url);
    $stmt->execute();

    // ✅ Log the addition
    $adminEmail = $_SESSION['email'];
    $action = "Added anime: $title";
    $logStmt = $conn->prepare("INSERT INTO activity_log (user_email, action) VALUES (?, ?)");
    $logStmt->bind_param("ss", $adminEmail, $action);
    $logStmt->execute();
    $logStmt->close();
}

// Fetch all anime
$result = $conn->query("SELECT * FROM anime");
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Manage Anime</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="manage.css">
    <link rel="stylesheet" href="../main.css">
</head>
<body>

    <!-- Sidebar -->
    <?php include('admin-nav.php'); ?>

    <!-- Main Content -->
    <div class="container">
        <h2 class="mb-4">Manage Anime Listings</h2>
        <!-- Add New Anime Form -->
<div class="card mb-4 p-4 shadow-sm">
    <h4>Add New Anime</h4>
    <form method="POST" action="manage-anime.php">
        <input type="hidden" name="add_anime" value="1">
        <div class="row g-3">
            <div class="col-md-3">
                <input type="text" name="new_title" class="form-control" placeholder="Title" required>
            </div>
            <div class="col-md-4">
                <textarea name="new_description" class="form-control" rows="1" placeholder="Description" required></textarea>
            </div>
            <div class="col-md-3">
                <input type="text" name="new_image_url" class="form-control" placeholder="Image URL" required>
            </div>
            <div class="col-md-2 d-grid">
                <button type="submit" class="btn btn-primary">Add Anime</button>
            </div>
        </div>
    </form>
</div>
        <table class="table table-striped">
            <thead class="table-dark">
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Image</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <?php while ($row = $result->fetch_assoc()): ?>
                    <tr>
                        <form method="POST" action="manage-anime.php">
                            <input type="hidden" name="edit_id" value="<?= $row['id'] ?>">
                            <td><?= $row['id'] ?></td>
                            <td><input type="text" name="title" class="form-control" value="<?= htmlspecialchars($row['title']) ?>"></td>
                            <td><textarea name="description" class="form-control" rows="2"><?= htmlspecialchars($row['description']) ?></textarea></td>
                            <td>
                                <input type="text" name="image_url" class="form-control mb-2" value="<?= htmlspecialchars($row['image_url']) ?>">
                                <a href="<?= htmlspecialchars($row['image_url']) ?>" target="_blank">
                                    <img src="<?= htmlspecialchars($row['image_url']) ?>" alt="Anime Image" style="width: 80px; height: auto; border-radius: 4px; box-shadow: 0 0 4px rgba(0,0,0,0.3); cursor: pointer;">
                                </a>
                            </td>
                            <td>
                                <button type="submit" class="btn btn-success btn-sm mb-1">Update</button>
                                <a href="?delete=<?= $row['id'] ?>" onclick="return confirm('Delete this anime?')" class="btn btn-danger btn-sm">Delete</a>
                            </td>
                        </form>
                    </tr>
                <?php endwhile; ?>
            </tbody>
        </table>
    </div>

</body>
</html>
