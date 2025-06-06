// controllers/API/pacientes.controller.js

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const {
  getPacienteByEmail,
  createPaciente,
  listPacientes,
  deletePaciente,
  updatePaciente,
  listPacienteById
} = require("../../models/sqlite/paciente.model");

const Config = require("../../config/config.js");

class PacientesController {
  async login(req, res) {
    try {
      const { email, password } = req.body;

      const paciente = await getPacienteByEmail(email);
      if (!paciente) {
        return res.status(401).json({ message: "Paciente no encontrado" });
      }

      const isPasswordValid = await bcrypt.compare(password, paciente.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Contraseña incorrecta" });
      }

      const token = jwt.sign(
        { id: paciente.id, email: paciente.email },
        Config.secreteWord,
        { expiresIn: Config.expiresIn }
      );

      res.status(200).json({
        token
      });

    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  }

  async list(req, res) {
    try {
      const pacientes = await listPacientes();
      res.status(200).json(pacientes);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async findById(req, res) {
    try {
      const id = req.params.id;
      const paciente = await listPacienteById(id);
      if (!paciente) {
        return res.status(404).json({ message: `No existe el paciente con id: ${id}` });
      }
      res.status(200).json(paciente);

    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async create(req, res) {
    try {
      const { dni, nombre, apellido, email, password } = req.body;

      if (!dni || !nombre || !apellido || !email || !password) {
        return res.status(400).json({ message: "Todos los campos son obligatorios" });
      }

      const existente = await getPacienteByEmail(email);
      if (existente) {
        return res.status(409).json({ message: "El correo ya está registrado" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const nuevoPaciente = await createPaciente({
        dni,
        nombre,
        apellido,
        email,
        password: hashedPassword
      });

      res.status(200).json(nuevoPaciente);

    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async delete(req, res) {
    try {
      const id = req.params.id;
      const eliminado = await deletePaciente(id);

      if (eliminado === 0) {
        return res.status(404).json({ message: `No existe el paciente con id: ${id}` });
      }

      res.status(200).json({ message: "Paciente eliminado correctamente" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async update(req, res) {
    try {
      const id = req.params.id;
      const { dni, nombre, apellido, email, password } = req.body;

      const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;

      const actualizado = await updatePaciente(id, {
        dni,
        nombre,
        apellido,
        email,
        password: hashedPassword
      });

      if (!actualizado) {
        return res.status(404).json({ message: `No existe el paciente con id: ${id}` });
      }

      res.status(200).json({ message: "Paciente actualizado correctamente" });

    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

module.exports = new PacientesController();
