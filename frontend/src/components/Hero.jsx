import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Server, AlertTriangle } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative text-center pt-16 pb-10 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyber-blue/10 rounded-full blur-[120px] pointer-events-none -z-10 animate-pulse-slow"></div>
      
      {/* Security Badge */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-900 border border-card-border rounded-full text-xs font-mono text-emerald-400 mb-6 shadow-inner"
      >
        <ShieldCheck size={14} className="text-neon-green" />
        <span>VULNERABILITY HEURISTICS RUNNING</span>
      </motion.div>

      {/* Main Title */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-slate-100 via-slate-300 to-slate-400 bg-clip-text text-transparent pb-2"
      >
        Fake Link Detector
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="mt-4 text-base sm:text-lg md:text-xl text-slate-400 max-w-2xl mx-auto px-4 font-normal"
      >
        Detect phishing and malicious URLs instantly using real-time cybersecurity heuristics checks. Protect yourself from digital fraud.
      </motion.p>

      {/* Active Monitors */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="mt-8 flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-slate-500"
      >
        <span className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-neon-green animate-ping"></span>
          HTTPS Checker
        </span>
        <span className="w-1 h-1 bg-slate-700 rounded-full"></span>
        <span className="flex items-center gap-1">
          <Server size={12} />
          TLD Analyzer
        </span>
        <span className="w-1 h-1 bg-slate-700 rounded-full"></span>
        <span className="flex items-center gap-1">
          <AlertTriangle size={12} className="text-yellow-500" />
          Shortener Detection
        </span>
      </motion.div>
    </div>
  );
};

export default Hero;
