const Parser = require("rss-parser");
const parser = new Parser();

const feeds = require("./feeds");
const detectCategory = require("./keywordFilter");

// GLOBAL STORE (IMPORTANT)
global.newsStore = [];

async function fetchNews() {
  console.log("🚀 RSS STARTED");

  global.newsStore = []; // reset

  for (const url of feeds) {
    try {
      const feed = await parser.parseURL(url);

      for (const item of feed.items || []) {
        global.newsStore.push({
          title: item.title,
          summary: item.contentSnippet,
          link: item.link,
          source: feed.title,
          category: detectCategory(item.title + " " + item.contentSnippet),
          published_at: item.pubDate
        });
      }

      console.log("✅ Fetched:", feed.title);

    } catch (err) {
      console.log("❌ RSS Error:", url, err.message);
    }
  }

  console.log("🎯 RSS DONE");
}

module.exports = fetchNews;