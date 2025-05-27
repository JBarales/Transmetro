const db = require('../models');
const Rol = db.Rol;

exports.findAll = async (req, res) => {
  try {
    const roles = await Rol.findAll();
    res.json(roles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
