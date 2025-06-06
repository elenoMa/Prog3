// turnos.entity.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db.js');

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
    estado: {
        type: DataTypes.ENUM('reservado', 'cancelado', 'finalizado'),
        allowNull: false,
        defaultValue: 'reservado',
    },
}, {
    tableName: 'Turnos',
    timestamps: true,
});

module.exports = { Turno }; // ✅ debe exportarse como objeto con llaves
