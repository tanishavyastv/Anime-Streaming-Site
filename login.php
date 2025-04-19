<?php
ini_set('display_errors', 0);
ini_set('log_errors', 1);
error_reporting(E_ALL);

header('Content-Type: application/json');

session_start();
require 'db.php';

$response = [
    'status'  => 'error',
    'message' => 'Invalid request.'
];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $type = $_POST['formType'] ?? '';

    // ----- LOGIN -----
    if ($type === 'login') {
        $email    = $conn->real_escape_string($_POST['loginEmail']    ?? '');
        $password = $_POST['loginPassword'] ?? '';

        $res = $conn->query("SELECT name, password FROM users WHERE email='$email'");
        if ($res && $res->num_rows === 1) {
            $user = $res->fetch_assoc();
            if (password_verify($password, $user['password'])) {
                // Success: set session and respond
                $_SESSION['user_name'] = $user['name'];
                $response = [
                    'status'  => 'success',
                    'message' => 'Login successful!'
                ];
            } else {
                // Wrong password
                $response = [
                    'status'  => 'error',
                    'message' => 'Wrong password.'
                ];
            }
        } else {
            // Email not found
            $response = [
                'status'  => 'error',
                'message' => 'Email not registered.'
            ];
        }

    // ----- REGISTER -----
    } elseif ($type === 'register') {
        $name     = $conn->real_escape_string($_POST['registerName']     ?? '');
        $email    = $conn->real_escape_string($_POST['registerEmail']    ?? '');
        $password = $_POST['registerPassword'] ?? '';

        // Check if email already exists
        $check = $conn->query("SELECT id FROM users WHERE email='$email'");
        if ($check && $check->num_rows > 0) {
            $response = [
                'status'  => 'error',
                'message' => 'Email already registered.'
            ];
        } else {
            // Insert new user
            $hash   = password_hash($password, PASSWORD_DEFAULT);
            $stmt   = $conn->prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)");
            $stmt->bind_param("sss", $name, $email, $hash);
            if ($stmt->execute()) {
                $_SESSION['user_name'] = $name;
                $response = [
                    'status'  => 'success',
                    'message' => 'Registration successful!'
                ];
            } else {
                $response = [
                    'status'  => 'error',
                    'message' => 'Registration failed. Please try again.'
                ];
            }
        }
    }
}

echo json_encode($response);

$conn->close();
exit;
?>