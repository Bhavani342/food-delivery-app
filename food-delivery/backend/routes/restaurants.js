const express = require("express");
const Restaurant = require("../models/Restaurant");
const router = express.Router();

// Get all restaurants
router.get("/", async (req, res) => {
  try {
    const { search, cuisine } = req.query;
    let query = {};
    if (search) query.name = { $regex: search, $options: "i" };
    if (cuisine && cuisine !== "All") query.cuisine = cuisine;
    const restaurants = await Restaurant.find(query);
    res.json(restaurants);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single restaurant
router.get("/:id", async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) return res.status(404).json({ message: "Not found" });
    res.json(restaurant);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
