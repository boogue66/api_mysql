const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController.js');
const verifyToken = require('../middleware/jwt.js'); // Importa el middleware de autenticación

// Protege las rutas con verifyToken, solo usuarios autenticados pueden acceder

router.post('/new', verifyToken, productController.createProduct);

router.get('/', verifyToken, productController.getAllProducts);

router.get('/:id', verifyToken, productController.getProductById);
router.get('/:name', verifyToken, productController.getProductByName);

router.put('/:id', verifyToken, productController.updateProduct);

router.delete('/:id', verifyToken, productController.deleteProduct);

module.exports = router;
