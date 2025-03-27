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
$sql = "SELECT NAME FROM procesadores ORDER BY NAME ASC";
$result = $conn->query($sql);

$procesadores = [];

if ($result) {
    while ($row = $result->fetch_assoc()) {
        $procesadores[] = $row['NAME'];
    }
    echo json_encode($procesadores);
} else {
    echo json_encode(["error" => "Error en la consulta SQL: " . $conn->error]);
}

$conn->close();
?>