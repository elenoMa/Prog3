/**
 * Rutas de la API de Pacientes
 * 
 * Este módulo define las rutas de la API REST para la gestión de pacientes,
 * incluyendo autenticación, registro y operaciones CRUD.
 * 
 * @requires express - Framework web para Node.js
 * @requires PacientesController - Controlador de pacientes
 * @requires verifyTokenMiddleware - Middleware de autenticación
 */

const express = require("express");
const router = express.Router();
const PacientesController = require("../../controllers/API/pacientes.controller");
const { verifyTokenMiddleware, verifyRefreshTokenMiddleware } = require("../../middlewares/auth.middleware");

/**
 * @route POST /api/pacientes/login
 * @desc Autenticar un paciente
 * @access Public
 */
router.post("/login", PacientesController.login);

/**
 * @route POST /api/pacientes/refresh-token
 * @desc Renovar el token de acceso
 * @access Public
 */
router.post("/refresh-token", verifyRefreshTokenMiddleware, PacientesController.refreshToken);

/**
 * @route POST /api/pacientes
 * @desc Registrar un nuevo paciente
 * @access Public
 */
router.post("/", PacientesController.create);

/**
 * @route GET /api/pacientes
 * @desc Obtener lista de pacientes
 * @access Private
 */
router.get("/", verifyTokenMiddleware, PacientesController.list);

/**
 * @route GET /api/pacientes/:id
 * @desc Obtener un paciente por su ID
 * @access Private
 */
router.get("/:id", verifyTokenMiddleware, PacientesController.findById);

/**
 * @route PUT /api/pacientes/:id
 * @desc Actualizar datos de un paciente
 * @access Private
 */
router.put("/:id", verifyTokenMiddleware, PacientesController.update);

/**
 * @route DELETE /api/pacientes/:id
 * @desc Eliminar un paciente
 * @access Private
 */
router.delete("/:id", verifyTokenMiddleware, PacientesController.delete);

module.exports = router; 