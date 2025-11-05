require('dotenv').config();
const { S3Client, ListObjectsV2Command } = require('@aws-sdk/client-s3');

let derivedRegion = process.env.B2_REGION;
if (!derivedRegion && process.env.B2_S3_ENDPOINT) {
  const m = process.env.B2_S3_ENDPOINT.match(/s3\.([a-z0-9-]+)\.backblazeb2\.com/i);
  if (m && m[1]) derivedRegion = m[1];
}
derivedRegion = derivedRegion || "us-west-001";

const s3 = new S3Client({
  endpoint: process.env.B2_S3_ENDPOINT,
  region: derivedRegion,
  credentials: {
    accessKeyId: process.env.B2_KEY_ID,
    secretAccessKey: process.env.B2_APP_KEY,
  },
});

async function run() {
  try {
    console.log(`Listing objects in bucket: ${process.env.B2_BUCKET}`);
    const res = await s3.send(new ListObjectsV2Command({
      Bucket: process.env.B2_BUCKET,
      MaxKeys: 20,
    }));
    
    if (!res.Contents || res.Contents.length === 0) {
      console.log('❌ No objects found in bucket!');
    } else {
      console.log(`✓ Found ${res.Contents.length} objects:\n`);
      res.Contents.forEach((obj) => {
        console.log(`  - Key: ${obj.Key}`);
        console.log(`    Size: ${obj.Size} bytes`);
        console.log(`    Modified: ${obj.LastModified}`);
      });
    }
  } catch (e) {
    console.error('Error:', e && e.message ? e.message : e);
    process.exitCode = 2;
  }
}

run();
