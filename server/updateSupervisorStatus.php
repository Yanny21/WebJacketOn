<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:3000');  // Permitir acceso desde http://localhost:3000
header('Access-Control-Allow-Methods: GET');  // Permitir solo métodos GET
header('Access-Control-Allow-Headers: Content-Type');

include 'db_connection.php';  // Incluir el archivo de conexión
$conn = openConnection();  // Usar la función para abrir la conexión
$id_usu = $_GET['id_usu'];
$estatus = $_GET['estatus'];

// Log para verificar datos recibidos
error_log("id_usu: " . $id_usu);
error_log("estatus: " . $estatus);

$sql = "UPDATE usuarios SET estatus='$estatus' WHERE id_usu='$id_usu' AND tipo_usu='supervisor'";

// Log para verificar la consulta SQL
error_log("SQL Query: " . $sql);

if ($conn->query($sql) === TRUE) {
    // Devolver el estatus actualizado junto con la respuesta de éxito
    echo json_encode(['success' => true, 'estatus' => $estatus]);
} else {
    echo json_encode(['success' => false, 'error' => $conn->error]);
}

closeConnection($conn);  // Cerrar la conexión
?>
