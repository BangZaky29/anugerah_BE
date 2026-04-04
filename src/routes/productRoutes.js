const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');

// GET    /api/products              → semua produk (optional: ?brand_id=1)
// GET    /api/products/:id          → detail produk
// POST   /api/products              → buat produk baru
// PUT    /api/products/:id          → update produk
// DELETE /api/products/:id          → hapus produk

router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;
