import React, { useState, useEffect } from "react";
import LoginPage from "./Login.page";
import {
  ShieldCheck,
  Search,
  Globe,
  Lock,
  Activity,
  Mail,
  Share2,
  FileText,
  Briefcase,
  ArrowRight,
  Sun,
  Moon,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Users,
  Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom";


const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const SIGNAL_DEFS = [
  {
    key: "whois",
    label: "WHOIS Registration",
    icon: Globe,
    desc: "Domain age, registrar status & ownership.",
  },
  {
    key: "ssl",
    label: "SSL Certificate",
    icon: Lock,
    desc: "Validity, issuer & encryption health.",
  },
  {
    key: "reach",
    label: "Website Reachability",
    icon: Activity,
    desc: "Status codes & live uptime check.",
  },
  {
    key: "contact",
    label: "Contact Information",
    icon: Mail,
    desc: "Real email & phone footprint detected.",
  },
  {
    key: "social",
    label: "Social Presence",
    icon: Share2,
    desc: "LinkedIn, Twitter & company socials.",
  },
  {
    key: "legal",
    label: "Legal Pages",
    icon: FileText,
    desc: "Privacy Policy, Terms & About Us.",
  },
  {
    key: "careers",
    label: "Careers Page",
    icon: Briefcase,
    desc: "Genuine hiring page, not a one-off ad.",
  },
];

const DEMOS = [
  {
    domain: "razorpay.com",
    score: 91,
    risk: "Low Risk",
    riskClass: "text-cyan-400 border-cyan-400/30 bg-cyan-400/10",
    barClass: "from-orange-500 to-cyan-400",
    results: {
      whois: "pass",
      ssl: "pass",
      reach: "pass",
      contact: "pass",
      social: "pass",
      legal: "pass",
      careers: "pass",
    },
  },
  {
    domain: "quick-payout-jobs.net",
    score: 27,
    risk: "High Risk",
    riskClass: "text-red-400 border-red-400/30 bg-red-400/10",
    barClass: "from-orange-500 to-red-500",
    results: {
      whois: "pass",
      ssl: "fail",
      reach: "pass",
      contact: "fail",
      social: "fail",
      legal: "fail",
      careers: "fail",
    },
  },
];

const TICKER_ITEMS = [
  { domain: "stripe.com", score: 96, ok: true },
  { domain: "freelance-quickpay.biz", score: 24, ok: false },
  { domain: "deloitte.com", score: 94, ok: true },
  { domain: "instant-hire-now.xyz", score: 18, ok: false },
  { domain: "razorpay.com", score: 91, ok: true },
];

function CompanyValidatorLanding() {
  const navigate = useNavigate();
  
  const [cycle, setCycle] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") {
      setTheme(saved);
      document.documentElement.classList.toggle("light", saved === "light");
    } else {
      document.documentElement.classList.toggle("light", false);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("theme", theme);
    } catch (e) {}
    document.documentElement.classList.toggle("light", theme === "light");
  }, [theme]);

  function toggleTheme() {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  }
  const [statuses, setStatuses] = useState(
    Object.fromEntries(SIGNAL_DEFS.map((s) => [s.key, "idle"])),
  );
  const [score, setScore] = useState(0);
  const [phase, setPhase] = useState("scanning");

  useEffect(() => {
    let cancelled = false;
    const demo = DEMOS[cycle];

    async function run() {
      setStatuses(Object.fromEntries(SIGNAL_DEFS.map((s) => [s.key, "idle"])));
      setScore(0);
      setPhase("scanning");

      for (let i = 0; i < SIGNAL_DEFS.length; i++) {
        await delay(340);
        if (cancelled) return;
        const key = SIGNAL_DEFS[i].key;
        setStatuses((prev) => ({ ...prev, [key]: "checking" }));
        await delay(300);
        if (cancelled) return;
        setStatuses((prev) => ({ ...prev, [key]: demo.results[key] }));
      }

      await delay(250);
      if (cancelled) return;

      const target = demo.score;
      const steps = 20;
      for (let s = 1; s <= steps; s++) {
        await delay(18);
        if (cancelled) return;
        setScore(Math.round((target * s) / steps));
      }

      setPhase("done");
      await delay(3200);
      if (cancelled) return;
      setCycle((c) => (c + 1) % DEMOS.length);
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [cycle]);

  const demo = DEMOS[cycle];

  return (
    <div className={`min-h-screen w-full ${theme === 'light' ? 'bg-white text-neutral-900' : 'bg-neutral-950 text-neutral-200'} font-sans relative overflow-x-hidden`} style={{ animation: 'fadeIn 0.8s ease-out' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500;600&display=swap');
        .font-display { font-family: 'Space Grotesk', sans-serif; }
        .font-mono-data { font-family: 'JetBrains Mono', monospace; }
        body, .font-sans { font-family: 'Inter', sans-serif; }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
 
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 26s linear infinite;
        }
 
        @keyframes scanbeam {
          0% { top: -10%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        .scan-beam {
          animation: scanbeam 1.9s ease-in-out infinite;
        }
 
        @media (prefers-reduced-motion: reduce) {
          .animate-marquee, .scan-beam { animation: none !important; }
        }
      `}</style>

      {/* ambient glow background */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "radial-gradient(600px circle at 10% 0%, rgba(249,115,22,0.12), transparent 60%), radial-gradient(700px circle at 90% 30%, rgba(34,211,238,0.10), transparent 60%)",
        }}
      />

      {/* Navbar */}
      <header
        className={`
    fixed left-1/2 -translate-x-1/2 z-50 flex items-center justify-between
    transition-all duration-500 ease-out

    ${
      scrolled
        ? `
          top-3
          w-[92%]
          max-w-4xl
          px-5
          py-2.5
          rounded-full
          backdrop-blur-xl
          shadow-lg
          ${theme === 'light' ? 'bg-white/80 border border-neutral-200' : 'bg-neutral-900/60 border border-neutral-700/50'}
        `
        : `
          top-6
          w-[95%]
          max-w-6xl
          px-6
          py-4
          bg-transparent
          rounded-none
          border-transparent
        `
    }
  `}
      >
        <div className={`
    flex items-center gap-2.5
    transition-all duration-500 ease-out
    ${scrolled ? "scale-85" : "scale-100"}
  `}>
          <div className="w-9 h-9 rounded-lg bg-orange-500 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5 text-neutral-950" />
          </div>
          <span className={`font-display font-bold text-xl ${theme === 'light' ? 'text-neutral-900' : 'text-white'}`}>
            Veris
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className={`inline-flex items-center justify-center w-9 h-9 rounded-full transition-all duration-200 ${theme === 'light' ? 'bg-neutral-200/80 hover:bg-neutral-300 text-orange-500' : 'bg-neutral-800/40 hover:bg-neutral-800/60 text-yellow-300'}`}
            title="Toggle light / dark"
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </button>

          <button className={`
    inline-flex items-center gap-1.5 rounded-full
    bg-orange-500 hover:bg-orange-400
    transition-all duration-300 ease-out
    text-neutral-950 font-semibold

    ${
      scrolled
        ? "px-4 py-2 text-sm"
        : "px-5 py-2.5 text-sm"
    }
  `} onClick={() => navigate("/login")}
>
            Scan a Company <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Ticker */}
      <div className={`relative z-10 ${theme === 'light' ? 'border-b border-neutral-200 bg-white/90' : 'border-b border-neutral-800 bg-neutral-900/80'}`}>
        <div className="flex items-center gap-4 px-4 sm:px-8 py-2 text-xs">
          <span className="hidden sm:inline-flex items-center gap-1.5 font-mono-data text-orange-400 whitespace-nowrap">
            <Sparkles className="w-3.5 h-3.5" /> LIVE FEED
          </span>
          <div className="flex-1 overflow-hidden">
            <div className="flex w-max gap-10 animate-marquee whitespace-nowrap">
              {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
                <span
                  key={i}
                  className="font-mono-data text-neutral-400 flex items-center gap-1.5"
                >
                  <Search className="w-3 h-3 text-neutral-600" />
                  {item.domain}
                  <span className={item.ok ? "text-cyan-400" : "text-red-400"}>
                    {item.score}% Trust
                  </span>
                </span>
              ))}
            </div>
          </div>
          {/* <span className="hidden md:inline-flex items-center gap-1 rounded-full border border-orange-500/40 bg-orange-500/10 text-orange-300 px-3 py-1 font-medium whitespace-nowrap">
            
          </span> */}
        </div>
      </div>

      {/* Hero */}
    <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 pt-24 pb-24 grid md:grid-cols-2 gap-16 items-center">
        <div className="space-y-7">
          <div className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-mono-data uppercase tracking-wide animate-slideInDown ${theme === 'light' ? 'border border-neutral-200 bg-neutral-100 text-orange-600' : 'border border-neutral-800 bg-neutral-900 text-orange-300'}`} style={{ animationDelay: '0.1s' }}>
            <Search className="w-3.5 h-3.5" /> Domain &amp; Company Trust Engine
          </div>

          <h1 className={`font-display font-bold text-4xl sm:text-5xl leading-[1.1] animate-slideInDown ${theme === 'light' ? 'text-neutral-900' : 'text-white'}`} style={{ animationDelay: '0.2s' }}>
            Know who's <span className="text-orange-400">actually</span> on the
            other side of that offer.
          </h1>

          <p className={`text-base sm:text-lg leading-relaxed max-w-md animate-slideInDown ${theme === 'light' ? 'text-neutral-700' : 'text-neutral-400'}`} style={{ animationDelay: '0.3s' }}>
            Run WHOIS, SSL, reachability and legitimacy checks on any company in
            seconds, before you apply, freelance, or send a single rupee.
          </p>

          <div className="flex flex-wrap gap-3 pt-1 animate-slideInDown" style={{ animationDelay: '0.4s' }}>
            <button className="inline-flex items-center gap-2 rounded-full bg-orange-500 hover:bg-orange-400 transition-smooth-fast text-neutral-950 font-semibold px-6 py-3 hover:scale-105 hover:shadow-lg hover:shadow-orange-500/50" onClick={() => navigate("/login")}>
              Scan a Company <ArrowRight className="w-4 h-4" />
            </button>
            <button className={`inline-flex items-center gap-2 rounded-full border transition-smooth-fast font-semibold px-6 py-3 hover:scale-105 ${theme === 'light' ? 'border-neutral-300 text-neutral-700 hover:bg-neutral-50' : 'border-neutral-700 text-neutral-200 hover:bg-neutral-900/40'}`}>
              See a sample report
            </button>
          </div>

          <div className="space-y-4 pt-4 animate-slideInUp" style={{ animationDelay: '0.5s' }}>
            <div className="flex gap-3 hover:translate-x-1 transition-smooth-fast">
              <ShieldCheck className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
              <p className={`text-sm ${theme === 'light' ? 'text-neutral-700' : 'text-neutral-400'}`}>
                <span className={`text-sm ${theme === 'light' ? 'text-neutral-700' : 'text-neutral-400'} font-medium`}>
                  Trust Score:
                </span>{" "}
                seven weighted signals rolled into one transparent number.
              </p>
            </div>
            <div className="flex gap-3 hover:translate-x-1 transition-smooth-fast">
              <Users className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
              <p className={`text-sm ${theme === 'light' ? 'text-neutral-700' : 'text-neutral-400'}`}>
                <span className={`text-sm ${theme === 'light' ? 'text-neutral-700' : 'text-neutral-400'} font-medium`}>
                  Built for job seekers &amp; freelancers:
                </span>{" "}
                catch fake offers and shady clients before you commit.
              </p>
            </div>
            <div className="flex gap-3 hover:translate-x-1 transition-smooth-fast">
              <RotateCcw className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
              <p className={`text-sm ${theme === 'light' ? 'text-neutral-700' : 'text-neutral-400'}`}>
                <span className={`text-sm ${theme === 'light' ? 'text-neutral-700' : 'text-neutral-400'} font-medium`}>
                  History &amp; re-checks:
                </span>{" "}
                every scan saved, with one-click re-validation when something
                changes.
              </p>
            </div>
          </div>
        </div>

        {/* Scanner mockup */}
        <div className="relative flex justify-center animate-scaleIn self-center md:self-start" style={{ animationDelay: '0.6s' }}>
          <div className={`relative w-full max-w-sm rounded-2xl border p-5 overflow-hidden transition-all duration-300 hover:shadow-lg ${theme === 'light' ? 'border-neutral-200 bg-white shadow-md' : 'border-neutral-700 bg-neutral-900/80 shadow-xl shadow-black/30'}`}>
            {phase === "scanning" && (
              <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent scan-beam" />
            )}

            <div className={`flex items-center gap-2 rounded-lg border px-4 py-2.5 mb-5 transition-all ${theme === 'light' ? 'border-neutral-300 bg-neutral-50 text-neutral-800' : 'border-neutral-700 bg-neutral-950/50'}`}>
              <Search className={`w-4 h-4 ${theme === 'light' ? 'text-neutral-600' : 'text-neutral-500'}`} />
              <span className={`font-mono-data text-sm ${theme === 'light' ? 'text-neutral-700' : 'text-neutral-300'}`}>
                {demo.domain}
              </span>
              <span className={`ml-auto text-[10px] font-mono-data uppercase tracking-wide ${theme === 'light' ? 'text-neutral-500' : 'text-neutral-500'}`}>
                {phase === "scanning" ? "Scanning..." : "Complete"}
              </span>
            </div>

            <div className="space-y-3 px-0.5">
              {SIGNAL_DEFS.map(({ key, label, icon: Icon }) => {
                const st = statuses[key];
                return (
                  <div key={key} className="flex items-center gap-2.5 text-sm transition-colors">
                    <Icon className={`w-4 h-4 shrink-0 ${theme === 'light' ? 'text-neutral-700' : 'text-neutral-500'}`} />
                    <span className={`${theme === 'light' ? 'text-neutral-700' : 'text-neutral-400'} flex-1`}>{label}</span>
                    {st === "idle" && (
                      <span className={`w-3.5 h-3.5 rounded-full border ${theme === 'light' ? 'border-neutral-400' : 'border-neutral-700'}`} />
                    )}
                    {st === "checking" && (
                      <span className={`w-3.5 h-3.5 rounded-full border-2 border-t-orange-400 animate-spin ${theme === 'light' ? 'border-neutral-300' : 'border-neutral-700'}`} />
                    )}
                    {st === "pass" && (
                      <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                    )}
                    {st === "fail" && (
                      <XCircle className="w-4 h-4 text-red-400" />
                    )}
                  </div>
                );
              })}
            </div>

            <div className={`mt-6 pt-5 border-t flex items-center justify-between ${theme === 'light' ? 'border-neutral-300' : 'border-neutral-700'}`}>
              <div>
                <p className={`text-[10px] uppercase tracking-wide font-mono-data ${theme === 'light' ? 'text-neutral-600' : 'text-neutral-500'}`}>
                  Trust Score
                </p>
                <p className={`font-mono-data font-semibold text-3xl ${theme === 'light' ? 'text-neutral-900' : 'text-white'}`}>
                  {score}
                  <span className={`text-lg ${theme === 'light' ? 'text-neutral-600' : 'text-neutral-500'}`}>%</span>
                </p>
              </div>
              <span
                className={`text-xs font-medium rounded-full border px-3 py-1.5 transition-colors ${demo.riskClass}`}
              >
                {demo.risk}
              </span>
            </div>
            <div className={`mt-4 h-1.5 w-full rounded-full overflow-hidden ${theme === 'light' ? 'bg-neutral-200' : 'bg-neutral-800'}`}>
              <div
                className={`h-full bg-gradient-to-r ${demo.barClass} transition-smooth`}
                style={{ width: `${score}%` }}
              />
            </div>
          </div>
        </div>
      </main>

      {/* How it works */}
      <section
        id="how"
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 pb-24"
      >
        <div className="grid sm:grid-cols-3 gap-6">
          {[
            {
              n: "01",
              title: "Drop a domain",
              text: "Paste a company website or careers link, nothing else needed.",
            },
            {
              n: "02",
              title: "We run 7 checks",
              text: "WHOIS, SSL, reachability, contact, social, legal pages and careers.",
            },
            {
              n: "03",
              title: "Get a verdict",
              text: "A weighted trust score, risk level and a plain-English summary.",
            },
          ].map((step, idx) => (
            <div
              key={step.n}
              className={`rounded-xl p-6 transition-smooth hover:shadow-lg ${theme === 'light' ? 'border border-neutral-200 bg-white' : 'border border-neutral-800 bg-neutral-900/60 hover:border-neutral-700 hover:bg-neutral-900/80'}`}
              style={{
                animation: 'slideInUp 0.6s ease-out forwards',
                animationDelay: `${0.4 + idx * 0.1}s`,
                opacity: 0,
              }}
            >
              <span className="font-mono-data text-orange-400 text-sm">
                {step.n}
              </span>
              <h3 className={`font-display font-semibold text-lg mt-2 ${theme === 'light' ? 'text-neutral-900' : 'text-white'}`}>
                {step.title}
              </h3>
              <p className={`${theme === 'light' ? 'text-neutral-700' : 'text-sm text-neutral-400'} mt-2 leading-relaxed`}>
                {step.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Signals grid */}
      <section
        id="signals"
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-8 pb-24"
      >
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div className="animate-slideInDown" style={{ animationDelay: '0.3s' }}>
            <h2 className={`font-display font-bold text-2xl sm:text-3xl ${theme === 'light' ? 'text-neutral-900' : 'text-white'}`}>
              What we check
            </h2>
            <p className={`${theme === 'light' ? 'text-neutral-700' : 'text-neutral-400'} text-sm mt-1`}>
              Every signal feeds a single, normalized trust score.
            </p>
          </div>
          <div className="flex gap-2 text-xs font-medium">
            <span className="rounded-full border border-cyan-400/30 bg-cyan-400/10 text-cyan-400 px-3 py-1">
              Low Risk
            </span>
            <span className="rounded-full border border-orange-400/30 bg-orange-400/10 text-orange-300 px-3 py-1">
              Medium Risk
            </span>
            <span className="rounded-full border border-red-400/30 bg-red-400/10 text-red-400 px-3 py-1">
              High Risk
            </span>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SIGNAL_DEFS.map(({ key, label, icon: Icon, desc }, idx) => (
            <div
              key={key}
              className={`rounded-xl p-5 transition-smooth hover:shadow-lg ${theme === 'light' ? 'border border-neutral-200 bg-white' : 'border border-neutral-800 bg-neutral-900/60 hover:border-orange-500/50 hover:bg-neutral-900/80 hover:shadow-orange-500/20'}`}
              style={{
                animation: 'slideInUp 0.6s ease-out forwards',
                animationDelay: `${0.5 + idx * 0.08}s`,
                opacity: 0,
              }}
            >
              <div className="w-9 h-9 rounded-lg bg-orange-500/10 flex items-center justify-center mb-3">
                <Icon className="w-4.5 h-4.5 text-orange-400" />
              </div>
              <h3 className={`font-medium text-sm ${theme === 'light' ? 'text-neutral-900' : 'text-neutral-100'}`}>{label}</h3>
              <p className={`${theme === 'light' ? 'text-neutral-700' : 'text-xs text-neutral-500'} mt-1.5 leading-relaxed`}>
                {desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className={`relative z-10 max-w-7xl mx-auto px-4 sm:px-8 py-8 flex flex-wrap items-center justify-between gap-4 animate-fadeIn ${theme === 'light' ? 'border-t border-neutral-200 bg-white' : 'border-t border-neutral-800'}`} style={{ animationDelay: '1s' }}>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded bg-orange-500 flex items-center justify-center">
            <ShieldCheck className={`w-3.5 h-3.5 ${theme === 'light' ? 'text-neutral-900' : 'text-neutral-950'}`} />
          </div>
          <span className={`font-display font-semibold text-sm ${theme === 'light' ? 'text-neutral-800' : 'text-neutral-300'}`}>
            Veris
          </span>
        </div>
        <p className={`${theme === 'light' ? 'text-neutral-600' : 'text-xs text-neutral-500'}`}>
          © 2026 Veris. Built for people who'd rather verify than find out the
          hard way.
        </p>
      </footer>
    </div>
  );
}
export default CompanyValidatorLanding;
