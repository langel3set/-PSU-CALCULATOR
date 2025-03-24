document.addEventListener("DOMContentLoaded", function () {
    cargarDatos("conection.php", "cpu", "Selecciona un procesador");
    cargarDatos("PHP/gpu.php", "gpu", "Selecciona una GPU");
    cargarDatos("PHP/tipo_ram.php", "tipoRam", "Selecciona un tipo de RAM");

    document.getElementById("tipoRam").addEventListener("change", function () {
        let tipoSeleccionado = this.value;
        if (tipoSeleccionado) {
            cargarDatos(`PHP/ram.php?tipo=${tipoSeleccionado}`, "ram", "Selecciona un tamaño de RAM");
        } else {
            document.getElementById("ram").innerHTML = '<option value="">Selecciona un tamaño de RAM</option>';
        }
    });
});

function cargarDatos(url, elementoID, textoDefecto) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            let dropdown = document.getElementById(elementoID);
            dropdown.innerHTML = `<option value="">${textoDefecto}</option>`;

            data.forEach(item => {
                let option = document.createElement("option");
                option.value = item;
                option.textContent = item;
                dropdown.appendChild(option);
            });
        })
        .catch(error => console.error(`Error al cargar ${elementoID}:`, error));
}

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("calcular").addEventListener("click", function () {
        let gpu = document.getElementById("gpu").value;
        //let ram = document.getElementById("ram").value;
        let cpu = document.getElementById("cpu").value;
        //let cooler = document.getElementById("cooler").value;
        //let caseFans = document.getElementById("caseFans").value;

        fetch("PHP/calcular.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ gpu, cpu })
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert(data.error);
            } else {
                document.getElementById("totalWatts").textContent = `Total: ${data.total}W`;
            }
        })
        .catch(error => console.error("Error al calcular los watts:", error));
    });
});