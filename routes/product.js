const express = require("express");
const Product = require("../models/Product");
const upload = require("../config/multer"); // <-- Cloudinary Multer config

const router = express.Router();

/**
 * CREATE Product
 */
router.post("/create-product", upload.single("image"), async (req, res) => {
  try {
    const { name, price, description, features } = req.body;

    const newProduct = new Product({
      name,
      price,
      description,
      features: features ? JSON.parse(features) : [],
      image: req.file?.path, // Cloudinary provides secure URL
    });

    await newProduct.save();
    res
      .status(201)
      .json({ success: true, message: "Product created successfully", product: newProduct });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * READ All Products
 */
router.get("/product", async (req, res) => {
  try {
    const products = await Product.find();
    res.json({ success: true, data: products });
  } catch (error) {
    console.error("GET /product error:", error);
    res.status(500).json({ success: false, reason: error.message });
  }
});

/**
 * READ Single Product by ID
 */
router.get("/product/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product Not Found" });
    }
    res.json({ success: true, data: product });
  } catch (error) {
    console.error("GET /product/:id error:", error);
    res.status(500).json({ success: false, reason: error.message });
  }
});

/**
 * UPDATE Product by ID
 */
router.put("/update-product/:id", upload.single("image"), async (req, res) => {
  try {
    const { name, price, description, features } = req.body;

    const updatedData = {
      name,
      price,
      description,
      features: features ? JSON.parse(features) : [],
    };

    if (req.file) {
      updatedData.image = req.file.path; // New Cloudinary URL
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product Not Found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Product updated successfully", product });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * DELETE Product by ID
 */
router.delete("/product/:id", async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product Not Found" });
    }
    res.json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    console.error("DELETE /product/:id error:", error);
    res.status(500).json({ success: false, reason: error.message });
  }
});

module.exports = router;
