const path = require('path');
const fs = require('fs');
const db = require('../config/db');

const BASE_URL = process.env.BASE_URL || 'http://localhost:5000';

// ─── GET ALL PHOTOS ───────────────────────────────────────────────────────────
const getAllPhotos = async (req, res) => {
  try {
    const { category_id, brand_id } = req.query;

    let query = `
      SELECT ph.*, b.name AS brand_name, c.name AS category_name
      FROM photos ph
      LEFT JOIN brands b ON ph.brand_id = b.id
      LEFT JOIN categories c ON ph.category_id = c.id
    `;
    const params = [];
    const conditions = [];

    if (category_id) {
      conditions.push('ph.category_id = ?');
      params.push(category_id);
    }
    if (brand_id) {
      conditions.push('ph.brand_id = ?');
      params.push(brand_id);
    }

    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }

    query += ' ORDER BY ph.uploaded_at DESC';

    const [photos] = await db.query(query, params);
    res.json({ success: true, total: photos.length, data: photos });
  } catch (err) {
    console.error('getAllPhotos error:', err);
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
};

// ─── GET SINGLE PHOTO ─────────────────────────────────────────────────────────
const getPhotoById = async (req, res) => {
  try {
    const { id } = req.params;
    const [[photo]] = await db.query(
      `SELECT ph.*, b.name AS brand_name, c.name AS category_name
       FROM photos ph
       LEFT JOIN brands b ON ph.brand_id = b.id
       LEFT JOIN categories c ON ph.category_id = c.id
       WHERE ph.id = ?`,
      [id]
    );

    if (!photo) {
      return res.status(404).json({ success: false, message: 'Photo not found' });
    }

    res.json({ success: true, data: photo });
  } catch (err) {
    console.error('getPhotoById error:', err);
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
};

// ─── UPLOAD SINGLE PHOTO ──────────────────────────────────────────────────────
const uploadPhoto = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    const { brand_id, category_id } = req.body;
    const file = req.file;

    // Build relative path (use forward slashes for URLs)
    const relativePath = file.path
      .replace(/\\/g, '/')
      .split('assets/')
      .pop();

    const fullPath = `assets/${relativePath}`;
    const url = `${BASE_URL}/${fullPath}`;

    const [result] = await db.query(
      `INSERT INTO photos (brand_id, category_id, filename, filepath, url, mimetype, size)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        brand_id || null,
        category_id || null,
        file.originalname,
        fullPath,
        url,
        file.mimetype,
        file.size,
      ]
    );

    const [[newPhoto]] = await db.query('SELECT * FROM photos WHERE id = ?', [result.insertId]);

    res.status(201).json({
      success: true,
      message: 'Photo uploaded successfully',
      data: newPhoto,
    });
  } catch (err) {
    console.error('uploadPhoto error:', err);
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
};

// ─── UPLOAD MULTIPLE PHOTOS ───────────────────────────────────────────────────
const uploadMultiplePhotos = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, message: 'No files uploaded' });
    }

    const { brand_id, category_id } = req.body;
    const uploadedPhotos = [];

    for (const file of req.files) {
      const relativePath = file.path
        .replace(/\\/g, '/')
        .split('assets/')
        .pop();

      const fullPath = `assets/${relativePath}`;
      const url = `${BASE_URL}/${fullPath}`;

      const [result] = await db.query(
        `INSERT INTO photos (brand_id, category_id, filename, filepath, url, mimetype, size)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          brand_id || null,
          category_id || null,
          file.originalname,
          fullPath,
          url,
          file.mimetype,
          file.size,
        ]
      );

      const [[newPhoto]] = await db.query('SELECT * FROM photos WHERE id = ?', [result.insertId]);
      uploadedPhotos.push(newPhoto);
    }

    res.status(201).json({
      success: true,
      message: `${uploadedPhotos.length} photo(s) uploaded successfully`,
      data: uploadedPhotos,
    });
  } catch (err) {
    console.error('uploadMultiplePhotos error:', err);
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
};

// ─── DELETE PHOTO ─────────────────────────────────────────────────────────────
const deletePhoto = async (req, res) => {
  try {
    const { id } = req.params;

    const [[photo]] = await db.query('SELECT * FROM photos WHERE id = ?', [id]);
    if (!photo) {
      return res.status(404).json({ success: false, message: 'Photo not found' });
    }

    // Delete file from disk
    const absolutePath = path.join(__dirname, '../../..', photo.filepath);
    if (fs.existsSync(absolutePath)) {
      fs.unlinkSync(absolutePath);
      console.log(`🗑️  File deleted: ${absolutePath}`);
    }

    // Delete from DB
    await db.query('DELETE FROM photos WHERE id = ?', [id]);

    res.json({ success: true, message: 'Photo deleted successfully' });
  } catch (err) {
    console.error('deletePhoto error:', err);
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
};

// ─── UPDATE PHOTO METADATA ───────────────────────────────────────────────────
const updatePhoto = async (req, res) => {
  try {
    const { id } = req.params;
    const { brand_id, category_id } = req.body;

    await db.query(
      `UPDATE photos SET
        brand_id = COALESCE(?, brand_id),
        category_id = COALESCE(?, category_id)
       WHERE id = ?`,
      [brand_id || null, category_id || null, id]
    );

    const [[updated]] = await db.query('SELECT * FROM photos WHERE id = ?', [id]);
    res.json({ success: true, message: 'Photo updated', data: updated });
  } catch (err) {
    console.error('updatePhoto error:', err);
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
};

module.exports = {
  getAllPhotos,
  getPhotoById,
  uploadPhoto,
  uploadMultiplePhotos,
  deletePhoto,
  updatePhoto,
};
