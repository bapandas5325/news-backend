const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", (req, res) => {
  db.all(
    `SELECT * FROM news ORDER BY created_at DESC`,
    [],
    (err, rows) => {
      res.json(rows);
    }
  );
});

module.exports = router;
