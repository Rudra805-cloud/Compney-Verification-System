import React from "react";
import { PanelLeft, ChevronDown, Sun, Moon } from "lucide-react";

/**
 * Topbar
 *
 * Props
 * ─────
 * sidebarOpen     boolean
 * onOpenSidebar   () => void
 * theme           "dark" | "light"
 * onToggleTheme   () => void
 */
export default function Topbar({ sidebarOpen, onOpenSidebar, theme = "dark", onToggleTheme }) {
  const dk = theme === "dark";

  return (
    <div
      className={[
        "flex items-center justify-between px-3 sm:px-6 py-3 sm:py-4 border-b gap-3",
        dk ? "border-neutral-800 bg-neutral-950" : "border-neutral-200 bg-neutral-50",
      ].join(" ")}
    >
      {/* Left: sidebar toggle + brand */}
      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
        {!sidebarOpen && (
          <button
            onClick={onOpenSidebar}
            className={`transition-colors ${dk ? "text-neutral-500 hover:text-neutral-200" : "text-neutral-400 hover:text-neutral-700"}`}
          >
            <PanelLeft className="w-4 h-4" />
          </button>
        )}
        <button
          className={`flex items-center gap-1.5 font-semibold text-xs sm:text-sm truncate ${dk ? "text-neutral-200" : "text-neutral-800"}`}
          style={{ fontFamily: "'Space Grotesk', sans-serif" }}
        >
          <span className="hidden sm:inline">Veris</span>
          <span className="sm:hidden">V</span>
          <ChevronDown className={`w-4 h-4 shrink-0 ${dk ? "text-neutral-500" : "text-neutral-400"}`} />
        </button>
      </div>

      {/* Right: theme toggle */}
      <div className="flex items-center gap-2 sm:gap-3">
        <button
          onClick={onToggleTheme}
          aria-label={dk ? "Switch to light mode" : "Switch to dark mode"}
          className={[
            "w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center transition-colors shrink-0",
            dk
              ? "bg-neutral-800 hover:bg-neutral-700 text-neutral-300"
              : "bg-neutral-100 hover:bg-neutral-200 text-neutral-600",
          ].join(" ")}
        >
          {dk ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
      </div>
    </div>
  );
}