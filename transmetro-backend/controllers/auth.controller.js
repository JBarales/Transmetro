const db = require('../models');
const Empleado = db.Empleado;
const Rol = db.Rol;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// ✅ Función para normalizar el nombre del rol
const normalizarRol = (rolNombre) => {
  switch (rolNombre.toLowerCase()) {
    case 'administrador':
      return 'admin';
    case 'conductor':
      return 'conductor';
    case 'policía':
    case 'policia':
      return 'policia';
    default:
      return 'desconocido';
  }
};

exports.login = async (req, res) => {
  const { correo, password } = req.body;
  console.log('Intento de login:', correo);

  try {
    const empleado = await Empleado.findOne({
      where: { correo: correo.trim().toLowerCase() },
      include: [{
        model: Rol,
        as: 'Rol',
        attributes: ['nombre']
      }]
    });

    if (!empleado) {
      console.log('⚠️ Usuario no encontrado en la base de datos');
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    console.log('Usuario encontrado:', empleado.correo);

    const esValido = await bcrypt.compare(password, empleado.password);
    console.log('¿Contraseña válida?', esValido);

    if (!esValido) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    // ✅ Ahora sí, empleado ya está definido
    const rolNormalizado = normalizarRol(empleado.Rol.nombre);
    console.log('Rol original:', empleado.Rol?.nombre);
    console.log('Rol normalizado:', rolNormalizado);

    const token = jwt.sign(
      { id: empleado.id, rol: rolNormalizado },
      process.env.JWT_SECRET || 'clave-temporal',
      { expiresIn: '1h' }
    );

    return res.json({
      token,
      usuario: {
        id: empleado.id,
        nombre: empleado.nombre,
        correo: empleado.correo,
        rol: rolNormalizado
      }
    });
  } catch (err) {
    console.error('❌ Error en login:', err);
    return res.status(500).json({ error: err.message });
  }
};
