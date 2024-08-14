<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');  // Permitir acceso desde cualquier origen
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

include 'db_connection.php';  // Incluir el archivo de conexión
$conn = openConnection();  // Usar la función para abrir la conexión

$sql = "SELECT a.id_act, a.actividad, a.fech_asig, a.fech_lim, a.fech_ini, a.fech_fin, a.area, 
               u1.nom_usu AS nom_usu_asignado,
               u2.nom_usu AS nom_usu_que_asigno
        FROM actividades a
        JOIN usuarios u1 ON a.id_usu_asignado = u1.id_usu
        JOIN usuarios u2 ON a.id_usu_que_asigno = u2.id_usu where a.estatus=1";
$result = $conn->query($sql);

$activities = array();
while($row = $result->fetch_assoc()) {
    $activities[] = $row;
}

echo json_encode($activities);

closeConnection($conn);  // Cerrar la conexión
?>
