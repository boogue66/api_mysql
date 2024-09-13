const db = require('../config/db'); // Ajusta la ruta según sea necesario

class User {
  
  static async count() {
    try {
      const [rows] = await db.query('SELECT COUNT(*) AS count FROM users');
      return rows[0].count;
    } catch (error) {
      console.error('Error al contar usuarios:', error);
      throw new Error('Error al contar usuarios');
    }
  }

  static async createTable() {
    const query = `
     CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL,
      role VARCHAR(50) NOT NULL,
      first_name VARCHAR(255),
      last_name VARCHAR(255),
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
    `;
    await db.query(query);
  }
  // Encontrar un usuario por email
  static async findById (id) {
    try {
      const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [email]);
      return rows[0];
    } catch (error) {
      console.error('Error al buscar usuario por email:', error);
      throw new Error('Error al buscar usuario');
    }
  }
  static async findByEmail(email) {
    try {
      const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
      return rows[0];
    } catch (error) {
      console.error('Error al buscar usuario por email:', error);
      throw new Error('Error al buscar usuario');
    }
  }

 // Crear un nuevo usuario
static async create(username, email, password, first_name, last_name, role) {
  try {
    await db.query(
      'INSERT INTO users (username, email, password, role, first_name, last_name) VALUES (?, ?, ?, ?, ?, ?)', 
      [username, email, password, role, first_name, last_name]
    );
  } catch (error) {
    console.error('Error al crear usuario:', error);
    throw new Error('Error al crear usuario');
  }
}


  // Actualizar usuario
  static async update(id, username, email, password, role, first_name, last_name) {
    try {
      let query = 'UPDATE users SET username = ?, email = ?, role = ?, first_name = ?, last_name = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?';
      const values = [username, email, role, first_name, last_name, id];
      
      // Si la contraseña es proporcionada, se actualiza también
      if (password_hash) {
        query = 'UPDATE users SET username = ?, email = ?, password = ?, role = ?, first_name = ?, last_name = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?';
        values.splice(2, 0, password); // Insertar password_hash en el lugar correcto
      }

      await db.query(query, values);
    } catch (error) {
      console.error('Error al actualizar usuario:', error);
      throw new Error('Error al actualizar usuario');
    }
  }

  // Eliminar un usuario
  static async delete(id) {
    try {
      await db.query('DELETE FROM users WHERE id = ?', [id]);
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
      throw new Error('Error al eliminar usuario');
    }
  }
}

module.exports = User;
