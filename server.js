require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

const categoryRoutes = require('./src/routes/categoryRoutes');
const brandRoutes = require('./src/routes/brandRoutes');
const productRoutes = require('./src/routes/productRoutes');
const photoRoutes = require('./src/routes/photoRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// ─── MIDDLEWARES ──────────────────────────────────────────────────────────────
app.use(cors({
  origin: [
    'http://localhost:5173',   // Vite dev server (FE)
    'http://localhost:3000',
    'http://127.0.0.1:5173',
    'http://localhost:5174',
    'http://127.0.0.1:5174',
    'https://anugerahsenantiasabersyukur.com',
    'https://www.anugerahsenantiasabersyukur.com'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── STATIC FILES ─────────────────────────────────────────────────────────────
// Serve everything inside /assets/ as static → accessible via /assets/...
app.use('/assets', express.static(path.join(__dirname, 'assets'), {
  maxAge: '7d',  // Cache static assets for 7 days
  etag: true,
}));

// ─── API ROUTES ───────────────────────────────────────────────────────────────
app.use('/api/categories', categoryRoutes);
app.use('/api/brands', brandRoutes);
app.use('/api/products', productRoutes);
app.use('/api/photos', photoRoutes);

// ─── HEALTH CHECK ─────────────────────────────────────────────────────────────
app.get('/health', (req, res) => {
  res.json({
    success: true,
    status: 'OK',
    service: 'PT ASB Portfolio API',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    endpoints: {
      categories: '/api/categories',
      brands: '/api/brands',
      products: '/api/products',
      photos: '/api/photos',
      staticFiles: '/assets/:folder/:filename',
    },
  });
});

// ─── API DOCS (simple) ───────────────────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({
    message: '🏭 PT Anugerah Senantiasa Bersyukur — Backend API',
    version: '1.0.0',
    docs: {
      'GET  /health': 'Server health check',
      'GET  /api/categories': 'List all categories (with brands, products, photos)',
      'GET  /api/categories/:id': 'Get single category',
      'POST /api/categories': 'Create category { name, description }',
      'PUT  /api/categories/:id': 'Update category',
      'DEL  /api/categories/:id': 'Delete category',
      '---': '---',
      'GET  /api/brands': 'List all brands (optional: ?category_id=1)',
      'GET  /api/brands/:id': 'Get single brand (with products & photos)',
      'POST /api/brands': 'Create brand { category_id, name, description }',
      'PUT  /api/brands/:id': 'Update brand',
      'DEL  /api/brands/:id': 'Delete brand',
      '----': '---',
      'GET  /api/products': 'List all products (optional: ?brand_id=1)',
      'GET  /api/products/:id': 'Get single product',
      'POST /api/products': 'Create product { brand_id, name }',
      'PUT  /api/products/:id': 'Update product',
      'DEL  /api/products/:id': 'Delete product',
      '-----': '---',
      'GET  /api/photos': 'List all photos (optional: ?category_id=1&brand_id=2)',
      'GET  /api/photos/:id': 'Get single photo',
      'POST /api/photos/upload': 'Upload 1 photo (multipart: photo, category_id, brand_id, folder)',
      'POST /api/photos/upload-multiple': 'Upload multiple (multipart: photos[], category_id, brand_id, folder)',
      'PUT  /api/photos/:id': 'Update photo metadata',
      'DEL  /api/photos/:id': 'Delete photo (file + record)',
      '------': '---',
      'GET  /assets/machine-products/:f': 'Static file — machine product image',
      'GET  /assets/tools-products/:f': 'Static file — tools product image',
    },
  });
});

// ─── 404 HANDLER ──────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route not found: ${req.method} ${req.path}` });
});

// ─── GLOBAL ERROR HANDLER ─────────────────────────────────────────────────────
app.use((err, req, res, _next) => {
  console.error('💥 Unhandled error:', err);
  res.status(500).json({ success: false, message: 'Internal server error', error: err.message });
});

// ─── START SERVER ─────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log('\n═══════════════════════════════════════════════════');
  console.log('  🏭  PT ASB Portfolio Backend API');
  console.log('═══════════════════════════════════════════════════');
  console.log(`  🌐  Server   : http://localhost:${PORT}`);
  console.log(`  📋  API Docs : http://localhost:${PORT}/`);
  console.log(`  🏥  Health   : http://localhost:${PORT}/health`);
  console.log(`  🖼️   Assets   : http://localhost:${PORT}/assets/`);
  console.log('═══════════════════════════════════════════════════\n');
});
