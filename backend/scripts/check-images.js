require('dotenv').config();
const mongoose = require('mongoose');
const fetch = require('node-fetch');
const Product = require('../schema/Product');

async function run() {
  await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log('Connected to MongoDB');

  const products = await Product.find().select('name image');
  console.log(`Found ${products.length} products. Checking images...`);

  let failures = 0;
  for (const p of products) {
    const url = p.image;
    if (!url) {
      console.log(`- ${p._id} (${p.name}): no image`);
      continue;
    }

    let testUrl = url;
    // If the image is a relative path on our server, convert to full URL
    if (!/^https?:/i.test(testUrl)) {
      const base = process.env.API_BASE_URL || `http://localhost:${process.env.PORT || 5000}`;
      testUrl = base + (testUrl.startsWith('/') ? '' : '/') + url;
    }

    try {
      const res = await fetch(testUrl, { method: 'GET' });
      if (res.ok) {
        console.log(`- ${p._id} (${p.name}): OK ${res.status} ${res.headers.get('content-type') || ''} -> ${testUrl}`);
      } else {
        failures++;
        console.warn(`- ${p._id} (${p.name}): FAIL ${res.status} ${res.statusText} -> ${testUrl}`);
      }
    } catch (e) {
      failures++;
      console.error(`- ${p._id} (${p.name}): ERROR ${e && e.message ? e.message : e} -> ${testUrl}`);
    }
  }

  console.log(`\nDone. Failures: ${failures}`);
  await mongoose.disconnect();
}

run().catch(e => { console.error(e); process.exitCode = 2; });
