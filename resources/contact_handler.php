<?php
// contact_handler.php - Place this file on your server

// Database configuration
$db_host = 'localhost';
$db_user = 'u731827190_admin';
$db_pass = 'Arvanta@mts01';
$db_name = 'u731827190_Arvantamedtech';

// Connect to database
$conn = new mysqli($db_host, $db_user, $db_pass, $db_name);

// Check connection
if ($conn->connect_error) {
    $response = [
        'success' => false,
        'message' => 'Database connection failed: ' . $conn->connect_error
    ];
    echo json_encode($response);
    exit;
}

// Process form submission
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data and sanitize inputs
    $name = $conn->real_escape_string($_POST['name']);
    $email = $conn->real_escape_string($_POST['email']);
    $practice_name = $conn->real_escape_string($_POST['practice_name']);
    $phone = $conn->real_escape_string($_POST['phone']);
    $service = $conn->real_escape_string($_POST['service']);
    $message = $conn->real_escape_string($_POST['message']);
    
    // Validate required inputs
    if (empty($name) || empty($email) || empty($message)) {
        $response = [
            'success' => false,
            'message' => 'Name, email, and message are required.'
        ];
        echo json_encode($response);
        exit;
    }
    
    // Create table if it doesn't exist
    $create_table_sql = "CREATE TABLE IF NOT EXISTS contact_messages (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL,
        practice_name VARCHAR(200),
        phone VARCHAR(20),
        service VARCHAR(100),
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )";
    
    if (!$conn->query($create_table_sql)) {
        $response = [
            'success' => false,
            'message' => 'Table creation failed: ' . $conn->error
        ];
        echo json_encode($response);
        exit;
    }
    
    // Insert data into the database
    $sql = "INSERT INTO contact_messages (name, email, practice_name, phone, service, message) VALUES (?, ?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssssss", $name, $email, $practice_name, $phone, $service, $message);
    
    if ($stmt->execute()) {
        $response = [
            'success' => true,
            'message' => 'Your message has been sent successfully!'
        ];
    } else {
        $response = [
            'success' => false,
            'message' => 'Failed to send message: ' . $stmt->error
        ];
    }
    
    $stmt->close();
    echo json_encode($response);
} else {
    // Not a POST request
    $response = [
        'success' => false,
        'message' => 'Invalid request method.'
    ];
    echo json_encode($response);
}

$conn->close();
?>