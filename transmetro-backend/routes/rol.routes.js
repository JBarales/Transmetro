const express = require('express');
const router = express.Router();
const controller = require('../controllers/rol.controller');
const { verifyToken } = require('../middlewares/auth.middleware');

router.get('/', verifyToken, controller.findAll);

module.exports = router;