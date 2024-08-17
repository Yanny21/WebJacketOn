<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");


include 'db_connection.php';

$data = json_decode(file_get_contents('php://input'), true);
$email = $data['email'];
$password = $data['password'];

if (empty($email) || empty($password)) {
    echo json_encode(['success' => false, 'message' => 'Por favor complete todos los campos.']);
    exit;
}

$conn = openConnection();
$sql = "SELECT * FROM usuarios WHERE email_usu = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    echo json_encode(['success' => false, 'message' => 'Correo electrónico o contraseña incorrectos.']);
    exit;
}

$user = $result->fetch_assoc();
if (md5($password) === $user['pass_usu']) {
    if ($user['tipo_usu'] === 'admin') {
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
        echo json_encode(['success' => false, 'message' => 'Solo los administradores pueden acceder.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Correo electrónico o contraseña incorrectos.']);
}

$stmt->close();
closeConnection($conn);
?>