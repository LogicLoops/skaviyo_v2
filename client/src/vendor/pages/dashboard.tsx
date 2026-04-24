import React from "react";
import { motion } from "framer-motion";
import { ResponsiveContainer, BarChart, Bar, XAxis, Tooltip, LineChart, Line } from "recharts";

const salesData = [
  { day: "Mon", sales: 12 }, { day: "Tue", sales: 19 }, { day: "Wed", sales: 8 },
  { day: "Thu", sales: 25 }, { day: "Fri", sales: 18 }, { day: "Sat", sales: 30 }, { day: "Sun", sales: 22 },
];
const revenueData = [
  { week: "W1", revenue: 45000 }, { week: "W2", revenue: 62000 },
  { week: "W3", revenue: 48000 }, { week: "W4", revenue: 71000 },
];
const RECENT_ORDERS = [
  { id: "#SK-8823", customer: "Sarah A.",  amount: "₹8,500",  status: "Delivered", date: "Apr 15" },
  { id: "#SK-8824", customer: "Marcus C.", amount: "₹4,299",  status: "Shipped",   date: "Apr 14" },
  { id: "#SK-8825", customer: "Priya N.",  amount: "₹3,999",  status: "Pending",   date: "Apr 13" },
  { id: "#SK-8826", customer: "Raj P.",    amount: "₹12,500", status: "Delivered", date: "Apr 12" },
  { id: "#SK-8827", customer: "Emma T.",   amount: "₹6,800",  status: "Shipped",   date: "Apr 11" },
];
const MY_PRODUCTS = [
  { id: 1, name: "The Signature White",  stock: 45, sold: 128, price: "₹4,500" },
  { id: 2, name: "Royal Emerald Tee",    stock: 12, sold: 98,  price: "₹3,999" },
  { id: 3, name: "Royal Blue Print",     stock: 0,  sold: 75,  price: "₹4,299" },
  { id: 4, name: "Vintage Classic",      stock: 30, sold: 56,  price: "₹5,299" },
];
const statusColors: Record<string, string> = {
  Delivered: "bg-emerald-100 text-emerald-700",
  Shipped:   "bg-blue-100 text-blue-700",
  Pending:   "bg-yellow-100 text-yellow-700",
};

