/**
 * One-off: creates the Reviews table in Airtable and imports seed data.
 * Run: node scripts/setup-reviews.js
 */
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse/sync');
require('dotenv').config();

const TOKEN = process.env.AIRTABLE_API_TOKEN;
const BASE  = process.env.AIRTABLE_BASE_ID;
if (!TOKEN || !BASE) { console.error('Missing env vars'); process.exit(1); }

const meta = axios.create({
  baseURL: `https://api.airtable.com/v0/meta/bases/${BASE}`,
  headers: { Authorization: `Bearer ${TOKEN}`, 'Content-Type': 'application/json' }
});

const data = axios.create({
  baseURL: `https://api.airtable.com/v0/${BASE}`,
  headers: { Authorization: `Bearer ${TOKEN}`, 'Content-Type': 'application/json' }
});

async function main() {
  // 1. Create the Reviews table via Meta API
  console.log('Creating Reviews table...');
  let tableId;
  try {
    const res = await meta.post('/tables', {
      name: 'Reviews',
      fields: [
        { name: 'Name',      type: 'singleLineText' },
        { name: 'quote',     type: 'multilineText' },
        { name: 'source',    type: 'singleLineText' },
        { name: 'rating',    type: 'number', options: { precision: 0 } },
        { name: 'sortOrder', type: 'number', options: { precision: 0 } }
      ]
    });
    tableId = res.data.id;
    console.log('Table created:', tableId);
  } catch (err) {
    if (err.response?.data?.error?.type === 'TABLE_EXISTS') {
      console.log('Table already exists, continuing with import...');
    } else {
      throw err;
    }
  }

  // 2. Import seed records
  const csv = fs.readFileSync(path.join(__dirname, '../imports/Reviews.csv'), 'utf8');
  const rows = parse(csv, { columns: true, skip_empty_lines: true, trim: true });

  const records = rows.map(r => ({
    fields: {
      Name: r.Name,
      quote: r.quote,
      source: r.source,
      rating: Number(r.rating),
      sortOrder: Number(r.sortOrder)
    }
  }));

  console.log('Importing', records.length, 'reviews...');
  const res = await data.post('/Reviews', { records });
  console.log('Created', res.data.records.length, 'records. Done!');
}

main().catch(err => { console.error(err.response?.data || err.message); process.exit(1); });
