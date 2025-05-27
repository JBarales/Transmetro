const db = require('../models');
const Parqueo = db.Parqueo;

exports.create = async (req, res) => {
  try {
    const parqueo = await Parqueo.create(req.body);
    res.json(parqueo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.findAll = async (req, res) => {
  try {
    const parqueos = await Parqueo.findAll();
    res.json(parqueos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.findOne = async (req, res) => {
  try {
    const parqueo = await Parqueo.findByPk(req.params.id);
    res.json(parqueo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    await Parqueo.update(req.body, { where: { id: req.params.id } });
    res.json({ message: 'Parqueo actualizado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    await Parqueo.destroy({ where: { id: req.params.id } });
    res.json({ message: 'Parqueo eliminado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
