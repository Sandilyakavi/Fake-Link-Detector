import React from "react";
import {
  ShieldAlert,
  Hash,
  Activity,
  Maximize,
  AlertTriangle,
  Globe,
  CornerDownRight,
  Minus,
  Binary
} from "lucide-react";

const Features = () => {
  const heuristics = [
    {
      id: "H-01",
      title: "HTTPS Encryption",
      desc: "Checks for secure transport encryption. Unencrypted HTTP links add +20 risk.",
      icon: <ShieldAlert className="text-red-400" size={20} />,
      impact: "+20 Risk"
    },
    {
      id: "H-02",
      title: "URL Length Check",
      desc: "Detects excessively long URLs (>75 chars) used to hide malicious queries. Adds +10 risk.",
      icon: <Maximize className="text-yellow-400" size={20} />,
      impact: "+10 Risk"
    },
    {
      id: "H-03",
      title: "Raw IP Addresses",
      desc: "Checks if raw IPv4/v6 hostnames are used instead of trusted domain names. Adds +25 risk.",
      icon: <Binary className="text-red-400" size={20} />,
      impact: "+25 Risk"
    },
    {
      id: "H-04",
      title: "Contains @ Symbol",
      desc: "Detects '@' userinfo characters used to blindside users and obscure actual hostnames. Adds +30 risk.",
      icon: <AlertTriangle className="text-red-400" size={20} />,
      impact: "+30 Risk"
    },
    {
      id: "H-05",
      title: "Excessive Subdomains",
      desc: "Identifies deep subdomain chaining (more than 3 sub-parts) which mimics official portals. Adds +15 risk.",
      icon: <Globe className="text-blue-400" size={20} />,
      impact: "+15 Risk"
    },
    {
      id: "H-06",
      title: "Suspicious Keywords",
      desc: "Scans for keywords like 'login', 'paypal', 'wallet', 'bank', etc., targeting user accounts. Adds +5 per hit.",
      icon: <Hash className="text-yellow-400" size={20} />,
      impact: "+5 Risk Each"
    },
    {
      id: "H-07",
      title: "Shortener Services",
      desc: "Checks against shorteners like bit.ly/goo.gl used to hide malicious endpoints. Adds +20 risk.",
      icon: <CornerDownRight className="text-red-400" size={20} />,
      impact: "+20 Risk"
    },
    {
      id: "H-08",
      title: "Excessive Hyphens",
      desc: "Counts hyphens in the hostname (>=2) used to simulate bank web titles. Adds +10 risk.",
      icon: <Minus className="text-yellow-400" size={20} />,
      impact: "+10 Risk"
    },
    {
      id: "H-09",
      title: "Suspicious TLDs",
      desc: "Flags low-cost generic top-level domains like .xyz, .top, .live, or .gq. Adds +15 risk.",
      icon: <Activity className="text-amber-400" size={20} />,
      impact: "+15 Risk"
    }
  ];

  return (
    <section id="heuristics-info" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-card-border/60">
      <div className="text-center mb-12">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-100 font-mono">
          HEURISTICS_ENGINE_SPECIFICATIONS
        </h2>
        <p className="mt-2 text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
          Our scanning engine runs incoming URLs through 9 cybersecurity heuristic tests to evaluate their phishing risk index.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {heuristics.map((item, idx) => (
          <div
            key={idx}
            className="bg-card-dark border border-card-border hover:border-slate-700/80 p-5 rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_15px_rgba(59,130,246,0.06)] flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-slate-900 border border-card-border/80 rounded-lg group-hover:border-slate-700 transition-colors">
                  {item.icon}
                </div>
                <span className="text-[10px] font-mono text-slate-600 tracking-widest font-bold">
                  {item.id}
                </span>
              </div>
              <h3 className="text-slate-100 font-mono font-bold text-sm sm:text-base tracking-wider mb-2">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                {item.desc}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-900/60 flex items-center justify-between text-xs">
              <span className="font-mono text-slate-500">HEURISTIC_WEIGHT:</span>
              <span className="font-mono font-bold text-slate-300 bg-slate-900/80 border border-slate-800 px-2 py-0.5 rounded">
                {item.impact}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
