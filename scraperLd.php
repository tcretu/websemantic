<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$url = "http://localhost/websem/toScrape.html"; // URL of the page to scrape
$html = file_get_contents($url);

// Use a regex to find the JSON-LD script tag
preg_match('/<script type="application\/ld\+json">(.*?)<\/script>/s', $html, $matches);
if (!isset($matches[1])) {
    echo json_encode(['error' => 'No JSON-LD found']);
    exit;
}
$jsonLd = $matches[1];

// Decode the JSON-LD string into an associative array
$jsonArray = json_decode($jsonLd, true);
if (json_last_error() !== JSON_ERROR_NONE) {
    echo json_encode(['error' => 'JSON decoding error: ' . json_last_error_msg()]);
    exit;
}

// Extract the person's name, article name, and description
$persons = [];
$articles = [];

foreach ($jsonArray['itemListElement'] as $item) {
    $personNames = [];
    foreach ($item['item']['author'] as $author) {
        $personNames[] = $author['name'];
    }
    $persons[] = implode(", ", $personNames);
    $articles[] = [
        'name' => $item['item']['headline'],
        'description' => $item['item']['description']
    ];
}

// Prepare the output data
$output = [];
foreach ($persons as $index => $person) {
    $output[] = [
        'person' => $person,
        'article_name' => $articles[$index]['name'],
        'description' => $articles[$index]['description']
    ];
}

// Return the JSON-encoded output
header('Content-Type: application/json');
echo json_encode($output);
?>
