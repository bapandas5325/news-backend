const categories = {
  "Cyber Crime": ["scam", "phishing", "hacking", "upi fraud"],
  "Social Media": ["viral", "fake news", "twitter", "instagram"],
  Political: ["bjp", "tmc", "minister", "election"],
  Violence: ["riot", "murder", "bomb", "attack"],
  Government: ["government", "cabinet", "notification"]
};

function detectCategory(text) {
  const lowerText = text.toLowerCase();

  for (const category in categories) {
    for (const keyword of categories[category]) {
      if (lowerText.includes(keyword)) {
        return category;
      }
    }
  }

  return "General";
}

module.exports = detectCategory;
