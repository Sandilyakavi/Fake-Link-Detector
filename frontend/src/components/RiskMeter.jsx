import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, ShieldAlert, ShieldX } from "lucide-react";

const RiskMeter = ({ score, status }) => {
  // SVG Ring settings
  const radius = 60;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  // Colors and Icons based on status
  let color = "#10b981"; // Safe (emerald-500)
  let shadowClass = "shadow-[0_0_20px_rgba(16,185,129,0.25)]";
  let statusIcon = <ShieldCheck size={28} className="text-neon-green" />;
  let textColor = "text-neon-green";

  if (status === "Dangerous") {
    color = "#ef4444"; // Dangerous (red-500)
    shadowClass = "shadow-[0_0_20px_rgba(239,68,68,0.3)]";
    statusIcon = <ShieldX size={28} className="text-cyber-red" />;
    textColor = "text-cyber-red";
  } else if (status === "Suspicious") {
    color = "#f59e0b"; // Suspicious (amber-500)
    shadowClass = "shadow-[0_0_20px_rgba(245,158,11,0.25)]";
    statusIcon = <ShieldAlert size={28} className="text-cyber-yellow" />;
    textColor = "text-cyber-yellow";
  }

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className={`relative w-40 h-40 flex items-center justify-center bg-slate-950 rounded-full border border-card-border ${shadowClass}`}>
        
        {/* SVG Progress Circle */}
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 140 140">
          {/* Background Track Circle */}
          <circle
            cx="70"
            cy="70"
            r={radius}
            fill="transparent"
            stroke="#1e293b" // slate-800
            strokeWidth={strokeWidth}
          />
          {/* Animated Foreground Progress Circle */}
          <motion.circle
            cx="70"
            cy="70"
            r={radius}
            fill="transparent"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            strokeLinecap="round"
          />
        </svg>

        {/* Center Text Panel */}
        <div className="absolute flex flex-col items-center justify-center text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mb-1"
          >
            {statusIcon}
          </motion.div>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-3xl font-mono font-extrabold text-slate-100 tracking-tighter"
          >
            {score}
          </motion.span>
          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
            RISK_INDEX
          </span>
        </div>
      </div>

      {/* Under Label */}
      <div className="mt-4 text-center">
        <h4 className={`text-lg font-mono font-bold uppercase tracking-wider ${textColor}`}>
          {status}
        </h4>
        <p className="text-xs font-mono text-slate-500 mt-1">
          THREAT_RATING: {score}%
        </p>
      </div>
    </div>
  );
};

export default RiskMeter;
