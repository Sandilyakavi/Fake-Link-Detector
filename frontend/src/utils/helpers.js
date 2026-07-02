import { jsPDF } from "jspdf";

/**
 * Copies plain text to clipboard.
 * 
 * @param {string} text 
 * @returns {Promise<boolean>} Success status
 */
export const copyToClipboard = async (text) => {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      console.error("Clipboard copy failed: ", err);
    }
  }
  
  // Fallback for older browsers or restricted environments
  try {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed"; // Avoid scrolling to bottom
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    const successful = document.execCommand("copy");
    document.body.removeChild(textArea);
    return successful;
  } catch (err) {
    console.error("Fallback clipboard copy failed: ", err);
    return false;
  }
};

/**
 * Format date nicely for human readability
 */
export const formatDate = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};

/**
 * Generate a highly-styled Cybersecurity PDF report using jsPDF.
 * 
 * @param {Object} scan - Scan report data from backend
 */
export const generatePdfReport = (scan) => {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const scanTime = scan.scannedAt ? formatDate(scan.scannedAt) : formatDate(new Date().toISOString());

  // Colors
  const darkBlack = [3, 7, 18]; // #030712
  const darkGray = [15, 23, 42]; // #0f172a
  const borderGray = [30, 41, 59]; // #1e293b
  const textWhite = [255, 255, 255];
  const textMuted = [148, 163, 184]; // #94a3b8

  let primaryColor = [16, 185, 129]; // Neon Green for Safe
  if (scan.status === "Dangerous") {
    primaryColor = [239, 68, 68]; // Red
  } else if (scan.status === "Suspicious") {
    primaryColor = [245, 158, 11]; // Yellow
  }

  // --- Page Background ---
  doc.setFillColor(3, 7, 18);
  doc.rect(0, 0, 210, 297, "F");

  // --- Header Banner ---
  doc.setFillColor(15, 23, 42);
  doc.rect(0, 0, 210, 40, "F");
  
  // Bottom border of banner
  doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.setLineWidth(1);
  doc.line(0, 40, 210, 40);

  // Logo & Title
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.setFont("courier", "bold");
  doc.setFontSize(22);
  doc.text("FAKE LINK DETECTOR", 15, 18);

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text("CYBERSECURITY LINK AUDIT REPORT", 15, 26);
  
  // Report date alignment right
  doc.setTextColor(148, 163, 184);
  doc.setFontSize(9);
  doc.text(`SCAN TIMESTAMP: ${scanTime}`, 210 - 15, 26, { align: "right" });

  // --- Section 1: Scan Overview Card ---
  let y = 55;
  doc.setFillColor(15, 23, 42);
  doc.setDrawColor(30, 41, 59);
  doc.setLineWidth(0.5);
  doc.rect(15, y, 180, 52, "FD"); // Background and border for card

  // Card Content
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("TARGET LOG", 20, y + 8);
  
  doc.setFont("helvetica", "normal");
  doc.setTextColor(148, 163, 184);
  doc.text("Audited URL:", 20, y + 16);
  
  doc.setTextColor(255, 255, 255);
  doc.setFont("courier", "bold");
  doc.setFontSize(10);
  // Wrap URL text to fit in PDF
  const splitUrl = doc.splitTextToSize(scan.url, 165);
  doc.text(splitUrl, 20, y + 22);

  // Offset based on length of wrapped URL
  const urlHeightOffset = (splitUrl.length - 1) * 4;

  // Status and Score
  doc.setFont("helvetica", "normal");
  doc.setTextColor(148, 163, 184);
  doc.setFontSize(10);
  doc.text("Security Rating:", 20, y + 34 + urlHeightOffset);
  doc.text("Risk Score:", 110, y + 34 + urlHeightOffset);

  // Status value
  doc.setFont("helvetica", "bold");
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.setFontSize(14);
  doc.text(scan.status.toUpperCase(), 20, y + 42 + urlHeightOffset);

  // Score value
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text(`${scan.score} / 100`, 110, y + 42 + urlHeightOffset);

  // Adjust card height if URL wrapped multiple lines
  if (urlHeightOffset > 0) {
    // Redraw border with new height
    doc.setFillColor(15, 23, 42);
    doc.rect(15, y, 180, 52 + urlHeightOffset, "D");
  }

  // --- Section 2: Detailed Heuristics Summary ---
  y = y + 62 + urlHeightOffset;
  
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text("DETAILED HEURISTIC AUDIT", 15, y);

  // Underline section title with theme color
  doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.setLineWidth(0.8);
  doc.line(15, y + 2, 80, y + 2);

  y = y + 10;

  // Explanation paragraph
  doc.setFillColor(15, 23, 42);
  doc.rect(15, y, 180, 20, "F");
  
  // Accent vertical line
  doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.setLineWidth(1.5);
  doc.line(15, y, 15, y + 20);

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "oblique");
  doc.setFontSize(9.5);
  
  const splitExplanation = doc.splitTextToSize(scan.explanation, 170);
  doc.text(splitExplanation, 19, y + 6);

  // Matched Heuristics List
  y = y + 28;
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("MATCHED CYBER THREAT CRITERIA", 15, y);
  
  doc.setDrawColor(30, 41, 59);
  doc.setLineWidth(0.5);
  doc.line(15, y + 2, 195, y + 2);

  y = y + 8;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);

  if (!scan.reasons || scan.reasons.length === 0) {
    doc.setTextColor(16, 185, 129);
    doc.text("[*] No threat criteria matched. The URL passed all standard checks.", 20, y);
    y += 8;
  } else {
    scan.reasons.forEach((reason) => {
      // Draw alert circle/bullet depending on threat level
      doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.circle(18, y - 1, 1, "F");
      
      doc.setTextColor(226, 232, 240); // Soft grey-white
      doc.text(reason, 23, y);
      y += 7;
    });
  }

  // --- Section 3: Mitigation Recommendations ---
  y = y + 8;
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("SECURITY RECOMMENDATIONS", 15, y);
  doc.line(15, y + 2, 195, y + 2);

  y = y + 8;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(148, 163, 184);

  let recommendationText = "";
  if (scan.status === "Dangerous") {
    recommendationText = "CRITICAL WARNING: This URL poses high security risks. Do NOT input login credentials, password values, financial information, or download any attachments from this link. It features multiple design similarities with active phishing schemes.";
  } else if (scan.status === "Suspicious") {
    recommendationText = "ADVISORY: Proceed with caution. This URL contains unusual features such as non-standard domains, extensive hyphens, or keywords. Cross-reference the link with trusted channels before engaging.";
  } else {
    recommendationText = "SAFE: This link is clear. However, always exercise digital hygiene. Verify the sender's origin and inspect the target site's browser SSL lock icon before entering private data.";
  }

  const splitRec = doc.splitTextToSize(recommendationText, 175);
  doc.text(splitRec, 15, y);

  // --- Footer ---
  doc.setDrawColor(30, 41, 59);
  doc.setLineWidth(0.5);
  doc.line(15, 275, 195, 275);

  doc.setTextColor(100, 116, 139);
  doc.setFontSize(7.5);
  doc.setFont("helvetica", "normal");
  doc.text("Disclaimer: Fake Link Detector analyzes links using structural cybersecurity heuristics. No scanner is 100% accurate. Always stay vigilant online.", 15, 280);
  doc.text("Generated by Fake Link Detector SecOps Core.", 15, 284);

  // Save the PDF
  const filename = `SecurityReport_${scan.url.replace(/[^a-zA-Z0-9]/g, "_").slice(0, 30)}.pdf`;
  doc.save(filename);
};
