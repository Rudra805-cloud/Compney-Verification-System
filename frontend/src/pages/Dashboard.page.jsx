import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import SearchBox from "../components/SearchBox";
import ScanResult, { SIGNAL_DEFS } from "../components/ScanResult";
import RecentHistory from "../components/RecentHistory";
import { userHistory, getHistoryDetails } from "../api/history.api";
import { validateCompany, liveValidateCompany,} from "../api/validation.api";




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
  const [selectedHistoryId, setSelectedHistoryId] = useState(null);
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

  try {
    setQuery(domain);
    setStatus("scanning");
    setResult(null);

    const { data } = await validateCompany(domain);
     console.log("API Result:", data);
    setResult(data);   // ✅
    setStatus("done");

    fetchHistory();
  } catch (err) {
    console.error(err);
  }
};
  //validation handelar
 const handleLiveValidation = async () => {
  if (!query.trim()) return;

  try {
    setStatus("scanning");

    const {data} = await liveValidateCompany(query);

     console.log("API Result:", data);
    setResult(data);  
    setStatus("done");

    fetchHistory();
  } catch (err) {
    console.error(err);
  }
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
     setSelectedHistoryId(item._id);
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
        selectedHistoryId={selectedHistoryId}
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
              onLiveValidation={handleLiveValidation}
              status={status}
              theme={theme}
            />

            {/* Animated scan results */}
            <ScanResult
              status={status}
              domain={query}
              result={result}
              theme={theme}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
