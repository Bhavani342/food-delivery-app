import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addItem, removeItem, clearCart } from "../redux/cartSlice";
import { createOrder, createPayment } from "../api/axios";

function Cart() {
  const { items, total, restaurantName } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    if (!user) return navigate("/login");
    if (!address) return alert("Please enter delivery address");

    setLoading(true);
    try {
      const paymentRes = await createPayment(total);
      const options = {
        key: "your_razorpay_key_id",
        amount: paymentRes.data.amount,
        currency: "INR",
        name: "FoodExpress",
        description: `Order from ${restaurantName}`,
        order_id: paymentRes.data.id,
        handler: async (response) => {
          await createOrder({
            restaurant: restaurantName,
            items: items.map((i) => ({ name: i.name, price: i.price, quantity: i.quantity, image: i.image })),
            totalAmount: total,
            address,
            paymentId: response.razorpay_payment_id
          });
          dispatch(clearCart());
          alert("✅ Order placed successfully!");
          navigate("/orders");
        },
        prefill: { name: user.name, email: user.email },
        theme: { color: "#ff6b00" }
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      alert("Payment failed. Try again.");
    }
    setLoading(false);
  };

  if (items.length === 0) {
    return (
      <div style={styles.empty}>
        <p style={styles.emptyIcon}>🛒</p>
        <h2>Your cart is empty!</h2>
        <p style={{ color: "#888", marginTop: "10px" }}>Add items from a restaurant to get started</p>
        <button style={styles.browseBtn} onClick={() => navigate("/")}>Browse Restaurants</button>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h2 style={styles.title}>🛒 Your Cart</h2>
        <p style={styles.restName}>From: {restaurantName}</p>

        {/* Cart Items */}
        <div style={styles.itemsList}>
          {items.map((item) => (
            <div key={item._id} style={styles.item}>
              <img src={item.image} alt={item.name} style={styles.img} />
              <div style={styles.itemInfo}>
                <p style={styles.itemName}>{item.name}</p>
                <p style={styles.itemPrice}>₹{item.price} × {item.quantity}</p>
              </div>
              <div style={styles.counter}>
                <button style={styles.countBtn} onClick={() => dispatch(removeItem(item))}>−</button>
                <span style={styles.qty}>{item.quantity}</span>
                <button style={styles.countBtn} onClick={() => dispatch(addItem({ item, restaurantName }))}>+</button>
              </div>
              <p style={styles.subtotal}>₹{item.price * item.quantity}</p>
            </div>
          ))}
        </div>

        {/* Address */}
        <div style={styles.addressSection}>
          <label style={styles.label}>📍 Delivery Address</label>
          <textarea
            rows={3}
            placeholder="Enter your full delivery address..."
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            style={styles.textarea}
          />
        </div>

        {/* Bill Summary */}
        <div style={styles.bill}>
          <div style={styles.billRow}>
            <span>Item Total</span><span>₹{total}</span>
          </div>
          <div style={styles.billRow}>
            <span>Delivery Fee</span><span style={{ color: "green" }}>FREE</span>
          </div>
          <div style={{ ...styles.billRow, fontWeight: "bold", fontSize: "18px", borderTop: "1px solid #eee", paddingTop: "10px" }}>
            <span>Grand Total</span><span style={{ color: "#ff6b00" }}>₹{total}</span>
          </div>
        </div>

        <button style={styles.payBtn} onClick={handlePayment} disabled={loading}>
          {loading ? "Processing..." : `💳 Pay ₹${total}`}
        </button>
        <button style={styles.clearBtn} onClick={() => dispatch(clearCart())}>Clear Cart</button>
      </div>
    </div>
  );
}

const styles = {
  page: { minHeight: "100vh", background: "#f5f5f5", padding: "30px 20px" },
  container: { maxWidth: "700px", margin: "0 auto" },
  title: { fontSize: "24px", fontWeight: "bold", marginBottom: "5px" },
  restName: { color: "#888", marginBottom: "20px" },
  itemsList: { background: "white", borderRadius: "12px", padding: "15px", marginBottom: "20px" },
  item: { display: "flex", alignItems: "center", gap: "15px", padding: "12px 0", borderBottom: "1px solid #f0f0f0" },
  img: { width: "60px", height: "60px", borderRadius: "8px", objectFit: "cover" },
  itemInfo: { flex: 1 },
  itemName: { fontWeight: "600", marginBottom: "4px" },
  itemPrice: { color: "#888", fontSize: "13px" },
  counter: { display: "flex", alignItems: "center", gap: "8px" },
  countBtn: {
    background: "#ff6b00", color: "white", border: "none",
    width: "28px", height: "28px", borderRadius: "50%",
    fontSize: "16px", cursor: "pointer"
  },
  qty: { fontWeight: "bold", minWidth: "20px", textAlign: "center" },
  subtotal: { fontWeight: "bold", color: "#333", minWidth: "60px", textAlign: "right" },
  addressSection: { background: "white", borderRadius: "12px", padding: "20px", marginBottom: "20px" },
  label: { display: "block", fontWeight: "600", marginBottom: "10px" },
  textarea: {
    width: "100%", padding: "12px", borderRadius: "8px",
    border: "1px solid #ddd", fontSize: "14px",
    resize: "none", outline: "none", fontFamily: "inherit"
  },
  bill: { background: "white", borderRadius: "12px", padding: "20px", marginBottom: "20px" },
  billRow: { display: "flex", justifyContent: "space-between", marginBottom: "10px", fontSize: "15px" },
  payBtn: {
    width: "100%", padding: "15px", background: "#ff6b00",
    color: "white", border: "none", borderRadius: "10px",
    fontSize: "18px", fontWeight: "bold", cursor: "pointer", marginBottom: "10px"
  },
  clearBtn: {
    width: "100%", padding: "12px", background: "white",
    color: "#ff6b00", border: "2px solid #ff6b00",
    borderRadius: "10px", fontSize: "15px", cursor: "pointer"
  },
  empty: { textAlign: "center", padding: "80px 20px" },
  emptyIcon: { fontSize: "60px", marginBottom: "20px" },
  browseBtn: {
    marginTop: "20px", padding: "12px 30px", background: "#ff6b00",
    color: "white", border: "none", borderRadius: "25px",
    fontSize: "16px", cursor: "pointer"
  }
};

export default Cart;
