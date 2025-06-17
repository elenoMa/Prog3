const express = require('express');
const router = express.Router();
const personasController = require('../controllers/personasController');

router.get('/', personasController.getPersonas);

module.exports = router; 