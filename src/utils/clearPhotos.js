require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });
const db = require('../config/db');

async function clearPhotos() {
  try {
    console.log('Clearing photos table...');
    await db.query('TRUNCATE TABLE photos');
    console.log('Successfully cleared photos table.');
    process.exit(0);
  } catch (err) {
    console.error('Error clearing photos:', err);
    process.exit(1);
  }
}

clearPhotos();
