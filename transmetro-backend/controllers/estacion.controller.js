const db = require('../models');
const Estacion = db.Estacion;
const Municipalidad = db.Municipalidad;
const Empleado = db.Empleado; // ✅ Importar empleado

// Crear estación
exports.create = async (req, res) => {
  try {
    const estacion = await Estacion.create(req.body);
    res.json(estacion);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener todas las estaciones
exports.findAll = async (req, res) => {
  try {
    const estaciones = await Estacion.findAll({
      include: [
        { model: Municipalidad, as: 'Municipalidad' }, // ✅ alias corregido
        { model: Empleado, as: 'Empleado' }
      ]
    });
    res.json(estaciones);
  } catch (err) {
    console.error('❌ Error en findAll de estaciones:', err);
    res.status(500).json({ error: err.message });
  }
};

// Obtener una estación por ID
exports.findOne = async (req, res) => {
  try {
    const estacion = await Estacion.findByPk(req.params.id, {
      include: [
        { model: Municipalidad, as: 'Municipalidad' }, // ✅ alias corregido
        { model: Empleado, as: 'Empleado' }
      ]
    });
    if (estacion) {
      res.json(estacion);
    } else {
      res.status(404).json({ error: 'Estación no encontrada' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Actualizar estación
exports.update = async (req, res) => {
  try {
    await Estacion.update(req.body, { where: { id: req.params.id } });
    res.json({ message: "Estación actualizada" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Eliminar estación
exports.delete = async (req, res) => {
  try {
    await Estacion.destroy({ where: { id: req.params.id } });
    res.json({ message: "Estación eliminada" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.findAllParaReporte = async (req, res) => {
  console.log('➡️ Entrando a findAllParaReporte de estaciones');
  try {
    const estaciones = await db.Estacion.findAll({
      attributes: { exclude: ['EmpleadoId', 'MunicipalidadId', 'createdAt', 'updatedAt'] },
      include: [
        {
          model: db.Municipalidad,
          as: 'Municipalidad',
          attributes: ['nombre']
        },
        {
          model: db.Empleado,
          as: 'Empleado', // ✅ usa el alias que definiste en estacion.model.js
          attributes: ['nombre', 'apellido']
        }
      ]
    });
    res.json(estaciones);
  } catch (err) {
    console.error('❌ Error en findAllParaReporte de estaciones:', err);
    res.status(500).json({ error: err.message });
  }
};
