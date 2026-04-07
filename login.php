<?php
session_start();
require 'login-model.php';

if (isset($_POST['register'])) {
    $name = $conn->real_escape_string($_POST['name']);
    $email = $conn->real_escape_string($_POST['email']);
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT);

    $check = $conn->query("SELECT * FROM users WHERE email='$email'");
    if ($check->num_rows > 0) {
        echo "User already exists.";
    } else {
        $insert = $conn->query("INSERT INTO users (name, email, password) VALUES ('$name', '$email', '$password')");
        if ($insert) {
            echo "Registration successful!";
        } else {
            echo "Registration failed!";
        }
    }
}

if (isset($_POST['login'])) {
    $email = $conn->real_escape_string($_POST['email']);
    $password = $_POST['password'];

    $result = $conn->query("SELECT * FROM users WHERE email='$email'");
    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
        if (password_verify($password, $user['password'])) {
            $_SESSION['user'] = $user['name'];
            echo "Login successful!";
        } else {
            echo "Incorrect password.";
        }
    } else {
        echo "No user found.";
    }
}
?>
