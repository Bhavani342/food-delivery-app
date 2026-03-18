const express = require("express");
const Order = require("../models/Order");
const auth = require("../middleware/auth");
const router = express.Router();

// Create order
router.post("/", auth, async (req, res) => {
  try {
    const { restaurant, items, totalAmount, address, paymentId } = req.body;
    const order = await Order.create({
      user: req.user.id,
      restaurant,
      items,
      totalAmount,
      address,
      paymentId
    });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get user orders
router.get("/my-orders", auth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
