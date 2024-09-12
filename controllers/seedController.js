const User = require('../models/User');
const Product = require('../models/Product');
const bcrypt = require('bcryptjs');

// Datos de prueba
const usersSeed = [
  {
    username: 'Mike',
    email: 'mikety@mail.com',
    password: '123456', 
    role: 'admin',
    first_name: 'Mike',
    last_name: 'tyson'
  },
  {
    username: 'Juampe',
    email: 'juanpe@mail.com',
    password: '123456',  
    role: 'admin',
    first_name: 'Juan',
    last_name: 'Perez'
  }
];

const productsSeed = [
  { name: 'Camisa Blanca', description: 'Camisa de algodón blanca', quantity: 10, unit: 'pieza', size: 'M', portions: 1 },
  { name: 'Zapatos Negros', description: 'Zapatos formales negros', quantity: 5, unit: 'par', size: '42', portions: 1 },
];

// Función para insertar los datos de prueba
exports.seedDatabase = async (req, res) => {
  try {
    // Crear tablas si no existen
    await User.createTable();
    await Product.createTable();

    // Verificar si las tablas ya contienen datos
    const userCount = await User.count();
    const productCount = await Product.count();

    if (userCount > 0 || productCount > 0) {
      return res.status(200).json({ message: 'Las tablas ya contienen datos. No se añadieron nuevos registros.' });
    }

    // Cifrar contraseñas y luego insertar usuarios
    for (let user of usersSeed) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      await User.create(user.username, user.email, hashedPassword, user.role, user.first_name, user.last_name);
    }

    // Insertar productos
    for (let product of productsSeed) {
      await Product.create(product.name, product.description, product.quantity, product.unit, product.size, product.portions);
    }

    res.status(200).json({ message: 'Base de datos poblada con éxito' });
  } catch (error) {
    console.error('Error al poblar la base de datos:', error);
    res.status(500).json({ error: 'Error al poblar la base de datos' });
  }
};
