import React, { useEffect, useState } from "react";
import { ShieldCheck, ArrowRight, Sun, Moon, Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import { loginUser } from "../api/auth.api";
import Dashboard from "./Dashboard.page";
import { useNavigate } from "react-router-dom";
function GoogleIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 48 48">
      <path
        fill="#FFC107"
        d="M43.6 20.5H42V20H24v8h11.3C33.7 32.9 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.1 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.7-.4-3.5z"
      />
      <path
        fill="#FF3D00"
        d="M6.3 14.7l6.6 4.8C14.6 16 19 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.1 29.6 4 24 4c-7.6 0-14.1 4.3-17.7 10.7z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.2 0 9.9-1.8 13.5-4.8l-6.2-5.2c-2 1.4-4.6 2.2-7.3 2.2-5.3 0-9.7-3.1-11.3-7.5l-6.5 5C9.8 39.6 16.3 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.2-4.2 5.6l6.2 5.2C40.9 36 44 30.6 44 24c0-1.3-.1-2.7-.4-3.5z"
      />
    </svg>
  );
}

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

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      return savedTheme === "light" || savedTheme === "dark"
        ? savedTheme
        : "dark";
    }
    return "dark";
  });

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light" || savedTheme === "dark") {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.classList.toggle("light", theme === "light");
  }, [theme]);

  const isLight = theme === "light";

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Email and password are required");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email.trim())) {
      setError("Please enter a valid email address");
      return;
    }
    try {
      const data = await loginUser({
        email: email.trim(),
        password,
      });
      localStorage.setItem("token", data.token);

      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      console.log(error.response);
      console.log(error.response?.data);

      setError(error.response?.data?.message || "Login failed");
    }
  };
  return (
    <div
      className={`relative min-h-screen w-full flex items-center justify-center overflow-hidden font-sans ${
        isLight
          ? "bg-slate-50 text-slate-900"
          : "bg-neutral-950 text-neutral-200"
      }`}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@600;700&family=Inter:wght@400;500;600&display=swap');
        .font-display { font-family: 'Space Grotesk', sans-serif; }
        body, .font-sans { font-family: 'Inter', sans-serif; }
      `}</style>


      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: isLight
            ? "radial-gradient(700px circle at 15% 10%, rgba(249,115,22,0.12), transparent 60%), radial-gradient(700px circle at 85% 90%, rgba(34,211,238,0.10), transparent 60%)"
            : "radial-gradient(700px circle at 15% 10%, rgba(249,115,22,0.10), transparent 60%), radial-gradient(700px circle at 85% 90%, rgba(34,211,238,0.08), transparent 60%)",
        }}
      />

      <CircuitPattern
        className={`absolute -top-4 -right-4 w-64 h-64 sm:w-80 sm:h-80 ${isLight ? "text-slate-200" : "text-neutral-800"}`}
      />
      <CircuitPattern
        className={`absolute -bottom-4 -left-4 w-64 h-64 sm:w-80 sm:h-80 ${isLight ? "text-slate-200" : "text-neutral-800"}`}
        flip
      />

      <div
        className={`relative z-10 w-full max-w-md mx-4 rounded-2xl border p-8 sm:p-10 ${isLight ? "border-slate-200 bg-white shadow-xl shadow-slate-200/70" : "border-neutral-800 bg-neutral-900 shadow-xl shadow-black/40"}`}
      >
        <div className="flex items-center gap-2.5 justify-center mb-8">
          <div className="w-9 h-9 rounded-lg bg-orange-500 flex items-center justify-center">
            <ShieldCheck className="w-5 h-5 text-neutral-950" />
          </div>
          <span
            className={`font-display font-bold text-xl ${isLight ? "text-slate-900" : "text-white"}`}
          >
            Veris
          </span>
        </div>

        <h1
          className={`font-display font-semibold text-2xl text-center mb-7 ${isLight ? "text-slate-900" : "text-white"}`}
        >
          Welcome{" "}
          <span role="img" aria-label="wave">
            👋
          </span>{" "}
          Let's get verifying!
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            autoComplete="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@gmail.com"
            className={`w-full rounded-xl border px-4 py-3.5 text-sm outline-none transition-colors ${
              isLight
                ? "bg-white border-slate-300 text-slate-900 placeholder-slate-500"
                : "bg-neutral-950 border-neutral-700 text-neutral-200 placeholder-neutral-500"
            } focus:border-orange-500`}
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Your password"
              className={`w-full rounded-xl border px-4 py-3.5 pr-11 text-sm outline-none transition-colors ${
                isLight
                  ? "bg-white border-slate-300 text-slate-900 placeholder-slate-500"
                  : "bg-neutral-950 border-neutral-700 text-neutral-200 placeholder-neutral-500"
              } focus:border-orange-500`}
            />

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className={`absolute right-3.5 top-1/2 -translate-y-1/2 transition-colors ${
                isLight
                  ? "text-slate-400 hover:text-slate-600"
                  : "text-neutral-500 hover:text-neutral-300"
              }`}
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
          {error && (
            <p
              className={`text-sm ${isLight ? "text-red-500" : "text-red-400"}`}
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full rounded-xl bg-orange-500 hover:bg-orange-400 transition-colors text-neutral-950 font-semibold py-3.5 flex items-center justify-center gap-2"
          >
            Continue <ArrowRight className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-3 py-1">
            <div
              className={`flex-1 border-t ${isLight ? "border-slate-200" : "border-neutral-800"}`}
            />
            <span
              className={`text-xs ${isLight ? "text-slate-500" : "text-neutral-500"}`}
            >
              or
            </span>
            <div
              className={`flex-1 border-t ${isLight ? "border-slate-200" : "border-neutral-800"}`}
            />
          </div>

          {/* <button className="w-full rounded-lg border px-4 py-2 text-xs font-medium flex items-center justify-center gap-2 transition-colors bg-neutral-800 border-neutral-700 text-neutral-200 hover:bg-neutral-700">
            <GoogleIcon className="w-3.5 h-3.5" />
            Continue with Google
          </button> */}
        </form>

        <p className="text-center text-xs mt-6 text-neutral-500"></p>
        <p
          className={`text-center text-sm mt-5 ${isLight ? "text-slate-600" : "text-neutral-400"}`}
        >
          Don't have an account?{" "}
          <Link
            to="/register"
            className={`${isLight ? "text-orange-600 hover:text-orange-500" : "text-orange-400 hover:text-orange-300"} font-medium`}
          >
            Create Account
          </Link>
        </p>
        {/* <p className="text-center text-sm mt-5 text-neutral-400">
          Skip &amp; continue to{" "}
          <a href="#" className="text-orange-400 hover:text-orange-300 font-medium">
            Home
          </a>
        </p> */}
      </div>
    </div>
  );
}
