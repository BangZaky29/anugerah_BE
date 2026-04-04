const express = require('express');
const router = express.Router();
const {
  getAllBrands,
  getBrandById,
  createBrand,
  updateBrand,
  deleteBrand,
} = require('../controllers/brandController');

// GET    /api/brands              → semua brand (optional: ?category_id=1)
// GET    /api/brands/:id          → detail brand (+ products + photos)
// POST   /api/brands              → buat brand baru
// PUT    /api/brands/:id          → update brand
// DELETE /api/brands/:id          → hapus brand

router.get('/', getAllBrands);
router.get('/:id', getBrandById);
router.post('/', createBrand);
router.put('/:id', updateBrand);
router.delete('/:id', deleteBrand);

module.exports = router;