const VendorDashboard: React.FC = () => (
  <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 overflow-y-auto">
    <style>{`
      .glass-effect{background:linear-gradient(135deg,rgba(255,255,255,.95) 0%,rgba(240,253,250,.5) 100%);backdrop-filter:blur(8px);border:1px solid rgba(167,243,208,.4);}
      ::-webkit-scrollbar{display:none;} html{scrollbar-width:none;}
    `}</style>

    <div className="p-8">
      {/* Header */}
      <motion.div initial={{ opacity:0, y:-20 }} animate={{ opacity:1, y:0 }} className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's your store overview.</p>
        </div>
        <div className="flex items-center gap-3 bg-white px-5 py-3 rounded-full shadow-md border border-emerald-200">
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold">V</div>
          <div>
            <p className="text-sm font-semibold text-gray-800">Vendor Name</p>
            <p className="text-xs text-gray-500">Premium Store</p>
          </div>
        </div>
      </motion.div>

      {/* Welcome Banner */}
      <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-teal-900 via-teal-800 to-emerald-900 p-8 mb-8">
        <div className="absolute top-0 right-0 w-72 h-72 bg-yellow-600/10 rounded-full blur-3xl -mr-24 -mt-24" />
        <div className="relative z-10">
          <p className="text-teal-300 text-sm font-medium mb-1">Good Morning 👋</p>
          <h2 className="text-3xl font-bold text-white mb-1">Welcome back, Vendor!</h2>
          <p className="text-gray-300">Here's what's happening with your store today.</p>
        </div>
        <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:grid grid-cols-3 gap-4">
          {[{ label:"Today's Orders", v:"24" },{ label:"Today's Revenue", v:"₹58K" },{ label:"Pending Actions", v:"3" }].map(s => (
            <div key={s.label} className="bg-white/10 backdrop-blur rounded-2xl p-4 text-center">
              <p className="text-2xl font-bold text-yellow-400">{s.v}</p>
              <p className="text-xs text-gray-300 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { title:"Total Revenue",   value:"₹2.26L", sub:"↑ +22% this month", icon:"💰" },
          { title:"Total Orders",    value:"357",    sub:"↑ +8 this week",    icon:"🛍️" },
          { title:"Total Products",  value:"48",     sub:"4 low in stock",    icon:"👕" },
          { title:"Avg Rating",      value:"4.8 ★",  sub:"256 reviews",       icon:"⭐" },
        ].map((kpi, idx) => (
          <motion.div key={idx}
            initial={{ y:20, opacity:0 }} animate={{ y:0, opacity:1 }} transition={{ delay:idx*0.1 }}
            whileHover={{ y:-8, scale:1.02 }}
            className="glass-effect p-6 rounded-2xl cursor-pointer"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-gray-500 text-xs font-semibold uppercase tracking-wider">{kpi.title}</h3>
                <p className="text-3xl font-bold text-gray-900 mt-3">{kpi.value}</p>
                <p className="text-xs text-emerald-600 font-medium mt-2">{kpi.sub}</p>
              </div>
              <div className="bg-emerald-50 p-3 rounded-xl text-2xl border border-emerald-100">{kpi.icon}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts + Recent Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.2 }}
          className="glass-effect col-span-2 p-8 rounded-2xl">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Weekly Sales</h2>
              <p className="text-sm text-gray-600 mt-1">Units sold this week</p>
            </div>
            <span className="text-2xl font-bold text-emerald-600">134 units</span>
          </div>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesData}>
                <XAxis dataKey="day" stroke="#9CA3AF" style={{ fontSize:"12px" }} />
                <Tooltip contentStyle={{ borderRadius:"12px", border:"1px solid rgba(167,243,208,.4)" }} />
                <Bar dataKey="sales" radius={[8,8,0,0]} fill="url(#vBarGrad)" />
                <defs>
                  <linearGradient id="vBarGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10B981" /><stop offset="100%" stopColor="#6EE7B7" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div initial={{ opacity:0, x:20 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.3 }}
          className="glass-effect p-6 rounded-2xl">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Orders</h2>
          <div className="space-y-3">
            {RECENT_ORDERS.map((o, idx) => (
              <motion.div key={o.id} initial={{ opacity:0, x:10 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.3+idx*0.06 }}
                className="flex items-center justify-between p-3 bg-white/60 rounded-xl hover:bg-white/90 transition cursor-pointer">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center text-white text-xs font-bold">
                    {o.customer.charAt(0)}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-800">{o.id}</p>
                    <p className="text-xs text-gray-500">{o.customer}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-emerald-700">{o.amount}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${statusColors[o.status] || "bg-gray-100 text-gray-700"}`}>{o.status}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Revenue Trend + Products */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.4 }}
          className="glass-effect p-8 rounded-2xl">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Monthly Revenue</h2>
          <p className="text-sm text-gray-600 mb-4">Week-over-week trend</p>
          <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <XAxis dataKey="week" stroke="#9CA3AF" style={{ fontSize:"11px" }} />
                <Tooltip formatter={(v) => [`₹${(v as number).toLocaleString()}`, "Revenue"]} contentStyle={{ borderRadius:"12px" }} />
                <Line type="monotone" dataKey="revenue" stroke="#10B981" strokeWidth={3} dot={{ fill:"#10B981" }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.5 }}
          className="glass-effect p-6 rounded-2xl col-span-2">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">My Products</h2>
              <p className="text-sm text-gray-600 mt-1">Stock and sales overview</p>
            </div>
            <motion.button whileHover={{ scale:1.05 }} whileTap={{ scale:0.95 }}
              className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-xl font-semibold text-sm shadow-lg hover:shadow-emerald-500/50 transition-all">
              + Add Product
            </motion.button>
          </div>
          <table className="w-full">
            <thead>
              <tr className="border-b border-emerald-100">
                {["Product","Price","Sold","Stock","Status"].map(h => (
                  <th key={h} className="pb-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-emerald-50">
              {MY_PRODUCTS.map((p, idx) => (
                <motion.tr key={p.id} initial={{ opacity:0, x:-10 }} animate={{ opacity:1, x:0 }} transition={{ delay:idx*0.06 }}
                  className="hover:bg-white/50 transition">
                  <td className="py-4 text-sm font-semibold text-gray-900">{p.name}</td>
                  <td className="py-4 text-sm font-bold text-emerald-700">{p.price}</td>
                  <td className="py-4 text-sm text-gray-700">{p.sold}</td>
                  <td className="py-4 text-sm text-gray-700">{p.stock}</td>
                  <td className="py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      p.stock === 0 ? "bg-red-100 text-red-700" :
                      p.stock < 15 ? "bg-yellow-100 text-yellow-700" :
                      "bg-emerald-100 text-emerald-700"
                    }`}>
                      {p.stock === 0 ? "Out of Stock" : p.stock < 15 ? "Low Stock" : "In Stock"}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </div>
  </div>
);

export default VendorDashboard;
