import React, { useState, useEffect } from "react";
import { ShieldAlert, Terminal } from "lucide-react";

const Loader = ({ targetUrl }) => {
  const [logs, setLogs] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);

  const scanSteps = [
    { text: "Initializing security checks...", delay: 200 },
    { text: `Target URL: ${targetUrl}`, delay: 400 },
    { text: "Extracting hostname and protocols...", delay: 600 },
    { text: "Analyzing DNS records & TLD configurations...", delay: 900 },
    { text: "Scanning domain length and hyphen patterns...", delay: 1200 },
    { text: "Searching hostname for obscured @ characters...", delay: 1500 },
    { text: "Checking for known URL shortener redirects...", delay: 1800 },
    { text: "Cross-referencing suspicious keyword patterns...", delay: 2100 },
    { text: "Evaluating risk heuristics matrices...", delay: 2400 },
    { text: "Compiling final security score...", delay: 2700 },
  ];

  useEffect(() => {
    if (currentStep < scanSteps.length) {
      const timer = setTimeout(() => {
        setLogs((prev) => [...prev, `[+] ${scanSteps[currentStep].text}`]);
        setCurrentStep((prev) => prev + 1);
      }, scanSteps[currentStep].delay - (currentStep > 0 ? scanSteps[currentStep - 1].delay : 0));
      return () => clearTimeout(timer);
    }
  }, [currentStep]);

  return (
    <div className="w-full max-w-2xl mx-auto my-8 bg-card-dark border border-card-border rounded-xl overflow-hidden shadow-2xl relative cyber-glow-blue">
      {/* Scan line effect overlay */}
      <div className="absolute inset-0 scan-line pointer-events-none opacity-40"></div>
      
      {/* Terminal Title Bar */}
      <div className="bg-slate-900 border-b border-card-border px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Terminal size={18} className="text-cyber-blue" />
          <span className="text-sm font-mono text-slate-300 font-semibold tracking-wider">SEC_OPS_URL_ANALYZER_v1.0.3</span>
        </div>
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500 opacity-80"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500 opacity-80"></div>
          <div className="w-3 h-3 rounded-full bg-emerald-500 opacity-80"></div>
        </div>
      </div>

      {/* Terminal Content */}
      <div className="p-6 font-mono text-sm min-h-[320px] text-emerald-400 bg-slate-950 flex flex-col justify-between">
        <div className="space-y-2">
          <div className="flex items-center justify-between border-b border-emerald-950 pb-2 mb-4">
            <span className="text-slate-400 text-xs">ANALYSIS STATUS: RUNNING</span>
            <div className="flex items-center gap-1.5 text-xs text-yellow-500 animate-pulse">
              <ShieldAlert size={14} />
              <span>HEURISTICS MATCH ACTIVE</span>
            </div>
          </div>
          
          <div className="space-y-1.5 max-h-[220px] overflow-y-auto">
            {logs.map((log, index) => (
              <div key={index} className="transition-all duration-300 ease-out translate-y-0 opacity-100">
                {log}
              </div>
            ))}
            {currentStep < scanSteps.length && (
              <div className="flex items-center gap-1">
                <span className="text-emerald-500/60 font-bold animate-pulse">&gt;</span>
                <span className="w-2 h-4 bg-emerald-400 animate-ping"></span>
              </div>
            )}
          </div>
        </div>

        {/* Progress gauge */}
        <div className="mt-6 pt-4 border-t border-emerald-950/40">
          <div className="flex justify-between items-center text-xs mb-1 text-emerald-500/80">
            <span>AUDITING HEURISTICS</span>
            <span>{Math.round((currentStep / scanSteps.length) * 100)}%</span>
          </div>
          <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-emerald-500 h-1.5 rounded-full transition-all duration-300 ease-out shadow-[0_0_8px_#10b981]"
              style={{ width: `${(currentStep / scanSteps.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
