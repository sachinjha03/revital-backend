// import mongoose from "mongoose";
const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true
    },
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    contact: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    paymentMode: {
      type: String,
      enum: ["COD", "UPI", "CARD"],
      default: "COD"
    },
    status: {
      type: String,
      default:"Pending"
    }
  },
  { timestamps: true }
);


const Order = new mongoose.model("Order" , orderSchema)

module.exports = Order;