const seedEstadosTurno = require('./seedEstadosTurno');
const seedPacientes = require('./seedPacientes');

const runSeeds = async () => {
    try {
        await seedEstadosTurno();
        await seedPacientes();
        console.log('Todos los seeds se ejecutaron correctamente.');
    } catch (error) {
        console.error('Error ejecutando seeds:', error);
    }
};

module.exports = runSeeds; 