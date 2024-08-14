<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

include 'db_connection.php';
$conn = openConnection();

$data = json_decode(file_get_contents("php://input"), true);

$id_act = $data['id_act'];
$actividad = $data['actividad'];
$descripcion = $data['descripcion'];
$fech_asig = $data['fech_asig'];
$fech_lim = $data['fech_lim'];
$area = $data['area'];
$id_usu_asignado = $data['id_usu_asignado'];
$id_usu_que_asigno = $data['id_usu_que_asigno'];

$sql = "UPDATE actividades SET actividad='$actividad', descripcion='$descripcion', fech_asig='$fech_asig', fech_lim='$fech_lim', area='$area', id_usu_asignado='$id_usu_asignado', id_usu_que_asigno='$id_usu_que_asigno' WHERE id_act='$id_act'";

if ($conn->query($sql) === TRUE) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'error' => $conn->error]);
}

closeConnection($conn);
?>
