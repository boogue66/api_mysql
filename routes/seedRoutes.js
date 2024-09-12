// routes/seedRoutes.js
const express = require('express');
const router = express.Router();
const seedController = require('../controllers/seedController');

// Ruta para poblar la base de datos
router.get('/populate', seedController.seedDatabase);

module.exports = router;
