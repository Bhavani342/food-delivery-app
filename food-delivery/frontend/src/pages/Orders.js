import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getMyOrders } from "../api/axios";

const STATUS_COLORS = {
  Pending: "#f39c12",
  Confirmed: "#3498db",
  Preparing: "#9b59b6",
  "Out for Delivery": "#e67e22",
  Delivered: "#2ecc71"
};

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return navigate("/login");
    getMyOrders()
      .then((res) => setOrders(res.data))
      .finally(() => setLoading(false));
  }, [user, navigate]);

  if (loading) return <p style={styles.loading}>Loading orders...</p>;

  if (orders.length === 0) {
    return (
      <div style={styles.empty}>
        <p style={{ fontSize: "60px" }}>📦</p>
        <h2>No orders yet!</h2>
        <button style={styles.btn} onClick={() => navigate("/")}>Order Now</button>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h2 style={styles.title}>📦 My Orders</h2>
        {orders.map((order) => (
          <div key={order._id} style={styles.card}>
            <div style={styles.cardHeader}>
              <div>
                <h3 style={styles.restName}>{order.restaurant}</h3>
                <p style={styles.date}>{new Date(order.createdAt).toLocaleString()}</p>
              </div>
              <span style={{ ...styles.status, background: STATUS_COLORS[order.status] || "#888" }}>
                {order.status}
              </span>
            </div>
            <div style={styles.items}>
              {order.items.map((item, i) => (
                <div key={i} style={styles.itemRow}>
                  <span>{item.name} × {item.quantity}</span>
                  <span>₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>
            <div style={styles.total}>
              <span>Total</span>
              <span style={{ color: "#ff6b00", fontWeight: "bold" }}>₹{order.totalAmount}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  page: { minHeight: "100vh", background: "#f5f5f5", padding: "30px 20px" },
  container: { maxWidth: "700px", margin: "0 auto" },
  title: { fontSize: "24px", fontWeight: "bold", marginBottom: "20px" },
  card: {
    background: "white", borderRadius: "12px",
    padding: "20px", marginBottom: "15px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
  },
  cardHeader: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "15px" },
  restName: { fontSize: "18px", fontWeight: "bold" },
  date: { color: "#aaa", fontSize: "13px", marginTop: "4px" },
  status: {
    color: "white", padding: "5px 14px",
    borderRadius: "20px", fontSize: "13px", fontWeight: "bold"
  },
  items: { borderTop: "1px solid #f0f0f0", paddingTop: "12px" },
  itemRow: {
    display: "flex", justifyContent: "space-between",
    padding: "6px 0", color: "#555", fontSize: "14px"
  },
  total: {
    display: "flex", justifyContent: "space-between",
    borderTop: "1px solid #f0f0f0", paddingTop: "12px",
    marginTop: "8px", fontWeight: "bold", fontSize: "16px"
  },
  loading: { textAlign: "center", padding: "50px", color: "#888", fontSize: "18px" },
  empty: { textAlign: "center", padding: "80px 20px" },
  btn: {
    marginTop: "20px", padding: "12px 30px", background: "#ff6b00",
    color: "white", border: "none", borderRadius: "25px",
    fontSize: "16px", cursor: "pointer"
  }
};

export default Orders;
