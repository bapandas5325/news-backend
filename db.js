const Database = require("better-sqlite3");

// create / open database file
const db = new Database("news.db");

// create table if not exists
db.exec(`
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

module.exports = db;