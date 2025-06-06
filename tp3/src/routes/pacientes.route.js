const { Router } = require('express');
const pacientesController = require('../controllers/API/pacientes.controller.js');
const { verifyTokenMiddleware } = require('../middlewares/verifyToken.middleware.js');
const rutaPacientes = Router();
rutaPacientes.get('/', pacientesController.list);
rutaPacientes.get('/:id', pacientesController.findById);

rutaPacientes.post('/login', pacientesController.login)
rutaPacientes.post('/register', verifyTokenMiddleware, pacientesController.create)
rutaPacientes.put('/:id', verifyTokenMiddleware, pacientesController.update);
rutaPacientes.delete('/:id', verifyTokenMiddleware, pacientesController.delete);

//Otras rutas CRUD


module.exports = rutaPacientes; 