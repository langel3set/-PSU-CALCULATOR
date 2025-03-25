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

$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    die(json_encode(["error" => "No se recibieron datos"]));
}

$totalWatts = 0;
$componentes = ["gpu", "ram", "cpu", "cooler", "caseFans"];

foreach ($componentes as $componente) {
    if (!empty($data[$componente])) {
        $nombre = $conn->real_escape_string($data[$componente]);
        
        $tabla = "";
        switch ($componente) {
            case "gpu": $tabla = "gpu_nvidia"; break;
            case "cpu": $tabla = "procesadores"; break;
            //case "cooler": $tabla = "cooler"; break;
            //case "caseFans": $tabla = "case_fans"; break;
        }
        if ($tabla) {
            $sql = "SELECT watts FROM $tabla WHERE NAME = '$nombre'";
            $result = $conn->query($sql);
            if ($result && $row = $result->fetch_assoc()) {
                $totalWatts += (int) $row['watts'];
            }
        }
        //falta sumar la ram
        $ram=[];
    }
}

//rango de error para la fuente siempre recomiendo un 20% mas
$resuladoFinal=round($totalWatts*1.2);


echo json_encode(["total" => $resuladoFinal]);

$conn->close();
?>