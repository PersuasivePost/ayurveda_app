require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../schema/Product');
const Doctor = require('../schema/Doctor');

async function fix() {
  await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log('Connected to MongoDB');

  const bucketHost = (process.env.B2_S3_ENDPOINT || '').replace(/^https?:\/\//, '');
  const bucketName = process.env.B2_BUCKET;
  const hostPrefix = `https://${bucketName}.${bucketHost}`;

  // Fix products
  const products = await Product.find({ image: { $regex: '%2F' } }).limit(1000);
  console.log(`Found ${products.length} products with encoded image URLs`);
  for (const p of products) {
    const old = p.image;
    if (old && old.includes(hostPrefix) && old.includes('%2F')) {
      const fixed = old.replace(/%2F/g, '/');
      p.image = fixed;
      await p.save();
      console.log(`Updated product ${p._id}: ${old} -> ${fixed}`);
    }
  }

  // Fix doctors
  const doctors = await Doctor.find({ image: { $regex: '%2F' } }).limit(1000);
  console.log(`Found ${doctors.length} doctors with encoded image URLs`);
  for (const d of doctors) {
    const old = d.image;
    if (old && old.includes(hostPrefix) && old.includes('%2F')) {
      const fixed = old.replace(/%2F/g, '/');
      d.image = fixed;
      await d.save();
      console.log(`Updated doctor ${d._id}: ${old} -> ${fixed}`);
    }
  }

  await mongoose.disconnect();
  console.log('Done');
}

fix().catch(err => { console.error(err); process.exitCode = 2; });
