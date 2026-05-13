const cron = require("node-cron");
const fetchNews = require("./rssFetcher");

cron.schedule("*/10 * * * *", async () => {
  console.log("Fetching latest news...");
  await fetchNews();
});
