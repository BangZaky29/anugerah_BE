const db = require('../config/db');

// ─── GET ALL BRANDS ───────────────────────────────────────────────────────────
const getAllBrands = async (req, res) => {
  try {
    const { category_id } = req.query;

    let query = `
      SELECT b.*, c.name AS category_name
      FROM brands b
      JOIN categories c ON b.category_id = c.id
    `;
    const params = [];

    if (category_id) {
      query += ' WHERE b.category_id = ?';
      params.push(category_id);
    }

    query += ' ORDER BY b.id ASC';

    const [brands] = await db.query(query, params);

    // Attach products & photos per brand
    for (const brand of brands) {
      const [products] = await db.query(
        'SELECT * FROM products WHERE brand_id = ? ORDER BY id ASC',
        [brand.id]
      );
      const [photos] = await db.query(
        'SELECT * FROM photos WHERE brand_id = ? ORDER BY id ASC',
        [brand.id]
      );
      brand.products = products;
      brand.photos = photos;
    }

    res.json({ success: true, data: brands });
  } catch (err) {
    console.error('getAllBrands error:', err);
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
};

// ─── GET SINGLE BRAND ─────────────────────────────────────────────────────────
const getBrandById = async (req, res) => {
  try {
    const { id } = req.params;
    const [[brand]] = await db.query(
      `SELECT b.*, c.name AS category_name
       FROM brands b
       JOIN categories c ON b.category_id = c.id
       WHERE b.id = ?`,
      [id]
    );

    if (!brand) {
      return res.status(404).json({ success: false, message: 'Brand not found' });
    }

    const [products] = await db.query(
      'SELECT * FROM products WHERE brand_id = ? ORDER BY id ASC',
      [id]
    );
    const [photos] = await db.query(
      'SELECT * FROM photos WHERE brand_id = ? ORDER BY id ASC',
      [id]
    );

    brand.products = products;
    brand.photos = photos;

    res.json({ success: true, data: brand });
  } catch (err) {
    console.error('getBrandById error:', err);
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
};

// ─── CREATE BRAND ─────────────────────────────────────────────────────────────
const createBrand = async (req, res) => {
  try {
    const { category_id, name, description } = req.body;

    if (!category_id || !name) {
      return res.status(400).json({ success: false, message: 'category_id and name are required' });
    }

    const [result] = await db.query(
      'INSERT INTO brands (category_id, name, description) VALUES (?, ?, ?)',
      [category_id, name, description || null]
    );

    const [[newBrand]] = await db.query('SELECT * FROM brands WHERE id = ?', [result.insertId]);
    res.status(201).json({ success: true, message: 'Brand created', data: newBrand });
  } catch (err) {
    console.error('createBrand error:', err);
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
};

// ─── UPDATE BRAND ─────────────────────────────────────────────────────────────
const updateBrand = async (req, res) => {
  try {
    const { id } = req.params;
    const { category_id, name, description } = req.body;

    await db.query(
      `UPDATE brands SET
        category_id = COALESCE(?, category_id),
        name = COALESCE(?, name),
        description = COALESCE(?, description)
       WHERE id = ?`,
      [category_id || null, name || null, description || null, id]
    );

    const [[updated]] = await db.query('SELECT * FROM brands WHERE id = ?', [id]);
    res.json({ success: true, message: 'Brand updated', data: updated });
  } catch (err) {
    console.error('updateBrand error:', err);
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
};

// ─── DELETE BRAND ─────────────────────────────────────────────────────────────
const deleteBrand = async (req, res) => {
  try {
    const { id } = req.params;
    await db.query('DELETE FROM brands WHERE id = ?', [id]);
    res.json({ success: true, message: 'Brand deleted' });
  } catch (err) {
    console.error('deleteBrand error:', err);
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
};

module.exports = {
  getAllBrands,
  getBrandById,
  createBrand,
  updateBrand,
  deleteBrand,
};
