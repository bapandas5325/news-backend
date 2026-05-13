const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", (req, res) => {
  console.log("🔥 /news API HIT");

  db.all("SELECT * FROM news ORDER BY id DESC", [], (err, rows) => {
    if (err) {
      console.error("❌ DB ERROR FULL:", err);
      return res.status(500).json({
        error: err.message,
      });
    }

    console.log("✅ ROWS FOUND:", rows?.length);
    res.json(rows || []);
  });
});

module.exports = router;