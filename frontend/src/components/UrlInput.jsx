import React, { useState } from "react";
import { Search, Link2, X } from "lucide-react";

const UrlInput = ({ onAnalyze, isLoading }) => {
  const [urlInput, setUrlInput] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const trimmed = urlInput.trim();
    if (!trimmed) {
      setError("Please paste or type a URL first.");
      return;
    }

    // Call the parent analysis handler
    onAnalyze(trimmed);
  };

  const handleClear = () => {
    setUrlInput("");
    setError("");
  };

  const loadPreset = (presetUrl) => {
    setUrlInput(presetUrl);
    setError("");
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative flex items-center bg-card-dark border border-card-border hover:border-slate-700 focus-within:border-neon-green rounded-xl transition-all duration-300 shadow-xl overflow-hidden p-1.5 pl-4 gap-2">
          <Link2 className="text-slate-400 shrink-0" size={20} />
          <input
            type="text"
            value={urlInput}
            onChange={(e) => {
              setUrlInput(e.target.value);
              if (error) setError("");
            }}
            placeholder="Enter or paste URL to analyze (e.g. secure-login.verify.bank.xyz)..."
            className="w-full bg-transparent text-slate-100 placeholder-slate-500 focus:outline-hidden text-sm sm:text-base font-mono py-2 py-3"
            disabled={isLoading}
          />
          
          {urlInput && !isLoading && (
            <button
              type="button"
              onClick={handleClear}
              className="p-1 hover:bg-slate-800 text-slate-400 hover:text-slate-200 rounded-md transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-2.5 sm:py-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold rounded-lg text-sm sm:text-base transition-all flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_0_15px_rgba(16,185,129,0.3)] shrink-0 cursor-pointer"
          >
            <Search size={18} />
            <span>{isLoading ? "ANALYZING..." : "ANALYZE"}</span>
          </button>
        </div>

        {error && (
          <p className="absolute -bottom-6 left-2 text-xs font-mono text-cyber-red animate-pulse">
            [ERROR] {error}
          </p>
        )}
      </form>

      {/* Preset/Example URLs */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 text-xs font-mono text-slate-500">
        <span>PRESET THREAT LOGS FOR TESTING:</span>
        <div className="flex flex-wrap gap-2 justify-center">
          <button
            onClick={() => loadPreset("https://google.com")}
            className="px-2.5 py-1 bg-slate-950/40 border border-card-border hover:border-neon-green/40 hover:text-neon-green rounded text-slate-400 transition-colors cursor-pointer"
          >
            Google (Safe)
          </button>
          <button
            onClick={() => loadPreset("http://192.168.1.10/paypal-login-update")}
            className="px-2.5 py-1 bg-slate-950/40 border border-card-border hover:border-yellow-500/40 hover:text-yellow-500 rounded text-slate-400 transition-colors cursor-pointer"
          >
            IP PayPal (Dangerous)
          </button>
          <button
            onClick={() => loadPreset("login.verify.bank.account-alert.xyz")}
            className="px-2.5 py-1 bg-slate-950/40 border border-card-border hover:border-red-500/40 hover:text-red-500 rounded text-slate-400 transition-colors cursor-pointer"
          >
            Bank XYZ (Dangerous)
          </button>
        </div>
      </div>
    </div>
  );
};

export default UrlInput;
