import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const navItems = [
  { name: "Dashboard",  path: "/vendor",           icon: "⊞" },
  { name: "Products",   path: "/vendor/products",  icon: "👕" },
  { name: "Orders",     path: "/vendor/orders",    icon: "🛍️" },
  { name: "Earnings",   path: "/vendor/earnings",  icon: "💰" },
  { name: "Reviews",    path: "/vendor/reviews",   icon: "⭐" },
  { name: "Settings",   path: "/vendor/settings",  icon: "⚙️" },
];

const VendorLayout = () => {
  const location = useLocation();
  const navigate  = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
      {/* ── Sidebar ── */}
      <div className="fixed left-0 top-0 h-screen w-64 bg-gradient-to-b from-emerald-50 via-green-50 to-teal-50 flex flex-col justify-between border-r border-emerald-300 shadow-lg z-40">
        <style>{`
          .glass-item{background:linear-gradient(135deg,rgba(255,255,255,.8) 0%,rgba(16,185,129,.08) 100%);backdrop-filter:blur(12px);border:2px solid rgba(16,185,129,.3);}
          .glass-item:hover{background:linear-gradient(135deg,rgba(255,255,255,.95) 0%,rgba(16,185,129,.12) 100%);border:2px solid rgba(16,185,129,.5);box-shadow:0 8px 20px rgba(16,185,129,.15);}
          .glass-item.active{background:linear-gradient(135deg,rgba(16,185,129,.95),rgba(34,197,94,.95));border:2px solid rgba(255,255,255,.9);box-shadow:0 12px 30px rgba(16,185,129,.3);}
        `}</style>

        {/* Logo */}
        <div>
          <Link to="/vendor" className="flex items-center gap-3 px-6 py-6 no-underline group">
            <motion.div whileHover={{ scale:1.1, rotate:5 }} className="bg-gradient-to-br from-emerald-500 to-green-600 text-white font-bold text-lg flex items-center justify-center h-12 w-12 rounded-xl shadow-lg">
              S
            </motion.div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-900 to-green-800 bg-clip-text text-transparent">Skaviyo</h1>
              <p className="text-xs text-emerald-600 font-medium">Vendor Portal</p>
            </div>
          </Link>

          {/* Nav */}
          <nav className="px-4 mt-2">
            {navItems.map(item => {
              const active = location.pathname === item.path;
              return (
                <Link key={item.path} to={item.path}
                  className={`glass-item flex items-center gap-3 px-4 py-3.5 mb-2 rounded-xl transition-all duration-300 no-underline group ${active ? "active shadow-lg" : "hover:shadow-md"}`}
                >
                  <span className={`text-lg ${active ? "text-white" : "text-emerald-600 group-hover:text-emerald-700"}`}>{item.icon}</span>
                  <span className={`text-sm font-semibold ${active ? "text-white" : "text-gray-700 group-hover:text-emerald-700"}`}>{item.name}</span>
                  {active && <motion.div layoutId="vendorIndicator" className="ml-auto w-2 h-2 bg-white rounded-full" />}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Logout */}
        <div className="px-4 pb-6">
          <div className="border-t border-emerald-200/30 mb-4" />
          <motion.button onClick={handleLogout} whileHover={{ scale:1.02, x:2 }} whileTap={{ scale:0.98 }}
            className="w-full glass-item flex items-center gap-3 px-4 py-3.5 text-red-500 hover:text-red-600 rounded-xl cursor-pointer transition-all font-semibold text-sm"
          >
            <span className="text-lg">🚪</span>
            <span>Logout</span>
          </motion.button>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="flex-1 ml-64 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default VendorLayout;
