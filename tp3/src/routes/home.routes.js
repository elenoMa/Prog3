/**
 * Rutas de Home
 *
 * Define las rutas principales de la aplicación web para la gestión de turnos.
 * Incluye rutas para mostrar el home, listar turnos, crear y cancelar turnos.
 *
 * @module routes/home.routes
 */

const express = require('express');
const router = express.Router();
const turnoController = require('../controllers/home/turnos.controller');

/**
 * Página de inicio (home)
 * GET /
 * Renderiza la página principal
 */
router.get('/', turnoController.mostrarHome);

/**
 * Listado de turnos
 * GET /listar
 * Muestra la tabla de turnos registrados
 */
router.get('/listar', turnoController.mostrarTurnos);

/**
 * Formulario para crear un nuevo turno
 * GET /nuevo-turno
 */
router.get('/nuevo-turno', turnoController.formCrearTurno);

/**
 * Procesa la creación de un nuevo turno
 * POST /nuevo-turno
 */
router.post('/nuevo-turno', turnoController.crearTurno);

/**
 * Formulario para cancelar un turno
 * GET /cancelar
 */
router.get('/cancelar', turnoController.formCancelarTurno);

/**
 * Procesa la cancelación de un turno
 * POST /cancelar
 */
router.post('/cancelar', turnoController.formCancelarTurno);

module.exports = router;
