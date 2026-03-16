import React from "react";
import { useNavigate } from "react-router-dom";

function RestaurantCard({ restaurant }) {
  const navigate = useNavigate();

  return (
    <div style={styles.card} onClick={() => navigate(`/restaurant/${restaurant._id}`)}>
      <img src={restaurant.image} alt={restaurant.name} style={styles.img} />
      <div style={styles.info}>
        <h3 style={styles.name}>{restaurant.name}</h3>
        <p style={styles.cuisine}>{restaurant.cuisine}</p>
        <div style={styles.row}>
          <span style={styles.rating}>⭐ {restaurant.rating}</span>
          <span style={styles.time}>🕒 {restaurant.deliveryTime}</span>
        </div>
        <p style={styles.minOrder}>Min order: ₹{restaurant.minOrder}</p>
      </div>
    </div>
  );
}

const styles = {
  card: {
    background: "white", borderRadius: "12px", overflow: "hidden",
    cursor: "pointer", boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
    transition: "transform 0.2s, box-shadow 0.2s",
    onMouseOver: "transform: translateY(-4px)"
  },
  img: { width: "100%", height: "180px", objectFit: "cover" },
  info: { padding: "15px" },
  name: { fontSize: "18px", fontWeight: "bold", marginBottom: "5px" },
  cuisine: { color: "#888", fontSize: "13px", marginBottom: "10px" },
  row: { display: "flex", gap: "15px", marginBottom: "8px" },
  rating: { color: "#ff6b00", fontWeight: "bold", fontSize: "14px" },
  time: { color: "#555", fontSize: "14px" },
  minOrder: { color: "#aaa", fontSize: "12px" }
};

export default RestaurantCard;
