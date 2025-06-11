/**
 * Modelo de Pacientes
 * 
 * Este módulo define el modelo de datos para los pacientes y proporciona
 * funciones para interactuar con la tabla 'pacientes' en la base de datos SQLite.
 * 
 * @requires sequelize - ORM para la interacción con la base de datos
 * @requires bcrypt - Para el hasheo de contraseñas
 */

const { DataTypes } = require("sequelize");
const { sequelize } = require("../database");
const bcrypt = require("bcrypt");
const { Paciente } = require('./entities/paciente.entity');

/**
 * Modelo Sequelize: Paciente
 *
 * Representa a un paciente de la clínica.
 * Incluye información personal y se relaciona con los turnos.
 *
 * Atributos:
 *  - id: Identificador único (autoincremental)
 *  - nombre: Nombre del paciente (string, requerido)
 *  - apellido: Apellido del paciente (string, requerido)
 *  - email: Correo electrónico único (string, requerido)
 *  - password: Contraseña hasheada (string, requerido)
 *  - createdAt: Fecha de creación
 *  - updatedAt: Fecha de última actualización
 *
 * Relaciones:
 *  - Un paciente puede tener muchos turnos (hasMany)
 */

/**
 * Modelo de Paciente
 * Define la estructura y validaciones de la tabla 'pacientes'
 * 
 * @property {number} id - Identificador único del paciente (autoincremental)
 * @property {string} dni - DNI del paciente (único)
 * @property {string} nombre - Nombre del paciente
 * @property {string} apellido - Apellido del paciente
 * @property {string} email - Email del paciente (único)
 * @property {string} password - Contraseña hasheada del paciente
 * @property {Date} createdAt - Fecha de creación del registro
 * @property {Date} updatedAt - Fecha de última actualización
 */

/**
 * Hook que se ejecuta antes de crear un paciente
 * Hashea la contraseña antes de guardarla en la base de datos
 */
Paciente.beforeCreate(async (paciente) => {
  if (paciente.password) {
    paciente.password = await bcrypt.hash(paciente.password, 10);
  }
});

/**
 * Hook que se ejecuta antes de actualizar un paciente
 * Hashea la contraseña solo si ha sido modificada
 */
Paciente.beforeUpdate(async (paciente) => {
  if (paciente.changed("password")) {
    paciente.password = await bcrypt.hash(paciente.password, 10);
  }
});

/**
 * Crea un nuevo paciente en la base de datos
 * @param {Object} pacienteData - Datos del paciente a crear
 * @returns {Promise<Object>} Paciente creado
 */
const createPaciente = async (pacienteData) => {
  try {
    return await Paciente.create(pacienteData);
  } catch (error) {
    throw new Error(`Error al crear paciente: ${error.message}`);
  }
};

/**
 * Obtiene un paciente por su email
 * @param {string} email - Email del paciente a buscar
 * @returns {Promise<Object>} Paciente encontrado o null
 */
const getPacienteByEmail = async (email) => {
  try {
    return await Paciente.findOne({ where: { email } });
  } catch (error) {
    throw new Error(`Error al buscar paciente por email: ${error.message}`);
  }
};

/**
 * Lista todos los pacientes
 * @returns {Promise<Array>} Lista de pacientes
 */
const listPacientes = async () => {
  try {
    return await Paciente.findAll({
      attributes: { exclude: ["password"] },
    });
  } catch (error) {
    throw new Error(`Error al listar pacientes: ${error.message}`);
  }
};

/**
 * Obtiene un paciente por su ID
 * @param {number} id - ID del paciente a buscar
 * @returns {Promise<Object>} Paciente encontrado o null
 */
const listPacienteById = async (id) => {
  try {
    return await Paciente.findByPk(id, {
      attributes: { exclude: ["password"] },
    });
  } catch (error) {
    throw new Error(`Error al buscar paciente por ID: ${error.message}`);
  }
};

/**
 * Actualiza los datos de un paciente
 * @param {number} id - ID del paciente a actualizar
 * @param {Object} pacienteData - Nuevos datos del paciente
 * @returns {Promise<boolean>} true si se actualizó, false si no existe
 */
const updatePaciente = async (id, pacienteData) => {
  try {
    const [updated] = await Paciente.update(pacienteData, {
      where: { id },
    });
    return updated > 0;
  } catch (error) {
    throw new Error(`Error al actualizar paciente: ${error.message}`);
  }
};

/**
 * Elimina un paciente
 * @param {number} id - ID del paciente a eliminar
 * @returns {Promise<number>} Número de registros eliminados
 */
const deletePaciente = async (id) => {
  try {
    return await Paciente.destroy({
      where: { id },
    });
  } catch (error) {
    throw new Error(`Error al eliminar paciente: ${error.message}`);
  }
};

module.exports = {
  Paciente,
  createPaciente,
  getPacienteByEmail,
  listPacientes,
  listPacienteById,
  updatePaciente,
  deletePaciente,
};
