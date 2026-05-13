const express = require("express");
const cors = require("cors");

const newsRoutes = require("./routes/newsRoutes");
const fetchNews = require("./rssFetcher");
require("./scheduler");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/news", newsRoutes);

app.get("/", (req, res) => {
  res.send("Police Monitor Backend Running");
});

// Run RSS fetch once at startup
fetchNews();

// ✅ FIX: Render-compatible PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});