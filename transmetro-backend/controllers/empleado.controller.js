const bcrypt = require('bcrypt');
const db = require('../models');
const Empleado = db.Empleado;
const Rol = db.Rol;

// Crear empleado
exports.create = async (req, res) => {
  try {
    const { password, ...resto } = req.body;

    // Encriptar la contraseña antes de guardar
    const hashedPassword = await bcrypt.hash(password, 10);

    const nuevoEmpleado = await Empleado.create({
      ...resto,
      password: hashedPassword
    });

    res.json(nuevoEmpleado);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener todos
exports.findAll = async (req, res) => {
  try {
    const empleados = await Empleado.findAll({
      include: {
        model: Rol,
        as: 'Rol',
        attributes: ['nombre'] // solo trae el nombre del rol
      }
    });
    res.json(empleados);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener uno
exports.findOne = async (req, res) => {
  const empleado = await Empleado.findByPk(req.params.id);
  res.json(empleado);
};

// Actualizar
exports.update = async (req, res) => {
  try {
    const empleado = await Empleado.findByPk(req.params.id);
    if (!empleado) {
      return res.status(404).json({ error: 'Empleado no encontrado' });
    }

    // 🔐 Solo actualiza la contraseña si viene en el body
    if (req.body.password && req.body.password.trim() !== '') {
      const hashed = await bcrypt.hash(req.body.password, 10);
      req.body.password = hashed;
    } else {
      delete req.body.password; // evita sobreescribir si está vacía
    }

    await empleado.update(req.body);
    res.json({ message: 'Empleado actualizado correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Eliminar
exports.delete = async (req, res) => {
  await Empleado.destroy({ where: { id: req.params.id } });
  res.json({ message: "Empleado eliminado" });
};

// Reporte exclusivo para admin
exports.findAllParaReporte = async (req, res) => {
  try {
    const empleados = await db.Empleado.findAll({
      attributes: { exclude: ['password', 'rol_id'] }, // ocultar campos
      include: [{
        model: db.Rol,
        as: 'Rol',
        attributes: ['nombre']
      }]
    });
    res.json(empleados);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};