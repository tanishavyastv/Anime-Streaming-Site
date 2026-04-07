<?php
$host = "localhost";
$user = "root";
$pass = "";
$db = "anime_site";

// Create connection
$conn = new mysqli($host, $user, $pass);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Create database if it doesn't exist
$sql = "CREATE DATABASE IF NOT EXISTS $db";
if ($conn->query($sql) === TRUE) {
} else {
    die("Error creating database: " . $conn->error);
}

// Select the database
$conn->select_db($db);

// Create users table
$tableQuery = "
CREATE TABLE IF NOT EXISTS users (
    id INT(11) AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)";

if ($conn->query($tableQuery) === TRUE) {
} else {
    die("Error creating table: " . $conn->error);
}
?>