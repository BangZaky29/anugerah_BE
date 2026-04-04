const express = require('express');
const router = express.Router();
const { uploadSingle, uploadMultiple } = require('../middlewares/upload');
const {
  getAllPhotos,
  getPhotoById,
  uploadPhoto,
  uploadMultiplePhotos,
  deletePhoto,
  updatePhoto,
} = require('../controllers/photoController');

// GET    /api/photos                     → semua foto (optional: ?category_id=1 atau ?brand_id=2)
// GET    /api/photos/:id                 → detail foto
// POST   /api/photos/upload              → upload 1 foto
// POST   /api/photos/upload-multiple     → upload banyak foto (maks 10)
// PUT    /api/photos/:id                 → update metadata foto
// DELETE /api/photos/:id                 → hapus foto (file + DB)

router.get('/', getAllPhotos);
router.get('/:id', getPhotoById);
router.post('/upload', uploadSingle, uploadPhoto);
router.post('/upload-multiple', uploadMultiple, uploadMultiplePhotos);
router.put('/:id', updatePhoto);
router.delete('/:id', deletePhoto);

module.exports = router;
