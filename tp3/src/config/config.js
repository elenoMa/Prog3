/**
 * Configuración General de la Aplicación
 * 
 * Este módulo centraliza todas las configuraciones de la aplicación,
 * incluyendo variables de entorno, configuración de JWT, y otras
 * configuraciones globales.
 * 
 * @requires dotenv - Para cargar variables de entorno
 */

require("dotenv").config();

/**
 * Clase de configuración que centraliza todas las configuraciones
 * de la aplicación y proporciona valores por defecto seguros.
 */
class Config {
    constructor() {
        // Validar solo las variables de entorno esenciales
        const requiredEnvVars = ['SECRETE_WORD'];
        const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);
        
        if (missingEnvVars.length > 0) {
            throw new Error(`Faltan las siguientes variables de entorno esenciales: ${missingEnvVars.join(', ')}`);
        }

        // Configuración JWT
        this.jwt = {
            secret: process.env.SECRETE_WORD,
            expiresIn: process.env.EXPIRES_IN || '1h',
            algorithm: process.env.JWT_ALGORITHM || 'HS256',
            issuer: process.env.JWT_ISSUER || 'clinica-api',
            audience: process.env.JWT_AUDIENCE || 'clinica-client'
        };

        // Configuración de seguridad
        this.security = {
            bcryptRounds: parseInt(process.env.BCRYPT_ROUNDS) || 10,
            maxLoginAttempts: parseInt(process.env.MAX_LOGIN_ATTEMPTS) || 5,
            lockoutTime: parseInt(process.env.LOCKOUT_TIME) || 15 * 60 * 1000 // 15 minutos en milisegundos
        };
    }

    /**
     * Obtiene el puerto del servidor desde las variables de entorno
     * o usa un valor por defecto
     * @returns {number} Puerto del servidor
     */
    static get port() {
        return process.env.PORT || 3000;
    }

    /**
     * Obtiene la palabra secreta para JWT desde las variables de entorno
     * @returns {string} Palabra secreta
     * @throws {Error} Si no está definida la variable SECRETE_WORD
     */
    static get secretWord() {
        if (!process.env.SECRETE_WORD) {
            throw new Error("La variable de entorno SECRETE_WORD es requerida");
        }
        return process.env.SECRETE_WORD;
    }

    /**
     * Configuración de JWT
     * @type {Object}
     */
    static get jwt() {
        return {
            secret: this.secretWord,
            expiresIn: process.env.JWT_EXPIRES_IN || "1h",
            algorithm: process.env.JWT_ALGORITHM || "HS256",
            issuer: process.env.JWT_ISSUER || "clinica-api",
            audience: process.env.JWT_AUDIENCE || "clinica-client"
        };
    }

    /**
     * Configuración de la base de datos
     * @type {Object}
     */
    static get database() {
        return {
            dialect: "sqlite",
            storage: "./database/database.sqlite",
            logging: false
        };
    }

    /**
     * Configuración de CORS
     * @type {Object}
     */
    static get cors() {
        return {
            origin: process.env.CORS_ORIGIN || "*",
            methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
            allowedHeaders: ["Content-Type", "Authorization"]
        };
    }

    /**
     * Configuración de seguridad
     * @type {Object}
     */
    static get security() {
        return {
            bcryptRounds: parseInt(process.env.BCRYPT_ROUNDS) || 10,
            rateLimit: {
                windowMs: 15 * 60 * 1000, // 15 minutos
                max: 100 // límite de 100 peticiones por ventana
            }
        };
    }
}

module.exports = new Config();