const multer = require('multer');
const path = require('path');
const fs = require('fs');

// ─── ALLOWED MIME TYPES ───────────────────────────────────────────────────────
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
const MAX_SIZE_MB = 10; // 10 MB per file

// ─── STORAGE ENGINE ───────────────────────────────────────────────────────────
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Determine folder from request body or query
    const folder = req.body.folder || req.query.folder || 'machine-products';
    const validFolders = ['machine-products', 'tools-products'];
    const targetFolder = validFolders.includes(folder) ? folder : 'machine-products';

    const uploadPath = path.join(__dirname, '../../assets', targetFolder);

    // Create dir if not exists
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    // Sanitize filename
    const ext = path.extname(file.originalname).toLowerCase();
    const baseName = path.basename(file.originalname, ext)
      .toLowerCase()
      .replace(/[^a-z0-9-_]/g, '-')
      .replace(/-+/g, '-');

    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e4);
    cb(null, `${baseName}-${uniqueSuffix}${ext}`);
  },
});

// ─── FILE FILTER ──────────────────────────────────────────────────────────────
const fileFilter = (req, file, cb) => {
  if (ALLOWED_TYPES.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error(`File type not allowed. Allowed: ${ALLOWED_TYPES.join(', ')}`),
      false
    );
  }
};

// ─── UPLOAD INSTANCE ─────────────────────────────────────────────────────────
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: MAX_SIZE_MB * 1024 * 1024 },
});

// ─── WRAPPER WITH ERROR HANDLING ─────────────────────────────────────────────
const handleUpload = (uploadFn) => (req, res, next) => {
  uploadFn(req, res, (err) => {
    if (!err) return next();

    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: `File too large. Maximum size is ${MAX_SIZE_MB}MB`,
      });
    }
    return res.status(400).json({ success: false, message: err.message });
  });
};

module.exports = {
  uploadSingle:   handleUpload(upload.single('photo')),
  uploadMultiple: handleUpload(upload.array('photos', 10)),
};
