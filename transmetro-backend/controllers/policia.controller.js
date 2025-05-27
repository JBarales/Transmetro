const db = require('../models');
const Estacion = db.Estacion;
const Municipalidad = db.Municipalidad;

exports.miEstacion = async (req, res) => {
  try {
    const estacion = await Estacion.findOne({
      where: { EmpleadoId: req.user.id },
      include: [
        {
          model: Municipalidad,
          as: 'Municipalidad'
        }
      ]
    });

    if (!estacion) return res.status(404).json({ mensaje: "No se ha asignado una estación" });

    res.json(estacion);
  } catch (err) {
    console.error('❌ Error en miEstacion:', err);
    res.status(500).json({ error: err.message });
  }
};
