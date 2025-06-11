/**
 * Esquemas de Validación
 * 
 * Este módulo define los esquemas de validación para los datos de entrada
 * utilizando la biblioteca Joi. Los esquemas se utilizan para validar
 * los datos antes de procesarlos en los controladores.
 * 
 * @requires joi - Biblioteca para validación de datos
 */

const Joi = require('joi');

/**
 * Esquema para validar el registro de pacientes
 * 
 * @type {Joi.ObjectSchema}
 * @property {string} dni - DNI del paciente (requerido)
 * @property {string} nombre - Nombre del paciente (requerido)
 * @property {string} apellido - Apellido del paciente (requerido)
 * @property {string} email - Email del paciente (requerido, formato válido)
 * @property {string} password - Contraseña (requerida, mínimo 6 caracteres)
 */
const pacienteRegisterSchema = Joi.object({
  dni: Joi.string().required().messages({
    'string.empty': 'El DNI es requerido',
    'any.required': 'El DNI es requerido'
  }),
  nombre: Joi.string().required().messages({
    'string.empty': 'El nombre es requerido',
    'any.required': 'El nombre es requerido'
  }),
  apellido: Joi.string().required().messages({
    'string.empty': 'El apellido es requerido',
    'any.required': 'El apellido es requerido'
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'El email debe tener un formato válido',
    'string.empty': 'El email es requerido',
    'any.required': 'El email es requerido'
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': 'La contraseña debe tener al menos 6 caracteres',
    'string.empty': 'La contraseña es requerida',
    'any.required': 'La contraseña es requerida'
  })
});

/**
 * Esquema para validar el login de pacientes
 * 
 * @type {Joi.ObjectSchema}
 * @property {string} email - Email del paciente (requerido, formato válido)
 * @property {string} password - Contraseña (requerida)
 */
const pacienteLoginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'El email debe tener un formato válido',
    'string.empty': 'El email es requerido',
    'any.required': 'El email es requerido'
  }),
  password: Joi.string().required().messages({
    'string.empty': 'La contraseña es requerida',
    'any.required': 'La contraseña es requerida'
  })
});

/**
 * Esquema para validar la actualización de pacientes
 * 
 * @type {Joi.ObjectSchema}
 * @property {string} dni - DNI del paciente (opcional)
 * @property {string} nombre - Nombre del paciente (opcional)
 * @property {string} apellido - Apellido del paciente (opcional)
 * @property {string} email - Email del paciente (opcional, formato válido)
 * @property {string} password - Contraseña (opcional, mínimo 6 caracteres)
 */
const pacienteUpdateSchema = Joi.object({
  dni: Joi.string().optional().messages({
    'string.empty': 'El DNI no puede estar vacío'
  }),
  nombre: Joi.string().optional().messages({
    'string.empty': 'El nombre no puede estar vacío'
  }),
  apellido: Joi.string().optional().messages({
    'string.empty': 'El apellido no puede estar vacío'
  }),
  email: Joi.string().email().optional().messages({
    'string.email': 'El email debe tener un formato válido',
    'string.empty': 'El email no puede estar vacío'
  }),
  password: Joi.string().min(6).optional().messages({
    'string.min': 'La contraseña debe tener al menos 6 caracteres',
    'string.empty': 'La contraseña no puede estar vacía'
  })
});

/**
 * Esquema para validar la creación de turnos
 * 
 * @type {Joi.ObjectSchema}
 * @property {string} fecha - Fecha del turno (requerida, formato YYYY-MM-DD)
 * @property {string} hora - Hora del turno (requerida, formato HH:mm)
 * @property {string} motivo - Motivo de la consulta (requerido)
 * @property {number} pacienteId - ID del paciente (requerido)
 */
const turnoCreateSchema = Joi.object({
  fecha: Joi.date().iso().required().messages({
    'date.base': 'La fecha debe tener un formato válido (YYYY-MM-DD)',
    'date.format': 'La fecha debe tener un formato válido (YYYY-MM-DD)',
    'any.required': 'La fecha es requerida'
  }),
  hora: Joi.string().pattern(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/).required().messages({
    'string.pattern.base': 'La hora debe tener un formato válido (HH:mm)',
    'any.required': 'La hora es requerida'
  }),
  motivo: Joi.string().allow('', null),
  pacienteId: Joi.number().integer().positive().required().messages({
    'number.base': 'El ID del paciente debe ser un número',
    'number.integer': 'El ID del paciente debe ser un número entero',
    'number.positive': 'El ID del paciente debe ser un número positivo',
    'any.required': 'El ID del paciente es requerido'
  })
});

/**
 * Esquema para validar la actualización de turnos
 * 
 * @type {Joi.ObjectSchema}
 * @property {string} estado - Estado del turno (requerido, valores permitidos: pendiente, confirmado, cancelado)
 */
const turnoUpdateSchema = Joi.object({
  estado: Joi.string().valid('pendiente', 'confirmado', 'cancelado').required().messages({
    'any.only': 'El estado debe ser uno de: pendiente, confirmado, cancelado',
    'any.required': 'El estado es requerido'
  })
});

module.exports = {
  pacienteRegisterSchema,
  pacienteLoginSchema,
  pacienteUpdateSchema,
  turnoCreateSchema,
  turnoUpdateSchema
}; 