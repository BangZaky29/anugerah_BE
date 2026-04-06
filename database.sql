-- ============================================================
--  DATABASE: asb_portfolio
--  PT Anugerah Senantiasa Bersyukur — Portfolio Backend
-- ============================================================

CREATE DATABASE IF NOT EXISTS asb_portfolio
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE asb_portfolio;

-- ─── TABLE: categories ───────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS categories (
  id          INT           NOT NULL AUTO_INCREMENT,
  name        VARCHAR(100)  NOT NULL,
  description TEXT,
  created_at  TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_category_name (name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ─── TABLE: brands ───────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS brands (
  id            INT           NOT NULL AUTO_INCREMENT,
  category_id   INT           NOT NULL,
  name          VARCHAR(100)  NOT NULL,
  description   TEXT,
  external_link VARCHAR(500)  DEFAULT NULL,
  type          VARCHAR(50)   DEFAULT NULL,
  created_at    TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_brands_category (category_id),
  CONSTRAINT fk_brand_category
    FOREIGN KEY (category_id) REFERENCES categories (id)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ─── TABLE: products ─────────────────────────────────────────────────────────
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ─── TABLE: photos ───────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS photos (
  id          INT           NOT NULL AUTO_INCREMENT,
  brand_id    INT           DEFAULT NULL,
  category_id INT           DEFAULT NULL,
  filename    VARCHAR(255)  NOT NULL,
  filepath    VARCHAR(500)  NOT NULL,
  url         VARCHAR(500)  NOT NULL,
  mimetype    VARCHAR(100)  DEFAULT 'image/jpeg',
  size        INT           DEFAULT 0 COMMENT 'bytes',
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ─── SEED: categories ────────────────────────────────────────────────────────
INSERT IGNORE INTO categories (name, description) VALUES
  ('Machine Products',  'Advanced CNC and manufacturing machinery for precision production.'),
  ('Tools Products',    'Precision engineering and heavy-duty durability for industrial applications.'),
  ('Product Support',   'Heavy machinery and core equipment for large-scale operations.');

-- ─── SEED: brands (Machine Products) ────────────────────────────────────────
INSERT IGNORE INTO brands (category_id, name, description, external_link, type)
SELECT id, 'DN SOLUTIONS', 'Modern manufacturing solutions.', 'https://www.dn-solutions.com/main.do', 'Mesin' FROM categories WHERE name = 'Machine Products';
INSERT IGNORE INTO brands (category_id, name, description, external_link, type)
SELECT id, 'MAKINO',       'Extreme precision engineering.', 'https://www.makino.com/', 'Mesin' FROM categories WHERE name = 'Machine Products';
INSERT IGNORE INTO brands (category_id, name, description, external_link, type)
SELECT id, 'HNK',          'Specialized heavy-duty machines.', 'http://en.hnkkorea.com/sub01/03_01.php', 'Mesin' FROM categories WHERE name = 'Machine Products';
INSERT IGNORE INTO brands (category_id, name, description, external_link, type)
SELECT id, 'KERTZ',        'High-end industrial machinery.', NULL, 'Mesin' FROM categories WHERE name = 'Machine Products';
INSERT IGNORE INTO brands (category_id, name, description, external_link, type)
SELECT id, 'TONE FAN',     'Manufacturing drilling specialists.', NULL, 'Mesin' FROM categories WHERE name = 'Machine Products';
INSERT IGNORE INTO brands (category_id, name, description, external_link, type)
SELECT id, 'MAZAK',        'Global leader in advanced CNC machine tools.', 'https://www.mazak.com/id-en/', 'Mesin' FROM categories WHERE name = 'Machine Products';
INSERT IGNORE INTO brands (category_id, name, description, external_link, type)
SELECT id, 'BROTHER',      'Compact, high-productivity CNC machining.', 'https://machinetool.global.brother/en-eu', 'Mesin' FROM categories WHERE name = 'Machine Products';
INSERT IGNORE INTO brands (category_id, name, description, external_link, type)
SELECT id, 'WELE',         'Large-scale, heavy-duty CNC machinery.', 'http://www.welegroup.com/en/', 'Mesin' FROM categories WHERE name = 'Machine Products';
INSERT IGNORE INTO brands (category_id, name, description, external_link, type)
SELECT id, 'SODICK',       'Pioneer in precision Electrical Discharge Machining.', 'https://sodick.com/?utm_source=google&utm_campaign=%7Bcampaignname%7D&utm_medium=d&utm_content=194866989059&utm_term&gad_source=5&gad_campaignid=23162563870&gclid=EAIaIQobChMI7bua34jIkwMViXpvBB02ATBhEAEYASAAEgJltfD_BwE', 'Electrical' FROM categories WHERE name = 'Machine Products';
INSERT IGNORE INTO brands (category_id, name, description, external_link, type)
SELECT id, 'HYPERTHERM',   'World leader in industrial cutting solutions.', 'https://www.hypertherm.com/', 'Mechanical' FROM categories WHERE name = 'Machine Products';

-- ─── SEED: brands (Tools Products) ──────────────────────────────────────────
INSERT IGNORE INTO brands (category_id, name, description, external_link, type)
SELECT id, 'TOPTUL', 'Chrome Vanadium professional tools.', 'https://www.toptul.com/en', 'Tools' FROM categories WHERE name = 'Tools Products';
INSERT IGNORE INTO brands (category_id, name, description, external_link, type)
SELECT id, 'ELORA',  'High-end German manufacturing quality.', 'https://www.elora.de/en/', 'Tools' FROM categories WHERE name = 'Tools Products';
INSERT IGNORE INTO brands (category_id, name, description, external_link, type)
SELECT id, 'TEKIRO', 'Leading industrial tool brand.', 'https://tekiro.com/', 'Tools' FROM categories WHERE name = 'Tools Products';
INSERT IGNORE INTO brands (category_id, name, description, external_link, type)
SELECT id, 'MAKITA', 'Global leader in power tools.', 'https://makitatools.com/', 'Tools' FROM categories WHERE name = 'Tools Products';
INSERT IGNORE INTO brands (category_id, name, description, external_link, type)
SELECT id, 'BOSCH REXROTH',  'Reliable German engineering.', 'https://www.boschrexroth.com/en/id/', 'Tools' FROM categories WHERE name = 'Tools Products';
INSERT IGNORE INTO brands (category_id, name, description, external_link, type)
SELECT id, 'HYTORC', 'The world primary bolting solution.', 'https://www.hytorc.com/id/', 'Tools' FROM categories WHERE name = 'Tools Products';

-- ─── SEED: brands (Product Support) ─────────────────────────────────────────
INSERT IGNORE INTO brands (category_id, name, description, external_link, type)
SELECT id, 'CATERPILLAR', 'Construction and mining giants.', NULL, 'Mesin'   FROM categories WHERE name = 'Product Support';
INSERT IGNORE INTO brands (category_id, name, description, external_link, type)
SELECT id, 'KOMATSU',     'High-performance heavy equipment.', NULL, 'Mesin' FROM categories WHERE name = 'Product Support';
INSERT IGNORE INTO brands (category_id, name, description, external_link, type)
SELECT id, 'CUMMINS',     'Advanced power solutions.', NULL, 'Mesin'         FROM categories WHERE name = 'Product Support';
INSERT IGNORE INTO brands (category_id, name, description, external_link, type)
SELECT id, 'LINCOLN',     'Industrial maintenance experts.', NULL, 'Tools'   FROM categories WHERE name = 'Product Support';

-- ─── SEED: products (Machine Products) ──────────────────────────────────────
INSERT IGNORE INTO products (brand_id, name)
SELECT b.id, p.name FROM brands b
JOIN (
  SELECT 'DN SOLUTIONS' AS bname, 'CNC Milling' AS name UNION ALL
  SELECT 'DN SOLUTIONS', 'Lathe Machines' UNION ALL
  SELECT 'MAKINO',       'Horizontal Milling' UNION ALL
  SELECT 'MAKINO',       'EDM Machines' UNION ALL
  SELECT 'HNK',          'Vertical Lathes' UNION ALL
  SELECT 'HNK',          'Boring Machines' UNION ALL
  SELECT 'KERTZ',        'Precision Cutting' UNION ALL
  SELECT 'KERTZ',        'Milling' UNION ALL
  SELECT 'TONE FAN',     'Radial Drilling' UNION ALL
  SELECT 'TONE FAN',     'Industrial Drills' UNION ALL
  SELECT 'MAZAK',        'Multi-tasking CNC' UNION ALL
  SELECT 'MAZAK',        '5-Axis Machining' UNION ALL
  SELECT 'MAZAK',        'Turning Centers' UNION ALL
  SELECT 'BROTHER',      'SPEEDIO Tapping Centers' UNION ALL
  SELECT 'BROTHER',      'High-Speed CNC' UNION ALL
  SELECT 'WELE',         'Bridge/Double-Column Machining' UNION ALL
  SELECT 'WELE',         'Boring Machines' UNION ALL
  SELECT 'SODICK',       'Wire & Sinker EDM' UNION ALL
  SELECT 'SODICK',       'High-Speed Milling' UNION ALL
  SELECT 'SODICK',       'Metal 3D Printing' UNION ALL
  SELECT 'HYPERTHERM',   'Plasma Cutting Systems' UNION ALL
  SELECT 'HYPERTHERM',   'CNC Motion Control'
) AS p ON b.name = p.bname;

-- ─── SEED: products (Tools Products) ────────────────────────────────────────
INSERT IGNORE INTO products (brand_id, name)
SELECT b.id, p.name FROM brands b
JOIN (
  SELECT 'TOPTUL' AS bname, 'Wrench Set'        AS name UNION ALL
  SELECT 'TOPTUL',           'Socket Set'                UNION ALL
  SELECT 'TOPTUL',           'Torque Tools'              UNION ALL
  SELECT 'ELORA',            'Spanners'                  UNION ALL
  SELECT 'ELORA',            'Pliers'                    UNION ALL
  SELECT 'ELORA',            'Workshops'                 UNION ALL
  SELECT 'TEKIRO',           'Hand Tools'                UNION ALL
  SELECT 'TEKIRO',           'Automotive Tools'          UNION ALL
  SELECT 'MAKITA',           'Cordless Drill'            UNION ALL
  SELECT 'MAKITA',           'Grinder'                   UNION ALL
  SELECT 'MAKITA',           'Circular Saw'              UNION ALL
  SELECT 'BOSCH REXROTH',    'Power Tools'               UNION ALL
  SELECT 'BOSCH REXROTH',    'Measuring Tools'           UNION ALL
  SELECT 'HYTORC',           'Hydraulic Torque Wrench'   UNION ALL
  SELECT 'HYTORC',           'Bolt Tensioners'
) AS p ON b.name = p.bname;

-- ─── SEED: products (Product Support) ───────────────────────────────────────
INSERT IGNORE INTO products (brand_id, name)
SELECT b.id, p.name FROM brands b
JOIN (
  SELECT 'CATERPILLAR' AS bname, 'Excavators'       AS name UNION ALL
  SELECT 'CATERPILLAR',          'Dump Trucks'               UNION ALL
  SELECT 'CATERPILLAR',          'Bulldozers'                UNION ALL
  SELECT 'KOMATSU',              'Excavators'                UNION ALL
  SELECT 'KOMATSU',              'Wheel Loaders'             UNION ALL
  SELECT 'CUMMINS',              'Diesel Engines'            UNION ALL
  SELECT 'CUMMINS',              'Power Generators'          UNION ALL
  SELECT 'LINCOLN',              'Auto Lubrication'          UNION ALL
  SELECT 'LINCOLN',              'Welding Gear'
) AS p ON b.name = p.bname;
