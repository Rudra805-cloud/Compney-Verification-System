import React, { useState } from "react";
import {
  ShieldCheck,
  PanelLeft,
  Plus,
  Search,
  ChevronDown,
  Globe,
  Lock,
  Activity,
  Mail,
  Share2,
  FileText,
  Briefcase,
  ArrowUp,
  CheckCircle2,
  XCircle,
  Loader2,
} from "lucide-react";

const SIGNAL_DEFS = [
  { key: "whois", label: "WHOIS Registration", icon: Globe },
  { key: "ssl", label: "SSL Certificate", icon: Lock },
  { key: "reach", label: "Website Reachability", icon: Activity },
  { key: "contact", label: "Contact Information", icon: Mail },
  { key: "social", label: "Social Presence", icon: Share2 },
  { key: "legal", label: "Legal Pages", icon: FileText },
  { key: "careers", label: "Careers Page", icon: Briefcase },
];

const RECENTS = [
  {
    domain: "stripe.com",
    score: 96,
    risk: "Low Risk",
    riskClass: "text-cyan-400 border-cyan-400/30 bg-cyan-400/10",
    barClass: "from-orange-500 to-cyan-400",
    summary: "stripe.com checks out cleanly across every signal we track. Long-standing domain history, a valid SSL certificate from a trusted issuer, and complete legal and careers pages all point to an established, legitimate company.",
    results: { whois: "pass", ssl: "pass", reach: "pass", contact: "pass", social: "pass", legal: "pass", careers: "pass" },
  },
  {
    domain: "razorpay.com",
    score: 91,
    risk: "Low Risk",
    riskClass: "text-cyan-400 border-cyan-400/30 bg-cyan-400/10",
    barClass: "from-orange-500 to-cyan-400",
    summary: "razorpay.com passes nearly every check. Domain age, SSL validity and legal documentation are all solid; minor deductions came from a less complete social footprint.",
    results: { whois: "pass", ssl: "pass", reach: "pass", contact: "pass", social: "pass", legal: "pass", careers: "pass" },
  },
  {
    domain: "quick-payout-jobs.net",
    score: 27,
    risk: "High Risk",
    riskClass: "text-red-400 border-red-400/30 bg-red-400/10",
    barClass: "from-orange-500 to-red-500",
    summary: "quick-payout-jobs.net shows several red flags: no valid SSL certificate, missing legal pages, and no verifiable contact information. Treat any offer from this domain with serious caution.",
    results: { whois: "pass", ssl: "fail", reach: "pass", contact: "fail", social: "fail", legal: "fail", careers: "fail" },
  },
  {
    domain: "deloitte.com",
    score: 94,
    risk: "Low Risk",
    riskClass: "text-cyan-400 border-cyan-400/30 bg-cyan-400/10",
    barClass: "from-orange-500 to-cyan-400",
    summary: "deloitte.com is a well-established, fully verified domain. All seven trust signals check out, consistent with a major, long-running organization.",
    results: { whois: "pass", ssl: "pass", reach: "pass", contact: "pass", social: "pass", legal: "pass", careers: "pass" },
  },
];

