<?php
session_start();
require '../db.php';

if (!isset($_SESSION['is_admin']) || $_SESSION['is_admin'] != 1) {
    header('Location: login-model.php');
    exit;
}

// Add New User
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['add_user'])) {
    $name     = trim($_POST['new_name']);
    $email    = trim($_POST['new_email']);
    $password = $_POST['new_password'];
    $is_admin = isset($_POST['new_is_admin']) ? 1 : 0;

    if ($name && $email && $password) {
        $chk = $conn->prepare("SELECT id FROM users WHERE email = ?");
        $chk->bind_param("s", $email);
        $chk->execute();
        $chk->store_result();
        if ($chk->num_rows === 0) {
            $hash = password_hash($password, PASSWORD_DEFAULT);
            $ins = $conn->prepare("INSERT INTO users (name, email, password, is_admin) VALUES (?, ?, ?, ?)");
            $ins->bind_param("sssi", $name, $email, $hash, $is_admin);
            $ins->execute();

            // ✅ Log admin action after successful insert
            $adminEmail = $_SESSION['email'];
            $action = "Added new user (Email: $email, Admin: $is_admin)";
            $logStmt = $conn->prepare("INSERT INTO activity_log (user_email, action) VALUES (?, ?)");
            $logStmt->bind_param("ss", $adminEmail, $action);
            $logStmt->execute();
            $logStmt->close();
        }
        $chk->close();
    }
}

// Update User
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['edit_user'])) {
    $id       = intval($_POST['edit_id']);
    $name     = trim($_POST['edit_name']);
    $email    = trim($_POST['edit_email']);
    $password = $_POST['edit_password'];
    $is_admin = isset($_POST['edit_is_admin']) ? 1 : 0;

    if ($name && $email) {
        $upd = $conn->prepare("UPDATE users SET name = ?, email = ?, is_admin = ? WHERE id = ?");
        $upd->bind_param("ssii", $name, $email, $is_admin, $id);
        $upd->execute();
        $upd->close();
    }
    if ($password) {
        $hash = password_hash($password, PASSWORD_DEFAULT);
        $upd2 = $conn->prepare("UPDATE users SET password = ? WHERE id = ?");
        $upd2->bind_param("si", $hash, $id);
        $upd2->execute();
        $upd2->close();
    }
    // Log update action
    $adminEmail = $_SESSION['email'];
    $action = "Updated user info with ID $id (Email: $email)";
    $logStmt = $conn->prepare("INSERT INTO activity_log (user_email, action) VALUES (?, ?)");
    $logStmt->bind_param("ss", $adminEmail, $action);
    $logStmt->execute();
    $logStmt->close();
}

// Handle user deletion
if (isset($_GET['delete'])) {
    $id = intval($_GET['delete']);

    // First, fetch user email before deleting (optional but useful for logging)
    $fetchEmailStmt = $conn->prepare("SELECT email FROM users WHERE id = ?");
    $fetchEmailStmt->bind_param("i", $id);
    $fetchEmailStmt->execute();
    $fetchResult = $fetchEmailStmt->get_result();
    $deletedUser = $fetchResult->fetch_assoc();
    $deletedEmail = $deletedUser['email'] ?? 'Unknown';

    // Now delete user
    $stmt = $conn->prepare("DELETE FROM users WHERE id = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();

    // Log admin action
    $adminEmail = $_SESSION['email'];
    $action = "Deleted user with ID $id (Email: $deletedEmail)";
    $logStmt = $conn->prepare("INSERT INTO activity_log (user_email, action) VALUES (?, ?)");
    $logStmt->bind_param("ss", $adminEmail, $action);
    $logStmt->execute();

    header("Location: manage-users.php");
    exit;
}

// Fetch users
$result = $conn->query("SELECT id, name, email, is_admin FROM users ORDER BY id DESC");
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Manage Users</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="admin.css">
    <link rel="stylesheet" href="../main.css">
</head>
<body>

<?php include 'admin-nav.php'; ?>

<div class="container my-4">
    <h2 class="mb-4">Manage Users</h2>
    <!-- Add New User -->
    <div class="card mb-4 shadow-sm">
        <div class="card-body">
            <h5 class="card-title">Add New User</h5>
            <form method="POST" action="manage-users.php" class="row g-3 align-items-center">
                <input type="hidden" name="add_user" value="1">
                <div class="col-md-3">
                    <input type="text" name="new_name" class="form-control" placeholder="Name" required>
                </div>
                <div class="col-md-3">
                    <input type="email" name="new_email" class="form-control" placeholder="Email" required>
                </div>
                <div class="col-md-3">
                    <input type="password" name="new_password" class="form-control" placeholder="Password" required>
                </div>
                <div class="col-md-2 form-check">
                    <input class="form-check-input" type="checkbox" name="new_is_admin" id="new_is_admin">
                    <label class="form-check-label" for="new_is_admin">Make Admin</label>
                </div>
                <div class="col-md-1 d-grid">
                    <button type="submit" class="btn btn-primary">Add</button>
                </div>
            </form>
        </div>
    </div>

    <!-- User Table -->
    <table class="table table-striped table-hover">
        <thead class="table-dark">
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Password (new)</th>
            <th>Admin</th>
            <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        <?php while ($row = $result->fetch_assoc()): ?>
            <tr>
                <form method="POST" action="manage-users.php" class="row gx-2 align-items-center">
                    <input type="hidden" name="edit_user" value="1">
                    <input type="hidden" name="edit_id" value="<?= $row['id'] ?>">
                    <td class="col-1"><?= $row['id'] ?></td>
                    <td class="col-2">
                        <input type="text" name="edit_name" class="form-control form-control-sm"
                               value="<?= htmlspecialchars($row['name']) ?>" required>
                    </td>
                    <td class="col-2">
                        <input type="email" name="edit_email" class="form-control form-control-sm"
                               value="<?= htmlspecialchars($row['email']) ?>" required>
                    </td>
                    <td class="col-2">
                        <input type="password" name="edit_password" class="form-control form-control-sm"
                               placeholder="Leave blank">
                    </td>
                    <td class="col-1 text-center">
                        <input class="form-check-input" type="checkbox" name="edit_is_admin"
                               <?= $row['is_admin'] ? 'checked' : '' ?>>
                    </td>
                    <td class="col-4">
                        <button type="submit" class="btn btn-success btn-sm">Update</button>
                        <a href="?delete=<?= $row['id'] ?>"
                           onclick="return confirm('Delete this user?')"
                           class="btn btn-danger btn-sm">Delete</a>
                    </td>
                </form>
            </tr>
        <?php endwhile; ?>
        </tbody>
    </table>
</div>
</body>
</html>