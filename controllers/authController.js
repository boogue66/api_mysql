const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Función para crear JWT
const createToken = (user) => {
  return jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Función de manejo de errores
const handleError = (res, error) => {
  return res.status(500).json({ error: error.message });
};

// Registro de Usuario
exports.register = async (req, res) => {
  const { username, email, password, first_name, last_name, role } = req.body;
  try {
    const existingUser = await User.findByEmail(email);
    if (existingUser) return res.status(400).json({ message: 'Usuario ya existe' });

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create(username, email, hashedPassword, first_name, last_name, role);

    res.status(201).json({ message: 'Usuario registrado con éxito' });
  } catch (error) {
    handleError(res, error);
  }
};

// Login de Usuario
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findByEmail(email);
    if (!user) return res.status(401).json({ message: 'Credenciales incorrectas' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: 'Credenciales incorrectas' });

    const token = createToken(user);
    res.json({
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        role: user.role
      },
      token
    });
  } catch (error) {
    handleError(res, error);
  }
};

// Obtener información del usuario logueado
exports.userInfo = async (req, res) => {
  const { userId } = req; // Obtiene el ID del usuario del middleware

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json({
      id: user.id,
      username: user.username,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      role: user.role
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizar Usuario
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, email, password, first_name, last_name, role } = req.body;

  try {
    // Si se proporciona una nueva contraseña, hashearla
    const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;
    // Actualizar el usuario con los nuevos datos
    await User.update(id, username, email, hashedPassword, first_name, last_name, role);
    res.json({ message: 'Usuario actualizado con éxito' });
  } catch (error) {
    handleError(res, error);
  }
};

// Eliminar Usuario
exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await User.delete(id);
    res.json({ message: 'Usuario eliminado con éxito' });
  } catch (error) {
    handleError(res, error);
  }
};
