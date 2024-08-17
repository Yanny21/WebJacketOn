<?php
header("Access-Control-Allow-Origin: http://localhost:3000"); // Permitir solicitudes desde el origen específico
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');

include 'db_connection.php';
$conn = openConnection();

// Consulta para obtener los usuarios con un dispositivo asignado
$sql = "SELECT id_usu, nom_usu, app_usu, email_usu, dispositivo FROM usuarios WHERE dispositivo IS NOT NULL";
$result = $conn->query($sql);

$users = array();

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $users[] = $row;
    }
}

// Cierra la conexión
$conn->close();

// Retorna los datos en formato JSON
header('Content-Type: application/json');
echo json_encode($users);
?>
