const Product = require('../models/Product.js');

// Crear un nuevo producto
exports.createProduct = async (req, res) => {
    const { name, description, quantity, unit, size, portions } = req.body;
    try {
        await Product.create(name, description, quantity, unit, size, portions);
        res.status(201).json({ message: 'Producto creado con éxito' });
    } catch (error) {
        console.error('Error al crear producto:', error);
        res.status(500).json({ error: error.message });
    }
};

// Obtener todos los productos
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.getAll();
        res.status(200).json(products);
    } catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).json({ error: error.message });
    }
};

// Obtener un producto por nombre
exports.getProductByName = async (req, res) => {
    const { name } = req.params;
    try {
        const product = await Product.findByName(name);
        if (!product) return res.status(404).json({ message: 'Producto no encontrado' });
        res.status(200).json(product);
    } catch (error) {
        console.error('Error al obtener producto:', error);
        res.status(500).json({ error: error.message });
    }
};
exports.getProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findById(id);
        if (!product) return res.status(404).json({ message: 'Producto no encontrado' });
        res.status(200).json(product);
    } catch (error) {
        console.error('Error al obtener producto:', error);
        res.status(500).json({ error: error.message });
    }
};

// Actualizar un producto
exports.updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, description, quantity, unit, size, portions } = req.body;
    try {
        await Product.update(id, name, description, quantity, unit, size, portions);
        res.status(200).json({ message: 'Producto actualizado con éxito' });
    } catch (error) {
        console.error('Error al actualizar producto:', error);
        res.status(500).json({ error: error.message });
    }
};

// Eliminar un producto
exports.deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        await Product.delete(id);
        res.status(200).json({ message: 'Producto eliminado con éxito' });
    } catch (error) {
        console.error('Error al eliminar producto:', error);
        res.status(500).json({ error: error.message });
    }
};
