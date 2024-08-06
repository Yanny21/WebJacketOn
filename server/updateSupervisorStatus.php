<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');  // Permitir acceso desde cualquier origen
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

include 'db_connection.php';  // Incluir el archivo de conexión
$conn = openConnection();  // Usar la función para abrir la conexión

$id_usu = $_GET['id_usu'];
$estatus = $_GET['estatus'];

$sql = "UPDATE usuarios SET estatus = $estatus WHERE id_usu = $id_usu";
$response = array();

if ($conn->query($sql) === TRUE) {
    $response['success'] = true;
} else {
    $response['success'] = false;
    $response['error'] = $conn->error;
}

echo json_encode($response);
closeConnection($conn);  // Cerrar la conexión
?>
