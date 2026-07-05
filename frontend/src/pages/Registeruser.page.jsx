import React, { useEffect, useState } from "react";
import { ShieldCheck, ArrowRight, Sun, Moon, Eye, EyeOff, Check } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../api/auth.api";

function CircuitPattern({ className, flip = false }) {
  return (
    <svg
      viewBox="0 0 260 260"
      className={className}
      style={flip ? { transform: "rotate(180deg)" } : undefined}
      fill="none"
    >
      <g stroke="currentColor" strokeWidth="1.5">
        <path d="M10 230 H70 V190 H120 V150" />
        <path d="M10 200 H50 V160" />
        <path d="M40 260 V220 H90" />
        <path d="M150 10 H190 V50 H230" />
        <path d="M170 40 H210 V80" />
        <path d="M130 70 H170" />
      </g>
      <g fill="currentColor">
        <circle cx="120" cy="150" r="4" />
        <circle cx="50" cy="160" r="3" />
        <circle cx="230" cy="50" r="4" />
        <circle cx="170" cy="80" r="3" />
        <rect x="65" y="186" width="6" height="6" />
        <rect x="186" y="36" width="6" height="6" />
      </g>
    </svg>
  );
}

function StrengthBar({ password }) {
  const score = (() => {
    if (!password) return 0;
    let s = 0;
    if (password.length >= 8) s++;
    if (/[A-Z]/.test(password)) s++;
    if (/[0-9]/.test(password)) s++;
    if (/[^A-Za-z0-9]/.test(password)) s++;
    return s;
  })();
  const labels = ["", "Weak", "Fair", "Good", "Strong"];
  const colors = ["", "bg-red-500", "bg-orange-400", "bg-yellow-400", "bg-cyan-400"];
  const textColors = ["", "text-red-400", "text-orange-400", "text-yellow-400", "text-cyan-400"];
  if (!password) return null;
  return (
    <div className="mt-2 space-y-1">
      <div className="flex gap-1">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`h-0.5 flex-1 rounded-full transition-all duration-300 ${
              i <= score ? colors[score] : "bg-neutral-700"
            }`}
          />
        ))}
      </div>
      <p className={`text-[11px] ${textColors[score]}`}>{labels[score]}</p>
    </div>
  );
}

