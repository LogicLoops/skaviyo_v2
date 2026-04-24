import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// ─── Mock user database ───────────────────────────────────────────────────────
// Replace with real API call when backend is ready:
//   const res = await login({ email, password });
//   const role = res.role;  ← comes from backend
const MOCK_USERS: Record<string, { role: string; name: string; password: string }> = {
  "admin@skaviyo.com":       { role: "ADMIN",    name: "Super Admin",   password: "admin123" },
  "admin2@skaviyo.com":      { role: "ADMIN",    name: "Admin Two",     password: "admin123" },
  "vendor@skaviyo.com":      { role: "VENDOR",   name: "Rajesh Kumar",  password: "vendor123" },
  "vendor2@skaviyo.com":     { role: "VENDOR",   name: "Anita Sharma",  password: "vendor123" },
  "customer@skaviyo.com":    { role: "CUSTOMER", name: "Sarah Anderson",password: "user123" },
  "user@skaviyo.com":        { role: "CUSTOMER", name: "Raj Patel",     password: "user123" },
};

const ROLE_HOME: Record<string, string> = {
  ADMIN:    "/admin",
  VENDOR:   "/vendor",
  CUSTOMER: "/shop",
};

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail]               = useState("");
  const [password, setPassword]         = useState("");
  const [loading, setLoading]           = useState(false);
  const [error, setError]               = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Simulate network delay
      await new Promise((res) => setTimeout(res, 800));

      // ── Lookup email in mock DB (swap with real API later) ──
      const userEntry = MOCK_USERS[email.toLowerCase().trim()];

      if (!userEntry) {
        setError("No account found with this email address.");
        return;
      }

      if (userEntry.password !== password) {
        setError("Incorrect password. Please try again.");
        return;
      }

      // ── Auth success: store session & redirect by role ──
      localStorage.setItem("role", userEntry.role);
      localStorage.setItem("user", JSON.stringify({ email, name: userEntry.name, role: userEntry.role }));

      navigate(ROLE_HOME[userEntry.role]);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
  };
  const item = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 120 } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
      <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />

      <style>{`
        @keyframes blob {
          0%,100%{transform:translate(0,0) scale(1);}
          33%{transform:translate(30px,-50px) scale(1.1);}
          66%{transform:translate(-20px,20px) scale(0.9);}
        }
        .animate-blob{animation:blob 7s infinite;}
        .animation-delay-2000{animation-delay:2s;}
        .animation-delay-4000{animation-delay:4s;}
        .glass{
          background:rgba(255,255,255,0.52);
          backdrop-filter:blur(14px);
          -webkit-backdrop-filter:blur(14px);
          border:1px solid rgba(255,255,255,0.65);
        }
      `}</style>

      <div className="w-full max-w-5xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">

          {/* ── Left: Branding ── */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="hidden lg:flex flex-col justify-center"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="mb-8"
            >
              <div className="bg-gradient-to-br from-emerald-500 to-green-600 w-20 h-20 rounded-2xl flex items-center justify-center shadow-2xl">
                <span className="text-4xl font-bold text-white">S</span>
              </div>
            </motion.div>

            <h1 className="text-5xl font-bold bg-gradient-to-r from-emerald-900 via-green-800 to-teal-800 bg-clip-text text-transparent mb-3">
              Skaviyo
            </h1>
            <p className="text-xl text-gray-700 font-semibold mb-2">Premium E-Commerce Platform</p>
            <p className="text-gray-600 leading-relaxed mb-8">
              One secure login for every role. Your dashboard is automatically determined by your account — no manual selection needed.
            </p>

            {/* Role info cards */}
            <div className="space-y-3">
              {[
                { icon: "👑", role: "Admin",    desc: "Full platform control & analytics" },
                { icon: "🏪", role: "Vendor",   desc: "Manage your store & track earnings" },
                { icon: "🛍️", role: "Customer", desc: "Shop the finest collections" },
              ].map((r, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-center gap-3 bg-white/40 backdrop-blur-sm px-4 py-3 rounded-xl border border-white/60"
                >
                  <span className="text-2xl">{r.icon}</span>
                  <div>
                    <p className="text-sm font-bold text-gray-800">{r.role}</p>
                    <p className="text-xs text-gray-500">{r.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ── Right: Login form ── */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            className="glass rounded-3xl p-8 lg:p-10 shadow-2xl"
          >
            {/* Mobile logo */}
            <motion.div variants={item} className="lg:hidden text-center mb-6">
              <div className="bg-gradient-to-br from-emerald-500 to-green-600 w-14 h-14 rounded-xl flex items-center justify-center shadow-lg mx-auto mb-3">
                <span className="text-2xl font-bold text-white">S</span>
              </div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-900 to-green-700 bg-clip-text text-transparent">
                Skaviyo
              </h2>
            </motion.div>

            <motion.h2
              variants={item}
              className="text-3xl font-bold text-center text-gray-900 mb-1"
            >
              Welcome Back
            </motion.h2>
            <motion.p
              variants={item}
              className="text-center text-gray-500 text-sm mb-7"
            >
              Sign in — your role is detected automatically
            </motion.p>

            {/* Error message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                className="mb-5 p-4 bg-red-50 text-red-700 rounded-xl text-sm font-medium border border-red-200 flex items-center gap-2"
              >
                <span className="text-base">⚠️</span>
                {error}
              </motion.div>
            )}

            <form onSubmit={handleLogin} className="space-y-5">
              {/* Email */}
              <motion.div variants={item}>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-3.5 pointer-events-none text-emerald-600 text-sm">✉️</span>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    autoComplete="email"
                    className="w-full pl-12 pr-4 py-3 bg-white/80 border border-emerald-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:outline-none transition-all placeholder-gray-400 text-sm"
                  />
                </div>
              </motion.div>

              {/* Password */}
              <motion.div variants={item}>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-semibold text-gray-700">Password</label>
                  <span className="text-xs text-emerald-600 font-medium cursor-pointer hover:text-emerald-700 transition">
                    Forgot password?
                  </span>
                </div>
                <div className="relative">
                  <span className="absolute left-4 top-3.5 pointer-events-none text-emerald-600 text-sm">🔒</span>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    autoComplete="current-password"
                    className="w-full pl-12 pr-12 py-3 bg-white/80 border border-emerald-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 focus:outline-none transition-all placeholder-gray-400 text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-3.5 text-emerald-600 hover:text-emerald-700 transition text-sm"
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                </div>
              </motion.div>

              {/* Submit */}
              <motion.button
                variants={item}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-emerald-500 to-green-600 text-white py-3.5 rounded-xl hover:from-emerald-600 hover:to-green-700 transition-all font-semibold text-base shadow-lg hover:shadow-emerald-400/50 disabled:opacity-70 disabled:cursor-not-allowed mt-1"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin inline-block" />
                    Signing in...
                  </span>
                ) : (
                  "Sign In"
                )}
              </motion.button>
            </form>

            {/* Hint panel — remove in production */}
            <motion.div
              variants={item}
              className="mt-6 p-4 bg-emerald-50/80 border border-emerald-200 rounded-xl"
            >
              <p className="text-xs font-bold text-emerald-800 mb-2 uppercase tracking-wider">
                🔑 Demo Credentials
              </p>
              <div className="space-y-1.5 text-xs text-gray-600 font-mono">
                <div className="flex justify-between">
                  <span className="text-emerald-700 font-semibold">👑 Admin</span>
                  <span>admin@skaviyo.com / admin123</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-emerald-700 font-semibold">🏪 Vendor</span>
                  <span>vendor@skaviyo.com / vendor123</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-emerald-700 font-semibold">🛍️ Customer</span>
                  <span>customer@skaviyo.com / user123</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
