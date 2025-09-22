const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  availability: {
    type: String,
    enum: ['Available In Stocks', 'Out Of Stocks'],
    default: 'Available In Stocks',
  },
  oldPrice: { type: Number, required: true },
  newPrice: { type: Number, required: true },
  description: { type: String, required: true },
  features: { type: [String], default: [] },
  disclaimer: { type: String },
  quantity: { type: Number, required: true },
  images: { type: [String], required: true },
  createdAt: { type: Date, default: Date.now },
});

const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;