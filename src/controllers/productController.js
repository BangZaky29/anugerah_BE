const db = require('../config/db');

// ─── GET PRODUCTS ─────────────────────────────────────────────────────────────
const getProducts = async (req, res) => {
  try {
    const { brand_id } = req.query;

    let query = `
      SELECT p.*, b.name AS brand_name, c.name AS category_name
      FROM products p
      JOIN brands b ON p.brand_id = b.id
      JOIN categories c ON b.category_id = c.id
    `;
    const params = [];

    if (brand_id) {
      query += ' WHERE p.brand_id = ?';
      params.push(brand_id);
    }

    query += ' ORDER BY p.id ASC';

    const [products] = await db.query(query, params);
    res.json({ success: true, data: products });
  } catch (err) {
    console.error('getProducts error:', err);
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
};

// ─── GET SINGLE PRODUCT ───────────────────────────────────────────────────────
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const [[product]] = await db.query(
      `SELECT p.*, b.name AS brand_name, c.name AS category_name
       FROM products p
       JOIN brands b ON p.brand_id = b.id
       JOIN categories c ON b.category_id = c.id
       WHERE p.id = ?`,
      [id]
    );

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.json({ success: true, data: product });
  } catch (err) {
    console.error('getProductById error:', err);
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
};

// ─── CREATE PRODUCT ───────────────────────────────────────────────────────────
const createProduct = async (req, res) => {
  try {
    const { brand_id, name } = req.body;

    if (!brand_id || !name) {
      return res.status(400).json({ success: false, message: 'brand_id and name are required' });
    }

    // Verify brand exists
    const [[brand]] = await db.query('SELECT id FROM brands WHERE id = ?', [brand_id]);
    if (!brand) {
      return res.status(404).json({ success: false, message: 'Brand not found' });
    }

    const [result] = await db.query(
      'INSERT INTO products (brand_id, name) VALUES (?, ?)',
      [brand_id, name]
    );

    const [[newProduct]] = await db.query(
      `SELECT p.*, b.name AS brand_name
       FROM products p
       JOIN brands b ON p.brand_id = b.id
       WHERE p.id = ?`,
      [result.insertId]
    );

    res.status(201).json({ success: true, message: 'Product created', data: newProduct });
  } catch (err) {
    console.error('createProduct error:', err);
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
};

// ─── UPDATE PRODUCT ───────────────────────────────────────────────────────────
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, brand_id } = req.body;

    await db.query(
      `UPDATE products SET
        name = COALESCE(?, name),
        brand_id = COALESCE(?, brand_id)
       WHERE id = ?`,
      [name || null, brand_id || null, id]
    );

    const [[updated]] = await db.query('SELECT * FROM products WHERE id = ?', [id]);
    res.json({ success: true, message: 'Product updated', data: updated });
  } catch (err) {
    console.error('updateProduct error:', err);
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
};

// ─── DELETE PRODUCT ───────────────────────────────────────────────────────────
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await db.query('DELETE FROM products WHERE id = ?', [id]);
    res.json({ success: true, message: 'Product deleted' });
  } catch (err) {
    console.error('deleteProduct error:', err);
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
