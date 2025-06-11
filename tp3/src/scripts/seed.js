/**
 * Script de inicialización de datos de prueba
 * 
 * Este script se encarga de:
 * 1. Crear la estructura de la base de datos
 * 2. Cargar estados de turno predefinidos
 * 3. Crear usuarios de prueba con contraseñas hasheadas
 * 4. Generar turnos de ejemplo
 * 
 * @requires bcrypt - Para el hasheo de contraseñas
 * @requires sequelize - Para la interacción con la base de datos
 */

const { Paciente } = require('../models/sqlite/entities/paciente.entity');
const { Turno } = require('../models/sqlite/entities/turnos.entity');
const { EstadoTurno } = require('../models/sqlite/entities/estadoTurno.entity');
const { sequelize } = require('../models/sqlite/config/db');
const bcrypt = require('bcrypt');

/**
 * Función principal que ejecuta el proceso de seed
 * @async
 * @throws {Error} Si hay un error durante el proceso de seed
 */
async function seed() {
    try {
        // Sincronizar modelos con la base de datos (force: true elimina las tablas existentes)
        await sequelize.sync({ force: true });

        // Crear estados de turno predefinidos
        const estados = await EstadoTurno.bulkCreate([
            { nombre: 'pendiente' },
            { nombre: 'confirmado' },
            { nombre: 'cancelado' },
            { nombre: 'completado' }
        ]);

        // Crear usuario de prueba principal
        const pacientePrueba = await Paciente.create({
            dni: '12345678',
            nombre: 'Usuario',
            apellido: 'Prueba',
            email: 'usuario@prueba.com',
            password: 'Password123'
        });

        // Crear pacientes adicionales para pruebas
        const pacientes = await Paciente.bulkCreate([
            {
                dni: '23456789',
                nombre: 'María',
                apellido: 'González',
                email: 'maria.gonzalez@email.com',
                password: 'password123'
            },
            {
                dni: '34567890',
                nombre: 'Carlos',
                apellido: 'Rodríguez',
                email: 'carlos.rodriguez@email.com',
                password: 'password123'
            }
        ]);

        // Generar turnos de ejemplo
        const turnos = [];
        const fechaBase = new Date();
        
        // Crear 6 turnos distribuidos en los próximos 3 días
        // 2 turnos por día (9:00 y 11:00)
        for (let i = 0; i < 6; i++) {
            const fechaTurno = new Date(fechaBase);
            fechaTurno.setDate(fechaBase.getDate() + Math.floor(i / 2)); // 2 turnos por día
            fechaTurno.setHours(9 + (i % 2) * 2); // Turnos a las 9:00 y 11:00
            
            turnos.push({
                idPaciente: i % 2 === 0 ? pacientePrueba.id : pacientes[i % pacientes.length].id,
                fechaHora: fechaTurno,
                estadoId: estados[Math.floor(Math.random() * 2)].id // Estado pendiente o confirmado
            });
        }

        await Turno.bulkCreate(turnos);

        // Mostrar información de éxito y credenciales
        console.log('Datos de prueba cargados exitosamente');
        console.log('\nUsuario de prueba creado:');
        console.log('Email: usuario@prueba.com');
        console.log('Contraseña: Password123');
        process.exit(0);
    } catch (error) {
        console.error('Error al cargar datos de prueba:', error);
        process.exit(1);
    }
}

// Ejecutar el proceso de seed
seed(); 