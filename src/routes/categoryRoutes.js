const express = require('express');
const router = express.Router();
const {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} = require('../controllers/categoryController');

// GET    /api/categories        → semua kategori (+ brands + products + photos)
// GET    /api/categories/:id    → detail satu kategori
// POST   /api/categories        → buat kategori baru
// PUT    /api/categories/:id    → update kategori
// DELETE /api/categories/:id    → hapus kategori

router.get('/', getAllCategories);
router.get('/:id', getCategoryById);
router.post('/', createCategory);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);

module.exports = router;
