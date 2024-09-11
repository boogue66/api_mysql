const express = require('express');
const { register, login,updateUser,deleteUser } = require('../controllers/authController');
const router = express.Router();


router.post('/register', register);
router.post('/login', login);
router.put('/users/:id', updateUser); 
router.delete('/users/:id', deleteUser); 

module.exports = router;
