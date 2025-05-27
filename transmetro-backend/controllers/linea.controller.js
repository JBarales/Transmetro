const db = require('../models');
const Linea = db.Linea;

exports.findAll = async (req, res) => {
  try {
    const lineas = await Linea.findAll();
    res.json(lineas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las líneas' });
  }
};

exports.findOne = async (req, res) => {
  try {
    const linea = await Linea.findByPk(req.params.id);
    if (!linea) return res.status(404).json({ error: 'Línea no encontrada' });
    res.json(linea);
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar la línea' });
  }
};

exports.create = async (req, res) => {
  const { nombre, distancia_total } = req.body;
  try {
    const nueva = await Linea.create({ nombre, distancia_total });
    res.status(201).json(nueva);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const linea = await Linea.findByPk(req.params.id);
    if (!linea) return res.status(404).json({ error: 'Línea no encontrada' });
    await linea.update(req.body);
    res.json(linea);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const linea = await Linea.findByPk(req.params.id);
    if (!linea) return res.status(404).json({ error: 'Línea no encontrada' });
    await linea.destroy();
    res.json({ mensaje: 'Línea eliminada' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la línea' });
  }
};
