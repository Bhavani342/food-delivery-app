import React, { useEffect, useState } from "react";
import { getRestaurants } from "../api/axios";
import RestaurantCard from "../components/RestaurantCard";

const CUISINES = ["All", "Indian", "Pizza", "Burgers", "Chinese"];

function Home() {
  const [restaurants, setRestaurants] = useState([]);
  const [search, setSearch] = useState("");
  const [cuisine, setCuisine] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRestaurants();
  }, [search, cuisine]);

  const fetchRestaurants = async () => {
    setLoading(true);
    try {
      const res = await getRestaurants({ search, cuisine });
      setRestaurants(res.data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div style={styles.page}>
      {/* Hero */}
      <div style={styles.hero}>
        <h1 style={styles.heroTitle}>🍔 Hungry? We've got you!</h1>
        <p style={styles.heroSub}>Order food from the best restaurants near you</p>
        <input
          type="text"
          placeholder="🔍  Search restaurants..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.searchInput}
        />
      </div>

      <div style={styles.content}>
        {/* Cuisine Filter */}
        <div style={styles.filters}>
          {CUISINES.map((c) => (
            <button
              key={c}
              onClick={() => setCuisine(c)}
              style={{
                ...styles.filterBtn,
                background: cuisine === c ? "#ff6b00" : "white",
                color: cuisine === c ? "white" : "#333"
              }}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Restaurant Grid */}
        {loading ? (
          <p style={styles.loading}>Loading restaurants...</p>
        ) : restaurants.length === 0 ? (
          <p style={styles.loading}>No restaurants found 😕</p>
        ) : (
          <div style={styles.grid}>
            {restaurants.map((r) => (
              <RestaurantCard key={r._id} restaurant={r} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: { minHeight: "100vh", background: "#f5f5f5" },
  hero: {
    background: "linear-gradient(135deg, #ff6b00, #ff8c42)",
    padding: "50px 30px", textAlign: "center", color: "white"
  },
  heroTitle: { fontSize: "36px", fontWeight: "bold", marginBottom: "10px" },
  heroSub: { fontSize: "16px", marginBottom: "25px", opacity: 0.9 },
  searchInput: {
    width: "100%", maxWidth: "500px", padding: "14px 20px",
    borderRadius: "30px", border: "none", fontSize: "16px",
    outline: "none", boxShadow: "0 4px 15px rgba(0,0,0,0.15)"
  },
  content: { maxWidth: "1200px", margin: "0 auto", padding: "30px 20px" },
  filters: { display: "flex", gap: "10px", marginBottom: "25px", flexWrap: "wrap" },
  filterBtn: {
    padding: "8px 20px", borderRadius: "20px",
    border: "1px solid #ddd", cursor: "pointer",
    fontWeight: "500", fontSize: "14px", transition: "all 0.2s"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
    gap: "20px"
  },
  loading: { textAlign: "center", color: "#888", fontSize: "18px", padding: "50px" }
};

export default Home;
