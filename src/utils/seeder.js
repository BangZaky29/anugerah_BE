/**
 * Auto-seeder: scan existing files in assets/ and insert into photos table
 * Run: node src/utils/seeder.js
 */
require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });

const fs = require('fs');
const path = require('path');
const db = require('../config/db');

const BASE_URL = process.env.BASE_URL || 'http://localhost:5000';

const FOLDER_TO_CATEGORY = {
  'machine-products': 'Machine Products',
  'tools-products': 'Tools Products',
};

async function seedPhotos() {
  console.log('\n🌱 Starting photo seeder...\n');

  try {
    const assetsDir = path.join(__dirname, '../../assets');

    for (const [folderName, categoryName] of Object.entries(FOLDER_TO_CATEGORY)) {
      const folderPath = path.join(assetsDir, folderName);

      if (!fs.existsSync(folderPath)) {
        console.log(`⚠️  Folder not found: ${folderPath}`);
        continue;
      }

      // Get category ID
      const [[category]] = await db.query(
        'SELECT id FROM categories WHERE name = ?',
        [categoryName]
      );

      if (!category) {
        console.log(`⚠️  Category not found in DB: ${categoryName}`);
        continue;
      }

      const files = fs.readdirSync(folderPath);
      const imageFiles = files.filter((f) => /\.(png|jpg|jpeg|gif|webp|svg)$/i.test(f));

      console.log(`📂 Processing "${folderName}" (${imageFiles.length} images)...`);

      for (const filename of imageFiles) {
        const filePath = path.join(folderPath, filename);
        const stats = fs.statSync(filePath);

        const relativePath = `assets/${folderName}/${filename}`;
        const url = `${BASE_URL}/${relativePath}`;

        // Check if already seeded
        const [[existing]] = await db.query(
          'SELECT id FROM photos WHERE filepath = ?',
          [relativePath]
        );

        if (existing) {
          console.log(`   ⏭️  Already seeded: ${filename}`);
          continue;
        }

        // Detect mimetype from extension
        const ext = path.extname(filename).toLowerCase();
        const mimeMap = {
          '.png': 'image/png',
          '.jpg': 'image/jpeg',
          '.jpeg': 'image/jpeg',
          '.gif': 'image/gif',
          '.webp': 'image/webp',
          '.svg': 'image/svg+xml',
        };
        const mimetype = mimeMap[ext] || 'image/jpeg';

        await db.query(
          `INSERT INTO photos (brand_id, category_id, filename, filepath, url, mimetype, size)
           VALUES (NULL, ?, ?, ?, ?, ?, ?)`,
          [category.id, filename, relativePath, url, mimetype, stats.size]
        );

        console.log(`   ✅ Seeded: ${filename} (${(stats.size / 1024).toFixed(1)} KB)`);
      }
    }

    console.log('\n✨ Seeder completed successfully!\n');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeder error:', err);
    process.exit(1);
  }
}

seedPhotos();
