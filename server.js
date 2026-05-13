const express = require("express");
const cors = require("cors");

const fetchNews = require("./rssFetcher");

const app = express();

app.use(cors());
app.use(express.json());

// root route
app.get("/", (req, res) => {
  res.send("Police Monitor Backend Running");
});

// ✅ FIXED NEWS ROUTE
app.get("/news", (req, res) => {
  try {
    res.json(global.newsStore || []);
  } catch (err) {
    console.log("NEWS ROUTE ERROR:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// run RSS once at startup
fetchNews();

// optional refresh every 10 minutes
setInterval(() => {
  fetchNews();
}, 10 * 60 * 1000);

// PORT FIX (Render compatible)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});