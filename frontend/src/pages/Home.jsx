import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import {
  ShieldAlert,
  Trash2,
  Calendar,
  AlertOctagon,
  CheckCircle2,
  Clock,
  Terminal,
  ShieldCheck,
  ChevronRight
} from "lucide-react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import UrlInput from "../components/UrlInput";
import Loader from "../components/Loader";
import ResultCard from "../components/ResultCard";
import Features from "../components/Features";
import Footer from "../components/Footer";
import { analyzeUrl } from "../services/api";
import { formatDate } from "../utils/helpers";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [targetUrl, setTargetUrl] = useState("");
  const [result, setResult] = useState(null);
  
  // History and Toasts
  const [history, setHistory] = useState([]);
  const [toasts, setToasts] = useState([]);

  // Load history on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("sec_ops_scans");
      if (stored) {
        setHistory(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to read scan history:", e);
    }
  }, []);

  // Toast notifier helper
  const addToast = (message, type = "info") => {
    const id = Date.now() + Math.random().toString(36).substr(2, 5);
    setToasts((prev) => [...prev, { id, message, type }]);
    
    // Auto-remove toast after 4 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Perform Analysis
  const handleAnalyze = async (url) => {
    setLoading(true);
    setTargetUrl(url);
    setResult(null);

    try {
      const data = await analyzeUrl(url);
      
      const newRecord = {
        ...data,
        id: Date.now().toString() + Math.random().toString(36).substr(2, 5),
        scannedAt: new Date().toISOString(),
      };

      setResult(newRecord);
      
      // Update history in state and LocalStorage
      const updatedHistory = [newRecord, ...history].slice(0, 50); // Cap history to last 50 scans
      setHistory(updatedHistory);
      localStorage.setItem("sec_ops_scans", JSON.stringify(updatedHistory));

      // Notification and Confetti celebrations for Safe links
      if (data.safe) {
        addToast("Analysis complete: URL is Safe!", "success");
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.8 },
          colors: ["#10b981", "#3b82f6", "#10b981"]
        });
      } else if (data.status === "Suspicious") {
        addToast("Analysis complete: URL is suspicious!", "warning");
      } else {
        addToast("Warning: URL classified as Dangerous!", "error");
      }

    } catch (err) {
      console.error(err);
      addToast(err.message || "Failed to analyze URL", "error");
    } finally {
      setLoading(false);
    }
  };

  // Delete individual scan from history
  const handleDeleteHistoryItem = (id, e) => {
    e.stopPropagation();
    const updated = history.filter((item) => item.id !== id);
    setHistory(updated);
    localStorage.setItem("sec_ops_scans", JSON.stringify(updated));
    addToast("Record deleted from history", "info");
  };

  // Clear entire scan history
  const handleClearHistory = () => {
    if (window.confirm("Are you sure you want to clear all scan history?")) {
      setHistory([]);
      localStorage.removeItem("sec_ops_scans");
      addToast("Scan history cleared", "info");
    }
  };

  // Click on history item to view it again
  const handleSelectHistoryItem = (item) => {
    setResult(item);
    setTargetUrl(item.url);
    
    // Smooth scroll to results card
    setTimeout(() => {
      const resultsElement = document.getElementById("analysis-result");
      if (resultsElement) {
        resultsElement.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
    
    addToast(`Loaded scan for: ${item.url.slice(0, 25)}...`, "info");
  };

  const handleReset = () => {
    setResult(null);
    setTargetUrl("");
  };

  return (
    <div className="min-h-screen bg-bg-black flex flex-col relative cyber-grid">
      {/* Navbar */}
      <Navbar onReset={handleReset} historyCount={history.length} />

      {/* Floating Toast Notification Container */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full px-4">
        {toasts.map((toast) => {
          let typeColor = "border-cyber-blue text-slate-200 bg-slate-950";
          let Icon = <Clock size={16} className="text-cyber-blue shrink-0" />;

          if (toast.type === "success") {
            typeColor = "border-neon-green/40 text-slate-100 bg-slate-950";
            Icon = <CheckCircle2 size={16} className="text-neon-green shrink-0" />;
          } else if (toast.type === "error") {
            typeColor = "border-red-500/40 text-red-100 bg-slate-950";
            Icon = <AlertOctagon size={16} className="text-red-400 shrink-0" />;
          } else if (toast.type === "warning") {
            typeColor = "border-amber-500/40 text-amber-100 bg-slate-950";
            Icon = <ShieldAlert size={16} className="text-amber-400 shrink-0" />;
          }

          return (
            <div
              key={toast.id}
              onClick={() => removeToast(toast.id)}
              className={`p-3.5 border rounded-lg shadow-2xl flex items-center justify-between gap-3 cursor-pointer select-none transition-all duration-300 transform translate-y-0 opacity-100 hover:scale-102`}
            >
              <div className="flex items-center gap-2.5">
                {Icon}
                <span className="text-xs font-mono tracking-wider font-semibold">{toast.message}</span>
              </div>
              <span className="text-[10px] font-mono text-slate-500 hover:text-slate-300">✕</span>
            </div>
          );
        })}
      </div>

      {/* Hero Section */}
      <Hero />

      {/* Primary URL input */}
      <div className="mb-8">
        <UrlInput onAnalyze={handleAnalyze} isLoading={loading} />
      </div>

      {/* Loading analysis terminal */}
      {loading && (
        <div className="px-4">
          <Loader targetUrl={targetUrl} />
        </div>
      )}

      {/* Analysis Results Display */}
      {result && !loading && (
        <div id="analysis-result" className="px-4">
          <ResultCard result={result} onAddToast={addToast} />
        </div>
      )}

      {/* Scan History Section */}
      {history.length > 0 && (
        <section id="scan-history" className="max-w-4xl w-full mx-auto px-4 py-10 mt-8 border-t border-card-border/40">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Terminal size={18} className="text-slate-500" />
              <h3 className="text-sm font-mono text-slate-400 font-bold uppercase tracking-wider">
                Audited Link Logs ({history.length})
              </h3>
            </div>
            <button
              onClick={handleClearHistory}
              className="text-xs font-mono text-red-400/80 hover:text-red-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Trash2 size={13} />
              <span>CLEAR_ALL</span>
            </button>
          </div>

          <div className="grid grid-cols-1 gap-2 max-h-[300px] overflow-y-auto pr-1">
            {history.map((item) => {
              let scoreColor = "text-neon-green border-neon-green/20 bg-neon-green/5";
              if (item.status === "Dangerous") {
                scoreColor = "text-cyber-red border-red-500/20 bg-red-500/5";
              } else if (item.status === "Suspicious") {
                scoreColor = "text-cyber-yellow border-amber-500/20 bg-amber-500/5";
              }

              return (
                <div
                  key={item.id}
                  onClick={() => handleSelectHistoryItem(item)}
                  className="flex items-center justify-between p-3 bg-card-dark border border-card-border hover:border-slate-700/80 rounded-lg cursor-pointer transition-colors group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className={`w-8 h-8 rounded border flex items-center justify-center shrink-0 text-xs font-mono font-bold ${scoreColor}`}>
                      {item.score}
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs font-mono text-slate-300 truncate font-semibold break-all group-hover:text-neon-green transition-colors">
                        {item.url}
                      </p>
                      <div className="flex items-center gap-2 text-[10px] font-mono text-slate-500 mt-0.5">
                        <Calendar size={10} />
                        <span>{formatDate(item.scannedAt)}</span>
                        <span>•</span>
                        <span className="uppercase font-bold tracking-wider">{item.status}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 pl-2">
                    <button
                      onClick={(e) => handleDeleteHistoryItem(item.id, e)}
                      className="p-1.5 hover:bg-slate-900 border border-transparent hover:border-card-border text-slate-500 hover:text-red-400 rounded-md transition-colors cursor-pointer"
                      title="Delete record"
                    >
                      <Trash2 size={13} />
                    </button>
                    <ChevronRight size={16} className="text-slate-600 group-hover:text-neon-green group-hover:translate-x-0.5 transition-all" />
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Heuristics guidelines */}
      <Features />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
