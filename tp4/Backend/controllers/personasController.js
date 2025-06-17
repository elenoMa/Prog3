const { personas } = require('../models/Persona');

const getPersonas = (req, res) => {
  try {
    res.status(200).json({
      success: true,
      data: personas,
      message: 'Personas obtenidas exitosamente'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener las personas',
      error: error.message
    });
  }
};

module.exports = {
  getPersonas
}; 