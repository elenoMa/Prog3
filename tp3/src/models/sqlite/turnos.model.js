// models/sqlite/turno.model.js
const { Turno } = require('./entities/turnos.entity');
const { EstadoTurno } = require('./entities/estadoTurno.entity');
const { Paciente } = require('./entities/paciente.entity');

// Obtener todos los turnos con sus estados
const getAllTurnos = async () => {
    return await Turno.findAll({
        include: [
            {
                model: EstadoTurno,
                as: 'estado',
                attributes: ['nombre']
            },
            {
                model: Paciente,
                as: 'paciente',
                attributes: ['nombre', 'apellido']
            }
        ],
        order: [['fechaHora', 'ASC']]
    });
};

// Buscar turnos por idPaciente
const getTurnosByPaciente = async (idPaciente) => {
    return await Turno.findAll({ 
        where: { idPaciente },
        include: [{
            model: EstadoTurno,
            as: 'estado',
            attributes: ['nombre']
        }]
    });
};

// Crear un nuevo turno
const createTurno = async ({ idPaciente, fechaHora, motivo = '' }) => {
    // Por defecto, el estado será 'pendiente' (asumiendo que el ID 1 es para pendiente)
    return await Turno.create({ 
        idPaciente, 
        fechaHora, 
        motivo,
        estadoId: 1 // ID del estado 'pendiente'
    });
};

// Actualizar un turno
const updateTurno = async (id, { estado }) => {
    const turno = await Turno.findByPk(id);
    if (!turno) return null;

    // Buscar el ID del estado 'cancelado'
    const estadoCancelado = await EstadoTurno.findOne({ where: { nombre: 'cancelado' } });
    if (!estadoCancelado) throw new Error('Estado cancelado no encontrado');

    turno.estadoId = estadoCancelado.id;
    await turno.save();
    return turno;
};

// Eliminar un turno por id
const deleteTurno = async (id) => {
    return await Turno.destroy({ where: { id } });
};

module.exports = {
    getAllTurnos,
    getTurnosByPaciente,
    createTurno,
    updateTurno,
    deleteTurno
};
