import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

interface MenuItem {
  name: string;
  path: string;
  icon: string;
}

const menuItems: MenuItem[] = [
  { name: "Dashboard", path: "/admin", icon: "⊞" },
  { name: "Users", path: "/admin/users", icon: "👥" },
  { name: "Vendors", path: "/admin/vendors", icon: "🏪" },
  { name: "Products", path: "/admin/products", icon: "👕" },
  { name: "Categories", path: "/admin/categories", icon: "📚" },
  { name: "Orders", path: "/admin/orders", icon: "🛍️" },
  { name: "Limited Edition", path: "/admin/limited-edition", icon: "⭐" },
  { name: "Reports", path: "/admin/reports", icon: "📊" },
];

const Sidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring" as const, stiffness: 100 },
    },
  };

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-gradient-to-b from-emerald-50 via-green-50 to-teal-50 flex flex-col justify-between overflow-hidden relative border-r border-emerald-400 shadow-lg z-40">
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-green-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      </div>

      <style>{`
        .glass-item {
          background: linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(16,185,129,0.08) 100%);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 2px solid rgba(16,185,129,0.3);
        }
        .glass-item:hover {
          background: linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(16,185,129,0.12) 100%);
          border: 2px solid rgba(16,185,129,0.5);
          box-shadow: 0 8px 20px rgba(16,185,129,0.15);
        }
        .glass-item.active {
          background: linear-gradient(135deg, rgba(16,185,129,0.95), rgba(34,197,94,0.95));
          border: 2px solid rgba(255,255,255,0.9);
          color: white;
          box-shadow: 0 12px 30px rgba(16,185,129,0.3);
        }
      `}</style>

      <div className="relative z-10">
        {/* Logo */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Link to="/admin" className="flex items-center gap-3 px-6 py-6 hover:no-underline group">
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="bg-gradient-to-br from-emerald-500 to-green-600 text-white font-bold text-lg flex items-center justify-center h-12 w-12 rounded-xl shadow-lg group-hover:shadow-emerald-400/50"
            >
              S
            </motion.div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-900 to-green-800 bg-clip-text text-transparent">Skaviyo</h1>
              <p className="text-xs text-emerald-600 font-medium">Admin Panel</p>
            </div>
          </Link>
        </motion.div>

        {/* Menu Items */}
        <motion.nav className="px-4 mt-4" variants={containerVariants} initial="hidden" animate="visible">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <motion.div key={item.path} variants={itemVariants}>
                <Link
                  to={item.path}
                  className={`glass-item flex items-center gap-3 px-4 py-3.5 mb-2 rounded-xl transition-all duration-300 no-underline group ${
                    isActive ? "active shadow-lg shadow-emerald-300/50" : "hover:shadow-md"
                  }`}
                >
                  <span className={`text-lg ${isActive ? "text-white" : "text-emerald-600 group-hover:text-emerald-700"} transition-colors`}>
                    {item.icon}
                  </span>
                  <span className={`text-sm font-semibold ${isActive ? "text-white" : "text-gray-700 group-hover:text-emerald-700"} transition-colors`}>
                    {item.name}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="ml-auto w-2 h-2 bg-white rounded-full"
                      transition={{ type: "spring", stiffness: 200, damping: 30 }}
                    />
                  )}
                </Link>
              </motion.div>
            );
          })}
        </motion.nav>
      </div>

      {/* Bottom Section */}
      <motion.div
        className="px-4 pb-6 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="border-t border-emerald-200/30 mb-4"></div>

        <Link
          to="/admin/settings"
          className={`glass-item flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 no-underline mb-2 group ${
            location.pathname === "/admin/settings" ? "active shadow-lg shadow-emerald-300/50" : "hover:shadow-md"
          }`}
        >
          <span className={`text-lg ${location.pathname === "/admin/settings" ? "text-white" : "text-emerald-600 group-hover:text-emerald-700"}`}>
            ⚙️
          </span>
          <span className={`text-sm font-semibold ${location.pathname === "/admin/settings" ? "text-white" : "text-gray-700 group-hover:text-emerald-700"}`}>
            Settings
          </span>
        </Link>

        <motion.button
          onClick={handleLogout}
          whileHover={{ scale: 1.02, x: 2 }}
          whileTap={{ scale: 0.98 }}
          className="w-full glass-item flex items-center gap-3 px-4 py-3.5 text-red-500 hover:text-red-600 rounded-xl cursor-pointer transition-all duration-300 border-none font-semibold text-sm group"
        >
          <span className="text-lg">🚪</span>
          <span>Logout</span>
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Sidebar;
