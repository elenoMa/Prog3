const bcrypt = require('bcrypt');
const { Paciente } = require('../../entities/paciente.entity.js');

const seedPacientes = async () => {
    // Usuario de prueba
    const pacientePrueba = {
        dni: '12345678',
        nombre: 'Usuario',
        apellido: 'Prueba',
        email: 'usuario@prueba.com',
        password: await bcrypt.hash('Password123', 10)
    };

    await Paciente.findOrCreate({
        where: { email: pacientePrueba.email },
        defaults: pacientePrueba
    });

    console.log('Usuario de prueba creado:');
    console.log('Email: usuario@prueba.com');
    console.log('Contraseña: Password123');
};

module.exports = seedPacientes; 