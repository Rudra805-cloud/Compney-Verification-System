import React from "react";
import { ShieldCheck, PanelLeft, Plus, Search } from "lucide-react";
/**
 * Sidebar
 *
 * Props
 * ─────
 * open            boolean           sidebar expanded?
 * onClose         () => void        collapse handler
 * theme           "dark" | "light"
 * query           string            active domain (for highlight)
 * onNewScan       () => void        reset to idle
 * historyFilter   string
 * onHistoryFilter (val:string)=>void
 * recents         RecentItem[]
 * onSelectRecent  (item)=>void
 */
export default function Sidebar({
  open,
  user,
  onClose,
  theme = "dark",
  query = "",
  onNewScan,
  history,
  selectedHistoryId,
  historyFilter = "",
  onHistoryFilter,
  recents = [],
  onSelectRecent,
}) {
  const dk = theme === "dark";

  return (
    <aside
      className={[
        "fixed left-0 top-0 h-screen z-50 shrink-0 overflow-hidden transition-all duration-200 flex flex-col",
        open ? "w-full sm:w-72" : "w-0",
        dk
          ? "border-neutral-800 bg-neutral-950"
          : "border-neutral-100 bg-white",
      ].join(" ")}
    >
      <div className="w-full sm:w-72 flex flex-col h-full">
        {/* Logo + collapse */}
        <div className="flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-orange-500 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4 text-white" />
            </div>
            <span
              className={`font-bold text-sm ${dk ? "text-white" : "text-neutral-900"}`}
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              Veris
            </span>
          </div>
          <button
            onClick={onClose}
            className={`transition-colors ${dk ? "text-neutral-500 hover:text-neutral-200" : "text-neutral-400 hover:text-neutral-700"}`}
          >
            <PanelLeft className="w-4 h-4" />
          </button>
        </div>

        {/* Profile card */}
        <div
          className={[
            "mx-3 mb-4 flex items-center gap-3 rounded-xl border px-3 py-3",
            dk
              ? "border-neutral-800 bg-neutral-900"
              : "border-neutral-200 bg-neutral-50",
          ].join(" ")}
        >
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-orange-500 to-cyan-500 flex items-center justify-center text-xs font-semibold text-white shrink-0">
            {user?.username?.charAt(0).toUpperCase() || "U"}
          </div>
          <div className="min-w-0">
            <p
              className={`text-sm font-medium truncate ${dk ? "text-neutral-100" : "text-neutral-900"}`}
            >
              {user?.username || "Guest"}{" "}
            </p>
          </div>
        </div>

        {/* New Scan */}
        <div className="px-3">
          <button
            onClick={onNewScan}
            className={[
              "w-full flex items-center gap-2.5 rounded-xl border transition-colors px-3.5 py-2.5 text-sm",
              dk
                ? "border-neutral-800 text-neutral-200 hover:bg-neutral-900"
                : "border-neutral-200 text-neutral-700 hover:bg-neutral-100",
            ].join(" ")}
          >
            <Plus className="w-4 h-4 text-orange-400" />
            New Scan
          </button>
        </div>

        {/* History filter */}
        <div className="px-3 mt-2">
          <div
            className={[
              "flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-sm transition-colors",
              dk
                ? "text-neutral-500 hover:bg-neutral-900"
                : "text-neutral-400 hover:bg-neutral-100",
            ].join(" ")}
          >
            <Search className="w-4 h-4 shrink-0" />
            <input
              value={historyFilter}
              onChange={(e) => onHistoryFilter(e.target.value)}
              placeholder="Search history"
              className={[
                "bg-transparent outline-none placeholder-neutral-400 w-full text-sm",
                dk ? "text-neutral-300" : "text-neutral-600",
              ].join(" ")}
            />
          </div>
        </div>

        {/* Recents */}
        <div
          className={`mt-4 px-3 flex-1 overflow-y-auto ${
            dk ? "scrollbar-dark" : "scrollbar-light"
          }`}
        >
          <p
            className={`px-3.5 text-xs font-medium uppercase tracking-wide mb-1.5 ${dk ? "text-neutral-600" : "text-neutral-400"}`}
          >
            Recents
          </p>
          <div className="space-y-0.5">
            {recents.length === 0 && (
              <p
                className={`px-3.5 text-xs py-2 ${dk ? "text-neutral-600" : "text-neutral-400"}`}
              >
                No matches.
              </p>
            )}
            {recents.map((item) => (
              <button
                key={item._id}
                onClick={() => onSelectRecent(item)}
                className={[
                  "w-full text-left flex items-center gap-2.5 rounded-lg px-3.5 py-2 text-sm transition-colors",
                 selectedHistoryId === item._id
                    ? dk
                      ? "bg-neutral-900 text-neutral-100"
                      : "bg-neutral-100 text-neutral-900"
                    : dk
                      ? "text-neutral-400 hover:bg-neutral-900 hover:text-neutral-200"
                      : "text-neutral-500 hover:bg-neutral-100 hover:text-neutral-700",
                ].join(" ")}
              >
                <span
                  className="truncate flex-1 text-[13px]"
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  {item.companyId.hostname}
                </span>
                <span
                  className={`text-[10px] font-medium shrink-0 ${
                    item.trustScore >= 70
                      ? "text-cyan-400"
                      : item.trustScore >= 40
                        ? "text-orange-300"
                        : "text-red-400"
                  }`}
                >
                  {item.trustScore}%
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
