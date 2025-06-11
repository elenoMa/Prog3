/**
 * Controlador de Turnos para Home
 *
 * Gestiona la lógica de negocio para las vistas web relacionadas con turnos:
 * - Listado de turnos
 * - Creación de turnos
 * - Cancelación de turnos
 *
 * @module controllers/home/turnos.controller
 */

const turnoModel = require('../../models/sqlite/turnos.model');
const { Paciente } = require('../../models/sqlite/entities/paciente.entity');

/**
 * Renderiza la página de inicio.
 * @function
 * @param {Request} req
 * @param {Response} res
 */
const mostrarHome = (req, res) => {
    res.render('index');
};

/**
 * Muestra el listado de turnos.
 * @function
 * @param {Request} req
 * @param {Response} res
 */
const mostrarTurnos = async (req, res) => {
    try {
        const turnos = await turnoModel.getAllTurnos();
        res.render('list', { turnos });
    } catch (error) {
        res.status(500).send('Error al obtener turnos');
    }
};

/**
 * Renderiza el formulario para crear un nuevo turno.
 * @function
 * @param {Request} req
 * @param {Response} res
 */
const formCrearTurno = async (req, res) => {
    // Obtener pacientes para el select
    const pacientes = await Paciente.findAll();
    res.render('new', { pacientes });
};

/**
 * Procesa la creación de un nuevo turno.
 * @function
 * @param {Request} req
 * @param {Response} res
 */
const crearTurno = async (req, res) => {
    try {
        const { pacienteId, fechaHora, motivo } = req.body;
        await turnoModel.createTurno({ idPaciente: pacienteId, fechaHora, motivo });
        res.redirect('/listar');
    } catch (error) {
        res.status(500).send('Error al crear turno');
    }
};

/**
 * Renderiza el formulario para cancelar un turno.
 * @function
 * @param {Request} req
 * @param {Response} res
 */
const formCancelarTurno = async (req, res) => {
    try {
        const id = req.body.id;
        if (!id) {
            // Mostrar solo el formulario para ingresar el ID
            return res.render('cancel', { message: null });
        }
        // Intentar cancelar el turno
        const turno = await turnoModel.updateTurno(id, { estado: 'cancelado' });
        if (!turno) {
            return res.render('cancel', { message: 'No se encontró un turno con ese ID.' });
        }
        return res.render('cancel', { message: 'El turno fue cancelado exitosamente.' });
    } catch (error) {
        res.render('cancel', { message: 'Ocurrió un error al cancelar el turno.' });
    }
};

/**
 * Procesa la cancelación de un turno.
 * @function
 * @param {Request} req
 * @param {Response} res
 */
const cancelarTurno = async (req, res) => {
    try {
        const { turnoId } = req.body;
        await turnoModel.updateTurno(turnoId, { estado: 'cancelado' });
        res.redirect('/listar');
    } catch (error) {
        res.status(500).send('Error al cancelar turno');
    }
};

module.exports = {
    mostrarHome,
    mostrarTurnos,
    formCrearTurno,
    crearTurno,
    formCancelarTurno,
    cancelarTurno
};
