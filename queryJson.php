<?php
// Enable detailed error reporting
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
ini_set('log_errors', 1);
ini_set('error_log', 'php_errors.log');
error_reporting(E_ALL);

// Replace with your JSON server URL
$jsonServerUrl = "http://localhost:3001/records";

// Initialize cURL session
$ch = curl_init($jsonServerUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPGET, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json'
]);

// Execute cURL request and capture the response
$response = curl_exec($ch);

// Check for cURL errors
if (curl_errno($ch)) {
    echo 'cURL Error: ' . curl_error($ch);
} else {
    // Check HTTP status code for success
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    if ($httpCode == 200) {
        // Output the JSON response
        echo $response;
    } else {
        echo 'Error: HTTP status code ' . $httpCode . '. Response: ' . htmlentities($response);
    }
}

curl_close($ch);
?>
