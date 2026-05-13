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

fetchNews();

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
