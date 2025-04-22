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