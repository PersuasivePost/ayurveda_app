const fetch = require('node-fetch');
require('dotenv').config();

async function run() {
  const api = process.env.API_BASE_URL || `http://localhost:${process.env.PORT || 5000}`;
  console.log('Fetching products from', api + '/products');
  const res = await fetch(api + '/products');
  const data = await res.json();
  const products = data.products || [];
  console.log(`Got ${products.length} products`);
  for (const p of products) {
    const url = p.image;
    if (!url) {
      console.log(`${p._id} - no image`);
      continue;
    }
    console.log(`${p._id} - image URL: ${url}`);
    try {
      const r = await fetch(url, { method: 'GET' });
      console.log(`  -> ${r.status} ${r.statusText} content-type: ${r.headers.get('content-type')}`);
    } catch (e) {
      console.log('  -> fetch error:', e.message || e);
    }
  }
}

run().catch(e=>{console.error(e);process.exitCode=2});
