const db = require('../models');
const Bus = db.Bus;
const Linea = db.Linea;
const Parqueo = db.Parqueo;
const Empleado = db.Empleado;

exports.miBus = async (req, res) => {
  try {
    const bus = await Bus.findOne({
      where: { EmpleadoId: req.user.id },
      include: [
        { model: Linea, as: 'Linea' },
        { model: Parqueo, as: 'Parqueo', attributes: ['nombre', 'ubicacion'] },
        { model: Empleado, as: 'Conductor' } // 👈 asegúrate de incluir esto
      ]
    });

    if (!bus) return res.status(404).json({ mensaje: "No se ha asignado un bus" });

    res.json(bus);
  } catch (err) {
    console.error('Error en controlador miBus:', err);
    res.status(500).json({ error: err.message });
  }
};