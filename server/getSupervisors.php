<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

include 'db_connection.php';  // Incluir el archivo de conexión
$conn = openConnection();  // Usar la función para abrir la conexión

// Consulta para obtener todos los supervisores
$sql = "SELECT id_usu, nom_usu, app_usu, email_usu, estatus FROM usuarios WHERE tipo_usu='supervisor'";
$result = $conn->query($sql);

$supervisors = array();
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $supervisors[] = $row;
    }
}

// Enviar la respuesta en formato JSON
echo json_encode($supervisors);

// Cerrar la conexión a la base de datos
closeConnection($conn);
?>
