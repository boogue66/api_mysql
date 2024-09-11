// models/User.js
const db = require('../config/db'); // Ajusta la ruta según sea necesario

class User {
  static async findByEmail(email) {
    console.log('Buscando usuario por email:', email);
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    console.log('Resultado de la búsqueda:', rows);
    return rows[0];
  }

  static async create(name, email, password, role) {
    console.log('Creando usuario:', { name, email, role });
    await db.query('INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)', [name, email, password, role]);
  }

  static async update(id, name, email, password, role) {
    let query = 'UPDATE users SET name = ?, email = ?, role = ? WHERE id = ?';
    const values = [name, email, role, id];
    
    if (password) {
      query = 'UPDATE users SET name = ?, email = ?, password = ?, role = ? WHERE id = ?';
      values.splice(2, 0, password);
    }

    console.log('Actualizando usuario con datos:', { id, name, email, password, role });
    await db.query(query, values);
  }

  static async delete(id) {
    console.log('Eliminando usuario con ID:', id);
    await db.query('DELETE FROM users WHERE id = ?', [id]);
  }
}


module.exports = User;
