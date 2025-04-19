<?php
session_start();
if (!isset($_SESSION['user_name'])) {
    header('Location: login-model.php');
    exit;
}

$user_name = $_SESSION['user_name'];
$email = $_SESSION['email'];

$message = "";
$upload_error = "";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $new_email = $_POST['email'];
    $new_password = $_POST['password'];

    require 'db.php';
    // Get current profile picture from database
    $stmt = $conn->prepare("SELECT profile_pic FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->bind_result($profile_pic_path);
    $stmt->fetch();
    $stmt->close();
    if (!empty($profile_pic_path)) {
        $_SESSION['profile_pic'] = $profile_pic_path;
    }
    
    // Update email
    if (!empty($new_email)) {
        $stmt = $conn->prepare("UPDATE users SET email = ? WHERE email = ?");
        $stmt->bind_param("ss", $new_email, $email);
        $stmt->execute();
        $_SESSION['email'] = $new_email;
        $email = $new_email; // update for later use
    }

    // Update password
    if (!empty($new_password)) {
        $hashed_password = password_hash($new_password, PASSWORD_DEFAULT);
        $stmt = $conn->prepare("UPDATE users SET password = ? WHERE email = ?");
        $stmt->bind_param("ss", $hashed_password, $email);
        $stmt->execute();
    }

    // Handle profile picture upload
    $profile_pic_path = '';

    if (!empty($_FILES['profilePic']['name'])) {
        $allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        $fileType = $_FILES['profilePic']['type'];

        if (in_array($fileType, $allowedTypes)) {
            $uploadDir = 'uploads/';
            if (!is_dir($uploadDir)) {
                mkdir($uploadDir, 0777, true);
            }

            $fileName = time() . '_' . basename($_FILES['profilePic']['name']);
            $uploadPath = $uploadDir . $fileName;

            if (move_uploaded_file($_FILES['profilePic']['tmp_name'], $uploadPath)) {
                $profile_pic_path = $uploadPath;

                // Update profile_pic in the database
                $stmt = $conn->prepare("UPDATE users SET profile_pic = ? WHERE email = ?");
                $stmt->bind_param("ss", $profile_pic_path, $email);
                $stmt->execute();

                $_SESSION['profile_pic'] = $profile_pic_path;
            }
        } else {
            $message = "Only image files (jpg, jpeg, png, gif, webp) are allowed.";
        }
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>User Profile</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <link rel="stylesheet" href="main.css">
</head>
<body>
    <!-- Navbar -->
    <header id="navbar"></header>

    <!-- Profile Section -->
    <div class="container my-5">
        <h2 class="text-center">Welcome to Your Profile, <?= htmlspecialchars($user_name) ?></h2>
        <?php if (!empty($_SESSION['profile_pic'])): ?>
            <div class="text-center mb-4">
                <img src="<?= htmlspecialchars($_SESSION['profile_pic']) ?>" alt="Profile Picture" class="rounded-circle" width="150" height="150" style="object-fit: cover; border: 3px solid #ffc107;">
            </div>
        <?php endif; ?>
        
        <!-- User Info Form -->
        <form method="POST" action="profile.php" enctype="multipart/form-data">
            <div class="mb-3">
                <label for="user_name" class="form-label">Username</label>
                <input type="text" class="form-control" id="user_name" name="user_name" value="<?= htmlspecialchars($user_name) ?>" disabled>
            </div>
            <div class="mb-3">
                <label for="profilePic" class="form-label">Profile Picture</label>
                <input type="file" class="form-control" id="profilePic" name="profilePic" accept="image/*">
            </div>
            <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input type="email" class="form-control" id="email" name="email" value="<?= htmlspecialchars($email) ?>" required>
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">New Password (Leave empty if not changing)</label>
                <input type="password" class="form-control" id="password" name="password">
            </div>
            <?php if (!empty($message)): ?>
                <div class="alert <?= strpos($message, 'successfully') !== false ? 'alert-success' : 'alert-danger' ?>">
                    <?= htmlspecialchars($message) ?>
                </div>
            <?php endif; ?>
            <button type="submit" class="btn btn-warning">Update Profile</button>
        </form>
    </div>

    <!-- Footer -->
    <footer id="footer"></footer>

    <script>
        $(function () {
            $("#navbar").load("navbar.php");
            $("#footer").load("footer.html");
        });
    </script>
</body>
</html>