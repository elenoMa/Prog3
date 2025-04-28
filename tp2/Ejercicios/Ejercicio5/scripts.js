document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formulario');

    form.addEventListener('click', function (e) {
        e.preventDefault();
        clearErrors();

        const nombre = getValue('nombre');
        const email = getValue('email');
        const edad = parseInt(getValue('edad'), 10);

        let isValid = true;

        if (!nombre) {
            showError('nombre', 'El nombre es obligatorio.');
            isValid = false;
        }

        if (!email) {
            showError('email', 'El email es obligatorio.');
            isValid = false;
        } else if (!isValidEmail(email)) {
            showError('email', 'El formato del email no es válido.');
            isValid = false;
        }

        if (isNaN(edad)) {
            showError('edad', 'La edad es obligatoria.');
            isValid = false;
        } else if (edad <= 18) {
            showError('edad', 'Debes tener más de 18 años.');
            isValid = false;
        } else if (edad > 100) {
            showError('edad', 'La edad ingresada no es valida.');
            isValid = false;
        }

        if (isValid) {
            alert('Formulario enviado correctamente.');
            form.reset();
        }
    });

    function getValue(id) {
        return document.getElementById(id).value.trim();
    }

    function showError(campo, mensaje) {
        document.getElementById(`error-${campo}`).textContent = mensaje;
    }

    function clearErrors() {
        ['nombre', 'email', 'edad'].forEach(campo => {
            showError(campo, '');
        });
    }

    function isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
});
