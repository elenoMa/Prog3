const express = require('express');
const router = express.Router();
const { getPersonas } = require('../controllers/personasController');

// GET /personas - Obtener todas las personas
router.get('/personas', getPersonas);

module.exports = router; 