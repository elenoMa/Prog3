/**
 * Controlador de Pacientes
 * 
 * Este controlador maneja todas las operaciones relacionadas con pacientes:
 * - Autenticación (login)
 * - Registro de nuevos pacientes
 * - Operaciones CRUD
 * - Renovación de tokens
 * 
 * @requires bcrypt - Para el hasheo de contraseñas
 * @requires jsonwebtoken - Para la generación y verificación de tokens
 * @requires Joi - Para la validación de datos
 */

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Joi = require("joi");

const {
  getPacienteByEmail,
  createPaciente,
  listPacientes,
  deletePaciente,
  updatePaciente,
  listPacienteById
} = require("../../models/sqlite/paciente.model");

const Config = require("../../config/config.js");
const { pacienteRegisterSchema, pacienteLoginSchema, pacienteUpdateSchema } = require('../../models/validationSchemas');

/**
 * Esquema para validar IDs de pacientes
 * @type {Joi.ObjectSchema}
 */
const idSchema = Joi.number().integer().positive().required().messages({
  'number.base': 'El ID debe ser un número',
  'number.integer': 'El ID debe ser un número entero',
  'number.positive': 'El ID debe ser un número positivo',
  'any.required': 'El ID es obligatorio'
});

class PacientesController {
  /**
   * Autenticación de pacientes
   * @param {Object} req - Request de Express
   * @param {Object} res - Response de Express
   * @returns {Object} Token JWT y datos del usuario
   */
  async login(req, res) {
    try {
      // Validar datos de entrada
      const { error } = pacienteLoginSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }

      const { email, password } = req.body;

      // Verificar existencia del paciente
      const paciente = await getPacienteByEmail(email);
      if (!paciente) {
        return res.status(401).json({ message: "Paciente no encontrado" });
      }

      // Verificar contraseña
      const isPasswordValid = await bcrypt.compare(password, paciente.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Contraseña incorrecta" });
      }

      // Generar access token
      const accessToken = jwt.sign(
        { 
          id: paciente.id, 
          email: paciente.email,
          nombre: paciente.nombre,
          apellido: paciente.apellido
        },
        Config.jwt.secret,
        { 
          expiresIn: Config.jwt.expiresIn,
          algorithm: Config.jwt.algorithm,
          issuer: Config.jwt.issuer,
          audience: Config.jwt.audience
        }
      );

      // Generar refresh token
      const refreshToken = jwt.sign(
        { 
          id: paciente.id,
          type: 'refresh'
        },
        Config.jwt.secret,
        { 
          expiresIn: '7d',
          algorithm: Config.jwt.algorithm,
          issuer: Config.jwt.issuer,
          audience: Config.jwt.audience
        }
      );

      res.status(200).json({
        accessToken,
        refreshToken,
        user: {
          id: paciente.id,
          email: paciente.email,
          nombre: paciente.nombre,
          apellido: paciente.apellido
        }
      });

    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  }

