const express = require('express');
const router = express.Router();
const controller = require('../controllers/bus.controller');
const { verifyToken, requireRole } = require('../middlewares/auth.middleware');

router.get('/', verifyToken, requireRole('admin'), controller.findAll);
router.get('/reporte', verifyToken, requireRole('admin'), controller.findAllParaReporte);
router.get('/:id', verifyToken, requireRole('admin'), controller.findOne);
router.post('/', verifyToken, requireRole('admin'), controller.create);
router.put('/:id', verifyToken, requireRole('admin'), controller.update);
router.delete('/:id', verifyToken, requireRole('admin'), controller.delete);

module.exports = router;
