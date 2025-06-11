/**
 * Modelo de Turnos
 * 
 * Este módulo define el modelo de datos para los turnos médicos y proporciona
 * funciones para interactuar con la tabla 'turnos' en la base de datos SQLite.
 * 
 * @requires sequelize - ORM para la interacción con la base de datos
 */

const { DataTypes } = require("sequelize");
const sequelize = require("../database");
const { Paciente } = require("./paciente.model");

/**
 * Modelo Sequelize: Turno
 *
 * Representa un turno médico en la clínica.
 * Incluye información sobre la fecha, hora, motivo, estado y paciente asociado.
 *
 * Atributos:
 *  - id: Identificador único (autoincremental)
 *  - fecha: Fecha del turno (date, requerido)
 *  - hora: Hora del turno (string, requerido)
 *  - motivo: Motivo de la consulta (string, requerido)
 *  - estado: Estado del turno (string, valores: pendiente, confirmado, cancelado)
 *  - pacienteId: ID del paciente asociado (clave foránea)
 *  - createdAt: Fecha de creación
 *  - updatedAt: Fecha de última actualización
 *
 * Relaciones:
 *  - Un turno pertenece a un paciente (belongsTo)
 */
const Turno = sequelize.define(
  "turno",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    fecha: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    hora: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    motivo: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    estado: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "pendiente",
      validate: {
        isIn: [["pendiente", "confirmado", "cancelado"]],
      },
    },
    pacienteId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Paciente,
        key: "id",
      },
    },
  },
  {
    timestamps: true,
  }
);

// Definir relación con el modelo Paciente
Turno.belongsTo(Paciente, { foreignKey: "pacienteId" });
Paciente.hasMany(Turno, { foreignKey: "pacienteId" });

/**
 * Crea un nuevo turno en la base de datos
 * @param {Object} turnoData - Datos del turno a crear
 * @returns {Promise<Object>} Turno creado
 */
const createTurno = async (turnoData) => {
  try {
    return await Turno.create(turnoData);
  } catch (error) {
    throw new Error(`Error al crear turno: ${error.message}`);
  }
};

/**
 * Lista todos los turnos
 * @returns {Promise<Array>} Lista de turnos con datos del paciente
 */
const listTurnos = async () => {
  try {
    return await Turno.findAll({
      include: [
        {
          model: Paciente,
          attributes: ["nombre", "apellido", "dni"],
        },
      ],
    });
  } catch (error) {
    throw new Error(`Error al listar turnos: ${error.message}`);
  }
};

/**
 * Obtiene un turno por su ID
 * @param {number} id - ID del turno a buscar
 * @returns {Promise<Object>} Turno encontrado o null
 */
const listTurnoById = async (id) => {
  try {
    return await Turno.findByPk(id, {
      include: [
        {
          model: Paciente,
          attributes: ["nombre", "apellido", "dni"],
        },
      ],
    });
  } catch (error) {
    throw new Error(`Error al buscar turno por ID: ${error.message}`);
  }
};

/**
 * Actualiza los datos de un turno
 * @param {number} id - ID del turno a actualizar
 * @param {Object} turnoData - Nuevos datos del turno
 * @returns {Promise<boolean>} true si se actualizó, false si no existe
 */
const updateTurno = async (id, turnoData) => {
  try {
    const [updated] = await Turno.update(turnoData, {
      where: { id },
    });
    return updated > 0;
  } catch (error) {
    throw new Error(`Error al actualizar turno: ${error.message}`);
  }
};

/**
 * Elimina un turno
 * @param {number} id - ID del turno a eliminar
 * @returns {Promise<number>} Número de registros eliminados
 */
const deleteTurno = async (id) => {
  try {
    return await Turno.destroy({
      where: { id },
    });
  } catch (error) {
    throw new Error(`Error al eliminar turno: ${error.message}`);
  }
};

/**
 * Obtiene todos los turnos de un paciente específico
 * @param {number} pacienteId - ID del paciente
 * @returns {Promise<Array>} Lista de turnos del paciente
 */
const listTurnosByPacienteId = async (pacienteId) => {
  try {
    return await Turno.findAll({
      where: { pacienteId },
      include: [
        {
          model: Paciente,
          attributes: ["nombre", "apellido", "dni"],
        },
      ],
    });
  } catch (error) {
    throw new Error(`Error al listar turnos del paciente: ${error.message}`);
  }
};

module.exports = {
  Turno,
  createTurno,
  listTurnos,
  listTurnoById,
  updateTurno,
  deleteTurno,
  listTurnosByPacienteId,
}; 