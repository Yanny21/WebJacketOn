<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:3000');  // Permitir acceso desde http://localhost:3000

include 'db_connection.php';  // Incluir el archivo de conexión
$conn = openConnection();  // Usar la función para abrir la conexión

$id_usu = $_GET['id_usu'];

$sql = "SELECT id_usu, nom_usu, app_usu, email_usu, pass_usu, estatus FROM usuarios WHERE id_usu='$id_usu' AND tipo_usu='empleado'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    echo json_encode($result->fetch_assoc());
} else {
    echo json_encode(['error' => 'No supervisor found']);
}

closeConnection($conn);  // Cerrar la conexión
?>
