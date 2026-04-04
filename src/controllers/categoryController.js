const db = require('../config/db');

// ─── GET ALL CATEGORIES ─────────────────────────────────────────────────────
const getAllCategories = async (req, res) => {
  try {
    const [categories] = await db.query(
      'SELECT * FROM categories ORDER BY id ASC'
    );

    // Attach brands + products per category
    for (const cat of categories) {
      const [brands] = await db.query(
        'SELECT * FROM brands WHERE category_id = ? ORDER BY id ASC',
        [cat.id]
      );

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

      cat.brands = brands;
    }

    res.json({ success: true, data: categories });
  } catch (err) {
    console.error('getAllCategories error:', err);
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
};

// ─── GET SINGLE CATEGORY ─────────────────────────────────────────────────────
const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const [[category]] = await db.query('SELECT * FROM categories WHERE id = ?', [id]);

    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }

    const [brands] = await db.query(
      'SELECT * FROM brands WHERE category_id = ? ORDER BY id ASC',
      [id]
    );

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

    category.brands = brands;
    res.json({ success: true, data: category });
  } catch (err) {
    console.error('getCategoryById error:', err);
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
};

// ─── CREATE CATEGORY ─────────────────────────────────────────────────────────
const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name) {
      return res.status(400).json({ success: false, message: 'Name is required' });
    }

    const [result] = await db.query(
      'INSERT INTO categories (name, description) VALUES (?, ?)',
      [name, description || null]
    );

    const [[newCategory]] = await db.query('SELECT * FROM categories WHERE id = ?', [result.insertId]);
    res.status(201).json({ success: true, message: 'Category created', data: newCategory });
  } catch (err) {
    console.error('createCategory error:', err);
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
};

// ─── UPDATE CATEGORY ─────────────────────────────────────────────────────────
const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    await db.query(
      'UPDATE categories SET name = COALESCE(?, name), description = COALESCE(?, description) WHERE id = ?',
      [name || null, description || null, id]
    );

    const [[updated]] = await db.query('SELECT * FROM categories WHERE id = ?', [id]);
    res.json({ success: true, message: 'Category updated', data: updated });
  } catch (err) {
    console.error('updateCategory error:', err);
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
};

// ─── DELETE CATEGORY ─────────────────────────────────────────────────────────
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    await db.query('DELETE FROM categories WHERE id = ?', [id]);
    res.json({ success: true, message: 'Category deleted' });
  } catch (err) {
    console.error('deleteCategory error:', err);
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
