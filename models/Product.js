const db = require('../config/db');

class Product {
  static async findAll() {
    const [rows] = await db.query('SELECT * FROM products');
    return rows;
  }

  static async findById(id) {
    const [rows] = await db.query('SELECT * FROM products WHERE id = ?', [id]);
    return rows[0];
  }

  static async create(name, price) {
    await db.query('INSERT INTO products (name, price) VALUES (?, ?)', [name, price]);
  }

  static async update(id, name, price) {
    await db.query('UPDATE products SET name = ?, price = ? WHERE id = ?', [name, price, id]);
  }

  static async delete(id) {
    await db.query('DELETE FROM products WHERE id = ?', [id]);
  }
}

module.exports = Product;
