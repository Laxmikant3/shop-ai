require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json()); // Middleware to parse JSON request bodies

const DUMMYJSON_API_URL = "https://dummyjson.com/products";
let combinedProducts = [];

// Fetch product data from DummyJSON API and store in combinedProducts
const fetchProducts = async () => {
  try {
    const response = await axios.get(DUMMYJSON_API_URL);
    if (response.status === 200) {
      combinedProducts = response.data.products || [];
      console.log("✅ Products from DummyJSON API added to dataset.");
    } else {
      console.error(`❌ Failed to fetch products. Status: ${response.status}`);
    }
  } catch (error) {
    console.error("❌ API Request failed:", error.message);
  }
};

// Handle product search request
app.post("/search", async (req, res) => {
  try {
    const { value } = req.body;
    if (!value) {
      return res.status(400).json({ error: "Missing search value" });
    }

    console.log(`🔍 Searching for: ${value}`);

    // Search for products by title
    const foundProducts = combinedProducts.filter(
      (product) => product.title.toLowerCase() === value.toLowerCase()
    );

    let displayProducts = [];
    if (foundProducts.length > 0) {
      // Find products in the same category as foundProducts
      const foundCategory = foundProducts[0].category.toLowerCase();
      displayProducts = combinedProducts.filter(
        (product) => product.category.toLowerCase() === foundCategory
      );
    }

    if (displayProducts.length > 0) {
      console.log(`✅ Found ${displayProducts.length} products for category.`);
    } else {
      console.log("❌ No products found.");
    }

    res.json({ results: displayProducts });
  } catch (error) {
    console.error("❌ Search failed:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Fetch products on startup
fetchProducts();

// Start the server
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
