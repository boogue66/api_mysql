const db = require('../config/db'); // Ajusta la ruta según sea necesario

class Product {
  static async count() {
    try {
      const [rows] = await db.query('SELECT COUNT(*) AS count FROM products');
      return rows[0].count;
    } catch (error) {
      console.error('Error al contar productos:', error);
      throw new Error('Error al contar productos');
    }
  }
  static async createTable() {
    const query = `
      CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        quantity INT,
        unit VARCHAR(50),
        size VARCHAR(50),
        portions INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `;
    await db.query(query);
  }
  // Encontrar un producto por nombre
  static async findByName(name) {
    try {
      const [rows] = await db.query('SELECT * FROM products WHERE name = ?', [name]);
      return rows[0];
    } catch (error) {
      console.error('Error al buscar producto por nombre:', error);
      throw new Error('Error al buscar producto');
    }
  }
  static async findById(id) {
    try {
      const [rows] = await db.query('SELECT * FROM products WHERE id = ?', [id]);
      return rows[0];
    } catch (error) {
      console.error('Error al buscar producto por id:', error);
      throw new Error('Error al buscar producto');
    }
  }

  // Crear un nuevo producto
  static async create(name, description, quantity, unit, size, portions) {
    try {
      await db.query(
        'INSERT INTO products (name, description, quantity, unit, size, portions) VALUES (?, ?, ?, ?, ?, ?)', 
        [name, description, quantity, unit, size, portions]
      );
    } catch (error) {
      console.error('Error al crear producto:', error);
      throw new Error('Error al crear producto');
    }
  }

  // Actualizar un producto
  static async update(id, name, description, quantity, unit, size, portions) {
    try {
      await db.query(
        'UPDATE products SET name = ?, description = ?, quantity = ?, unit = ?, size = ?, portions = ? WHERE id = ?',
        [name, description, quantity, unit, size, portions, id]
      );
    } catch (error) {
      console.error('Error al actualizar producto:', error);
      throw new Error('Error al actualizar producto');
    }
  }

  // Eliminar un producto
  static async delete(id) {
    try {
      await db.query('DELETE FROM products WHERE id = ?', [id]);
    } catch (error) {
      console.error('Error al eliminar producto:', error);
      throw new Error('Error al eliminar producto');
    }
  }

  // Obtener todos los productos
  static async getAll() {
    try {
      const [rows] = await db.query('SELECT * FROM products');
      return rows;
    } catch (error) {
      console.error('Error al obtener productos:', error);
      throw new Error('Error al obtener productos');
    }
  }
}

module.exports = Product;
