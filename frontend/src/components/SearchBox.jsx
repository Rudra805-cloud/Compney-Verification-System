import React from "react";
import { Globe, ArrowUp, Loader2 } from "lucide-react";


/**
 * SearchBox
 *
 * Props
 * ─────
 * query       string
 * onChange    (val: string) => void
 * onScan      (domain: string) => void
 * status      "idle" | "scanning" | "done"
 * theme       "dark" | "light"
 */
export default function SearchBox({ query = "", onChange, onScan, status = "idle", theme = "dark" }) {
  const dk = theme === "dark";

  return (
    <div className="w-full">
      {/* Headline */}
      <h1
        className={`font-semibold text-3xl sm:text-4xl text-center mb-8 ${dk ? "text-white" : "text-neutral-900"}`}
        style={{ fontFamily: "'Space Grotesk', sans-serif" }}
      >
        What company are you checking today?
      </h1>

      {/* Input */}
     <div
  className={[
    "flex items-center gap-3 rounded-2xl border px-5 py-4 shadow-lg transition-colors",
    dk
      ? "border-neutral-800 bg-neutral-900 shadow-black/30 focus-within:border-neutral-700"
      : "border-neutral-200 bg-white shadow-neutral-100 focus-within:border-neutral-300",
  ].join(" ")}
>
  <Globe className={`w-4 h-4 shrink-0 ${dk ? "text-neutral-500" : "text-neutral-400"}`} />

  <input
    value={query}
    onChange={(e) => onChange(e.target.value)}
    onKeyDown={(e) => e.key === "Enter" && onScan(query)}
    placeholder="Enter a company domain, e.g. example.com"
    className={[
      "flex-1 bg-transparent outline-none text-sm placeholder-neutral-400",
      dk ? "text-neutral-200" : "text-neutral-700",
    ].join(" ")}
    style={{ fontFamily: "'JetBrains Mono', monospace" }}
  />

  {/* Fresh Validation */}
  <button
    className={[
      "px-3 py-2 rounded-xl border text-xs font-medium transition-colors",
      dk
        ? "border-neutral-700 text-neutral-300 hover:bg-neutral-800"
        : "border-neutral-300 text-neutral-700 hover:bg-neutral-100",
    ].join(" ")}
  >
    ⚡Run Fresh Validation
  </button>

  {/* Search */}
  <button
    onClick={() => onScan(query)}
    disabled={status === "scanning" || !query.trim()}
    className="w-9 h-9 shrink-0 rounded-full bg-orange-500 hover:bg-orange-400 disabled:opacity-40 disabled:hover:bg-orange-500 transition-colors flex items-center justify-center"
  >
    {status === "scanning" ? (
      <Loader2 className="w-4 h-4 text-white animate-spin" />
    ) : (
      <ArrowUp className="w-4 h-4 text-white" />
    )}
  </button>
</div>
    </div>
  );
}