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

// URL-encode the article variable to ensure it does not contain invalid characters
$encodedArticle = urlencode($article);

// Construct the SPARQL DELETE query
$sparqlDeleteQuery = "
PREFIX ex: <http://example.org/>
DELETE WHERE {
  <http://example.org/article/$encodedArticle> ex:author \"$author\" ;
                                               ex:description \"$description\" ;
                                               ex:article_name \"$article\" .
}";

// Replace with your RDF4J repository URL and endpoint
$repositoryUrl = "http://localhost:8080/rdf4j-server/repositories/1234/statements";

// Initialize cURL session
$ch = curl_init($repositoryUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $sparqlDeleteQuery);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/sparql-update'
]);

// Execute cURL request and capture the response
$response = curl_exec($ch);

// Check for cURL errors
if (curl_errno($ch)) {
    echo 'cURL Error: ' . curl_error($ch);
} else {
    // Check HTTP status code for success
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    if ($httpCode == 204) {
        echo 'Record deleted from RDF4J successfully';
    } else {
        echo 'Error: HTTP status code ' . $httpCode . '. Response: ' . htmlentities($response);
    }
}

curl_close($ch);
?>
