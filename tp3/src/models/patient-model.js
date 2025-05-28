const {Paciente} = require('../entities/database/patient.entity.js');

  const getPacientesModel =  ()=>{
    const users = Paciente.findAll();
    return users;
  }
//TODO: agregar operaciones CRUD

  module.exports = {
    getPacientesModel
  }
