const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db.js');

const EstadoTurno = sequelize.define('EstadoTurno', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
}, {
    tableName: 'EstadosTurno',
    timestamps: false,
});

module.exports = { EstadoTurno };
