const { EstadoTurno } = require('../../entities/estadoTurno.entity.js');

const seedEstadosTurno = async () => {
    const estados = ['reservado', 'cancelado', 'finalizado'];

    for (const nombre of estados) {
        await EstadoTurno.findOrCreate({ where: { nombre } });
    }

    console.log('Estados de turno cargados.');
};

module.exports = seedEstadosTurno;
