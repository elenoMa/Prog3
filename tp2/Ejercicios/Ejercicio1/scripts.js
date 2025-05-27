// Cambiar el texto del título usando getElementById()
<<<<<<< Updated upstream
const titulo = document.getElementById('tituloPrincipal');

titulo ? titulo.textContent = 'Hola Sergio o Gianluca (nose quien lo ve)' : "";

// Cambiar el color de los párrafos usando getElementsByClassName()
const parrafos = document.getElementsByClassName('parrafo');

for (let parrafo of parrafos) {
    parrafo.style.color = 'blue';
=======
const titulo = document.getElementById('titulo');
if (titulo) {
    titulo.textContent = 'Hola Sergio o Gianluca (nose quien lo ve)';
}

// Cambiar el color de los párrafos usando getElementsByClassName()
const parrafos = document.getElementsByClassName('parrafo');
for (let i = 0; i < parrafos.length; i++) {
    parrafos[i].style.color = 'blue';
>>>>>>> Stashed changes
}

// Agregar texto al final de cada <li> usando querySelectorAll()
const listaItems = document.querySelectorAll('li');
listaItems.forEach((item) => {
    item.textContent += ' - Texto agregado, todo bien profe?';
});