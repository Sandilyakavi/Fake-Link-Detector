const validator = require("validator");

/**
 * Middleware to validate URL inputs
 */
const validateUrl = (req, res, next) => {
  let { url } = req.body;

  if (!url || typeof url !== "string") {
    return res.status(400).json({
      error: "URL is required. Please provide a valid URL string.",
    });
  }

  url = url.trim();

  // Normalize URL - if it doesn't contain a protocol, prepend https:// for validation
  let urlToValidate = url;
  if (!/^https?:\/\//i.test(url)) {
    urlToValidate = "https://" + url;
  }

  // Validate the URL format using validator.js
  const isValid = validator.isURL(urlToValidate, {
    protocols: ["http", "https"],
    require_tld: true,
    require_protocol: false, // Allow URLs without explicit protocols during validation
    allow_underscores: true,
  });

  if (!isValid) {
    return res.status(400).json({
      error: "Invalid URL format. Please provide a standard URL (e.g., example.com or https://example.com).",
    });
  }

  // Pass normalized URL to req.validatedUrl
  req.validatedUrl = urlToValidate;
  req.originalInputUrl = url;
  next();
};

module.exports = {
  validateUrl,
};
