/**
 * Database Setup Script
 * Membuat database, tabel, dan seed data via Node.js
 * Run: node src/utils/setupDb.js
 */
require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });

const mysql = require('mysql2/promise');

const DB_CONFIG = {
  host:     process.env.DB_HOST     || 'localhost',
  user:     process.env.DB_USER     || 'root',
  password: process.env.DB_PASSWORD || '',
  multipleStatements: true,
  charset: 'utf8mb4',
};

const DB_NAME = process.env.DB_NAME || 'asb_portfolio';

async function setupDatabase() {
  console.log('\n═══════════════════════════════════════════════');
  console.log('  🗄️  PT ASB Portfolio — Database Setup');
  console.log('═══════════════════════════════════════════════\n');

  let connection;
  try {
    // Connect without database first
    connection = await mysql.createConnection(DB_CONFIG);
    console.log('✅ MySQL connected!\n');

    // Create database
    await connection.query(
      `CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`
    );
    console.log(`📦 Database "${DB_NAME}" ready.`);

    // Use database
    await connection.query(`USE \`${DB_NAME}\``);

    // ── CREATE TABLES ──────────────────────────────────────────────────────
    await connection.query(`
      CREATE TABLE IF NOT EXISTS categories (
        id          INT           NOT NULL AUTO_INCREMENT,
        name        VARCHAR(100)  NOT NULL,
        description TEXT,
        created_at  TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        UNIQUE KEY uq_category_name (name)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `);
    console.log('✅ Table: categories');

    await connection.query(`
      CREATE TABLE IF NOT EXISTS brands (
        id          INT           NOT NULL AUTO_INCREMENT,
        category_id INT           NOT NULL,
        name        VARCHAR(100)  NOT NULL,
        description TEXT,
        created_at  TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        KEY idx_brands_category (category_id),
        CONSTRAINT fk_brand_category
          FOREIGN KEY (category_id) REFERENCES categories (id)
          ON DELETE CASCADE ON UPDATE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `);
    console.log('✅ Table: brands');

    await connection.query(`
      CREATE TABLE IF NOT EXISTS products (
        id         INT           NOT NULL AUTO_INCREMENT,
        brand_id   INT           NOT NULL,
        name       VARCHAR(200)  NOT NULL,
        created_at TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        KEY idx_products_brand (brand_id),
        CONSTRAINT fk_product_brand
          FOREIGN KEY (brand_id) REFERENCES brands (id)
          ON DELETE CASCADE ON UPDATE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `);
    console.log('✅ Table: products');

    await connection.query(`
      CREATE TABLE IF NOT EXISTS photos (
        id          INT           NOT NULL AUTO_INCREMENT,
        brand_id    INT           DEFAULT NULL,
        category_id INT           DEFAULT NULL,
        filename    VARCHAR(255)  NOT NULL,
        filepath    VARCHAR(500)  NOT NULL,
        url         VARCHAR(500)  NOT NULL,
        mimetype    VARCHAR(100)  DEFAULT 'image/jpeg',
        size        INT           DEFAULT 0,
        uploaded_at TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        KEY idx_photos_brand    (brand_id),
        KEY idx_photos_category (category_id),
        CONSTRAINT fk_photo_brand
          FOREIGN KEY (brand_id) REFERENCES brands (id)
          ON DELETE SET NULL ON UPDATE CASCADE,
        CONSTRAINT fk_photo_category
          FOREIGN KEY (category_id) REFERENCES categories (id)
          ON DELETE SET NULL ON UPDATE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
    `);
    console.log('✅ Table: photos\n');

    // ── SEED CATEGORIES ────────────────────────────────────────────────────
    const categories = [
      { name: 'Machine Products',  description: 'Advanced CNC and manufacturing machinery for precision production.' },
      { name: 'Tools Products',    description: 'Precision engineering and heavy-duty durability for industrial applications.' },
      { name: 'Product Support',   description: 'Heavy machinery and core equipment for large-scale operations.' },
    ];

    for (const cat of categories) {
      await connection.query(
        'INSERT IGNORE INTO categories (name, description) VALUES (?, ?)',
        [cat.name, cat.description]
      );
    }
    console.log('🌱 Seeded: categories (3)');

    // ── SEED BRANDS ────────────────────────────────────────────────────────
    const [[{ machine_id }]] = await connection.query("SELECT id AS machine_id FROM categories WHERE name = 'Machine Products'");
    const [[{ tools_id  }]] = await connection.query("SELECT id AS tools_id  FROM categories WHERE name = 'Tools Products'");
    const [[{ support_id}]] = await connection.query("SELECT id AS support_id FROM categories WHERE name = 'Product Support'");

    const brandsData = [
      // Machine Products
      [machine_id, 'DN SOLUTIONS', 'Modern manufacturing solutions.'],
      [machine_id, 'MAKINO',       'Extreme precision engineering.'],
      [machine_id, 'HNK',          'Specialized heavy-duty machines.'],
      [machine_id, 'KERTZ',        'High-end industrial machinery.'],
      [machine_id, 'TONE FAN',     'Manufacturing drilling specialists.'],
      [machine_id, 'MAZAK',        'Global leader in advanced CNC machine tools.'],
      [machine_id, 'BROTHER',      'Compact, high-productivity CNC machining.'],
      [machine_id, 'WELE',         'Large-scale, heavy-duty CNC machinery.'],
      [machine_id, 'SODICK',       'Pioneer in precision Electrical Discharge Machining.'],
      [machine_id, 'HYPERTHERM',   'World leader in industrial cutting solutions.'],
      // Tools Products
      [tools_id,   'TOPTUL',  'Chrome Vanadium professional tools.'],
      [tools_id,   'ELORA',   'High-end German manufacturing quality.'],
      [tools_id,   'TEKIRO',  'Leading industrial tool brand.'],
      [tools_id,   'MAKITA',  'Global leader in power tools.'],
      [tools_id,   'BOSCH',   'Reliable German engineering.'],
      [tools_id,   'HYTORC',  'The world primary bolting solution.'],
      // Product Support
      [support_id, 'CATERPILLAR', 'Construction and mining giants.'],
      [support_id, 'KOMATSU',     'High-performance heavy equipment.'],
      [support_id, 'CUMMINS',     'Advanced power solutions.'],
      [support_id, 'LINCOLN',     'Industrial maintenance experts.'],
    ];

    for (const [cat_id, name, desc] of brandsData) {
      await connection.query(
        'INSERT IGNORE INTO brands (category_id, name, description) VALUES (?, ?, ?)',
        [cat_id, name, desc]
      );
    }
    console.log(`🌱 Seeded: brands (${brandsData.length})`);

    // ── SEED PRODUCTS ──────────────────────────────────────────────────────
    const productsData = [
      // Machine Products
      ['DN SOLUTIONS', 'CNC Milling'],
      ['DN SOLUTIONS', 'Lathe Machines'],
      ['MAKINO',       'Horizontal Milling'],
      ['MAKINO',       'EDM Machines'],
      ['HNK',          'Vertical Lathes'],
      ['HNK',          'Boring Machines'],
      ['KERTZ',        'Precision Cutting'],
      ['KERTZ',        'Milling'],
      ['TONE FAN',     'Radial Drilling'],
      ['TONE FAN',     'Industrial Drills'],
      ['MAZAK',        'Multi-tasking CNC'],
      ['MAZAK',        '5-Axis Machining'],
      ['MAZAK',        'Turning Centers'],
      ['BROTHER',      'SPEEDIO Tapping Centers'],
      ['BROTHER',      'High-Speed CNC'],
      ['WELE',         'Bridge/Double-Column Machining'],
      ['WELE',         'Boring Machines'],
      ['SODICK',       'Wire & Sinker EDM'],
      ['SODICK',       'High-Speed Milling'],
      ['SODICK',       'Metal 3D Printing'],
      ['HYPERTHERM',   'Plasma Cutting Systems'],
      ['HYPERTHERM',   'CNC Motion Control'],
      // Tools Products
      ['TOPTUL',  'Wrench Set'],
      ['TOPTUL',  'Socket Set'],
      ['TOPTUL',  'Torque Tools'],
      ['ELORA',   'Spanners'],
      ['ELORA',   'Pliers'],
      ['ELORA',   'Workshops'],
      ['TEKIRO',  'Hand Tools'],
      ['TEKIRO',  'Automotive Tools'],
      ['MAKITA',  'Cordless Drill'],
      ['MAKITA',  'Grinder'],
      ['MAKITA',  'Circular Saw'],
      ['BOSCH',   'Power Tools'],
      ['BOSCH',   'Measuring Tools'],
      ['HYTORC',  'Hydraulic Torque Wrench'],
      ['HYTORC',  'Bolt Tensioners'],
      // Product Support
      ['CATERPILLAR', 'Excavators'],
      ['CATERPILLAR', 'Dump Trucks'],
      ['CATERPILLAR', 'Bulldozers'],
      ['KOMATSU',     'Excavators'],
      ['KOMATSU',     'Wheel Loaders'],
      ['CUMMINS',     'Diesel Engines'],
      ['CUMMINS',     'Power Generators'],
      ['LINCOLN',     'Auto Lubrication'],
      ['LINCOLN',     'Welding Gear'],
    ];

    for (const [brandName, productName] of productsData) {
      const [[brand]] = await connection.query('SELECT id FROM brands WHERE name = ?', [brandName]);
      if (brand) {
        await connection.query(
          'INSERT IGNORE INTO products (brand_id, name) VALUES (?, ?)',
          [brand.id, productName]
        );
      }
    }
    console.log(`🌱 Seeded: products (${productsData.length})`);

    console.log('\n═══════════════════════════════════════════════');
    console.log('  ✨  Database Setup Complete!');
    console.log(`  📊  Database  : ${DB_NAME}`);
    console.log('  📋  Tables    : categories, brands, products, photos');
    console.log('═══════════════════════════════════════════════');
    console.log('\n  ▶  Jalankan server: npm run dev');
    console.log('  🌱  Seed foto     : npm run seed\n');

    await connection.end();
    process.exit(0);
  } catch (err) {
    console.error('\n❌ Setup failed:', err.message);
    if (err.code === 'ER_ACCESS_DENIED_ERROR') {
      console.error('\n💡 Tip: Periksa DB_USER dan DB_PASSWORD di file .env');
    }
    if (err.code === 'ECONNREFUSED') {
      console.error('\n💡 Tip: Pastikan MySQL server sudah berjalan!');
    }
    if (connection) await connection.end();
    process.exit(1);
  }
}

setupDatabase();
