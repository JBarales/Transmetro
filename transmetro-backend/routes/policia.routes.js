const express = require('express');
const router = express.Router();
const { miEstacion } = require('../controllers/policia.controller');
const { verifyToken, requireRole } = require('../middlewares/auth.middleware');

router.get('/mi-estacion', verifyToken, requireRole('policia'), miEstacion);

module.exports = router;
