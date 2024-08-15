<?php

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
// Configuración de la conexión a la base de datos
include 'db_connection.php';
$conn = openConnection();

// Consultar usuarios con dispositivo registrado
$sql = "SELECT id_usu, nom_usu, app_usu, email_usu
        FROM usuarios
        WHERE dispositivo IS NOT NULL AND dispositivo <> ''";
$result = $conn->query($sql);

$usuarios = array();

if ($result->num_rows > 0) {
    // Recorrer los resultados y almacenarlos en un array
    while ($row = $result->fetch_assoc()) {
        $usuarios[] = $row;
    }
}

// Devolver los resultados en formato JSON
header('Content-Type: application/json');
echo json_encode($usuarios);

// Cerrar la conexión
$conn->close();
?>
