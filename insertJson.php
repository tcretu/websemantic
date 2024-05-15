<?php
// Enable detailed error reporting
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
ini_set('log_errors', 1);
ini_set('error_log', 'php_errors.log');
error_reporting(E_ALL);

// Assume data is sent via POST request
$article = isset($_POST['article']) ? trim($_POST['article']) : '';
$author = isset($_POST['author']) ? trim($_POST['author']) : '';
$description = isset($_POST['description']) ? trim($_POST['description']) : '';

if (empty($article) || empty($author) || empty($description)) {
    die('Error: Missing data for article, author, or description.');
}

// Construct the data array
$data = array(
    'article' => $article,
    'author' => $author,
    'description' => $description
);

// Convert the data array to JSON
$jsonData = json_encode($data);

// Replace with your JSON server URL
$jsonServerUrl = "http://localhost:3001/records";

// Initialize cURL session
$ch = curl_init($jsonServerUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $jsonData);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'Content-Length: ' . strlen($jsonData)
]);

// Execute cURL request and capture the response
$response = curl_exec($ch);

// Check for cURL errors
if (curl_errno($ch)) {
    echo 'cURL Error: ' . curl_error($ch);
} else {
    // Check HTTP status code for success
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    if ($httpCode == 201) {
        echo 'Record added to JSON server successfully';
    } else {
        echo 'Error: HTTP status code ' . $httpCode . '. Response: ' . htmlentities($response);
    }
}

curl_close($ch);




// Debugging: Output the JSON data to ensure it's correct
echo "<pre>JSON Data:\n" . htmlentities($jsonData) . "</pre>";

?>

