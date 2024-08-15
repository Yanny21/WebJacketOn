<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

include 'db_connection.php';

$data = json_decode(file_get_contents('php://input'), true);

$actividad = $data['actividad'];
$descripcion = $data['descripcion'];
$fech_asig = $data['fech_asig'];
$fech_lim = $data['fech_lim'];
$area = $data['area'];
$id_usu_asignado = $data['id_usu_asignado'];
$id_usu_que_asigno = $data['id_usu_que_asigno'];

if (empty($actividad) || empty($fech_asig) || empty($fech_lim) || empty($id_usu_asignado) || empty($id_usu_que_asigno)) {
    echo json_encode(['success' => false, 'message' => 'Por favor complete todos los campos obligatorios.']);
    exit;
}

$conn = openConnection();

$sql = "INSERT INTO actividades (actividad, descripcion, fech_asig, fech_lim, area, id_usu_asignado, id_usu_que_asigno) 
        VALUES (?, ?, ?, ?, ?, ?, ?)";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ssssssi", $actividad, $descripcion, $fech_asig, $fech_lim, $area, $id_usu_asignado, $id_usu_que_asigno);

if ($stmt->execute()) {
    echo json_encode(['success' => true, 'message' => 'Actividad agregada exitosamente.']);
} else {
    echo json_encode(['success' => false, 'message' => 'Error al agregar la actividad.']);
}

$stmt->close();
closeConnection($conn);
?>
