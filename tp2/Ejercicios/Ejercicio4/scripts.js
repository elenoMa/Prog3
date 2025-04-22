document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('taskForm');
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');

    form.addEventListener('submit', event => {
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