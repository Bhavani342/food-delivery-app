import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { loginSuccess } from "../redux/authSlice";
import { login } from "../api/axios";

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await login(form);
      dispatch(loginSuccess(res.data));
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
    setLoading(false);
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>🍔 Welcome Back!</h2>
        <p style={styles.sub}>Login to order your favourite food</p>

        {error && <p style={styles.error}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <div style={styles.field}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.field}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              style={styles.input}
              required
            />
          </div>
          <button type="submit" style={styles.btn} disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p style={styles.footer}>
          Don't have an account? <Link to="/register" style={styles.linkText}>Register</Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh", background: "#f5f5f5",
    display: "flex", justifyContent: "center", alignItems: "center"
  },
  card: {
    background: "white", padding: "40px", borderRadius: "16px",
    width: "100%", maxWidth: "420px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)"
  },
  title: { fontSize: "26px", fontWeight: "bold", marginBottom: "8px", textAlign: "center" },
  sub: { color: "#888", textAlign: "center", marginBottom: "30px" },
  error: {
    background: "#ffe0e0", color: "#cc0000",
    padding: "10px", borderRadius: "8px",
    marginBottom: "15px", fontSize: "14px"
  },
  field: { marginBottom: "18px" },
  label: { display: "block", fontWeight: "600", marginBottom: "6px", fontSize: "14px" },
  input: {
    width: "100%", padding: "12px", borderRadius: "8px",
    border: "1px solid #ddd", fontSize: "15px",
    outline: "none", boxSizing: "border-box"
  },
  btn: {
    width: "100%", padding: "14px", background: "#ff6b00",
    color: "white", border: "none", borderRadius: "10px",
    fontSize: "16px", fontWeight: "bold", cursor: "pointer", marginTop: "5px"
  },
  footer: { textAlign: "center", marginTop: "20px", color: "#888", fontSize: "14px" },
  linkText: { color: "#ff6b00", fontWeight: "bold", textDecoration: "none" }
};

export default Login;
