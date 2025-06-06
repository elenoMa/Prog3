// models/sqlite/turno.model.js
const { Turno } = require('../sqlite/entities/turnos.entity');

// Buscar turnos por idPaciente
const getTurnosByPaciente = async (idPaciente) => {
    return await Turno.findAll({ where: { idPaciente } });
};

// Crear un nuevo turno
const createTurno = async ({ idPaciente, fechaHora, estado = 'reservado' }) => {
    return await Turno.create({ idPaciente, fechaHora, estado });
};

// Listar todos los turnos (opcionalmente podrías excluir datos sensibles o filtrar)
const listTurnos = async () => {
    return await Turno.findAll();
};

// Eliminar un turno por id
const deleteTurno = async (id) => {
    return await Turno.destroy({ where: { id } });
};

// Actualizar un turno
const updateTurno = async (id, { estado }) => {
    const turno = await Turno.findByPk(id);
    if (!turno) return null;

    if (estado !== undefined) turno.estado = estado;

    await turno.save();
    return turno;
};

module.exports = {
    getTurnosByPaciente,
    createTurno,
    listTurnos,
    deleteTurno,
    updateTurno,
};
