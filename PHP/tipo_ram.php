<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Content-Type: application/json');

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "calculadorafuente";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(["error" => "Conexión fallida: " . $conn->connect_error]));
}

$sql = "SELECT DISTINCT TIPO FROM ram ORDER BY TIPO ASC";
$result = $conn->query($sql);

$tipos_ram = [];

if ($result) {
    while ($row = $result->fetch_assoc()) {
        $tipos_ram[] = $row['TIPO'];
    }
    echo json_encode($tipos_ram);
} else {
    echo json_encode(["error" => "Error en la consulta SQL: " . $conn->error]);
}

$conn->close();
?>