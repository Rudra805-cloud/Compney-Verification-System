import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import SearchBox from "../components/SearchBox";
import ScanResult, { SIGNAL_DEFS } from "../components/ScanResult";
import RecentHistory from "../components/RecentHistory";
import { userHistory, getHistoryDetails } from "../api/history.api";
/* ─── Seed data ──────────────────────────────────────────────────────────── */
const RECENTS = [
  {
    domain: "stripe.com",
    score: 96,
    risk: "Low Risk",
    riskClass: "text-cyan-400 border-cyan-400/30 bg-cyan-400/10",
    barClass: "from-orange-500 to-cyan-400",
    summary:
      "stripe.com checks out cleanly across every signal we track. Long-standing domain history, a valid SSL certificate from a trusted issuer, and complete legal and careers pages all point to an established, legitimate company.",
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
    domain: "razorpay.com",
    score: 91,
    risk: "Low Risk",
    riskClass: "text-cyan-400 border-cyan-400/30 bg-cyan-400/10",
    barClass: "from-orange-500 to-cyan-400",
    summary:
      "razorpay.com passes nearly every check. Domain age, SSL validity and legal documentation are all solid; minor deductions came from a less complete social footprint.",
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
    summary:
      "quick-payout-jobs.net shows several red flags: no valid SSL certificate, missing legal pages, and no verifiable contact information. Treat any offer from this domain with serious caution.",
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
  {
    domain: "deloitte.com",
    score: 94,
    risk: "Low Risk",
    riskClass: "text-cyan-400 border-cyan-400/30 bg-cyan-400/10",
    barClass: "from-orange-500 to-cyan-400",
    summary:
      "deloitte.com is a well-established, fully verified domain. All seven trust signals check out, consistent with a major, long-running organization.",
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
];

/* ─── Deterministic mock scanner ─────────────────────────────────────────── */
function hashString(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

function generateResult(domain) {
  const h = hashString(domain.toLowerCase());
  const suspicious =
    /quick|instant|free-?cash|payout|win|jobs?-?now|click/.test(
      domain.toLowerCase(),
    );
  const results = {};

  SIGNAL_DEFS.forEach((s, i) => {
    const bit = (h >> i) & 1;
    results[s.key] = suspicious ? (bit === 0 ? "fail" : "pass") : "pass";
  });

  // Bias legitimate-looking domains to mostly-pass with ~15 % random failures
  if (!suspicious) {
    SIGNAL_DEFS.forEach((s) => {
      if (Math.random() > 0.85) results[s.key] = "fail";
    });
  }

  const passCount = Object.values(results).filter((v) => v === "pass").length;
  const score = Math.round((passCount / SIGNAL_DEFS.length) * 100);
  const risk =
    score >= 70 ? "Low Risk" : score >= 40 ? "Medium Risk" : "High Risk";
  const riskClass =
    score >= 70
      ? "text-cyan-400 border-cyan-400/30 bg-cyan-400/10"
      : score >= 40
        ? "text-orange-300 border-orange-400/30 bg-orange-400/10"
        : "text-red-400 border-red-400/30 bg-red-400/10";
  const barClass =
    score >= 70
      ? "from-orange-500 to-cyan-400"
      : score >= 40
        ? "from-orange-500 to-orange-300"
        : "from-orange-500 to-red-500";
  const summary =
    score >= 70
      ? `${domain} passes ${passCount} of ${SIGNAL_DEFS.length} trust signals. Domain registration, SSL and core legitimacy checks line up with a genuine, established company.`
      : score >= 40
        ? `${domain} shows a mixed picture, passing only ${passCount} of ${SIGNAL_DEFS.length} checks. Some signals are missing — worth a closer look before proceeding.`
        : `${domain} fails ${SIGNAL_DEFS.length - passCount} of ${SIGNAL_DEFS.length} trust signals. Multiple red flags suggest this domain may not be legitimate. Proceed with caution.`;

  return { domain, score, risk, riskClass, barClass, summary, results };
}

/* ─── Dashboard ──────────────────────────────────────────────────────────── */
export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [theme, setTheme] = useState("dark"); // "dark" | "light"
  const [sidebarOpen, setSidebar] = useState(true);
  const [query, setQuery] = useState("");
  const [history, setHistory] = useState([]);
  const [page, setPage] = useState(1);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [historyFilter, setFilter] = useState("");
  const [status, setStatus] = useState("idle"); // "idle" | "scanning" | "done"
  const [signalStatus, setSignals] = useState(
    Object.fromEntries(SIGNAL_DEFS.map((s) => [s.key, "idle"])),
  );
  const [result, setResult] = useState(null);

  const dk = theme === "dark";
  // get logged in user
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  /* Run animated scan */
  const runScan = async (raw) => {
    const domain = raw.trim();
    if (!domain) return;

    setQuery(domain);
    setStatus("scanning");
    setResult(null);
    setSignals(Object.fromEntries(SIGNAL_DEFS.map((s) => [s.key, "idle"])));

    const final = generateResult(domain);

    for (let i = 0; i < SIGNAL_DEFS.length; i++) {
      const key = SIGNAL_DEFS[i].key;
      await new Promise((r) => setTimeout(r, 220));
      setSignals((p) => ({ ...p, [key]: "checking" }));
      await new Promise((r) => setTimeout(r, 280));
      setSignals((p) => ({ ...p, [key]: final.results[key] }));
    }

    await new Promise((r) => setTimeout(r, 150));
    setResult(final);
    setStatus("done");
  };

  /* Jump straight to a cached result */
  // const showDirect = async (item) => {
  //   try {
  //     const response = await getHistoryDetails(item._id);

  //     const data = response.data;

  //     setQuery(data.companyId.hostname);

  //     setResult({
  //       domain: data.companyId.hostname,
  //       score: data.trustScore,
  //       summary: data.summary,
  //       risk: `${data.riskLevel} Risk`,
  //     });

  //     setStatus("done");
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  const showDirect = async (item) => {
  try {
    const response = await getHistoryDetails(item._id);

    setResult(response.data);
    setQuery(response.data.companyId.hostname);
    setStatus("done");
  } catch (error) {
    console.error(error);
  }
};

  const filteredRecents = history.filter((item) =>
    item?.companyId?.hostname
      .toLowerCase()
      .includes(historyFilter.toLowerCase()),
  );

  useEffect(() => {
    fetchHistory();
  }, []);
  //fetch history
  const fetchHistory = async () => {
    try {
      setHistoryLoading(true);
               
      const response = await userHistory();
      
      
      setHistory(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setHistoryLoading(false);
    }
  };

  return (
    <div
      className={[
        "min-h-screen w-full flex font-sans transition-colors duration-200",
        dk
          ? "bg-neutral-950 text-neutral-200"
          : "bg-neutral-50 text-neutral-800",
      ].join(" ")}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500;600&display=swap');
        *, body { font-family: 'Inter', sans-serif; }
      `}</style>

      {/* ── Sidebar ── */}
      <Sidebar
        open={sidebarOpen}
        user={user}
        onClose={() => setSidebar(false)}
        theme={theme}
        query={query}
        onNewScan={() => {
          setQuery("");
          setStatus("idle");
          setResult(null);
        }}
        history={history}
        historyFilter={historyFilter}
        onHistoryFilter={setFilter}
        recents={filteredRecents}
        onSelectRecent={showDirect}
      />

      {/* ── Main area ── */}
      <main
  className={`flex-1 flex flex-col min-w-0 transition-all duration-200 ${
    sidebarOpen ? "ml-72" : "ml-0"
  }`}
>
        {/* Topbar */}
        <Topbar
          sidebarOpen={sidebarOpen}
          onOpenSidebar={() => setSidebar(true)}
          theme={theme}
          onToggleTheme={() =>
            setTheme((t) => (t === "dark" ? "light" : "dark"))
          }
        />

        {/* Scrollable content */}
        <div
  className={`flex-1 px-6 pb-12 flex flex-col items-center overflow-y-auto ${
    dk ? "bg-neutral-950" : "bg-neutral-50"
  }`}
>
          <div className="w-full max-w-2xl mt-[8vh]">
            {/* Search / headline */}
            <SearchBox
              query={query}
              onChange={setQuery}
              onScan={runScan}
              status={status}
              theme={theme}
            />

            {/* Animated scan results */}
            <ScanResult
              status={status}
              domain={query}
              signalStatus={signalStatus}
              result={result}
              theme={theme}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
