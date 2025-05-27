const express = require('express');
const router = express.Router();
const { miBus } = require('../controllers/conductor.controller');
const { verifyToken, requireRole } = require('../middlewares/auth.middleware');

router.get('/mi-bus', verifyToken, requireRole('conductor'), miBus);

module.exports = router;
