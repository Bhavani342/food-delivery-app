import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";

function Navbar() {
  const { items } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.logo}>🍔 FoodExpress</Link>

      <div style={styles.links}>
        <Link to="/" style={styles.link}>Home</Link>
        {user && <Link to="/orders" style={styles.link}>My Orders</Link>}
      </div>

      <div style={styles.right}>
        <Link to="/cart" style={styles.cartBtn}>
          🛒 Cart {totalItems > 0 && <span style={styles.badge}>{totalItems}</span>}
        </Link>
        {user ? (
          <div style={styles.userArea}>
            <span style={styles.userName}>Hi, {user.name}</span>
            <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
          </div>
        ) : (
          <Link to="/login" style={styles.loginBtn}>Login</Link>
        )}
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex", justifyContent: "space-between", alignItems: "center",
    padding: "15px 30px", background: "#ff6b00", color: "white",
    position: "sticky", top: 0, zIndex: 100, boxShadow: "0 2px 10px rgba(0,0,0,0.2)"
  },
  logo: { color: "white", fontSize: "22px", fontWeight: "bold", textDecoration: "none" },
  links: { display: "flex", gap: "20px" },
  link: { color: "white", textDecoration: "none", fontSize: "15px" },
  right: { display: "flex", alignItems: "center", gap: "15px" },
  cartBtn: {
    color: "white", textDecoration: "none", background: "rgba(255,255,255,0.2)",
    padding: "8px 16px", borderRadius: "20px", fontSize: "14px", position: "relative"
  },
  badge: {
    background: "white", color: "#ff6b00", borderRadius: "50%",
    padding: "2px 7px", fontSize: "12px", fontWeight: "bold", marginLeft: "5px"
  },
  userArea: { display: "flex", alignItems: "center", gap: "10px" },
  userName: { color: "white", fontSize: "14px" },
  logoutBtn: {
    background: "rgba(255,255,255,0.2)", color: "white",
    border: "1px solid white", padding: "6px 12px",
    borderRadius: "15px", fontSize: "13px", cursor: "pointer"
  },
  loginBtn: {
    color: "white", textDecoration: "none", background: "rgba(255,255,255,0.2)",
    padding: "8px 16px", borderRadius: "20px", fontSize: "14px"
  }
};

export default Navbar;
