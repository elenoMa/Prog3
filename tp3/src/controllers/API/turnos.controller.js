/**
 * Controlador de Turnos
 * 
 * Este controlador maneja todas las operaciones relacionadas con turnos médicos:
 * - Creación de turnos
 * - Listado de turnos
 * - Actualización de estado
 * - Cancelación de turnos
 * - Consulta de turnos por paciente
 * 
 * @requires Joi - Para la validación de datos
 */

const turnoModel = require('../../models/sqlite/turnos.model');
const { turnoCreateSchema, turnoUpdateSchema } = require('../../models/validationSchemas');
const Joi = require('joi');

/**
 * Esquema para validar IDs
 * @type {Joi.ObjectSchema}
 */
const idSchema = Joi.number().integer().positive().required().messages({
  'number.base': 'El ID debe ser un número',
  'number.integer': 'El ID debe ser un número entero',
  'number.positive': 'El ID debe ser un número positivo',
  'any.required': 'El ID es obligatorio'
});

// Consultar turnos por idPaciente
const getTurnosByPaciente = async (req, res) => {
    try {
        const { error } = idSchema.validate(req.params.idPaciente);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        const { idPaciente } = req.params;
        const turnos = await turnoModel.getTurnosByPaciente(idPaciente);
        res.json(turnos);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener turnos', error: error.message });
    }
};

// Cancelar un turno (borrado lógico o físico)
const cancelarTurno = async (req, res) => {
    try {
        const { error } = idSchema.validate(req.params.idTurno);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        const { idTurno } = req.params;
        const turno = await turnoModel.updateTurno(idTurno, { estado: 'cancelado' });

        if (!turno) {
            return res.status(404).json({ message: 'Turno no encontrado' });
        }

        res.json({ message: 'Turno cancelado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al cancelar turno', error: error.message });
    }
};

// Crear un nuevo turno (requiere autenticación JWT)
const crearTurno = async (req, res) => {
    try {
        const { error } = turnoCreateSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }
        const { idPaciente, fechaHora, motivo = '' } = req.body;

        if (!idPaciente || !fechaHora) {
            return res.status(400).json({ message: 'Faltan datos obligatorios: idPaciente y fechaHora' });
        }

        const nuevoTurno = await turnoModel.createTurno({ idPaciente, fechaHora, motivo });
        res.status(201).json(nuevoTurno);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear turno', error: error.message });
    }
};

const updateTurno = async (req, res) => {
    try {
        const { error: idError } = idSchema.validate(req.params.id);
        if (idError) {
            return res.status(400).json({ message: idError.details[0].message });
        }

        const { error: bodyError } = turnoUpdateSchema.validate(req.body);
        if (bodyError) {
            return res.status(400).json({ message: bodyError.details[0].message });
        }

        const id = req.params.id;
        const { estado } = req.body;

        const turnoActualizado = await turnoModel.updateTurno(id, { estado });

        if (!turnoActualizado) {
            return res.status(404).json({ message: 'Turno no encontrado' });
        }

        res.json(turnoActualizado);
    } catch (error) {
        console.error('Error al actualizar turno:', error);
        res.status(500).json({ message: 'Error al actualizar turno', error: error.message });
    }
};


module.exports = {
    getTurnosByPaciente,
    cancelarTurno,
    crearTurno,
    updateTurno
};
