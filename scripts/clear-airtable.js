const axios = require('axios');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const AIRTABLE_API_TOKEN = process.env.AIRTABLE_API_TOKEN;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;

const api = axios.create({
  baseURL: `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}`,
  headers: {
    Authorization: `Bearer ${AIRTABLE_API_TOKEN}`,
    'Content-Type': 'application/json'
  }
});

async function deleteAllRecords(tableName) {
  try {
    console.log(`🗑️  Clearing ${tableName}...`);

    const response = await api.get(`/${tableName}`);
    const records = response.data.records;

    // Delete in batches of 10
    for (let i = 0; i < records.length; i += 10) {
      const batch = records.slice(i, i + 10).map(r => r.id);
      const params = batch.map((id, idx) => `records[]=${id}`).join('&');

      await api.delete(`/${tableName}?${params}`);
      console.log(`  ✓ Deleted ${batch.length} records`);
    }

    console.log(`✅ ${tableName} cleared!\n`);
  } catch (error) {
    console.error(`Error clearing ${tableName}:`, error.response?.data || error.message);
  }
}

async function main() {
  console.log('🔄 Clearing Airtable tables...\n');

  await deleteAllRecords('Cocktails');
  await deleteAllRecords('HappyHour');
  await deleteAllRecords('OpeningHours');
  await deleteAllRecords('Wines');
  await deleteAllRecords('HotBeverages');
  await deleteAllRecords('MenuTabs');
  await deleteAllRecords('MenuSections');
  await deleteAllRecords('MenuItems');
  await deleteAllRecords('DeliveryOptions');
  await deleteAllRecords('Reviews');

  console.log('✅ Tables cleared! Now run:\n   node scripts/import-airtable.js\n');
}

main();
