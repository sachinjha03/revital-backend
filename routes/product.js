const express = require('express');
const multer = require('multer');
const path = require('path');
const Product = require('../models/Product');

const router = express.Router();

// Multer storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'Uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Fixed: originalname
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(new Error('Only JPEG and PNG files are allowed'), false);
    }
  },
});

// CREATE Product
router.post('/product', upload.array('images', 4), async (req, res) => {
  try {
    const {
      name,
      category,
      availability,
      oldPrice,
      newPrice,
      description,
      disclaimer,
      quantity,
      features,
    } = req.body;

    const parsedFeatures = features ? JSON.parse(features) : [];
    const imagePaths = req.files ? req.files.map((file) => file.path) : [];

    const newProduct = new Product({
      name,
      category,
      availability,
      oldPrice,
      newPrice,
      description,
      features: Array.isArray(parsedFeatures) ? parsedFeatures : [],
      disclaimer,
      quantity,
      images: imagePaths,
    });

    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.error('POST /product error:', error);
    res.status(500).json({ success: false, reason: error.message });
  }
});

// READ All Products
router.get('/product', async (req, res) => {
  try {
    const products = await Product.find();
    res.json({ success: true, data: products });
  } catch (error) {
    console.error('GET /product error:', error);
    res.status(500).json({ success: false, reason: error.message });
  }
});

// READ Single Product by ID
router.get('/product/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product Not Found' });
    }
    res.json({ success: true, data: product });
  } catch (error) {
    console.error('GET /product/:id error:', error);
    res.status(500).json({ success: false, reason: error.message });
  }
});

// UPDATE Product by ID
router.put('/product/:id', upload.array('images', 4), async (req, res) => {
  try {
    const id = req.params.id;
    const {
      name,
      category,
      availability,
      oldPrice,
      newPrice,
      description,
      disclaimer,
      quantity,
      features,
      existingImages,
    } = req.body;

    const parsedFeatures = features ? JSON.parse(features) : [];
    const parsedExistingImages = existingImages ? JSON.parse(existingImages) : [];
    const newImages = req.files ? req.files.map((file) => file.path) : [];
    const finalImages = [...parsedExistingImages, ...newImages];

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        name,
        category,
        availability,
        oldPrice,
        newPrice,
        description,
        features: Array.isArray(parsedFeatures) ? parsedFeatures : [],
        disclaimer,
        quantity,
        images: finalImages,
      },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ success: false, message: 'Product Not Found' });
    }

    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    console.error('PUT /product/:id error:', error);
    res.status(500).json({ success: false, reason: error.message });
  }
});

// DELETE Product by ID
router.delete('/product/:id', async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ success: false, message: 'Product Not Found' });
    }
    res.json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    console.error('DELETE /product/:id error:', error);
    res.status(500).json({ success: false, reason: error.message });
  }
});

module.exports = router;