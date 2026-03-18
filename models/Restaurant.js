const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: String,
  cuisine: String,
  rating: { type: Number, default: 4.0 },
  deliveryTime: String,
  minOrder: { type: Number, default: 100 },
  menu: [
    {
      name: String,
      price: Number,
      image: String,
      category: String
    }
  ]
});

module.exports = mongoose.model("Restaurant", restaurantSchema);
