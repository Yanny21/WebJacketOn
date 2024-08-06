<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

include 'db_connection.php';

$data = json_decode(file_get_contents('php://input'), true);
$id_usu = $data['id_usu'];

if (empty($id_usu)) {
    echo json_encode(['success' => false, 'message' => 'ID de usuario no proporcionado.']);
    exit;
}

$conn = openConnection();

// Marcar la sesión como cerrada
$sql = "UPDATE usuarios SET sesion = 0 WHERE id_usu = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id_usu);
$stmt->execute();

if ($stmt->affected_rows > 0) {
    echo json_encode(['success' => true, 'message' => 'Sesión cerrada correctamente.']);
} else {
    echo json_encode(['success' => false, 'message' => 'Error al cerrar la sesión.']);
}

$stmt->close();
closeConnection($conn);
?>