export default function RegisterUserPage() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme");
      return saved === "light" || saved === "dark" ? saved : "dark";
    }
    return "dark";
  });

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.classList.toggle("light", theme === "light");
  }, [theme]);

  const isLight = theme === "light";

  const passwordMatch = password && confirmPassword && password === confirmPassword;
  const passwordMismatch = password && confirmPassword && password !== confirmPassword;

  const inputBase = (extra = "") =>
    `w-full rounded-xl border px-4 py-3.5 text-sm outline-none transition-colors focus:border-orange-500 ${
      isLight
        ? "bg-white border-slate-300 text-slate-900 placeholder-slate-400"
        : "bg-neutral-950 border-neutral-700 text-neutral-200 placeholder-neutral-500"
    } ${extra}`;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) return setError("Name is required");
    if (!email.trim()) return setError("Email is required");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) return setError("Please enter a valid email address");

    if (!password) return setError("Password is required");
    if (password.length < 8) return setError("Password must be at least 8 characters");
    if (!confirmPassword) return setError("Please confirm your password");
    if (password !== confirmPassword) return setError("Passwords do not match");

    try {
      setLoading(true);
      const data = await registerUser({
        name: name.trim(),
        email: email.trim(),
        password,
      });
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`relative min-h-screen w-full flex items-center justify-center overflow-hidden font-sans transition-colors duration-300 ${
        isLight ? "bg-slate-50 text-slate-900" : "bg-neutral-950 text-neutral-200"
      }`}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@600;700&family=Inter:wght@400;500;600&display=swap');
        .font-display { font-family: 'Space Grotesk', sans-serif; }
        body, .font-sans { font-family: 'Inter', sans-serif; }
      `}</style>

      {/* Theme toggle */}
      

      {/* Glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: isLight
            ? "radial-gradient(700px circle at 15% 10%, rgba(249,115,22,0.10), transparent 60%), radial-gradient(700px circle at 85% 90%, rgba(34,211,238,0.08), transparent 60%)"
            : "radial-gradient(700px circle at 15% 10%, rgba(249,115,22,0.10), transparent 60%), radial-gradient(700px circle at 85% 90%, rgba(34,211,238,0.08), transparent 60%)",
        }}
      />

      {/* Circuit */}
      <CircuitPattern
        className={`absolute -top-4 -right-4 w-64 h-64 sm:w-80 sm:h-80 ${
          isLight ? "text-slate-200" : "text-neutral-800"
        }`}
      />
      <CircuitPattern
        className={`absolute -bottom-4 -left-4 w-64 h-64 sm:w-80 sm:h-80 ${
          isLight ? "text-slate-200" : "text-neutral-800"
        }`}
        flip
      />

      {/* Card */}
      <div
        className={`relative z-10 w-full max-w-md mx-4 rounded-2xl border p-8 sm:p-10 ${
          isLight
            ? "border-slate-200 bg-white shadow-xl shadow-slate-200/70"
            : "border-neutral-800 bg-neutral-900 shadow-xl shadow-black/40"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center gap-2.5 justify-center mb-8">
          <div className="w-9 h-9 rounded-lg bg-orange-500 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5 text-neutral-950" />
          </div>
          <span className={`font-display font-bold text-xl ${isLight ? "text-slate-900" : "text-white"}`}>
            Veris
          </span>
        </div>

        <h1 className={`font-display font-semibold text-2xl text-center mb-1 ${isLight ? "text-slate-900" : "text-white"}`}>
          Create your account 🚀
        </h1>
        <p className={`text-center text-sm mb-7 ${isLight ? "text-slate-500" : "text-neutral-500"}`}>
          Verify companies before you trust them.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Name */}
          <input
            type="text"
            value={name}
            autoComplete="name"
            onChange={(e) => setName(e.target.value)}
            placeholder="Full name"
            className={inputBase()}
          />

          {/* Email */}
          <input
            type="email"
            value={email}
            autoComplete="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@gmail.com"
            className={inputBase()}
          />

          {/* Password */}
          <div>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                value={password}
                autoComplete="new-password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password (min. 8 characters)"
                className={inputBase("pr-11")}
              />
              <button
                type="button"
                onClick={() => setShowPass((s) => !s)}
                className={`absolute right-3.5 top-1/2 -translate-y-1/2 transition-colors ${
                  isLight ? "text-slate-400 hover:text-slate-600" : "text-neutral-500 hover:text-neutral-300"
                }`}
              >
                {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <StrengthBar password={password} />
          </div>

          {/* Confirm password */}
          <div>
            <div className="relative">
              <input
                type={showConfirm ? "text" : "password"}
                value={confirmPassword}
                autoComplete="new-password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm password"
                className={inputBase(
                  `pr-11 ${
                    passwordMismatch
                      ? "border-red-500 focus:border-red-500"
                      : passwordMatch
                      ? "border-cyan-500 focus:border-cyan-500"
                      : ""
                  }`
                )}
              />
              <button
                type="button"
                onClick={() => setShowConfirm((s) => !s)}
                className={`absolute right-3.5 top-1/2 -translate-y-1/2 transition-colors ${
                  isLight ? "text-slate-400 hover:text-slate-600" : "text-neutral-500 hover:text-neutral-300"
                }`}
              >
                {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {passwordMismatch && (
              <p className="text-[11px] text-red-400 mt-1.5">Passwords do not match.</p>
            )}
          </div>

          {/* Error */}
          {error && (
            <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={
loading ||
passwordMismatch ||
!name ||
!email ||
!password ||
!confirmPassword
}
            className="w-full rounded-xl bg-orange-500 hover:bg-orange-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-neutral-950 font-semibold py-3.5 flex items-center justify-center gap-2"
          >
            {loading ? (
              <span className="w-4 h-4 border-2 border-neutral-950/30 border-t-neutral-950 rounded-full animate-spin" />
            ) : (
              <>Create Account <ArrowRight className="w-4 h-4" /></>
            )}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 py-1">
            <div className={`flex-1 border-t ${isLight ? "border-slate-200" : "border-neutral-800"}`} />
            <span className={`text-xs ${isLight ? "text-slate-400" : "text-neutral-500"}`}>or</span>
            <div className={`flex-1 border-t ${isLight ? "border-slate-200" : "border-neutral-800"}`} />
          </div>

        </form>

        <p className={`text-center text-sm mt-5 ${isLight ? "text-slate-600" : "text-neutral-400"}`}>
          Already have an account?{" "}
          <Link
            to="/login"
            className={`font-medium ${
              isLight ? "text-orange-600 hover:text-orange-500" : "text-orange-400 hover:text-orange-300"
            }`}
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}