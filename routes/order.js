// import express from "express";
// import Order from "../models/Order.js";
const express = require('express');
const Order = require("../models/Order")


const router = express.Router();

// ✅ Create New Order
router.post("/order", async (req, res) => {
  try {
    const { productId, name,email, contact, address, paymentMode } = req.body;

    if (!productId || !name || !email || !contact || !address) {
      return res.status(400).json({ success: false, reason: "Missing required fields" });
    }

    const newOrder = new Order({
      productId,
      name,
      email,
      contact,
      address,
      paymentMode
    });

    await newOrder.save();
    res.status(201).json({ success: true, data: newOrder });
  } catch (err) {
    res.status(500).json({ success: false, reason: err.message });
  }
});

// ✅ Get All Orders
router.get("/order", async (req, res) => {
  try {
    const orders = await Order.find().populate("productId");
    res.status(200).json({ success: true, data: orders });
  } catch (err) {
    res.status(500).json({ success: false, reason: err.message });
  }
});

// ✅ Get Single Order by ID
router.get("/order/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("productId");
    if (!order) {
      return res.status(404).json({ success: false, reason: "Order not found" });
    }
    res.status(200).json({ success: true, data: order });
  } catch (err) {
    res.status(500).json({ success: false, reason: err.message });
  }
});

// ✅ Update Order Status
router.put("/order/:id", async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ success: false, reason: "Order not found" });
    }

    res.status(200).json({ success: true, data: order });
  } catch (err) {
    res.status(500).json({ success: false, reason: err.message });
  }
});

// ✅ Delete Order
router.delete("/order/:id", async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).json({ success: false, reason: "Order not found" });
    }
    res.status(200).json({ success: true, message: "Order deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, reason: err.message });
  }
});

module.exports = router;
// export default router;

