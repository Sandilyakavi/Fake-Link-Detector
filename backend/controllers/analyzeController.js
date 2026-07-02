const { analyzeUrlHeuristics } = require("../utils/heuristics");

/**
 * Maps heuristic reasons to clean, readable descriptive phrases for the final explanation sentence.
 */
const mapReasonToPhrase = (reason) => {
  if (reason.includes("HTTP detected")) {
    return "it uses unencrypted HTTP instead of HTTPS";
  }
  if (reason.includes("Long URL")) {
    return "it is excessively long";
  }
  if (reason.includes("Uses IP Address")) {
    return "it uses a raw IP address instead of a standard domain";
  }
  if (reason.includes("Contains '@'")) {
    return "it contains an '@' symbol to mask the true domain";
  }
  if (reason.includes("Too many subdomains")) {
    return "it has too many subdomains";
  }
  if (reason.includes("Contains suspicious keyword")) {
    return "it contains keywords typically found in phishing scams";
  }
  if (reason.includes("shortened URL service")) {
    return "it uses a URL shortener that hides the destination";
  }
  if (reason.includes("Too many hyphens")) {
    return "it has multiple hyphens in its domain";
  }
  if (reason.includes("suspicious top-level domain")) {
    return "it uses a high-risk suspicious top-level domain (TLD)";
  }
  return "it matched security alert heuristics";
};

/**
 * Generate a grammatical explanation sentence based on status and matched reasons.
 */
const generateExplanation = (status, reasons) => {
  if (reasons.length === 0 || status === "Safe") {
    return "This URL appears safe based on our cybersecurity heuristics. No suspicious indicators or common phishing patterns were detected.";
  }

  const phrases = reasons.map(mapReasonToPhrase);
  let explanation = `This URL appears ${status.toLowerCase()} because `;

  if (phrases.length === 1) {
    explanation += phrases[0] + ".";
  } else if (phrases.length === 2) {
    explanation += `${phrases[0]} and ${phrases[1]}.`;
  } else {
    const mainPhrases = phrases.slice(0, -1);
    const lastPhrase = phrases[phrases.length - 1];
    explanation += `${mainPhrases.join(", ")}, and ${lastPhrase}.`;
  }

  return explanation;
};

/**
 * Controller to handle URL analysis request
 */
const analyzeUrl = async (req, res) => {
  try {
    const url = req.validatedUrl;
    const originalInput = req.originalInputUrl;

    // Run heuristics analysis
    const { score, reasons } = analyzeUrlHeuristics(url);

    // Determine status
    // 0-20: Safe
    // 21-50: Suspicious
    // 51-100: Dangerous
    let status = "Safe";
    let safe = true;

    if (score > 50) {
      status = "Dangerous";
      safe = false;
    } else if (score > 20) {
      status = "Suspicious";
      safe = false;
    }

    // Generate detailed sentence explanation
    const explanation = generateExplanation(status, reasons);

    // Artificial delay to make scanning feel robust (e.g. 800ms)
    await new Promise((resolve) => setTimeout(resolve, 800));

    return res.json({
      url: originalInput,
      normalizedUrl: url,
      safe,
      score,
      status,
      reasons,
      explanation,
    });
  } catch (error) {
    console.error("Analysis Error:", error);
    return res.status(500).json({
      error: "An internal error occurred during link analysis. Please try again.",
    });
  }
};

module.exports = {
  analyzeUrl,
};
