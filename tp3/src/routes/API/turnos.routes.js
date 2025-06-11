/**
 * Rutas de la API de Turnos
 * 
 * Este módulo define las rutas de la API REST para la gestión de turnos médicos,
 * incluyendo creación, listado, actualización y cancelación de turnos.
 * 
 * @requires express - Framework web para Node.js
 * @requires TurnosController - Controlador de turnos
 * @requires verifyTokenMiddleware - Middleware de autenticación
 */

const express = require("express");
const router = express.Router();
const TurnosController = require("../../controllers/API/turnos.controller");
const { verifyTokenMiddleware } = require("../../middlewares/auth.middleware");

/**
 * @route POST /api/turnos
 * @desc Crear un nuevo turno
 * @access Private
 */
router.post("/", verifyTokenMiddleware, TurnosController.create);

/**
 * @route GET /api/turnos
 * @desc Obtener lista de turnos
 * @access Private
 */
router.get("/", verifyTokenMiddleware, TurnosController.list);

/**
 * @route GET /api/turnos/:id
 * @desc Obtener un turno por su ID
 * @access Private
 */
router.get("/:id", verifyTokenMiddleware, TurnosController.findById);

/**
 * @route PUT /api/turnos/:id
 * @desc Actualizar estado de un turno
 * @access Private
 */
router.put("/:id", verifyTokenMiddleware, TurnosController.update);

/**
 * @route DELETE /api/turnos/:id
 * @desc Cancelar un turno
 * @access Private
 */
router.delete("/:id", verifyTokenMiddleware, TurnosController.cancel);

/**
 * @route GET /api/turnos/paciente/:pacienteId
 * @desc Obtener turnos de un paciente específico
 * @access Private
 */
router.get("/paciente/:pacienteId", verifyTokenMiddleware, TurnosController.getByPacienteId);

module.exports = router; 