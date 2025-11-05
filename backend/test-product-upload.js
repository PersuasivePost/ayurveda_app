const fs = require("fs");
const path = require("path");
const FormData = require("form-data");
const fetch = require("node-fetch");

require("dotenv").config();

const ADMIN_EMAIL = "ashvatth.j@somaiya.edu";
const ADMIN_PASSWORD = "Ashvatth@2006";
const API_BASE = process.env.API_BASE || "http://localhost:5000";

async function run() {
  try {
    // Step 1: Admin login
    console.log("Step 1: Admin login...");
    const loginRes = await fetch(`${API_BASE}/admin/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD }),
    });
    const loginData = await loginRes.json();
    if (!loginData.token) {
      console.error("Login failed:", loginData);
      process.exitCode = 2;
      return;
    }
    const token = loginData.token;
    console.log("✓ Login success, token:", token.substring(0, 20) + "...");

    // Step 2: Create a product with an image
    console.log("\nStep 2: Create product with image...");
    
    // Create a small test image (1x1 pixel PNG)
    const pngBuffer = Buffer.from([
      0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0x00, 0x00, 0x00, 0x0d, 0x49, 0x48, 0x44, 0x52,
      0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01, 0x08, 0x02, 0x00, 0x00, 0x00, 0x90, 0x77, 0x53,
      0xde, 0x00, 0x00, 0x00, 0x0c, 0x49, 0x44, 0x41, 0x54, 0x08, 0x99, 0x63, 0xf8, 0xcf, 0xc0, 0x00,
      0x00, 0x03, 0x01, 0x01, 0x00, 0x18, 0xdd, 0x8d, 0xb4, 0x00, 0x00, 0x00, 0x00, 0x49, 0x45, 0x4e,
      0x44, 0xae, 0x42, 0x60, 0x82,
    ]);

    const form = new FormData();
    form.append("name", "Test Product " + Date.now());
    form.append("price", 999);
    form.append("description", "Test product for Backblaze upload verification");
    form.append("image", pngBuffer, "test-image.png");

    const createRes = await fetch(`${API_BASE}/admin/products`, {
      method: "POST",
      headers: {
        ...form.getHeaders(),
        Authorization: `Bearer ${token}`,
      },
      body: form,
    });
    const createData = await createRes.json();
    if (!createData.product || !createData.product._id) {
      console.error("Create product failed:", createData);
      process.exitCode = 2;
      return;
    }
    console.log("✓ Product created:", createData.product._id);
    console.log("  Image URL:", createData.product.image);

    console.log("\n✓ Test complete!");
  } catch (e) {
    console.error("Error:", e.message);
    console.error(e);
    process.exitCode = 2;
  }
}

run();
