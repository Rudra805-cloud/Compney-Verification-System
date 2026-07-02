import React from "react";
import {
  Globe,
  Lock,
  Activity,
  Mail,
  Share2,
  FileText,
  Briefcase,
} from "lucide-react";

export const SIGNAL_DEFS = [
  {
    key: "whoisScore",
    label: "WHOIS Registration",
    icon: Globe,
  },
  {
    key: "sslScore",
    label: "SSL Certificate",
    icon: Lock,
  },
  {
    key: "websiteReachScore",
    label: "Website Reachability",
    icon: Activity,
  },
  {
    key: "contactScore",
    label: "Contact Information",
    icon: Mail,
  },
  {
    key: "socialScore",
    label: "Social Presence",
    icon: Share2,
  },
  {
    key: "legalScore",
    label: "Legal Pages",
    icon: FileText,
  },
  {
    key: "careerScore",
    label: "Careers Page",
    icon: Briefcase,
  },
];

export default function ScanResult({
  status = "idle",
  domain = "",
  result = null,
  theme = "dark",
}) {
  const dk = theme === "dark";

  if (status === "idle" || !result) return null;

  return (
    <div
      className={[
        "mt-10 rounded-2xl border p-6 sm:p-7",
        dk
          ? "border-neutral-800 bg-neutral-900/70"
          : "border-neutral-200 bg-white shadow-sm",
      ].join(" ")}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <span
          className={`text-sm ${
            dk ? "text-neutral-300" : "text-neutral-600"
          }`}
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          {result.companyId?.hostname || domain}
        </span>

        <span
          className={`text-[10px] uppercase tracking-wide ${
            dk ? "text-neutral-500" : "text-neutral-400"
          }`}
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
        >
          Scan Complete
        </span>
      </div>

      {/* Scores */}
      <div className="grid sm:grid-cols-2 gap-x-8 gap-y-2.5 mb-6">
        {SIGNAL_DEFS.map(({ key, label, icon: Icon }) => {
          const score = result.appliedChecks?.[key];

          return (
            <div key={key} className="flex items-center gap-2.5 text-sm">
              <Icon
                className={`w-4 h-4 shrink-0 ${
                  dk ? "text-neutral-500" : "text-neutral-400"
                }`}
              />

              <span
                className={`flex-1 ${
                  dk ? "text-neutral-400" : "text-neutral-500"
                }`}
              >
                {label}
              </span>

              <span
                className={`text-xs font-semibold ${
                  score >= 80
                    ? "text-cyan-400"
                    : score >= 50
                    ? "text-orange-400"
                    : "text-red-400"
                }`}
              >
                {score}/100
              </span>
            </div>
          );
        })}
      </div>

      <div
        className={`pt-5 border-t space-y-5 ${
          dk ? "border-neutral-800" : "border-neutral-200"
        }`}
      >
        {/* Trust Score */}
        <div className="flex items-center justify-between">
          <div>
            <p
              className={`text-[10px] uppercase tracking-wide mb-0.5 ${
                dk ? "text-neutral-500" : "text-neutral-400"
              }`}
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              Trust Score
            </p>

            <p
              className={`font-semibold text-3xl ${
                dk ? "text-white" : "text-neutral-900"
              }`}
              style={{ fontFamily: "'JetBrains Mono', monospace" }}
            >
              {result.trustScore}
              <span
                className={`text-lg ${
                  dk ? "text-neutral-500" : "text-neutral-400"
                }`}
              >
                %
              </span>
            </p>
            <p
  className={`text-xs mt-1 ${
    dk ? "text-neutral-500" : "text-neutral-500"
  }`}
>
  Validated:{" "}
  {result?.validatedAt &&
    new Date(result.validatedAt).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })}
</p>
          </div>

          <span
            className={`text-xs font-medium rounded-full border px-3 py-1 ${
              result.riskLevel === "Low"
                ? "text-cyan-400 border-cyan-400/30 bg-cyan-400/10"
                : result.riskLevel === "Medium"
                ? "text-orange-400 border-orange-400/30 bg-orange-400/10"
                : "text-red-400 border-red-400/30 bg-red-400/10"
            }`}
          >
            {result.riskLevel} Risk
          </span>
        </div>

        {/* Progress */}
        <div
          className={`h-1.5 w-full rounded-full overflow-hidden ${
            dk ? "bg-neutral-800" : "bg-neutral-100"
          }`}
        >
          <div
            className={`h-full transition-all duration-500 ${
              result.trustScore >= 70
                ? "bg-gradient-to-r from-orange-500 to-cyan-400"
                : result.trustScore >= 40
                ? "bg-gradient-to-r from-orange-500 to-orange-300"
                : "bg-gradient-to-r from-orange-500 to-red-500"
            }`}
            style={{ width: `${result.trustScore}%` }}
          />
        </div>

        {/* Summary */}
        <div>
          <p
            className={`text-xs font-medium mb-2 ${
              dk ? "text-neutral-400" : "text-neutral-500"
            }`}
          >
            Summary
          </p>

          <div
            className={`text-sm leading-relaxed whitespace-pre-line ${
              dk ? "text-neutral-300" : "text-neutral-600"
            }`}
          >
            {result.summary}
          </div>
        </div>
      </div>
    </div>
  );
}