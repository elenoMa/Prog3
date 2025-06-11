const { Router } = require('express');
const pacientesController = require('../controllers/API/pacientes.controller.js');
const { verifyTokenMiddleware } = require('../middlewares/verifyToken.middleware.js');
const rutaPacientes = Router();

// Rutas públicas
rutaPacientes.post('/login', pacientesController.login);
rutaPacientes.post('/register', verifyTokenMiddleware, pacientesController.create);
rutaPacientes.post('/refresh-token', verifyTokenMiddleware, pacientesController.refreshToken);

// Rutas protegidas
rutaPacientes.get('/', verifyTokenMiddleware, pacientesController.list);
rutaPacientes.get('/:id', verifyTokenMiddleware, pacientesController.findById);
rutaPacientes.put('/:id', verifyTokenMiddleware, pacientesController.update);
rutaPacientes.delete('/:id', verifyTokenMiddleware, pacientesController.delete);

//Otras rutas CRUD


module.exports = rutaPacientes; 