function hashString(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

function genResult(domain) {
  const h = hashString(domain.toLowerCase());
  const suspicious = /quick|instant|free-?cash|payout|win|jobs?-?now|click/.test(domain.toLowerCase());
  const results = {};
  SIGNAL_DEFS.forEach((s, i) => {
    const bit = (h >> i) & 1;
    results[s.key] = suspicious ? (bit === 0 ? "fail" : "pass") : bit === 0 ? "pass" : i < 2 ? "pass" : "pass";
  });
  if (!suspicious) {
    // bias clean-looking domains toward mostly-pass
    SIGNAL_DEFS.forEach((s) => {
      if (Math.random() > 0.15) results[s.key] = "pass";
    });
  }
  const passCount = Object.values(results).filter((v) => v === "pass").length;
  const score = Math.round((passCount / SIGNAL_DEFS.length) * 100);
  const risk = score >= 70 ? "Low Risk" : score >= 40 ? "Medium Risk" : "High Risk";
  const riskClass =
    score >= 70
      ? "text-cyan-400 border-cyan-400/30 bg-cyan-400/10"
      : score >= 40
      ? "text-orange-300 border-orange-400/30 bg-orange-400/10"
      : "text-red-400 border-red-400/30 bg-red-400/10";
  const barClass = score >= 70 ? "from-orange-500 to-cyan-400" : score >= 40 ? "from-orange-500 to-orange-300" : "from-orange-500 to-red-500";
  const summary =
    score >= 70
      ? `${domain} passes ${passCount} of ${SIGNAL_DEFS.length} trust signals. Domain registration, SSL and core legitimacy checks line up with a genuine, established company.`
      : score >= 40
      ? `${domain} shows a mixed picture, passing only ${passCount} of ${SIGNAL_DEFS.length} checks. Some signals are missing, worth a closer manual look before proceeding.`
      : `${domain} fails ${SIGNAL_DEFS.length - passCount} of ${SIGNAL_DEFS.length} trust signals. Multiple red flags suggest this domain may not be a legitimate company. Proceed with caution.`;

  return { domain, score, risk, riskClass, barClass, summary, results };
}

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [query, setQuery] = useState("");
  const [historyFilter, setHistoryFilter] = useState("");
  const [status, setStatus] = useState("idle"); // idle | scanning | done
  const [signalStatus, setSignalStatus] = useState(
    Object.fromEntries(SIGNAL_DEFS.map((s) => [s.key, "idle"]))
  );
  const [result, setResult] = useState(null);

  const runScan = async (domainRaw) => {
    const domain = domainRaw.trim();
    if (!domain) return;
    setStatus("scanning");
    setResult(null);
    setSignalStatus(Object.fromEntries(SIGNAL_DEFS.map((s) => [s.key, "idle"])));

    const final = genResult(domain);

    for (let i = 0; i < SIGNAL_DEFS.length; i++) {
      const key = SIGNAL_DEFS[i].key;
      await new Promise((r) => setTimeout(r, 220));
      setSignalStatus((prev) => ({ ...prev, [key]: "checking" }));
      await new Promise((r) => setTimeout(r, 260));
      setSignalStatus((prev) => ({ ...prev, [key]: final.results[key] }));
    }

    await new Promise((r) => setTimeout(r, 150));
    setResult(final);
    setStatus("done");
  };

  const showResultDirect = (item) => {
    setQuery(item.domain);
    setSignalStatus(item.results);
    setResult(item);
    setStatus("done");
  };

  const filteredRecents = RECENTS.filter((r) =>
    r.domain.toLowerCase().includes(historyFilter.toLowerCase())
  );

  return (
    <div className="min-h-screen w-full bg-neutral-950 text-neutral-200 font-sans flex">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500;600&display=swap');
        .font-display { font-family: 'Space Grotesk', sans-serif; }
        .font-mono-data { font-family: 'JetBrains Mono', monospace; }
        body, .font-sans { font-family: 'Inter', sans-serif; }
      `}</style>

      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-72" : "w-0"
        } shrink-0 overflow-hidden transition-all duration-200 border-r border-neutral-800 bg-neutral-950 flex flex-col`}
      >
        <div className="w-72 flex flex-col h-full">
          {/* Top: logo + collapse */}
          <div className="flex items-center justify-between px-4 py-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-md bg-orange-500 flex items-center justify-center">
                <ShieldCheck className="w-4 h-4 text-neutral-950" />
              </div>
              <span className="font-display font-bold text-sm text-white">Veris</span>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="text-neutral-500 hover:text-neutral-200 transition-colors"
            >
              <PanelLeft className="w-4.5 h-4.5" />
            </button>
          </div>

          {/* Profile — moved to top */}
          <div className="mx-3 mb-4 flex items-center gap-3 rounded-xl border border-neutral-800 bg-neutral-900 px-3 py-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-500 to-cyan-500 flex items-center justify-center text-xs font-semibold text-neutral-950 shrink-0">
              RM
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-neutral-100 truncate">Rudra Mishra</p>
              <p className="text-xs text-neutral-500">Free plan</p>
            </div>
          </div>

          {/* New scan */}
          <div className="px-3">
            <button
              onClick={() => {
                setQuery("");
                setStatus("idle");
                setResult(null);
              }}
              className="w-full flex items-center gap-2.5 rounded-xl border border-neutral-800 hover:bg-neutral-900 transition-colors px-3.5 py-2.5 text-sm text-neutral-200"
            >
              <Plus className="w-4 h-4 text-orange-400" />
              New Scan
            </button>
          </div>

          {/* Search history */}
          <div className="px-3 mt-2">
            <div className="flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-sm text-neutral-500 hover:bg-neutral-900 transition-colors">
              <Search className="w-4 h-4" />
              <input
                value={historyFilter}
                onChange={(e) => setHistoryFilter(e.target.value)}
                placeholder="Search history"
                className="bg-transparent outline-none placeholder-neutral-500 text-neutral-300 w-full"
              />
            </div>
          </div>

          {/* Recents */}
          <div className="mt-4 px-3 flex-1 overflow-y-auto">
            <p className="px-3.5 text-xs font-medium text-neutral-600 uppercase tracking-wide mb-1.5">
              Recents
            </p>
            <div className="space-y-0.5">
              {filteredRecents.map((item) => (
                <button
                  key={item.domain}
                  onClick={() => showResultDirect(item)}
                  className={`w-full text-left flex items-center gap-2.5 rounded-lg px-3.5 py-2 text-sm transition-colors ${
                    query === item.domain
                      ? "bg-neutral-900 text-neutral-100"
                      : "text-neutral-400 hover:bg-neutral-900 hover:text-neutral-200"
                  }`}
                >
                  <span className="truncate flex-1 font-mono-data text-[13px]">{item.domain}</span>
                  <span
                    className={`text-[10px] font-medium shrink-0 ${
                      item.score >= 70 ? "text-cyan-400" : item.score >= 40 ? "text-orange-300" : "text-red-400"
                    }`}
                  >
                    {item.score}%
                  </span>
                </button>
              ))}
              {filteredRecents.length === 0 && (
                <p className="px-3.5 text-xs text-neutral-600 py-2">No matches.</p>
              )}
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            {!sidebarOpen && (
              <button
                onClick={() => setSidebarOpen(true)}
                className="text-neutral-500 hover:text-neutral-200 transition-colors"
              >
                <PanelLeft className="w-4.5 h-4.5" />
              </button>
            )}
            <button className="flex items-center gap-1.5 text-neutral-200 font-display font-semibold">
              Veris
              <ChevronDown className="w-4 h-4 text-neutral-500" />
            </button>
          </div>
        </div>

        {/* Center column */}
        <div className="flex-1 px-6 pb-10 flex flex-col items-center">
          <div className="w-full max-w-2xl mt-[8vh]">
            <h1 className="font-display font-semibold text-3xl sm:text-4xl text-center text-white mb-8">
              What company are you checking today?
            </h1>

            {/* Search box */}
            <div className="flex items-center gap-3 rounded-2xl border border-neutral-800 bg-neutral-900 px-5 py-4 shadow-lg shadow-black/30">
              <Globe className="w-4.5 h-4.5 text-neutral-500 shrink-0" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && runScan(query)}
                placeholder="Enter a company domain, e.g. example.com"
                className="flex-1 bg-transparent outline-none text-sm text-neutral-200 placeholder-neutral-500 font-mono-data"
              />
              <button
                onClick={() => runScan(query)}
                disabled={status === "scanning" || !query.trim()}
                className="w-9 h-9 shrink-0 rounded-full bg-orange-500 hover:bg-orange-400 disabled:opacity-40 disabled:hover:bg-orange-500 transition-colors flex items-center justify-center"
              >
                {status === "scanning" ? (
                  <Loader2 className="w-4 h-4 text-neutral-950 animate-spin" />
                ) : (
                  <ArrowUp className="w-4 h-4 text-neutral-950" />
                )}
              </button>
            </div>

            {/* Quick chips */}
            <div className="flex flex-wrap justify-center gap-3 mt-5">
              {[
                { label: "Sample low-risk report", value: "stripe.com" },
                { label: "Sample high-risk report", value: "quick-payout-jobs.net" },
                { label: "Bulk scan a CSV", value: null },
              ].map((chip) => (
                <button
                  key={chip.label}
                  onClick={() => chip.value && runScan(chip.value)}
                  className="inline-flex items-center gap-2 rounded-full border border-neutral-800 hover:border-neutral-700 hover:bg-neutral-900 transition-colors text-sm text-neutral-400 px-4 py-2"
                >
                  {chip.label}
                </button>
              ))}
            </div>

            {/* Results */}
            {status !== "idle" && (
              <div className="mt-10 rounded-2xl border border-neutral-800 bg-neutral-900/70 p-6 sm:p-7">
                <div className="flex items-center justify-between mb-5">
                  <span className="font-mono-data text-sm text-neutral-300">
                    {query || result?.domain}
                  </span>
                  <span className="text-[10px] font-mono-data uppercase tracking-wide text-neutral-500">
                    {status === "scanning" ? "Scanning..." : "Scan complete"}
                  </span>
                </div>

                {/* Checks */}
                <div className="grid sm:grid-cols-2 gap-x-8 gap-y-2.5 mb-6">
                  {SIGNAL_DEFS.map(({ key, label, icon: Icon }) => {
                    const st = signalStatus[key];
                    return (
                      <div key={key} className="flex items-center gap-2.5 text-sm">
                        <Icon className="w-4 h-4 text-neutral-500 shrink-0" />
                        <span className="text-neutral-400 flex-1">{label}</span>
                        {st === "idle" && <span className="w-3.5 h-3.5 rounded-full border border-neutral-700" />}
                        {st === "checking" && (
                          <span className="w-3.5 h-3.5 rounded-full border-2 border-neutral-700 border-t-orange-400 animate-spin" />
                        )}
                        {st === "pass" && <CheckCircle2 className="w-4 h-4 text-cyan-400" />}
                        {st === "fail" && <XCircle className="w-4 h-4 text-red-400" />}
                      </div>
                    );
                  })}
                </div>

                {/* Score + summary */}
                {result && (
                  <div className="pt-5 border-t border-neutral-800 space-y-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[10px] uppercase tracking-wide text-neutral-500 font-mono-data">
                          Trust Score
                        </p>
                        <p className="font-mono-data font-semibold text-3xl text-white">
                          {result.score}
                          <span className="text-lg text-neutral-500">%</span>
                        </p>
                      </div>
                      <span className={`text-xs font-medium rounded-full border px-3 py-1 ${result.riskClass}`}>
                        {result.risk}
                      </span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-neutral-800 overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${result.barClass} transition-all duration-500`}
                        style={{ width: `${result.score}%` }}
                      />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-neutral-400 mb-1.5">Summary</p>
                      <p className="text-sm text-neutral-300 leading-relaxed">{result.summary}</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}