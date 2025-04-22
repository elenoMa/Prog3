const form = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

form.addEventListener('submit', function(event) {
event.preventDefault(); // Previene la acción por defecto del formulario

    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        const li = document.createElement('li');
        li.textContent = taskText;

    // Agrega un evento para marcar como completado
        li.addEventListener('click', function() {
        li.classList.toggle('completado');
        });

            taskList.appendChild(li);
            taskInput.value = ''; // Limpia el campo de texto
        }
    });