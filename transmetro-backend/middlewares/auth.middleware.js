const jwt = require('jsonwebtoken');

// 🛡️ Middleware para verificar el token
exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  const token = authHeader.split(' ')[1]; // "Bearer TOKEN"
  if (!token) {
    return res.status(401).json({ error: 'Token malformado' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'clave-temporal');
    req.user = decoded; // ✅ Guarda el payload: { id, rol }
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido' });
  }
};

// ✅ Middleware para requerir un rol específico
exports.requireRole = (rolEsperado) => {
  return (req, res, next) => {
    if (!req.user || req.user.rol !== rolEsperado) {
      return res.status(403).json({ error: 'Acceso denegado: rol incorrecto' });
    }
    next();
  };
};
