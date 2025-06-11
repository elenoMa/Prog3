const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db.js');
const { EstadoTurno } = require('./estadoTurno.entity.js');
const { Paciente } = require('./paciente.entity.js');

const Turno = sequelize.define('Turno', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    idPaciente: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    fechaHora: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    estadoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: EstadoTurno,
            key: 'id',
        }
    },
    motivo: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: '',
    },
}, {
    tableName: 'Turnos',
    timestamps: true,
});

Turno.belongsTo(EstadoTurno, { foreignKey: 'estadoId', as: 'estado' });
EstadoTurno.hasMany(Turno, { foreignKey: 'estadoId' });
Turno.belongsTo(Paciente, { foreignKey: 'idPaciente', as: 'paciente' });

module.exports = { Turno };
