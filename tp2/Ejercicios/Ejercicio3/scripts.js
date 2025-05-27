<<<<<<< Updated upstream
document.addEventListener("DOMContentLoaded", () => {
    const resaltarButton = createButton("Resaltar Párrafos");
    const ocultarButton = createButton("Ocultar Párrafos");

    document.body.appendChild(resaltarButton);
    document.body.appendChild(ocultarButton);

    let resaltadoActivo = false; // estado de resaltado

    resaltarButton.addEventListener("click", () => {
        const parrafos = document.querySelectorAll("p");
        parrafos.forEach(parrafo => {
            if (resaltadoActivo) {
                parrafo.classList.remove("resaltado");
            } else {
                parrafo.classList.add("resaltado");
            }
        });
        resaltadoActivo = !resaltadoActivo; // alternar estado
    });

    ocultarButton.addEventListener("click", () => {
        const parrafos = document.querySelectorAll("p");
        parrafos.forEach(parrafo => {
            parrafo.classList.toggle("oculto");
        });
    });
});

function createButton(text) {
    const btn = document.createElement("button");
    btn.textContent = text;
    btn.classList.add("action-button");
    return btn;
}
=======
// Ejercicio 2: Resaltar y ocultar párrafos con JavaScript
// Create the buttons
const resaltarButton = document.createElement('button');
resaltarButton.textContent = 'Resaltar Párrafos';
document.body.appendChild(resaltarButton);

const ocultarButton = document.createElement('button');
ocultarButton.textContent = 'Ocultar Párrafos';
document.body.appendChild(ocultarButton);

// eventos para los botones
resaltarButton.addEventListener('click', () => {
    const parrafos = document.querySelectorAll('p');
    parrafos.forEach(parrafo => {
        parrafo.classList.add('resaltado');
    });
});

ocultarButton.addEventListener('click', () => {
    const parrafos = document.querySelectorAll('p');
    parrafos.forEach(parrafo => {
        parrafo.classList.toggle('oculto');
    });
});
>>>>>>> Stashed changes
