// sqlite/entities/paciente.entity.js

const { DataTypes } = require('sequelize');
const { sequelize } = require('./../config/db.js');

const Paciente = sequelize.define('Paciente', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  dni: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  nombre: DataTypes.STRING,
  apellido: DataTypes.STRING,
  email: {
    type: DataTypes.STRING,
    unique: true
  },
  password: DataTypes.STRING
}, {
  tableName: 'pacientes'
});

module.exports = { Paciente };
