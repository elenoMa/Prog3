const { Turno } = require('../models/sqlite/entities/turnos.entity');

(async () => {
  await Turno.bulkCreate([
    { idPaciente: 1, fechaHora: new Date('2025-06-15T09:00:00'), estadoId: 1, motivo: 'Consulta general' },
    { idPaciente: 2, fechaHora: new Date('2025-06-15T11:00:00'), estadoId: 2, motivo: 'Chequeo anual' },
    { idPaciente: 3, fechaHora: new Date('2025-06-16T10:00:00'), estadoId: 1, motivo: 'Dolor de cabeza' },
    { idPaciente: 1, fechaHora: new Date('2025-06-16T12:00:00'), estadoId: 3, motivo: 'Vacunación' },
    { idPaciente: 2, fechaHora: new Date('2025-06-17T09:30:00'), estadoId: 1, motivo: 'Consulta pediátrica' },
    { idPaciente: 3, fechaHora: new Date('2025-06-17T11:30:00'), estadoId: 2, motivo: 'Control de presión' },
    { idPaciente: 1, fechaHora: new Date('2025-06-18T08:00:00'), estadoId: 1, motivo: 'Consulta por fiebre' }
  ]);
  console.log('Turnos de ejemplo cargados');
  process.exit(0);
})(); 