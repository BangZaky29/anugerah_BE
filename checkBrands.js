const fs = require('fs');
const db = require('./src/config/db');

async function checkBrands() {
  try {
    const [brands] = await db.query(`
      SELECT 
        b.name AS brand_name,
        b.external_link,
        p.filename AS logo_filename
      FROM brands b
      LEFT JOIN photos p ON b.id = p.brand_id
      ORDER BY b.name ASC
    `);

    let completeCount = 0;
    let missingLogoCount = 0;
    let missingLinkCount = 0;
    let missingBothCount = 0;

    let markdown = '# Laporan Kelengkapan Data Brand\n\n';
    markdown += 'Berikut adalah status kelengkapan data (Logo dan Link Website) untuk setiap Brand di dalam database:\n\n';
    
    markdown += '| Brand Name | External Link | Logo Filename | Status |\n';
    markdown += '|---|---|---|---|\n';

    for (const row of brands) {
      let status = '✅ Lengkap';
      if (!row.logo_filename && !row.external_link) {
        status = '❌ Kosong Semua';
        missingBothCount++;
      } else if (!row.logo_filename) {
        status = '⚠️ Logo Kosong';
        missingLogoCount++;
      } else if (!row.external_link) {
        status = '⚠️ Link Kosong';
        missingLinkCount++;
      } else {
        completeCount++;
      }

      const linkText = row.external_link ? row.external_link : '-';
      const logoText = row.logo_filename ? `\`${row.logo_filename}\`` : '-';

      markdown += `| **${row.brand_name}** | ${linkText} | ${logoText} | ${status} |\n`;
    }

    markdown += '\n## Ringkasan\n';
    markdown += `- **Total Brand**: ${brands.length}\n`;
    markdown += `- **Data Lengkap**: ${completeCount}\n`;
    markdown += `- **Kehilangan Logo**: ${missingLogoCount + missingBothCount} brand\n`;
    markdown += `- **Kehilangan Link**: ${missingLinkCount + missingBothCount} brand\n\n`;
    
    markdown += 'Mohon cek tabel di atas. Brand dengan logo berisi `-` berarti foto belum ditambahkan ke galeri / di-_map_ padanya. Brand dengan link berisi `-` berarti link eksternalnya masih kosong (`NULL`).\n';

    fs.writeFileSync('C:\\Users\\admin\\.gemini\\antigravity\\brain\\eb62f82f-e9a1-44f6-a703-5c237765e87e\\brand_completeness_report.md', markdown);
    
    console.log('Report generated.');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}
checkBrands();
