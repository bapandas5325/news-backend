const Parser = require("rss-parser");
const parser = new Parser();

const feeds = require("./feeds");
const detectCategory = require("./keywordFilter");
const db = require("./db");

// ================= INSERT FUNCTION (better-sqlite3 FIXED) =================
function insertNews(row) {
  try {
    const stmt = db.prepare(`
      INSERT OR IGNORE INTO news
      (title, summary, category, source, link, published_at)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    stmt.run(row);
  } catch (err) {
    console.log("❌ DB Insert Error:", err.message);
  }
}

// ================= FETCH RSS NEWS =================
async function fetchNews() {
  console.log("🚀 Starting RSS Fetch Process...");

  for (const url of feeds) {
    try {
      const feed = await parser.parseURL(url);

      if (!feed || !feed.items) {
        console.log("⚠️ Empty feed:", url);
        continue;
      }

      for (const item of feed.items) {
        const title = item.title || "No Title";
        const summary = item.contentSnippet || item.content || "";
        const link = item.link || "";

        const category = detectCategory(`${title} ${summary}`);

        insertNews([
          title,
          summary,
          category,
          feed.title || "Unknown Source",
          link,
          item.pubDate || new Date().toISOString()
        ]);
      }

      console.log(`✅ Fetched: ${feed.title}`);

    } catch (error) {
      console.log("❌ RSS Error:", url, error.message);
    }
  }

  console.log("🎯 RSS Fetch Completed Successfully");
}

module.exports = fetchNews;