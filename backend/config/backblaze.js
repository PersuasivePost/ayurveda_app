const fs = require("fs");
const path = require("path");
const { S3Client, PutObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

if (!process.env.B2_S3_ENDPOINT || !process.env.B2_BUCKET || !process.env.B2_KEY_ID || !process.env.B2_APP_KEY) {
  console.warn("Backblaze configuration incomplete. Image uploads to Backblaze will fail until B2_* env vars are set.");
}

let derivedRegion = process.env.B2_REGION;
if (!derivedRegion && process.env.B2_S3_ENDPOINT) {
  try {
    const m = process.env.B2_S3_ENDPOINT.match(/s3\.([a-z0-9-]+)\.backblazeb2\.com/i);
    if (m && m[1]) derivedRegion = m[1];
  } catch (e) {
    // ignore - we'll fall back to a default below
  }
}
derivedRegion = derivedRegion || "us-west-001";

const s3 = new S3Client({
  endpoint: process.env.B2_S3_ENDPOINT, // include scheme
  region: derivedRegion,
  credentials: {
    accessKeyId: process.env.B2_KEY_ID,
    secretAccessKey: process.env.B2_APP_KEY,
  },
});

async function uploadBuffer(buffer, key, contentType) {
  if (!process.env.B2_S3_ENDPOINT || !process.env.B2_BUCKET) {
    throw new Error("Backblaze S3 not configured (B2_S3_ENDPOINT or B2_BUCKET missing)");
  }

  console.log(`[B2] Uploading to bucket="${process.env.B2_BUCKET}" key="${key}" size=${buffer.length} bytes contentType="${contentType}"`);

  const params = {
    Bucket: process.env.B2_BUCKET,
    Key: key,
    Body: buffer,
    ContentType: contentType || "application/octet-stream",
  };

  let res;
  try {
    console.log(`[B2] Sending PutObjectCommand...`);
    res = await s3.send(new PutObjectCommand(params));
    console.log(`[B2] PutObjectCommand response:`, JSON.stringify(res, null, 2));
  } catch (e) {
    console.error("[B2] PutObjectCommand failed:", e && e.message ? e.message : e);
    console.error("[B2] Full error:", e);
    throw e;
  }

  // Build public URL. If user provided B2_PUBLIC_URL use it; otherwise derive from endpoint.
  if (process.env.B2_PUBLIC_URL) {
    // encodeURI preserves slashes so folder paths remain intact (products/..)
    const url = `${process.env.B2_PUBLIC_URL.replace(/\/$/, "")}/${encodeURI(key)}`;
    console.log(`[B2] Upload success! URL: ${url}`);
    return url;
  }

  // strip protocol from endpoint if present
  const ep = process.env.B2_S3_ENDPOINT.replace(/^https?:\/\//, "");
  // use encodeURI so slashes are preserved in the path (so objects stored under "products/..." resolve correctly)
  const url = `https://${process.env.B2_BUCKET}.${ep}/${encodeURI(key)}`;
  console.log(`[B2] Upload success! URL: ${url}`);
  return url;
}

module.exports = { uploadBuffer };

// Generate a presigned GET URL for a stored object (useful when bucket is private)
module.exports.getPresignedUrl = async function (key, expiresSeconds = 300) {
  if (!process.env.B2_S3_ENDPOINT || !process.env.B2_BUCKET) {
    throw new Error("Backblaze S3 not configured (B2_S3_ENDPOINT or B2_BUCKET missing)");
  }

  const params = {
    Bucket: process.env.B2_BUCKET,
    Key: key,
  };

  try {
    const url = await getSignedUrl(s3, new GetObjectCommand(params), { expiresIn: expiresSeconds });
    return url;
  } catch (e) {
    console.error('[B2] getPresignedUrl failed:', e && e.message ? e.message : e);
    throw e;
  }
}
