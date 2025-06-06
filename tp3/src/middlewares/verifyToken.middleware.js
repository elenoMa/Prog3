const jwt = require("jsonwebtoken");
const Config = require("../config/config.js");

const verifyTokenMiddleware = (req, res, next) => {
  const authHeader = req.header("Authorization") || req.header("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token de acceso no proporcionado o mal formado" });
  }

  const token = authHeader.replace("Bearer ", "");

  try {
    const decoded = jwt.verify(token, Config.secreteWord);
    req.user = decoded; // Queda disponible en el controlador protegido
    next();
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

module.exports = {
  verifyTokenMiddleware,
};
