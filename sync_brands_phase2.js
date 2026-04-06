const db = require('./src/config/db');

const masterBrands = [
  // A. Electrical Distribution
  { name: 'Siemens', link: 'https://www.siemens.com/en-us/', type: 'Electrical', category: 'Electrical & Automation' },
  { name: 'Schneider Electric', link: 'https://www.se.com/id/id/all-products/', type: 'Electrical', category: 'Electrical & Automation' },
  { name: 'Yaskawa', link: 'https://www.yaskawa.co.id/', type: 'Electrical', category: 'Electrical & Automation' },
  { name: 'ABB', link: 'https://www.abb.com/global/en', type: 'Electrical', category: 'Electrical & Automation' },
  { name: 'Omron', link: 'https://www.omron.co.id/', type: 'Electrical', category: 'Electrical & Automation' },
  { name: 'Hager', link: 'https://hager.com/id', type: 'Electrical', category: 'Electrical & Automation' },
  { name: 'Chint', link: 'https://www.chintglobal.com/global/en/home.html', type: 'Electrical', category: 'Electrical & Automation' },
  { name: 'Eaton', link: 'https://www.eaton.com/us/en-us.html', type: 'Electrical', category: 'Electrical & Automation' },
  { name: 'General Electric', link: 'https://www.ge.com/', type: 'Electrical', category: 'Electrical & Automation' },
  { name: 'Fuji Electric', link: 'https://www.fujielectric.com/products/mc/', type: 'Electrical', category: 'Electrical & Automation' },
  { name: 'Mitsubishi Electric', link: 'https://www.mitsubishielectric.com/fa/id_id/products/index.html', type: 'Electrical', category: 'Electrical & Automation' },
  { name: 'LS Electric', link: 'https://www.ls-electric.com/', type: 'Electrical', category: 'Electrical & Automation' },
  { name: 'Autonics', link: 'https://www.autonics.com/id/main', type: 'Electrical', category: 'Electrical & Automation' },
  { name: 'Legrand', link: 'https://www.legrand.co.id/en', type: 'Electrical', category: 'Electrical & Automation' },
  { name: 'SMC', link: 'https://www.smcworld.com/en-jp/', type: 'Electrical', category: 'Electrical & Automation' },
  { name: 'Fort', link: 'https://fortindo.id/?gad_source=1&gad_campaignid=20974034375&gbraid=0AAAAAqxjpUWRiTY2H_e7REYzgUNQRO52S&gclid=Cj0KCQjwkMjOBhC5ARIsADIdb3cN9ruL5wOInvhDN4DFiYiR2UICRuwZXjgiyB_P3lvN0vlS9RaMSE8aAt_tEALw_wcB', type: 'Electrical', category: 'Electrical & Automation' },
  { name: 'Megger', link: 'https://www.megger.com/en', type: 'Electrical', category: 'Electrical & Automation' },

  // B. Electrical Cable
  { name: 'Jembo', link: 'https://jembo.co.id/id', type: 'Electrical', category: 'Electrical & Automation' },
  { name: 'Supreme', link: 'https://www.sucaco.com/', type: 'Electrical', category: 'Electrical & Automation' },
  { name: 'Kabelindo', link: 'https://www.kabelindo.co.id/', type: 'Electrical', category: 'Electrical & Automation' },
  { name: 'Kabel Metal', link: 'https://kabelmetalindonesia.co.id/?gad_source=1&gad_campaignid=22519525571&gbraid=0AAAAA9tcGsukpLHTzIzxIPH83lBSxfBUN&gclid=Cj0KCQjwkMjOBhC5ARIsADIdb3dgGKMqYGihGrrTec1dxAmO03m45j_xAhfZCFlcufp1EahUKNfnXrgaAs4sEALw_wcB', type: 'Electrical', category: 'Electrical & Automation' },
  { name: 'Voksel Electric', link: 'https://www.voksel.co.id/id', type: 'Electrical', category: 'Electrical & Automation' },

  // C. Electrical Motor 
  { name: 'Teco', link: 'https://teco.id/contact/', type: 'Electrical', category: 'Electrical & Automation' },
  { name: 'Toshiba', link: 'https://www.toshiba-tips.co.jp/en/products/motor/', type: 'Electrical', category: 'Electrical & Automation' },

  // D. Electrical Appliance
  { name: 'Kiepe', link: 'https://kiepe-group.com/en/', type: 'Electrical', category: 'Electrical & Automation' },
  { name: 'Raychem', link: 'https://www.raychem.com/en/home.html', type: 'Electrical', category: 'Electrical & Automation' },

  // Instrument and Controls Products 
  { name: 'Allen-Bradley', link: 'https://www.rockwellautomation.com/en-us/products/hardware/allen-bradley.html', type: 'Electrical', category: 'Electrical & Automation' },
  { name: 'IFM', link: 'https://www.ifm.com/id/in', type: 'Electrical', category: 'Electrical & Automation' },
  { name: 'Weintek', link: 'https://www.weintek.com/', type: 'Electrical', category: 'Electrical & Automation' },
  { name: 'Fluke', link: 'https://www.fluke.com/', type: 'Electrical', category: 'Electrical & Automation' },
  { name: 'Ametek', link: 'https://www.ametekcalibration.com/', type: 'Electrical', category: 'Electrical & Automation' },
  { name: 'Olympus', link: 'https://www.olympus-global.com/', type: 'Electrical', category: 'Electrical & Automation' },
  { name: 'HIOKI', link: 'https://hioki.co.id/', type: 'Electrical', category: 'Electrical & Automation' },
  { name: 'Kyoritsu', link: 'https://www.kew-ltd.co.jp/en/', type: 'Electrical', category: 'Electrical & Automation' },
  { name: 'Yokogawa', link: 'https://www.yokogawa.com/id/solutions/products-and-services/', type: 'Electrical', category: 'Electrical & Automation' },
  { name: 'Flir', link: 'https://www.flir.com/', type: 'Electrical', category: 'Electrical & Automation' },
  { name: 'Rosemount', link: 'http://emerson.cn/en-cn', type: 'Electrical', category: 'Electrical & Automation' },

  // Machine Products
  { name: 'DN SOLUTIONS', link: 'https://www.dn-solutions.com/main.do', type: 'Mesin', category: 'Machine Products' },
  { name: 'MAKINO', link: 'https://www.makino.com/', type: 'Mesin', category: 'Machine Products' },
  { name: 'HNK', link: 'http://en.hnkkorea.com/sub01/03_01.php', type: 'Mesin', category: 'Machine Products' },
  { name: 'MAZAK', link: 'https://www.mazak.com/id-en/', type: 'Mesin', category: 'Machine Products' },
  { name: 'BROTHER', link: 'https://machinetool.global.brother/en-eu', type: 'Mesin', category: 'Machine Products' },
  { name: 'WELE', link: 'http://www.welegroup.com/en/', type: 'Mesin', category: 'Machine Products' },
  { name: 'TONE FAN', link: null, type: 'Mesin', category: 'Machine Products' },
  { name: 'SODICK', link: 'https://sodick.com/', type: 'Mesin', category: 'Machine Products' }, // fixing user typo SODDICK
  { name: 'HYPERTHERM', link: 'https://www.hypertherm.com/', type: 'Mesin', category: 'Machine Products' },

  // Machine Tooling Industry (Sandvik Coromant replacing Sandvik)
  { name: 'Sandvik Coromant', link: 'https://www.sandvik.coromant.com/en-gb', type: 'Tools', category: 'Tools Products' }, 
  { name: 'Kennametal', link: 'https://www.kennametal.com/us/en/home.html', type: 'Tools', category: 'Tools Products' },
  { name: 'Dormer Pramet', link: 'https://www.dormerpramet.com/', type: 'Tools', category: 'Tools Products' },
  { name: 'Hartner', link: 'https://www.hartner.de/?page_id=96&lang=en', type: 'Tools', category: 'Tools Products' },
  { name: 'Rohm', link: 'https://www.roehm.biz/en/', type: 'Tools', category: 'Tools Products' },
  { name: 'Nachi', link: 'https://www.nachi.de/product-portfolio/tools.html', type: 'Tools', category: 'Tools Products' },

  // Tools Products
  { name: 'TOPTUL', link: 'https://www.toptul.com/en/product.html', type: 'Tools', category: 'Tools Products' },
  { name: 'MAKITA', link: 'https://indomakita.com/', type: 'Tools', category: 'Tools Products' },
  { name: 'BOSCH REXROTH', link: 'https://www.boschrexroth.com/en/us/products/industrial-solutions/tightening-technology/bosch-production-tools/', type: 'Tools', category: 'Tools Products' },
  { name: 'HYTORC', link: 'https://www.hytorc.com/id/stealth', type: 'Tools', category: 'Tools Products' },
  { name: 'ELORA', link: 'https://products.elora.de/en/Products/Pliers/Precision-Pliers/Module-Pliers-OMS-5.html', type: 'Tools', category: 'Tools Products' },
  { name: 'TEKIRO', link: 'https://tekiro.com/', type: 'Tools', category: 'Tools Products' },
  { name: 'KERTZ', link: 'https://kertz-machine.com/', type: 'Tools', category: 'Tools Products' },

  // Heavy Equipment Spareparts
  { name: 'Caterpillar', link: 'https://www.caterpillar.com/', type: 'Mesin', category: 'Product Support' }, // fixing Catepilar typo
  { name: 'Komatsu', link: 'https://www.komatsu.co.id/spare-parts', type: 'Mesin', category: 'Product Support' },
  { name: 'Volvo', link: 'https://www.volvotrucks.id/id-id/services/parts-accessories/parts.html', type: 'Mesin', category: 'Product Support' },
  { name: 'Belaz', link: 'https://belaz.by/en/', type: 'Mesin', category: 'Product Support' },
  { name: 'Kamaz', link: 'https://kamazexport.ae/', type: 'Mesin', category: 'Product Support' },

  // Mechanical Products
  { name: 'Grundfos', link: 'https://www.grundfos.com/', type: 'Mechanical', category: 'Mechanical Products' },
  { name: 'TORISHIMA PUMP', link: 'https://www.torishima.co.jp/en/product/', type: 'Mechanical', category: 'Mechanical Products' },
  { name: 'Atlas Copco', link: 'https://www.atlascopco.com/id-id', type: 'Mechanical', category: 'Mechanical Products' },
  { name: 'Ingersoll Rand', link: 'https://www.ingersollrand.com/en-apac/products/', type: 'Mechanical', category: 'Mechanical Products' },
  { name: 'FAG', link: 'https://www.schaeffler.co.id/en/news_media/media_library/videos/downloadcenter_global_videos/?videoid=87565058&pvideoid=87567488&tab=mediathek-vid&subfilter=app:dc', type: 'Mechanical', category: 'Mechanical Products' },
  { name: 'SKF', link: 'https://www.skf.com/id', type: 'Mechanical', category: 'Mechanical Products' },
  { name: 'Fersa', link: 'https://www.fersa.com/en/', type: 'Mechanical', category: 'Mechanical Products' },
  { name: 'Bakrie Pipe', link: 'https://bakrie-pipe.com/public/id/berita-terkini/detail/piping-vs-pipeline-memahami-perbedaan-dan-standar-di-industri-migas', type: 'Mechanical', category: 'Mechanical Products' },
  { name: 'Bando', link: 'https://www.bandoindonesia.com/product-cov.html', type: 'Mechanical', category: 'Mechanical Products' },
  { name: 'Gates', link: 'https://www.gates.com/us/en.html', type: 'Mechanical', category: 'Mechanical Products' }
];

