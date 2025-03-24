document.addEventListener("DOMContentLoaded", function () {
    fetch("conection.php")
        .then(response => response.json())
        .then(data => {
            let dropdown = document.getElementById("cpu");
            dropdown.innerHTML = '<option value="">Selecciona un procesador</option>'; // Opción por defecto

            data.forEach(procesador => {
                let option = document.createElement("option");
                option.value = procesador;
                option.textContent = procesador;
                dropdown.appendChild(option);
            });
        })
        .catch(error => console.error("Error al cargar los procesadores:", error));
});