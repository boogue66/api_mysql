
const express = require('express');
const router = express.Router();
const userController = require('../controllers/authController.js');
router.post('/register', userController.register); // Registro de nuevo usuario
router.post('/login', userController.login);       // Login de usuario

// Rutas protegidas para CRUD de usuarios
router.put('/users/:id', userController.updateUser);   // Actualizar usuario
router.delete('/users/:id', userController.deleteUser); // Eliminar usuario

module.exports = router;
