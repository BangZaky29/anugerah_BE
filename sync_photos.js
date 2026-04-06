const fs = require('fs');
const path = require('path');
const db = require('./src/config/db');

function getFiles(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      getFiles(fullPath, files);
    } else {
      if (/\.(png|jpe?g|svg|webp)$/i.test(fullPath)) {
        files.push(fullPath);
      }
    }
  }
  return files;
}

async function run() {
  try {
    console.log("🚀 [1/3] Fetching brands from database...");
    const [brands] = await db.query('SELECT id, name FROM brands');
    const brandMap = {}; // Lowercased name -> id mapping
    brands.forEach(b => { 
      brandMap[b.name.toLowerCase()] = b.id; 
    });

    console.log("📦 [2/3] Mapping visual assets...");
    const files = getFiles(path.join(__dirname, 'assets'));
    let assigned = 0;
    
    // Optional: We can choose to clear the photos table first to ensure a clean sync. 
    // Wait, let's just wipe previous photos to not have duplicates if files were renamed or deleted.
    await db.query('TRUNCATE TABLE photos');
    
    for (const file of files) {
      const basename = path.basename(file);
      // Example basename: "ABB.png" -> parsed.name: "ABB"
      const parsed = path.parse(basename);
      const brandName = parsed.name.toLowerCase();
      
      // If it exists in the exact list of known brands (or fuzzy mapped and renamed in Python step)
      if (brandMap[brandName]) {
        const brandId = brandMap[brandName];
        
        // Convert OS absolute path to relative format ('assets/subfolder/file.png')
        const relativePath = file.substring(file.indexOf('assets')).replace(/\\/g, '/');
        
        await db.query('INSERT INTO photos (brand_id, filename, filepath) VALUES (?, ?, ?)', [brandId, basename, relativePath]);
        
        console.log(` ✅ Terikat -> Brand: ${parsed.name.toUpperCase()} | Path: ${relativePath}`);
        assigned++;
      } else {
        // Did not match
        console.log(` ⚠️ Benda asing / nama asimetris tidak di-bind: ${basename}`);
      }
    }
    
    console.log(`\n🎉 Proses Selesai! Berhasil mengawinkan ${assigned} aset logo dengan database utama.`);
    process.exit(0);

  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

run();
