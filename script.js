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