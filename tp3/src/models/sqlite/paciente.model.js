// models/sqlite/paciente.model.js

const { Paciente } = require('./entities/paciente.entity');

const getPacienteByEmail = async (email) => {
  return await Paciente.findOne({ where: { email } });
};

const createPaciente = async ({ dni, nombre, apellido, email, password }) => {
  return await Paciente.create({ dni, nombre, apellido, email, password });
};

const listPacientes = async () => {
  // Excluir password para seguridad si quieres
  return await Paciente.findAll({ attributes: { exclude: ['password'] } });
};

const listPacienteById = async (id) => {
  // Excluir password para seguridad si quieres
  return await Paciente.findByPk(id);
};

const deletePaciente = async (id) => {
  return await Paciente.destroy({ where: { id } });
};

const updatePaciente = async (id, { dni, nombre, apellido, email, password }) => {
  const paciente = await Paciente.findByPk(id);
  if (!paciente) return null;

  if (dni !== undefined) paciente.dni = dni;
  if (nombre !== undefined) paciente.nombre = nombre;
  if (apellido !== undefined) paciente.apellido = apellido;
  if (email !== undefined) paciente.email = email;
  if (password !== undefined) paciente.password = password;

  await paciente.save();
  return paciente;
};

module.exports = {
  getPacienteByEmail,
  createPaciente,
  listPacientes,
  deletePaciente,
  updatePaciente,
  listPacienteById
};
