const express = require("express");
const Product = require("../models/Product");
const upload = require("../config/multer"); // <-- Cloudinary Multer config

const router = express.Router();

/**
 * CREATE Product
 */
router.post("/product", upload.array("images", 4), async (req, res) => {
  try {
    const {
      name, category, availability,
      oldPrice, newPrice, description,
      disclaimer, quantity, features,
    } = req.body;

    const newProduct = new Product({
      name,
      category,
      availability,
      oldPrice,
      newPrice,
      description,
      disclaimer,
      quantity,
      features: features ? JSON.parse(features) : [],
      images: req.files.map(file => file.path), // ✅ secure Cloudinary URLs
    });

    await newProduct.save();
    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product: newProduct,
    });
  } catch (error) {
    console.error("CREATE PRODUCT ERROR:", error);
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
router.put("/product/:id", upload.array("images"), async (req, res) => {
  try {
    let existingImages = [];
    if (req.body.existingImages) {
      try {
        existingImages = JSON.parse(req.body.existingImages);
      } catch (e) {
        console.error("Invalid existingImages JSON:", req.body.existingImages);
      }
    }

    const imageIndexes = req.body["imageIndexes[]"]
      ? Array.isArray(req.body["imageIndexes[]"])
        ? req.body["imageIndexes[]"].map((i) => parseInt(i))
        : [parseInt(req.body["imageIndexes[]"])]
      : [];

    const uploadedFiles = req.files || [];

    // Start with existing images
    let images = [...existingImages];

    // Replace images at indexes with new uploads
    uploadedFiles.forEach((file, i) => {
      const idx = imageIndexes[i];
      if (!isNaN(idx)) {
        images[idx] = file.path; // replace specific index
      } else {
        images.push(file.path); // fallback → append
      }
    });

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        images,
      },
      { new: true }
    );

    res.json({ success: true, data: updatedProduct });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
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
