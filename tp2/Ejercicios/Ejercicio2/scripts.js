document.addEventListener("DOMContentLoaded", () => {
    const textInput = document.getElementById("textInput");
    const addButton = document.getElementById("addButton");
    const itemList = document.getElementById("itemList");

    addButton.addEventListener("click", () => {
        const inputValue = textInput.value.trim();
        if (inputValue) {
            const li = document.createElement("li");
            li.textContent = inputValue;

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Eliminar";
            deleteButton.addEventListener("click", () => {
                itemList.removeChild(li);
            });

            li.appendChild(deleteButton);
            itemList.appendChild(li);

            textInput.value = ""; // limpiar el campo de entrada
        }
    });
});