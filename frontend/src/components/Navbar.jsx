import React from "react";
import { ShieldAlert, RefreshCw, Layers } from "lucide-react";

const Navbar = ({ onReset, historyCount }) => {
  return (
    <nav className="border-b border-card-border bg-bg-black/90 backdrop-blur-md sticky top-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Branding */}
          <div
            onClick={onReset}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="p-2 bg-emerald-500/10 rounded-lg border border-neon-green/30 group-hover:border-neon-green/60 transition-colors shadow-[0_0_10px_rgba(16,185,129,0.1)]">
              <ShieldAlert className="h-6 w-6 text-neon-green group-hover:scale-110 transition-transform" />
            </div>
            <div>
              <span className="text-lg font-mono font-bold tracking-wider text-slate-100 group-hover:text-neon-green transition-colors">
                SEC<span className="text-neon-green">_OPS</span>
              </span>
              <span className="hidden sm:inline-block ml-2 text-xs font-semibold px-2 py-0.5 rounded bg-emerald-500/10 text-neon-green border border-neon-green/20">
                LINK_DETECTOR
              </span>
            </div>
          </div>

          {/* Nav Items */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                const element = document.getElementById("heuristics-info");
                if (element) {
                  element.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="hidden md:flex items-center gap-1.5 text-sm font-medium text-slate-300 hover:text-neon-green transition-colors cursor-pointer"
            >
              <Layers size={16} />
              <span>Heuristics Core</span>
            </button>

            {historyCount > 0 && (
              <button
                onClick={() => {
                  const element = document.getElementById("scan-history");
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="flex items-center gap-1.5 text-xs sm:text-sm font-medium px-3 py-1.5 bg-slate-900 border border-card-border hover:border-neon-green/40 hover:text-neon-green rounded-lg text-slate-300 transition-all cursor-pointer"
              >
                <RefreshCw size={14} className="animate-spin-slow" />
                <span>History ({historyCount})</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
