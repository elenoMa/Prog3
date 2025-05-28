const {Router} = require('express');
const {home} = require('../controllers/home-controller.js')
const rutaHome = Router();
rutaHome.get('/', home);
//Otras rutas CRUD


module.exports = rutaHome;






