const express = require('express');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const seedRoutes = require('./routes/seedRoutes'); // Importar la ruta de semillas
require('dotenv').config();

const app = express();
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api', seedRoutes); // Usar la ruta de semillas

// Instrucciones de la API
app.get('/api', (req, res) => {
  res.json({
    message: 'Bienvenido a la API de productos y usuarios.',
    instrucciones: {
     /*  seed: {
        descripcion: 'Rellena la base de datos con datos de prueba (usuarios y productos).',
        metodo: 'POST',
        ruta: '/api/populate',
      }, */
      auth: {
        registro: {
          metodo: 'POST',
          ruta: '/api/auth/register',
          descripcion: 'Registra un nuevo usuario.',
        },
        login: {
          metodo: 'POST',
          ruta: '/api/auth/login',
          descripcion: 'Inicia sesión y recibe un token JWT.',
        },
        user_info: {
          metodo: 'POST',
          ruta: '/api/auth/user-info',
          descripcion: 'Muestra informacion usuario logueado con un token JWT.',
        }
      },
      productos: {
        crear: {
          metodo: 'POST',
          ruta: '/api/products/new',
          descripcion: 'Crea un nuevo producto. Requiere un token JWT.',
        },
        listar: {
          metodo: 'GET',
          ruta: '/api/products',
          descripcion: 'Obtiene la lista de productos. Requiere un token JWT.',
        },
        obtenerPorId: {
          metodo: 'GET',
          ruta: '/api/products/:id',
          descripcion: 'Obtiene un producto por su ID. Requiere un token JWT.',
        },
        obtenerPorNombre: {
          metodo: 'GET',
          ruta: '/api/products/:name',
          descripcion: 'Obtiene un producto por su nombre. Requiere un token JWT.',
        },
        actualizar: {
          metodo: 'PUT',
          ruta: '/api/products/:id',
          descripcion: 'Actualiza un producto por su ID. Requiere un token JWT.',
        },
        eliminar: {
          metodo: 'DELETE',
          ruta: '/api/products/:id',
          descripcion: 'Elimina un producto por su ID. Requiere un token JWT.',
        },
      },
      usuarios: {
        actualizar: {
          metodo: 'PUT',
          ruta: '/api/auth/users/:id',
          descripcion: 'Actualiza un usuario por su ID. Requiere un token JWT.',
        },
        eliminar: {
          metodo: 'DELETE',
          ruta: '/api/auth/users/:id',
          descripcion: 'Elimina un usuario por su ID. Requiere un token JWT.',
        },
      },
    },
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
