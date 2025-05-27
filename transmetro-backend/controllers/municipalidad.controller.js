const db = require('../models');
const Municipalidad = db.Municipalidad;

// Crear municipalidad
exports.create = async (req, res) => {
  try {
    const nueva = await Municipalidad.create(req.body);
    res.json(nueva);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Listar todas
exports.findAll = async (req, res) => {
  const lista = await Municipalidad.findAll();
  res.json(lista);
};

// Obtener una
exports.findOne = async (req, res) => {
  const item = await Municipalidad.findByPk(req.params.id);
  res.json(item);
};

// Actualizar
exports.update = async (req, res) => {
  await Municipalidad.update(req.body, { where: { id: req.params.id } });
  res.json({ message: "Municipalidad actualizada" });
};

// Eliminar
exports.delete = async (req, res) => {
  await Municipalidad.destroy({ where: { id: req.params.id } });
  res.json({ message: "Municipalidad eliminada" });
};
