const jwt = require('jsonwebtoken');

// Middleware para verificar si el token JWT es válido
const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(403).json({ message: 'Token no proporcionado' });
  }

  // El token viene en el formato 'Bearer <token>', así que lo separamos
  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(403).json({ message: 'Token no proporcionado correctamente' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Token inválido' });
    }

    req.userId = decoded.id; // Guarda el id del usuario decodificado en el request
    req.userRole = decoded.role; // Guarda el rol del usuario decodificado
    next(); // Llama a la siguiente función/middleware
  });
};

module.exports = verifyToken;
