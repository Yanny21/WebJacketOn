<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

$firebaseUrl = 'https://alpha-prime-873c5.firebaseio.com/SensorData/Measurements.json';

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $firebaseUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$response = curl_exec($ch);

if ($response === false) {
    $error = curl_error($ch);
    http_response_code(500);
    echo json_encode(['error' => 'Error fetching data from Firebase: ' . $error]);
    curl_close($ch);
    exit;
}

curl_close($ch);

$data = json_decode($response, true);

if (json_last_error() !== JSON_ERROR_NONE) {
    http_response_code(500);
    echo json_encode(['error' => 'Error decoding JSON data']);
    exit;
}

$formattedData = array_map(function ($item) {
    $timestamp = isset($item['createdAt']) ? strtotime($item['createdAt']) * 1000 : null;
    $mq7Value = isset($item['rawData']['MQ7_AO']['after']) ? $item['rawData']['MQ7_AO']['after'] : 0;

    return $timestamp !== null ? ['x' => $timestamp, 'y' => $mq7Value] : null;
}, $data);

echo json_encode(array_filter($formattedData));
?>