  /**
   * Listar todos los pacientes
   * @param {Object} req - Request de Express
   * @param {Object} res - Response de Express
   * @returns {Array} Lista de pacientes
   */
  async list(req, res) {
    try {
      const pacientes = await listPacientes();
      res.status(200).json(pacientes);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  /**
   * Obtener un paciente por su ID
   * @param {Object} req - Request de Express
   * @param {Object} res - Response de Express
   * @returns {Object} Datos del paciente
   */
  async findById(req, res) {
    try {
      const { error } = idSchema.validate(req.params.id);
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }

      const id = req.params.id;
      const paciente = await listPacienteById(id);
      if (!paciente) {
        return res.status(404).json({ message: `No existe el paciente con id: ${id}` });
      }
      res.status(200).json(paciente);

    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  /**
   * Crear un nuevo paciente
   * @param {Object} req - Request de Express
   * @param {Object} res - Response de Express
   * @returns {Object} Datos del paciente creado
   */
  async create(req, res) {
    try {
      const { error } = pacienteRegisterSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }

      const { dni, nombre, apellido, email, password } = req.body;

      // Verificar campos obligatorios
      if (!dni || !nombre || !apellido || !email || !password) {
        return res.status(400).json({ message: "Todos los campos son obligatorios" });
      }

      // Verificar email único
      const existente = await getPacienteByEmail(email);
      if (existente) {
        return res.status(409).json({ message: "El correo ya está registrado" });
      }

      // Crear paciente
      const nuevoPaciente = await createPaciente({
        dni,
        nombre,
        apellido,
        email,
        password // en texto plano, el modelo la hashea
      });

      res.status(200).json(nuevoPaciente);

    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  /**
   * Eliminar un paciente
   * @param {Object} req - Request de Express
   * @param {Object} res - Response de Express
   * @returns {Object} Mensaje de confirmación
   */
  async delete(req, res) {
    try {
      const { error } = idSchema.validate(req.params.id);
      if (error) {
        return res.status(400).json({ message: error.details[0].message });
      }

      const id = req.params.id;
      const eliminado = await deletePaciente(id);

      if (eliminado === 0) {
        return res.status(404).json({ message: `No existe el paciente con id: ${id}` });
      }

      res.status(200).json({ message: "Paciente eliminado correctamente" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  /**
   * Actualizar datos de un paciente
   * @param {Object} req - Request de Express
   * @param {Object} res - Response de Express
   * @returns {Object} Mensaje de confirmación
   */
  async update(req, res) {
    try {
      // Validar ID
      const { error: idError } = idSchema.validate(req.params.id);
      if (idError) {
        return res.status(400).json({ message: idError.details[0].message });
      }

      // Validar datos de actualización
      const { error: bodyError } = pacienteUpdateSchema.validate(req.body);
      if (bodyError) {
        return res.status(400).json({ message: bodyError.details[0].message });
      }

      const id = req.params.id;
      const { dni, nombre, apellido, email, password } = req.body;

      // Hashear nueva contraseña si se proporciona
      const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;

      // Actualizar paciente
      const actualizado = await updatePaciente(id, {
        dni,
        nombre,
        apellido,
        email,
        password: hashedPassword
      });

      if (!actualizado) {
        return res.status(404).json({ message: `No existe el paciente con id: ${id}` });
      }

      res.status(200).json({ message: "Paciente actualizado correctamente" });

    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  /**
   * Renovar el token de acceso
   * @param {Object} req - Request de Express
   * @param {Object} res - Response de Express
   * @returns {Object} Nuevo access token
   */
  async refreshToken(req, res) {
    try {
      const { refreshToken } = req.body;
      
      if (!refreshToken) {
        return res.status(400).json({ message: 'Refresh token es requerido' });
      }

      // Verificar el refresh token
      const decoded = jwt.verify(refreshToken, Config.jwt.secret, {
        algorithms: [Config.jwt.algorithm],
        issuer: Config.jwt.issuer,
        audience: Config.jwt.audience
      });

      if (decoded.type !== 'refresh') {
        return res.status(401).json({ message: 'Token inválido' });
      }

      // Obtener el paciente
      const paciente = await listPacienteById(decoded.id);
      if (!paciente) {
        return res.status(401).json({ message: 'Paciente no encontrado' });
      }

      // Generar nuevo access token
      const accessToken = jwt.sign(
        { 
          id: paciente.id, 
          email: paciente.email,
          nombre: paciente.nombre,
          apellido: paciente.apellido
        },
        Config.jwt.secret,
        { 
          expiresIn: Config.jwt.expiresIn,
          algorithm: Config.jwt.algorithm,
          issuer: Config.jwt.issuer,
          audience: Config.jwt.audience
        }
      );

      res.status(200).json({
        accessToken,
        user: {
          id: paciente.id,
          email: paciente.email,
          nombre: paciente.nombre,
          apellido: paciente.apellido
        }
      });

    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Refresh token expirado' });
      }
      if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({ message: 'Token inválido' });
      }
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new PacientesController();
