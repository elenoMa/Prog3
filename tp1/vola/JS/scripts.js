document.addEventListener("DOMContentLoaded", () => {
    const personasInput = document.getElementById("personas");

    // Crear contenedor para edades si no existe
    let edadesContainer = document.createElement("div");
    edadesContainer.id = "edades-container";
    personasInput.parentNode.insertBefore(edadesContainer, personasInput.nextSibling);

    personasInput.addEventListener("input", () => {
    let cantidad = parseInt(personasInput.value);

      // Limitar a 5 como máximo
    if (cantidad > 5) {
        cantidad = 5;
        personasInput.value = 5;
    }

      // Limpiar campos anteriores
    edadesContainer.innerHTML = "";

    for (let i = 1; i <= cantidad; i++) {
        const label = document.createElement("label");
        label.textContent = `Edad de la persona ${i}:`;
        label.setAttribute("for", `edad_${i}`);

        const input = document.createElement("input");
        input.type = "number";
        input.id = `edad_${i}`;
        input.name = `edad_${i}`;
        input.min = "0";
        input.required = true;

        edadesContainer.appendChild(label);
        edadesContainer.appendChild(input);
    }
    });
});
