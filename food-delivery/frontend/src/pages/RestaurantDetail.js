import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getRestaurant } from "../api/axios";
import MenuItem from "../components/MenuItem";

function RestaurantDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const { items, total } = useSelector((state) => state.cart);

  useEffect(() => {
    getRestaurant(id).then((res) => setRestaurant(res.data));
  }, [id]);

  if (!restaurant) return <p style={styles.loading}>Loading...</p>;

  const categories = ["All", ...new Set(restaurant.menu.map((m) => m.category))];
  const filteredMenu =
    activeCategory === "All"
      ? restaurant.menu
      : restaurant.menu.filter((m) => m.category === activeCategory);

  const cartCount = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <div style={styles.page}>
      {/* Banner */}
      <div style={styles.banner}>
        <img src={restaurant.image} alt={restaurant.name} style={styles.bannerImg} />
        <div style={styles.bannerOverlay}>
          <h1 style={styles.restName}>{restaurant.name}</h1>
          <p style={styles.restInfo}>
            {restaurant.cuisine} • ⭐ {restaurant.rating} • 🕒 {restaurant.deliveryTime}
          </p>
        </div>
      </div>

      <div style={styles.content}>
        {/* Category Tabs */}
        <div style={styles.tabs}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                ...styles.tab,
                borderBottom: activeCategory === cat ? "3px solid #ff6b00" : "3px solid transparent",
                color: activeCategory === cat ? "#ff6b00" : "#555"
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Menu Items */}
        <div style={styles.menu}>
          {filteredMenu.map((item) => (
            <MenuItem key={item._id} item={item} restaurantName={restaurant.name} />
          ))}
        </div>
      </div>

      {/* Cart Sticky Button */}
      {cartCount > 0 && (
        <div style={styles.cartBar}>
          <span>{cartCount} item(s) | ₹{total}</span>
          <button style={styles.viewCartBtn} onClick={() => navigate("/cart")}>
            View Cart →
          </button>
        </div>
      )}
    </div>
  );
}

const styles = {
  page: { minHeight: "100vh", background: "#f5f5f5" },
  loading: { textAlign: "center", padding: "50px", fontSize: "18px", color: "#888" },
  banner: { position: "relative", height: "250px" },
  bannerImg: { width: "100%", height: "250px", objectFit: "cover" },
  bannerOverlay: {
    position: "absolute", bottom: 0, left: 0, right: 0,
    background: "linear-gradient(transparent, rgba(0,0,0,0.8))",
    padding: "20px 30px", color: "white"
  },
  restName: { fontSize: "28px", fontWeight: "bold", marginBottom: "5px" },
  restInfo: { fontSize: "14px", opacity: 0.9 },
  content: { maxWidth: "800px", margin: "0 auto", padding: "20px" },
  tabs: {
    display: "flex", gap: "5px", background: "white",
    borderRadius: "10px", padding: "5px", marginBottom: "20px",
    boxShadow: "0 1px 5px rgba(0,0,0,0.08)", overflowX: "auto"
  },
  tab: {
    padding: "10px 20px", background: "transparent", border: "none",
    cursor: "pointer", fontWeight: "600", fontSize: "14px",
    whiteSpace: "nowrap", transition: "all 0.2s"
  },
  menu: { paddingBottom: "80px" },
  cartBar: {
    position: "fixed", bottom: "20px", left: "50%",
    transform: "translateX(-50%)", background: "#ff6b00",
    color: "white", padding: "15px 30px", borderRadius: "30px",
    display: "flex", alignItems: "center", gap: "20px",
    boxShadow: "0 4px 20px rgba(255,107,0,0.4)", zIndex: 100,
    fontSize: "15px", fontWeight: "bold"
  },
  viewCartBtn: {
    background: "white", color: "#ff6b00", border: "none",
    padding: "8px 20px", borderRadius: "20px",
    fontWeight: "bold", cursor: "pointer", fontSize: "14px"
  }
};

export default RestaurantDetail;
