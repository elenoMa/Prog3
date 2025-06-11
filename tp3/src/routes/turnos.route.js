// routes/turnos.route.js

const { Router } = require('express');
const turnosController = require('../controllers/API/turnos.controller.js');
const { verifyTokenMiddleware } = require('../middlewares/verifyToken.middleware.js');

const rutaTurnos = Router();

// Todas las rutas requieren autenticación
rutaTurnos.use(verifyTokenMiddleware);

// Obtener turnos por idPaciente
rutaTurnos.get('/:idPaciente', turnosController.getTurnosByPaciente);

// Crear un nuevo turno
rutaTurnos.post('/new', turnosController.crearTurno);

// Actualizar un turno
rutaTurnos.put('/:id', turnosController.updateTurno);

// Cancelar un turno
rutaTurnos.delete('/:idTurno', turnosController.cancelarTurno);

module.exports = rutaTurnos;
