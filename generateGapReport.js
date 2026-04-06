const fs = require('fs');
const db = require('./src/config/db');

async function generateReport() {
  try {
    const [rows] = await db.query(`
      SELECT 
        b.name AS brand_name,
        b.external_link,
        p.filename AS logo_filename,
        c.name AS category_name
      FROM brands b
      LEFT JOIN photos p ON b.id = p.brand_id
      JOIN categories c ON b.category_id = c.id
      ORDER BY c.name ASC, b.name ASC
    `);

    // Group 1: Has link, No logo
    const missingLogoHasLink = rows.filter(r => !r.logo_filename && r.external_link);
    
    // Group 2: No link, No logo
    const missingBoth = rows.filter(r => !r.logo_filename && !r.external_link);

    let md = '# 📊 Laporan Analisis Kesenjangan Data Brand\n\n';
    md += '> Dikelompokkan berdasarkan Nama Kategori secara presisi sesuai instruksi.\n\n';

    // Helper to render a table grouped by category
    const renderTable = (dataArray, title, desc) => {
      let result = `## ${title}\n`;
      result += `${desc}\n\n`;
      
      if (dataArray.length === 0) {
        result += `*Wah, kategori ini sudah bersih! Tidak ada data yang bermasalah di sini.*\n\n`;
        return result;
      }

      // Group by category
      const grouped = {};
      dataArray.forEach(item => {
        if (!grouped[item.category_name]) grouped[item.category_name] = [];
        grouped[item.category_name].push(item);
      });

      result += `| Kategori | Nama Brand | Link Website |\n`;
      result += `|---|---|---|\n`;

      for (const [category, items] of Object.entries(grouped)) {
        items.forEach((item, index) => {
          // Hanya tampilkan nama kategori di baris pertama tiap grup agar rapi
          const catDisplay = index === 0 ? `**${category}**` : '';
          const linkDisplay = item.external_link ? `[${item.external_link}](${item.external_link})` : '`KOSONG`';
          result += `| ${catDisplay} | ${item.brand_name} | ${linkDisplay} |\n`;
        });
      }
      
      result += `\n**Total:** ${dataArray.length} Brand\n\n`;
      return result;
    };

    md += renderTable(
      missingLogoHasLink, 
      '1. ⚠️ Terdapat Link Website, Tapi TIDAK ADA File Logo', 
      'Brand di bawah ini sudah memiliki tautan web eksternal yang aktif, namun belum memiliki gambar logo di galeri.'
    );

    md += renderTable(
      missingBoth, 
      '2. ❌ TIDAK ADA Link Website & TIDAK ADA File Logo', 
      'Brand di bawah ini benar-benar kekurangan data. Tidak ada tautan web maupun gambar logo yang tersedia.'
    );

    fs.writeFileSync('C:\\Users\\admin\\.gemini\\antigravity\\brain\\eb62f82f-e9a1-44f6-a703-5c237765e87e\\missing_assets_report.md', md);
    console.log('Report saved successfully.');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}
generateReport();
