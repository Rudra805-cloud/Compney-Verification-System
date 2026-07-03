import React from "react";
import { Clock, TrendingUp, TrendingDown, Minus } from "lucide-react";

/**
 * RecentHistory
 *
 * Renders a table-style list of past scans shown on the idle screen.
 *
 * Props
 * ─────
 * recents      RecentItem[]
 * onSelect     (item: RecentItem) => void
 * theme        "dark" | "light"
 */
export default function RecentHistory({ recents = [], onSelect, theme = "dark" }) {
  const dk = theme === "dark";

  /* Empty state */
  if (recents.length === 0) {
    return (
      <div
        className={[
          "mt-10 rounded-2xl border p-10 flex flex-col items-center gap-2",
          dk ? "border-neutral-800 bg-neutral-900/40" : "border-neutral-200 bg-neutral-50",
        ].join(" ")}
      >
        <Clock className={`w-6 h-6 ${dk ? "text-neutral-700" : "text-neutral-300"}`} />
        <p className={`text-sm ${dk ? "text-neutral-500" : "text-neutral-400"}`}>
          No recent scans yet.
        </p>
      </div>
    );
  }

  /* Trend icon helper */
  const TrendIcon = ({ score }) => {
    if (score >= 70) return <TrendingUp  className="w-3.5 h-3.5 text-cyan-400"   />;
    if (score >= 40) return <Minus       className="w-3.5 h-3.5 text-orange-300" />;
    return               <TrendingDown className="w-3.5 h-3.5 text-red-400"    />;
  };

  return (
    <div className={`mt-6 sm:mt-10 rounded-2xl border overflow-hidden ${dk ? "border-neutral-800" : "border-neutral-200"}`}>

      {/* Section header */}
      <div
        className={[
          "flex items-center gap-2 px-3 sm:px-5 py-3 border-b",
          dk
            ? "border-neutral-800 bg-neutral-900/60"
            : "border-neutral-200 bg-neutral-50",
        ].join(" ")}
      >
        <Clock className={`w-3.5 h-3.5 ${dk ? "text-neutral-500" : "text-neutral-400"}`} />
        <span className={`text-xs font-medium uppercase tracking-wide ${dk ? "text-neutral-500" : "text-neutral-400"}`}>
          Recent Scans
        </span>
      </div>

      {/* Rows - Responsive layout */}
      <div className={dk ? "bg-neutral-900/30" : "bg-white"}>
        {recents.map((item, idx) => (
          <button
            key={item.domain}
            onClick={() => onSelect(item)}
            className={[
              "w-full flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 px-3 sm:px-5 py-3 sm:py-3.5 text-left transition-colors",
              idx < recents.length - 1
                ? dk ? "border-b border-neutral-800" : "border-b border-neutral-100"
                : "",
              dk
                ? "hover:bg-neutral-800/60 text-neutral-300"
                : "hover:bg-neutral-50 text-neutral-700",
            ].join(" ")}
          >
            {/* Domain + Risk (Row on mobile) */}
            <div className="flex items-center justify-between sm:flex-1 gap-2">
              <span
                className="flex-1 text-xs sm:text-[13px] truncate"
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                {item.domain}
              </span>

              {/* Risk badge - shown inline on mobile */}
              <span className={`text-[10px] font-medium rounded-full border px-2 sm:px-2.5 py-0.5 shrink-0 ${item.riskClass}`}>
                {item.risk}
              </span>
            </div>

            {/* Score + trend - right aligned */}
            <div className="flex items-center justify-end gap-1.5 shrink-0">
              <TrendIcon score={item.score} />
              <span
                className={`text-xs sm:text-sm font-semibold ${
                  item.score >= 70 ? "text-cyan-400" : item.score >= 40 ? "text-orange-300" : "text-red-400"
                }`}
                style={{ fontFamily: "'JetBrains Mono', monospace" }}
              >
                {item.score}%
              </span>
            </div>
          </button>
        ))}
      </div>

    </div>
  );
}