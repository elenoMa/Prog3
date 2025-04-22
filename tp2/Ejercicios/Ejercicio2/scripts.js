document.addEventListener("DOMContentLoaded", () => {
    const textInput = document.getElementById("textInput");
    const addButton = document.getElementById("addButton");
    const itemList = document.getElementById("itemList");

    // Función para crear y agregar un nuevo ítem a la lista
    const addItem = () => {
        const inputValue = textInput.value.trim();
        if (!inputValue) return;

        const li = document.createElement("li");
        li.textContent = inputValue;

        const deleteButton = createDeleteButton(li);
        li.appendChild(deleteButton);
        itemList.appendChild(li);

        textInput.value = "";
    };

    // Función para crear el botón de eliminar
    const createDeleteButton = (item) => {
        const button = document.createElement("button");
        button.textContent = "Eliminar";
        button.classList.add("delete-btn");

        button.addEventListener("click", () => {
            item.remove();
        });

        return button;
    };

    // Asignar evento al botón "Agregar"
    addButton.addEventListener("click", addItem);

    //Permitir agregar con Enter
    textInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") addItem();
    });
});
