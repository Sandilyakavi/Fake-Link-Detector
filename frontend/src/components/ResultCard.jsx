import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Copy,
  Download,
  FileCheck,
  CheckCircle,
  AlertOctagon,
  CopyCheck,
  Link,
  Shield,
  FileText
} from "lucide-react";
import RiskMeter from "./RiskMeter";
import { copyToClipboard, generatePdfReport } from "../utils/helpers";

const ResultCard = ({ result, onAddToast }) => {
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [copiedReport, setCopiedReport] = useState(false);

  if (!result) return null;

  const handleCopyUrl = async () => {
    const success = await copyToClipboard(result.url);
    if (success) {
      setCopiedUrl(true);
      if (onAddToast) onAddToast("URL copied to clipboard", "success");
      setTimeout(() => setCopiedUrl(false), 2000);
    }
  };

  const handleCopyReport = async () => {
    const reportText = `[FAKE LINK DETECTOR SECURITY AUDIT REPORT]
----------------------------------------------
TARGET URL    : ${result.url}
STATUS        : ${result.status.toUpperCase()}
RISK SCORE    : ${result.score}/100
EXPLANATION   : ${result.explanation}
----------------------------------------------
CRITERIA MATCHED:
${result.reasons.length > 0 
  ? result.reasons.map((r, i) => `${i + 1}. ${r}`).join("\n") 
  : "None. The link passed all cybersecurity heuristics."}
----------------------------------------------
DISCLAIMER: Analyses are heuristic-based and not exhaustive. Stay vigilant!`;

    const success = await copyToClipboard(reportText);
    if (success) {
      setCopiedReport(true);
      if (onAddToast) onAddToast("Security report copied to clipboard", "success");
      setTimeout(() => setCopiedReport(false), 2000);
    }
  };

  const handleDownloadPdf = () => {
    try {
      generatePdfReport(result);
      if (onAddToast) onAddToast("PDF report downloaded", "success");
    } catch (error) {
      console.error(error);
      if (onAddToast) onAddToast("Failed to generate PDF report", "error");
    }
  };

  // Color classes for borders and glows
  let borderGlowClass = "border-emerald-500/30 cyber-glow-green";
  let bannerBgClass = "bg-emerald-950/20 border-emerald-500/20";
  
  if (result.status === "Dangerous") {
    borderGlowClass = "border-red-500/30 cyber-glow-red";
    bannerBgClass = "bg-red-950/20 border-red-500/20";
  } else if (result.status === "Suspicious") {
    borderGlowClass = "border-amber-500/30 cyber-glow-blue";
    bannerBgClass = "bg-amber-950/20 border-amber-500/20";
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`w-full max-w-4xl mx-auto my-8 bg-card-dark border ${borderGlowClass} rounded-2xl overflow-hidden shadow-2xl`}
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
        
        {/* Risk meter section */}
        <div className="md:col-span-4 bg-slate-950/50 p-6 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-card-border">
          <RiskMeter score={result.score} status={result.status} />
        </div>

        {/* Audit Details Panel */}
        <div className="md:col-span-8 p-6 sm:p-8 flex flex-col justify-between">
          <div className="space-y-6">
            
            {/* Header info */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Shield size={16} className="text-cyber-blue animate-pulse" />
                <span className="text-xs font-mono text-slate-500 tracking-wider">AUDIT_TARGET_SPECIFICATION</span>
              </div>
              <h3 className="text-sm font-mono text-slate-300 font-semibold bg-slate-900 border border-card-border px-3 py-2.5 rounded-lg break-all flex items-center gap-2">
                <span className="text-slate-500 shrink-0">&gt;</span>
                <span className="truncate">{result.url}</span>
              </h3>
            </div>

            {/* Explanation box */}
            <div className={`p-4 rounded-xl border ${bannerBgClass}`}>
              <h4 className="text-xs font-mono text-slate-400 mb-1 flex items-center gap-1.5 font-bold">
                <AlertOctagon size={14} className="text-slate-400" />
                SECURITY AUDIT STATEMENT
              </h4>
              <p className="text-sm text-slate-200 leading-relaxed font-sans font-medium italic">
                "{result.explanation}"
              </p>
            </div>

            {/* Reasons Matched */}
            <div>
              <span className="text-xs font-mono text-slate-500 tracking-wider uppercase block mb-3">
                Matched Threat Heuristics:
              </span>
              <div className="flex flex-col gap-2">
                {result.reasons && result.reasons.length > 0 ? (
                  result.reasons.map((reason, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 px-3 py-2 bg-slate-900/60 border border-card-border/60 rounded-lg text-xs font-mono text-slate-300"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-cyber-red animate-pulse shrink-0"></span>
                      <span>{reason}</span>
                    </div>
                  ))
                ) : (
                  <div className="flex items-center gap-2 px-3 py-2 bg-emerald-950/10 border border-emerald-500/20 rounded-lg text-xs font-mono text-neon-green">
                    <CheckCircle size={14} className="shrink-0" />
                    <span>No threats identified. This URL complies with all cybersecurity checks.</span>
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* Action buttons footer */}
          <div className="mt-8 pt-6 border-t border-card-border/60 flex flex-wrap gap-3">
            <button
              onClick={handleCopyUrl}
              className="flex items-center gap-1.5 text-xs font-mono px-3.5 py-2 bg-slate-900 border border-card-border hover:border-slate-700 hover:text-slate-100 rounded-lg text-slate-400 transition-colors cursor-pointer"
            >
              {copiedUrl ? (
                <>
                  <CopyCheck size={14} className="text-neon-green" />
                  <span>URL_COPIED</span>
                </>
              ) : (
                <>
                  <Link size={14} />
                  <span>COPY_URL</span>
                </>
              )}
            </button>

            <button
              onClick={handleCopyReport}
              className="flex items-center gap-1.5 text-xs font-mono px-3.5 py-2 bg-slate-900 border border-card-border hover:border-slate-700 hover:text-slate-100 rounded-lg text-slate-400 transition-colors cursor-pointer"
            >
              {copiedReport ? (
                <>
                  <CopyCheck size={14} className="text-neon-green" />
                  <span>REPORT_COPIED</span>
                </>
              ) : (
                <>
                  <Copy size={14} />
                  <span>COPY_REPORT</span>
                </>
              )}
            </button>

            <button
              onClick={handleDownloadPdf}
              className="flex items-center gap-1.5 text-xs font-mono px-4 py-2 bg-cyber-blue/10 hover:bg-cyber-blue/20 border border-cyber-blue/30 text-cyber-blue font-bold rounded-lg transition-colors cursor-pointer ml-auto"
            >
              <Download size={14} />
              <span>DOWNLOAD_PDF_REPORT</span>
            </button>
          </div>

        </div>
      </div>
    </motion.div>
  );
};

export default ResultCard;
