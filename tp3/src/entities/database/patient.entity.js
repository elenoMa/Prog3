const { DataTypes } = require('sequelize');
const {sequelize} = require('../../config/database.js');

const Paciente = sequelize.define('Paciente', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: DataTypes.STRING,
  email: DataTypes.STRING
});

module.exports = {Paciente};