async function run() {
  try {
    for (const item of masterBrands) {
      // 1. Ensure category exists
      let [catRows] = await db.query('SELECT id FROM categories WHERE name = ?', [item.category]);
      let catId;
      if (catRows.length === 0) {
        const [res] = await db.query('INSERT INTO categories (name, description) VALUES (?, ?)', [item.category, '']);
        catId = res.insertId;
        console.log(`Created category ${item.category} ID: ${catId}`);
      } else {
        catId = catRows[0].id;
      }

      // 2. Identify if brand exists by exactly or loosely matching the name
      let normalizedName = item.name.toLowerCase();
      // Handle edge cases like "Sandvik" vs "Sandvik Coromant"
      let searchName = normalizedName.split(' ')[0]; // Match first word
      
      let [existingRows] = await db.query(`SELECT id, name FROM brands WHERE LOWER(name) = ? OR LOWER(name) LIKE ?`, [normalizedName, `${searchName}%`]);
      
      if (existingRows.length > 0) {
        // Find best match or update the first one
        // E.g., if there's "Sandvik", we update it to "Sandvik Coromant"
        // But wait! Bosch Rexroth and Bosch might collide. Let's just pick the exact match if there's any, or the first one.
        const exactMatch = existingRows.find(r => r.name.toLowerCase() === normalizedName);
        const targetId = exactMatch ? exactMatch.id : existingRows[0].id;
        
        await db.query(`
          UPDATE brands 
          SET category_id = ?, type = ?, external_link = ?, name = ?
          WHERE id = ?
        `, [catId, item.type, item.link, item.name, targetId]);
        console.log(`Updated existing brand: ${item.name} (replacing ID ${targetId})`);
      } else {
        // Did not exist: INSERT
        const [resParams] = await db.query(`
          INSERT INTO brands (category_id, name, type, external_link)
          VALUES (?, ?, ?, ?)
        `, [catId, item.name, item.type, item.link]);
        console.log(`Inserted new brand: ${item.name} (ID: ${resParams.insertId})`);
      }
    }
    
    console.log('✅ Done syncing all brands perfectly!');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}
run();
