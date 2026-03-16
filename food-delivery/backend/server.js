const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/restaurants", require("./routes/restaurants"));
app.use("/api/orders", require("./routes/orders"));
app.use("/api/payment", require("./routes/payment"));

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
    seedData();
  })
  .catch((err) => console.log("❌ DB Error:", err));

// Seed sample restaurant data
async function seedData() {
  const Restaurant = require("./models/Restaurant");
  const count = await Restaurant.countDocuments();
  if (count === 0) {
    await Restaurant.insertMany([
      {
        name: "Spice Garden",
        image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400",
        cuisine: "Indian",
        rating: 4.5,
        deliveryTime: "30-40 min",
        minOrder: 150,
        menu: [
          { name: "Butter Chicken", price: 280, image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=200", category: "Main Course" },
          { name: "Paneer Tikka", price: 220, image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=200", category: "Starters" },
          { name: "Dal Makhani", price: 180, image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=200", category: "Main Course" },
          { name: "Garlic Naan", price: 40, image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=200", category: "Breads" }
        ]
      },
      {
        name: "Pizza Palace",
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400",
        cuisine: "Pizza",
        rating: 4.3,
        deliveryTime: "25-35 min",
        minOrder: 200,
        menu: [
          { name: "Margherita Pizza", price: 299, image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=200", category: "Pizza" },
          { name: "Pepperoni Pizza", price: 349, image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=200", category: "Pizza" },
          { name: "Garlic Bread", price: 99, image: "https://images.unsplash.com/photo-1619531040576-f9416740661f?w=200", category: "Sides" },
          { name: "Pasta Arrabiata", price: 199, image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=200", category: "Pasta" }
        ]
      },
      {
        name: "Burger Barn",
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400",
        cuisine: "Burgers",
        rating: 4.2,
        deliveryTime: "20-30 min",
        minOrder: 100,
        menu: [
          { name: "Classic Burger", price: 149, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200", category: "Burgers" },
          { name: "Cheese Burger", price: 179, image: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=200", category: "Burgers" },
          { name: "French Fries", price: 79, image: "https://images.unsplash.com/photo-1576107232684-1279f390859f?w=200", category: "Sides" },
          { name: "Chocolate Shake", price: 99, image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=200", category: "Drinks" }
        ]
      },
      {
        name: "Dragon Wok",
        image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400",
        cuisine: "Chinese",
        rating: 4.4,
        deliveryTime: "35-45 min",
        minOrder: 180,
        menu: [
          { name: "Fried Rice", price: 160, image: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=200", category: "Rice" },
          { name: "Hakka Noodles", price: 150, image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=200", category: "Noodles" },
          { name: "Manchurian", price: 180, image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=200", category: "Starters" },
          { name: "Spring Rolls", price: 120, image: "https://images.unsplash.com/photo-1606335543042-57c525922933?w=200", category: "Starters" }
        ]
      }
    ]);
    console.log("✅ Sample data seeded");
  }
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
