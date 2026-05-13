const fs = require("fs");

const DB_FILE = "news.json";

// Load existing data or create empty
let data = [];

if (fs.existsSync(DB_FILE)) {
  try {
    data = JSON.parse(fs.readFileSync(DB_FILE, "utf-8"));
  } catch (e) {
    data = [];
  }
}

// Save function
function saveDB() {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

// Fake DB methods (like sqlite style but file-based)
const db = {
  run: (query, params = []) => {
    // INSERT simulation
    if (Array.isArray(params)) {
      const newsItem = {
        id: data.length + 1,
        title: params[0],
        summary: params[1],
        category: params[2],
        source: params[3],
        link: params[4],
        published_at: params[5],
        created_at: new Date().toISOString()
      };

      // avoid duplicates
      const exists = data.find(n => n.title === newsItem.title);
      if (!exists) {
        data.push(newsItem);
        saveDB();
      }
    }
  },

  all: (query, cb) => {
    if (cb) cb(null, data);
  },

  get: (query, cb) => {
    if (cb) cb(null, data[0] || null);
  }
};

module.exports = db;