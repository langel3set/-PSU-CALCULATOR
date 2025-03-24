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

$tipo = isset($_GET['tipo']) ? $conn->real_escape_string($_GET['tipo']) : '';

if ($tipo) {
    $sql = "SELECT DISTINCT TAMAÑO FROM ram WHERE TIPO = '$tipo' ORDER BY TAMAÑO ASC";
    $result = $conn->query($sql);

    $tamaños_ram = [];

    if ($result) {
        while ($row = $result->fetch_assoc()) {
            $tamaños_ram[] = $row['TAMAÑO'];
        }
        echo json_encode($tamaños_ram);
    } else {
        echo json_encode(["error" => "Error en la consulta SQL: " . $conn->error]);
    }
} else {
    echo json_encode(["error" => "Tipo de RAM no especificado"]);
}

$conn->close();
?>