// controllers/API/turnos.controller.js

const turnoModel = require('../../models/sqlite/turnos.model');

// Consultar turnos por idPaciente
const getTurnosByPaciente = async (req, res) => {
    try {
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
        const { idTurno } = req.params;
        // Podés hacer borrado físico o actualizar estado a 'cancelado'
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
        const { idPaciente, fechaHora } = req.body;

        if (!idPaciente || !fechaHora) {
            return res.status(400).json({ message: 'Faltan datos obligatorios: idPaciente y fechaHora' });
        }

        const nuevoTurno = await turnoModel.createTurno({ idPaciente, fechaHora });
        res.status(201).json(nuevoTurno);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear turno', error: error.message });
    }
};

const updateTurno = async (req, res) => {
    try {
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
