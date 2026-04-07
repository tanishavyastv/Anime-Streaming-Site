<?php
session_start();
if (!isset($_SESSION['is_admin']) || $_SESSION['is_admin'] != 1) {
    header("Location: ../index.html");
    exit();
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Admin Dashboard</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="../main.css">
    <link rel="stylesheet" href="dashboard.css">
</head>

<body>
    <?php include('admin-nav.php'); ?>

    <div class="container admin-card text-center">
        <h3>Welcome, <?= htmlspecialchars($_SESSION['user_name']) ?>!</h3>
        <p><i>You are logged in as an <strong>Admin</strong>. Use the links above to manage the platform.</i></p>
    </div>

</body>

</html>
