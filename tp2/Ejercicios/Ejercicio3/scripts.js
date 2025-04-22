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
