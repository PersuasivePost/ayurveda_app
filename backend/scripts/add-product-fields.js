require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("../schema/Product");

async function addDefaultFields() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB");

    // Update all existing products to have the new fields
    const result = await Product.updateMany(
      {},
      {
        $setOnInsert: {
          stock: 100,
          avgRating: 0,
          reviewCount: 0,
          reviews: [],
          benefits: [],
          ingredients: [],
          tags: [],
          images: [],
        },
      }
    );

    console.log(`Updated ${result.modifiedCount} products with default fields`);

    // Also update with $set for missing fields
    const updateResult = await Product.updateMany(
      {
        $or: [
          { stock: { $exists: false } },
          { avgRating: { $exists: false } },
          { reviewCount: { $exists: false } },
          { reviews: { $exists: false } },
        ],
      },
      {
        $set: {
          stock: 100,
          avgRating: 0,
          reviewCount: 0,
          reviews: [],
          benefits: [],
          ingredients: [],
          tags: [],
          images: [],
        },
      }
    );

    console.log(`Modified ${updateResult.modifiedCount} products`);

    const allProducts = await Product.find().select("name price");
    console.log(`Total products in database: ${allProducts.length}`);
    allProducts.forEach((p) => {
      console.log(`  - ${p.name} (₹${p.price})`);
    });

    process.exit(0);
  } catch (err) {
    console.error("Error:", err);
    process.exit(1);
  }
}

addDefaultFields();
