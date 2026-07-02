const validator = require("validator");

/**
 * Common URL shortener domains
 */
const SHORTENERS = new Set([
  "bit.ly",
  "tinyurl.com",
  "goo.gl",
  "t.co",
  "is.gd",
  "buff.ly",
  "adf.ly",
  "bit.do",
  "ow.ly",
  "rebrand.ly",
  "tiny.cc",
]);

/**
 * Suspicious top-level domains (TLDs)
 */
const SUSPICIOUS_TLDS = new Set(["xyz", "top", "club", "live", "gq", "click"]);

/**
 * Suspicious keywords commonly used in phishing campaigns
 */
const SUSPICIOUS_KEYWORDS = [
  "login",
  "verify",
  "update",
  "secure",
  "bank",
  "wallet",
  "gift",
  "password",
  "account",
  "paypal",
];

/**
 * Analyze a URL against 9 cybersecurity heuristics rules.
 * Returns an object with the risk score, reasons, and raw stats.
 * 
 * @param {string} url - Normalized URL starting with http:// or https://
 * @returns {Object} { score, reasons }
 */
const analyzeUrlHeuristics = (url) => {
  let score = 0;
  const reasons = [];
  const lowercaseUrl = url.toLowerCase();

  let urlObj;
  try {
    urlObj = new URL(url);
  } catch (err) {
    // Fallback if parsing fails (shouldn't if validated, but for safety)
    urlObj = {
      hostname: "",
      pathname: "",
      search: "",
    };
  }

  const hostname = urlObj.hostname.toLowerCase();

  // Rule 1: HTTPS Check (If HTTP, +20 risk)
  if (lowercaseUrl.startsWith("http://")) {
    score += 20;
    reasons.push("HTTP detected (Unencrypted connection)");
  }

  // Rule 2: URL Length (If length > 75, +10 risk)
  if (url.length > 75) {
    score += 10;
    reasons.push(`Long URL detected (${url.length} characters)`);
  }

  // Rule 3: Uses IP Address (If host is an IP Address, +25 risk)
  // Clean port if present (e.g., 192.168.1.10:8080)
  const hostWithoutPort = hostname.split(":")[0];
  if (validator.isIP(hostWithoutPort)) {
    score += 25;
    reasons.push("Uses IP Address instead of a domain name");
  }

  // Rule 4: Contains @ symbol in the URL (+30 risk)
  if (url.includes("@")) {
    score += 30;
    reasons.push("Contains '@' symbol (often used to obscure the true domain)");
  }

  // Rule 5: Too many subdomains (+15 risk)
  // Split hostname. E.g. login.verify.bank.example.xyz has 5 parts.
  // Standard domain example.xyz has 2 parts, example.co.uk has 3 parts.
  // If hostname parts length > 3 (meaning 3 or more sub-parts before the main domain + TLD), add +15.
  const hostParts = hostname.split(".").filter(Boolean);
  
  // We check if it has more than 3 parts (e.g. login.verify.bank.example.com has 5, client.bank.com has 3)
  // To be safe and precise, we exclude 'www' from the subdomain count
  const nonWwwParts = hostParts.filter(part => part !== "www");
  if (nonWwwParts.length > 3) {
    score += 15;
    reasons.push(`Too many subdomains (${nonWwwParts.length - 2} subdomains detected)`);
  }

  // Rule 6: Suspicious keywords (+5 risk each)
  // Check both hostname and path for keywords
  const matchedKeywords = [];
  SUSPICIOUS_KEYWORDS.forEach((keyword) => {
    if (lowercaseUrl.includes(keyword)) {
      score += 5;
      matchedKeywords.push(keyword);
    }
  });
  if (matchedKeywords.length > 0) {
    reasons.push(`Contains suspicious keyword(s): ${matchedKeywords.join(", ")}`);
  }

  // Rule 7: Shortened URLs (+20 risk)
  // Check if hostname (without www.) matches any common shortener domain
  const domainOnly = hostname.startsWith("www.") ? hostname.slice(4) : hostname;
  if (SHORTENERS.has(domainOnly)) {
    score += 20;
    reasons.push(`Uses a shortened URL service (${domainOnly})`);
  }

  // Rule 8: Too many hyphens (+10 risk)
  // Check hyphens in the hostname (often used in look-alike phishing domains, e.g. secure-bank-login.com)
  const hyphenCount = (hostname.match(/-/g) || []).length;
  if (hyphenCount >= 2) {
    score += 10;
    reasons.push(`Too many hyphens in domain name (${hyphenCount} hyphens detected)`);
  }

  // Rule 9: Suspicious TLDs (+15 risk)
  // Check if domain ends with high-risk generic TLDs
  const tld = hostParts[hostParts.length - 1];
  if (tld && SUSPICIOUS_TLDS.has(tld)) {
    score += 15;
    reasons.push(`Uses a suspicious top-level domain (.${tld})`);
  }

  // Clamp score between 0 and 100
  score = Math.min(Math.max(score, 0), 100);

  return {
    score,
    reasons,
  };
};

module.exports = {
  analyzeUrlHeuristics,
};
