const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse/sync');
require('dotenv').config();

const AIRTABLE_API_TOKEN = process.env.AIRTABLE_API_TOKEN;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;

if (!AIRTABLE_API_TOKEN || !AIRTABLE_BASE_ID) {
  console.error('Error: AIRTABLE_API_TOKEN and AIRTABLE_BASE_ID must be set in .env file');
  process.exit(1);
}

const api = axios.create({
  baseURL: `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}`,
  headers: {
    Authorization: `Bearer ${AIRTABLE_API_TOKEN}`,
    'Content-Type': 'application/json'
  }
});

// CSV parsing helper using csv-parse library
function parseCSV(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const records = parse(content, {
    columns: true,
    skip_empty_lines: true,
    trim: true
  });

  const NUMBER_FIELDS = new Set(['sortOrder', 'column', 'rating']);
  const BOOL_FIELDS = new Set(['happyHour', 'closed']);

  return records.map(row => {
    const cleanRow = {};
    for (const [key, value] of Object.entries(row)) {
      if (BOOL_FIELDS.has(key)) {
        cleanRow[key] = value.toUpperCase() === 'TRUE';
      } else if (NUMBER_FIELDS.has(key)) {
        cleanRow[key] = value === '' ? null : Number(value);
      } else {
        cleanRow[key] = value === '' ? null : value;
      }
    }
    // Remove null fields so Airtable ignores them
    for (const key of Object.keys(cleanRow)) {
      if (cleanRow[key] === null) delete cleanRow[key];
    }
    return cleanRow;
  });
}

async function uploadToAirtable(tableName, filePath) {
  try {
    console.log(`📤 Uploading ${tableName}...`);
    const records = parseCSV(filePath);

    // Airtable API has a batch limit of 10 records per request
    for (let i = 0; i < records.length; i += 10) {
      const batch = records.slice(i, i + 10);
      const fieldsArray = batch.map(fields => ({ fields }));

      const response = await api.post(`/${tableName}`, { records: fieldsArray });
      console.log(`  ✓ Uploaded ${response.data.records.length} records`);
    }

    console.log(`✅ ${tableName} complete!\n`);
  } catch (error) {
    if (error.response) {
      console.error(`❌ Error uploading ${tableName}:`);
      console.error('Status:', error.response.status);
      console.error('Data:', error.response.data);
    } else {
      console.error(`❌ Error uploading ${tableName}:`, error.message);
    }
    process.exit(1);
  }
}

async function main() {
  console.log('🚀 Starting Airtable data import...\n');

  try {
    await uploadToAirtable('Cocktails', path.join(__dirname, '../imports/Cocktails.csv'));
    await uploadToAirtable('HappyHour', path.join(__dirname, '../imports/HappyHour.csv'));
    await uploadToAirtable('OpeningHours', path.join(__dirname, '../imports/OpeningHours.csv'));
    await uploadToAirtable('Wines', path.join(__dirname, '../imports/Wines.csv'));
    await uploadToAirtable('HotBeverages', path.join(__dirname, '../imports/HotBeverages.csv'));
    await uploadToAirtable('MenuTabs', path.join(__dirname, '../imports/MenuTabs.csv'));
    await uploadToAirtable('MenuSections', path.join(__dirname, '../imports/MenuSections.csv'));
    await uploadToAirtable('MenuItems', path.join(__dirname, '../imports/MenuItems.csv'));
    await uploadToAirtable('DeliveryOptions', path.join(__dirname, '../imports/DeliveryOptions.csv'));
    await uploadToAirtable('Reviews', path.join(__dirname, '../imports/Reviews.csv'));

    console.log('🎉 All data imported successfully!');
    console.log('\nNext steps:');
    console.log('1. Get your Airtable API token from: https://airtable.com/account/tokens');
    console.log('2. Deploy your backend API to Vercel/Netlify');
    console.log('3. Your website will start pulling live data from Airtable!');
  } catch (error) {
    console.error('Import failed:', error.message);
    process.exit(1);
  }
}

main();
