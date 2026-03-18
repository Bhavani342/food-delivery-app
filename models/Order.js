const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  restaurant: { type: String, required: true },
  items: [
    {
      name: String,
      price: Number,
      quantity: Number,
      image: String
    }
  ],
  totalAmount: Number,
  status: {
    type: String,
    default: "Pending",
    enum: ["Pending", "Confirmed", "Preparing", "Out for Delivery", "Delivered"]
  },
  paymentId: { type: String, default: "" },
  address: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Order", orderSchema);
