// routes/turnos.route.js

const { Router } = require('express');
const turnosController = require('../controllers/API/turnos.controller.js');
const { verifyTokenMiddleware } = require('../middlewares/verifyToken.middleware.js');

const rutaTurnos = Router();

// Obtener turnos por idPaciente (no requiere autenticación)
rutaTurnos.get('/:idPaciente', turnosController.getTurnosByPaciente);

// Cancelar un turno (requiere autenticación)
rutaTurnos.delete('/:idTurno', verifyTokenMiddleware, turnosController.cancelarTurno);

// Crear un nuevo turno (requiere autenticación)
rutaTurnos.post('/new', turnosController.crearTurno);

// Actualizar un turno
rutaTurnos.put('/:id', verifyTokenMiddleware, turnosController.updateTurno);

module.exports = rutaTurnos;
