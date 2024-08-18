<?php
// logout.php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

// Incluye tu archivo de conexión a la base de datos
include 'db_connection.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    $id_usu = $data['id_usu'];

    if (empty($id_usu)) {
        echo json_encode(['success' => false, 'error' => 'ID de usuario no proporcionado']);
        exit;
    }

    $conn = openConnection();

    // Asegúrate de que 'id_usu' está en el formato correcto
    $sql = "UPDATE usuarios SET sesion = 0 WHERE id_usu = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param('i', $id_usu);

    if ($stmt->execute()) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'error' => $stmt->error]);
    }

    $stmt->close();
    closeConnection($conn);
} else {
    echo json_encode(['success' => false, 'error' => 'Método no permitido']);
}
?>
