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
    <link rel="stylesheet" href="admin.css">
</head>
<body>

    <!-- Sidebar -->
    <?php include('admin-nav.php'); ?>

    <!-- Main Content -->
    <div class="container">
        <h2 class="mb-4">Manage Anime Listings</h2>
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
                            <td><input type="text" name="image_url" class="form-control" value="<?= htmlspecialchars($row['image_url']) ?>"></td>
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
