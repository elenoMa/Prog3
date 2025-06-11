const jwt = require("jsonwebtoken");
const Config = require("../config/config.js");

const verifyTokenMiddleware = (req, res, next) => {
  const authHeader = req.header("Authorization") || req.header("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token de acceso no proporcionado o mal formado" });
  }

  const token = authHeader.replace("Bearer ", "");

  try {
    const decoded = jwt.verify(token, Config.jwt.secret, {
      algorithms: [Config.jwt.algorithm],
      issuer: Config.jwt.issuer,
      audience: Config.jwt.audience
    });

    // Verificar que no sea un refresh token
    if (decoded.type === 'refresh') {
      return res.status(401).json({ message: "Token de actualización no válido para esta operación" });
    }

    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: "Token expirado" });
    }
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: "Token inválido" });
    }
    if (error.name === 'NotBeforeError') {
      return res.status(401).json({ message: "Token no válido aún" });
    }
    res.status(401).json({ message: "Error de autenticación" });
  }
};

module.exports = {
  verifyTokenMiddleware,
};
