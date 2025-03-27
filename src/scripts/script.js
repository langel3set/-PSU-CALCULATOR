document.addEventListener("DOMContentLoaded", function () {
    cargarDatos("PHP/conection.php", "cpu", "Selecciona un procesador");
    cargarDatos("PHP/gpu.php", "gpu", "Selecciona una GPU");
    cargarDatos("PHP/tipo_ram.php", "tipoRam", "Selecciona un tipo de RAM");

    document.getElementById("tipoRam").addEventListener("change", function () {
        let tipoSeleccionado = this.value;
        let ramType = document.getElementById("ram");
        if (tipoSeleccionado) {
            cargarDatos(`PHP/ram.php?tipo=${tipoSeleccionado}`, "ram", "Selecciona un tamaño de RAM");
            ramType.removeAttribute("disabled");
        } else {
            ramType.setAttribute("disabled", "true");
            document.getElementById("ram").innerHTML = '<option value="">Selecciona un tamaño de RAM</option>';
        }
    });

    document.getElementById("calcular").addEventListener("click", function () {
        let gpu = document.getElementById("gpu").value;
        let cpu = document.getElementById("cpu").value;
        let coolerUnits = parseInt(document.getElementById("coolerUnits").value) || 0;
        let caseFans = parseInt(document.getElementById("caseFans").value) || 0;

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
                // Cálculo adicional de Watts de los coolers y ventiladores del case
                let wattsCooler = coolerUnits * 7; // Cada cooler suma 7W
                let wattsFans = caseFans * 5; // Cada ventilador del case suma 5W
                let totalWatts = data.total + wattsCooler + wattsFans;

                document.getElementById("totalWatts").textContent = `Total: ${totalWatts}W`;
            }
        })
        .catch(error => console.error("Error al calcular los watts:", error));
    });

    let coolerTypeSelect = document.getElementById("coolerType");
    let coolerUnitsSelect = document.getElementById("coolerUnits");
    let caseFansSelect = document.getElementById("caseFans");

    coolerTypeSelect.addEventListener("change", function () {
        if (this.value) {
            coolerUnitsSelect.removeAttribute("disabled");
            cargarOpciones(coolerUnitsSelect, 0, 3);
        } else {
            coolerUnitsSelect.setAttribute("disabled", "true");
            coolerUnitsSelect.innerHTML = '<option value="">Selecciona cantidad</option>';
        }
    });

    cargarOpciones(caseFansSelect, 0, 50);
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

function cargarOpciones(selectElement, min, max) {
    selectElement.innerHTML = '<option value="">Selecciona cantidad</option>';
    for (let i = min; i <= max; i++) {
        let option = document.createElement("option");
        option.value = i;
        option.textContent = i;
        selectElement.appendChild(option);
    }
}