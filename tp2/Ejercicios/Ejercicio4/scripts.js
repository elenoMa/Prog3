<<<<<<< Updated upstream
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('taskForm');
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');

    form.addEventListener('click', event => {
        event.preventDefault();
        const taskText = taskInput.value.trim();

        if (taskText !== '') {
            const li = createTaskItem(taskText);
            taskList.appendChild(li);
            taskInput.value = '';
        }
    });
});

function createTaskItem(text) {
    const li = document.createElement('li');
    li.textContent = text;

    li.classList.add('task-item'); 

    // Toggle para marcar como completado
    li.addEventListener('click', () => {
        li.classList.toggle('completado');
    });

    return li;
}
=======
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
>>>>>>> Stashed changes
