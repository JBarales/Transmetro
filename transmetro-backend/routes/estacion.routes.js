const express = require('express');
const router = express.Router();
const controller = require('../controllers/estacion.controller');
const { verifyToken, requireRole } = require('../middlewares/auth.middleware');

router.post('/', verifyToken, requireRole('admin'), controller.create);
router.get('/reporte', verifyToken, requireRole('admin'), controller.findAllParaReporte); // ✅ mover arriba
router.get('/', verifyToken, requireRole('admin'), controller.findAll);
router.get('/:id', verifyToken, requireRole('admin'), controller.findOne); // ✅ mantener después
router.put('/:id', verifyToken, requireRole('admin'), controller.update);
router.delete('/:id', verifyToken, requireRole('admin'), controller.delete);

module.exports = router;