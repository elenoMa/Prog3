/**
 * Middleware de Autenticación
 * 
 * Este módulo proporciona middleware para la autenticación y autorización
 * de usuarios mediante JWT (JSON Web Tokens).
 * 
 * @requires jsonwebtoken - Para la verificación de tokens JWT
 * @requires Config - Para acceder a la configuración de JWT
 */

const jwt = require("jsonwebtoken");
const Config = require("../config/config.js");

/**
 * Middleware para verificar el token JWT en las peticiones
 * 
 * Este middleware verifica que el token JWT sea válido y no haya expirado.
 * También valida el emisor (issuer) y la audiencia (audience) del token.
 * 
 * @param {Object} req - Request de Express
 * @param {Object} res - Response de Express
 * @param {Function} next - Función next de Express
 * @returns {void}
 */
const verifyTokenMiddleware = (req, res, next) => {
  try {
    // Obtener el token del header de autorización
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ message: "No se proporcionó token de autenticación" });
    }

    // Verificar formato del token (Bearer token)
    const [bearer, token] = authHeader.split(" ");
    if (bearer !== "Bearer" || !token) {
      return res.status(401).json({ message: "Formato de token inválido" });
    }

    // Verificar el token
    const decoded = jwt.verify(token, Config.jwt.secret, {
      algorithms: [Config.jwt.algorithm],
      issuer: Config.jwt.issuer,
      audience: Config.jwt.audience
    });

    // Verificar que no sea un refresh token
    if (decoded.type === 'refresh') {
      return res.status(401).json({ message: "Token inválido para esta operación" });
    }

    // Agregar la información del usuario decodificada al request
    req.user = {
      id: decoded.id,
      email: decoded.email,
      nombre: decoded.nombre,
      apellido: decoded.apellido
    };

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expirado" });
    }
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Token inválido" });
    }
    res.status(500).json({ message: "Error en la autenticación" });
  }
};

/**
 * Middleware para verificar el refresh token
 * 
 * Este middleware verifica que el refresh token sea válido y no haya expirado.
 * Se utiliza específicamente para renovar el access token.
 * 
 * @param {Object} req - Request de Express
 * @param {Object} res - Response de Express
 * @param {Function} next - Función next de Express
 * @returns {void}
 */
const verifyRefreshTokenMiddleware = (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    
    if (!refreshToken) {
      return res.status(400).json({ message: "Refresh token es requerido" });
    }

    // Verificar el refresh token
    const decoded = jwt.verify(refreshToken, Config.jwt.secret, {
      algorithms: [Config.jwt.algorithm],
      issuer: Config.jwt.issuer,
      audience: Config.jwt.audience
    });

    // Verificar que sea un refresh token
    if (decoded.type !== 'refresh') {
      return res.status(401).json({ message: "Token inválido para esta operación" });
    }

    // Agregar la información del usuario decodificada al request
    req.user = {
      id: decoded.id
    };

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Refresh token expirado" });
    }
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Refresh token inválido" });
    }
    res.status(500).json({ message: "Error en la autenticación" });
  }
};

module.exports = {
  verifyTokenMiddleware,
  verifyRefreshTokenMiddleware
}; 