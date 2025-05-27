<<<<<<< Updated upstream
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('formulario');

    form.addEventListener('submit', function (event) {
        event.preventDefault();
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
=======
document.getElementById('formulario').addEventListener('submit', function(event) {
    event.preventDefault();

    // Limpiar mensajes de error
    document.getElementById('error-nombre').textContent = '';
    document.getElementById('error-email').textContent = '';
    document.getElementById('error-edad').textContent = '';

    let isValid = true;

    // Validar nombre
    const nombre = document.getElementById('nombre').value.trim();
    if (nombre === '') {
        document.getElementById('error-nombre').textContent = 'El nombre es obligatorio.';
        isValid = false;
    }

    // Validar email
    const email = document.getElementById('email').value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === '') {
        document.getElementById('error-email').textContent = 'El email es obligatorio.';
        isValid = false;
    } else if (!emailRegex.test(email)) {
        document.getElementById('error-email').textContent = 'El formato del email no es válido.';
        isValid = false;
    }

    // Validar edad
    const edad = parseInt(document.getElementById('edad').value, 10);
    if (isNaN(edad)) {
        document.getElementById('error-edad').textContent = 'La edad es obligatoria.';
        isValid = false;
    } else if (edad <= 18) {
        document.getElementById('error-edad').textContent = 'Debes tener más de 18 años.';
        isValid = false;
    }

    // Si todo es válido, enviar el formulario
    if (isValid) {
        alert('Formulario enviado correctamente.');
        // Aquí puedes enviar el formulario o realizar alguna acción adicional
    }
});
>>>>>>> Stashed changes
