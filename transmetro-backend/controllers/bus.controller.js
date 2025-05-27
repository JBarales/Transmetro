const db = require('../models');
const Bus = db.Bus;
const Linea = db.Linea;
const Parqueo = db.Parqueo;
const Empleado = db.Empleado;

exports.create = async (req, res) => {
  try {
    const nuevo = await Bus.create(req.body);
    res.status(201).json(nuevo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.findAll = async (req, res) => {
  try {
    const buses = await Bus.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      include: [
        { model: Linea, as: 'Linea' },
        { model: Parqueo, as: 'Parqueo' },
        { model: Empleado, as: 'Conductor' } // ✅ alias correcto
      ]
    });
    res.json(buses);
  } catch (err) {
    console.error('❌ Error en findAll de buses:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.findOne = async (req, res) => {
  try {
    const bus = await Bus.findByPk(req.params.id, {
      include: [
        { model: Linea, as: 'Linea' },
        { model: Parqueo, as: 'Parqueo' },
        { model: Empleado, as: 'Conductor' } // ✅ alias correcto
      ]
    });
    if (!bus) return res.status(404).json({ error: 'Bus no encontrado' });
    res.json(bus);
  } catch (err) {
    console.error('❌ Error en findOne de bus:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const bus = await Bus.findByPk(req.params.id);
    if (!bus) return res.status(404).json({ error: 'Bus no encontrado' });
    await bus.update(req.body);
    res.json(bus);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const bus = await Bus.findByPk(req.params.id);
    if (!bus) return res.status(404).json({ error: 'Bus no encontrado' });
    await bus.destroy();
    res.json({ mensaje: 'Bus eliminado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.findAllParaReporte = async (req, res) => {
  try {
    const buses = await db.Bus.findAll({
      attributes: { exclude: ['LineaId', 'ParqueoId', 'EmpleadoId', 'createdAt', 'updatedAt'] },
      include: [
        {
          model: db.Linea,
          as: 'Linea',
          attributes: ['nombre']
        },
        {
          model: db.Parqueo,
          as: 'Parqueo',
          attributes: ['nombre']
        },
        {
          model: db.Empleado,
          as: 'Conductor',
          attributes: ['nombre', 'apellido']
        }
      ]
    });
    res.json(buses);
  } catch (err) {
    console.error('❌ Error en findAllParaReporte de buses:', err);
    res.status(500).json({ error: err.message });
  }
};

