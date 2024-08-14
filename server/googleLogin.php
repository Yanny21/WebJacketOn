<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

include 'db_connection.php';

$data = json_decode(file_get_contents('php://input'), true);
$email = $data['email'];

$conn = openConnection();
$sql = "SELECT id_usu, email_usu, tipo_usu, sesion FROM usuarios WHERE email_usu = ? AND tipo_usu = 'admin'";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();

    if ($user['sesion'] == 0) {
        // Marcar la sesión como ocupada
        $updateSessionSql = "UPDATE usuarios SET sesion = 1 WHERE id_usu = ?";
        $updateStmt = $conn->prepare($updateSessionSql);
        $updateStmt->bind_param("i", $user['id_usu']);
        $updateStmt->execute();

        echo json_encode(['success' => true, 'message' => 'Inicio de sesión exitoso.']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Ya tienes una sesión activa en otro dispositivo.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'No estás autorizado para acceder.']);
}

$stmt->close();
closeConnection($conn);
?>
