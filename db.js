const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("news.db");

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS news (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT UNIQUE,
      summary TEXT,
      category TEXT,
      source TEXT,
      link TEXT,
      published_at TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
});

module.exports = db;
