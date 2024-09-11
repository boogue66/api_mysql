const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User.js');

/// Registro de Usuario
exports.register = async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
      const existingUser = await User.findByEmail(email);
      if (existingUser) return res.status(400).json({ message: 'Usuario ya existe' });
  
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log('Hash generado:', hashedPassword); // Agrega esta línea para depurar
  
      await User.create(name, email, hashedPassword, role);
      res.status(201).json({ message: 'Usuario registrado con éxito' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  

// Login de Usuario
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
      const user = await User.findByEmail(email);
      if (!user) return res.status(401).json({ message: 'Credenciales incorrectas' });
  
      console.log('Usuario encontrado:', user);
  
      const match = await bcrypt.compare(password, user.password);
      //console.log('Comparación de contraseñas:', match); // Agrega esta línea para depurar
  
      if (!match) return res.status(401).json({ message: 'Credenciales incorrectas' });
  
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ 
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role
        },token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  

// Actualizar Usuario
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, password, role } = req.body;
  try {
    const hashedPassword = password ? await bcrypt.hash(password, 10) : null;
    await User.update(id, name, email, hashedPassword, role);
    res.json({ message: 'Usuario actualizado con éxito' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar Usuario
exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await User.delete(id);
    res.json({ message: 'Usuario eliminado con éxito' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
