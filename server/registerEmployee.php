<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:3000');  // Permitir acceso desde http://localhost:3000
header('Access-Control-Allow-Methods: POST');  // Permitir solo métodos POST
header('Access-Control-Allow-Headers: Content-Type');  // Permitir solo encabezados Content-Type

include 'db_connection.php';  // Incluir el archivo de conexión
$conn = openConnection();  // Usar la función para abrir la conexión

$nom_usu = $_POST['nom_usu'];
$app_usu = $_POST['app_usu'];
$email_usu = $_POST['email_usu'];
$pass_usu = md5($_POST['pass_usu']);  // Encriptar la contraseña con MD5

$sql = "INSERT INTO usuarios (nom_usu, app_usu, email_usu, pass_usu, tipo_usu) VALUES ('$nom_usu', '$app_usu', '$email_usu', '$pass_usu', 'empleado')";

if ($conn->query($sql) === TRUE) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'error' => $conn->error]);
}

closeConnection($conn);  // Cerrar la conexión
?>
