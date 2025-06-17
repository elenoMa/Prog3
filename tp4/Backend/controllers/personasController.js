const personas = require('../models/persona');

exports.getPersonas = (req, res) => {
  res.json(personas);
}; 