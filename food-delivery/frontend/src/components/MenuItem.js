import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem } from "../redux/cartSlice";

function MenuItem({ item, restaurantName }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const cartItem = cartItems.find((i) => i._id === item._id);
  const qty = cartItem ? cartItem.quantity : 0;

  return (
    <div style={styles.card}>
      <img src={item.image} alt={item.name} style={styles.img} />
      <div style={styles.info}>
        <h4 style={styles.name}>{item.name}</h4>
        <p style={styles.category}>{item.category}</p>
        <p style={styles.price}>₹{item.price}</p>
      </div>
      <div style={styles.actions}>
        {qty === 0 ? (
          <button
            style={styles.addBtn}
            onClick={() => dispatch(addItem({ item, restaurantName }))}
          >
            ADD
          </button>
        ) : (
          <div style={styles.counter}>
            <button style={styles.countBtn} onClick={() => dispatch(removeItem(item))}>−</button>
            <span style={styles.qty}>{qty}</span>
            <button style={styles.countBtn} onClick={() => dispatch(addItem({ item, restaurantName }))}>+</button>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  card: {
    display: "flex", alignItems: "center", background: "white",
    borderRadius: "10px", padding: "15px", marginBottom: "12px",
    boxShadow: "0 1px 5px rgba(0,0,0,0.08)"
  },
  img: { width: "80px", height: "80px", borderRadius: "8px", objectFit: "cover" },
  info: { flex: 1, paddingLeft: "15px" },
  name: { fontSize: "16px", fontWeight: "600", marginBottom: "4px" },
  category: { color: "#aaa", fontSize: "12px", marginBottom: "4px" },
  price: { color: "#ff6b00", fontWeight: "bold", fontSize: "15px" },
  actions: { marginLeft: "10px" },
  addBtn: {
    background: "#ff6b00", color: "white", border: "none",
    padding: "8px 18px", borderRadius: "6px", fontWeight: "bold",
    fontSize: "14px", cursor: "pointer"
  },
  counter: { display: "flex", alignItems: "center", gap: "10px" },
  countBtn: {
    background: "#ff6b00", color: "white", border: "none",
    width: "30px", height: "30px", borderRadius: "50%",
    fontSize: "18px", cursor: "pointer", fontWeight: "bold"
  },
  qty: { fontWeight: "bold", fontSize: "16px", minWidth: "20px", textAlign: "center" }
};

export default MenuItem;
