<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');

include 'db_connection.php';
$conn = openConnection();

$id_act = $_GET['id_act'];

$sql = "SELECT * FROM actividades WHERE id_act='$id_act'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    echo json_encode($result->fetch_assoc());
} else {
    echo json_encode(['error' => 'No se encontró la actividad']);
}

closeConnection($conn);
?>
