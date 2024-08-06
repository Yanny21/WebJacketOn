<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');  // Permitir acceso desde cualquier origen
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

include 'db_connection.php';  // Incluir el archivo de conexión
$conn = openConnection();  // Usar la función para abrir la conexión

$sql = "SELECT id_usu, nom_usu, app_usu, email_usu, estatus FROM usuarios WHERE tipo_usu='empleado'";
$result = $conn->query($sql);

$supervisors = array();
while($row = $result->fetch_assoc()) {
    $supervisors[] = $row;
}

echo json_encode($supervisors);

closeConnection($conn);  // Cerrar la conexión
?>
