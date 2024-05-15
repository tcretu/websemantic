<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Replace with your RDF4J repository URL and SPARQL query endpoint
$repositoryUrl = "http://localhost:8080/rdf4j-server/repositories/1234"; // Ensure '1234' is correct

// Example SPARQL query to retrieve data
$sparqlQuery = "
PREFIX ex: <http://example.org/>
SELECT ?article ?author ?description WHERE {
    ?article ex:author ?author ;
             ex:description ?description ;
             ex:article_name ?article_name .
}";

// URL-encode the query
$sparqlUrl = $repositoryUrl . "?query=" . urlencode($sparqlQuery);

// Send the SPARQL query to the RDF4J repository
$ch = curl_init($sparqlUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Accept: application/sparql-results+json' // Expecting JSON response
]);

$response = curl_exec($ch);
if (curl_errno($ch)) {
    echo json_encode(['error' => curl_error($ch)]);
    curl_close($ch);
    exit;
}

curl_close($ch);

// Check if response is not empty
if (!$response) {
    echo json_encode(['error' => 'Empty response from RDF4J server']);
    exit;
}

// Decode the SPARQL JSON response
$sparqlResults = json_decode($response, true);
if (json_last_error() !== JSON_ERROR_NONE) {
    echo json_encode(['error' => 'JSON decoding error: ' . json_last_error_msg(), 'response' => $response]);
    exit;
}

// Check if results are available
if (!isset($sparqlResults['results']['bindings'])) {
    echo json_encode(['error' => 'No results returned from RDF4J server', 'sparqlResults' => $sparqlResults]);
    exit;
}

// Transform the results into a simpler JSON structure
$output = [];
foreach ($sparqlResults['results']['bindings'] as $binding) {
    $output[] = [
        'article' => $binding['article']['value'],
        'author' => $binding['author']['value'],
        'description' => $binding['description']['value']
    ];
}

// Return the JSON-encoded output
header('Content-Type: application/json');
echo json_encode($output);
?>
