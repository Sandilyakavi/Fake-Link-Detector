import React from "react";
import { Terminal, Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-card-border bg-bg-black mt-auto py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        
        <div className="flex items-center justify-center gap-2 text-xs font-mono text-slate-500">
          <Terminal size={14} className="text-neon-green" />
          <span>STATUS: ALL_HEURISTICS_ACTIVE</span>
          <span className="w-1.5 h-1.5 rounded-full bg-neon-green animate-ping"></span>
        </div>

        <p className="text-xs text-slate-600 max-w-xl mx-auto leading-relaxed">
          Fake Link Detector is a client-server security audit tool. Link testing scores are calculated based on common cyber threat patterns. Always verify domain identity manually before entering critical details.
        </p>

        <div className="text-[11px] font-mono text-slate-500 flex items-center justify-center gap-2">
          <span>&copy; {new Date().getFullYear()} SEC_OPS CO.</span>
          <span>|</span>
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-neon-green transition-colors flex items-center gap-0.5"
          >
            <Github size={12} />
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
