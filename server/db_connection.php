<?php
function openConnection() {
    $servername = "dtai.uteq.edu.mx";
    $username = "lunjos219";
    $port = 3306;
    $password = "ljj@2022371175";
    $dbname = "bd_awi4_lunjos219";

    $conn = new mysqli($servername, $username, $password, $dbname, $port);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    return $conn;
}

function closeConnection($conn) {
    $conn->close();
}
?>
