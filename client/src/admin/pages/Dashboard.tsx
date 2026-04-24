import React, { useState } from "react";
import { motion } from "framer-motion";
import Header from "../components/Header";
import { ResponsiveContainer, BarChart, Bar, XAxis, Tooltip } from "recharts";

const revenueData = [
  { day: "Mon", value: 4200 },
  { day: "Tue", value: 5200 },
  { day: "Wed", value: 4800 },
  { day: "Thu", value: 8200 },
  { day: "Fri", value: 5600 },
  { day: "Sat", value: 6100 },
  { day: "Sun", value: 5900 },
];

const kpiCardStyle =
  "bg-white border border-gray-200 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform-gpu perspective";

const mockKpis = [
  { title: "Total Users", value: "1,284", sub: "↑ +12% this month", icon: "👥" },
  { title: "Active Vendors", value: "48", sub: "↑ +3 new pending", icon: "🏪" },
  { title: "Total Orders", value: "3,621", sub: "↑ +8.2% vs last week", icon: "🛍️" },
  { title: "Total Revenue", value: "₹42.5k", sub: "↑ +15% year over year", icon: "💰" },
];

const mockTopProducts = [
  { id: 1, name: "The Signature White", totalSold: 284 },
  { id: 2, name: "Royal Emerald Tee", totalSold: 198 },
  { id: 3, name: "Royal Blue Print", totalSold: 156 },
  { id: 4, name: "Heritage Gold Edition", totalSold: 124 },
  { id: 5, name: "Vintage Classic", totalSold: 98 },
];

const mockOrderStats = {
  delivered: 2840,
  shipped: 412,
  cancelled: 196,
  pending: 173,
};

const Dashboard: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("Last 7 Days");

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 relative overflow-y-auto">
      {/* Decorative background elements */}
      <div className="fixed top-0 right-0 w-96 h-96 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-15 -z-10 animate-blob"></div>
      <div className="fixed bottom-0 left-0 w-96 h-96 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-15 -z-10 animate-blob animation-delay-2000"></div>

      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
        .card-3d:hover {
          transform: rotateY(3deg) rotateX(-2deg) scale(1.01) !important;
          filter: drop-shadow(0 20px 40px rgba(16, 185, 129, 0.2));
        }
        .glass-effect {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(240, 253, 250, 0.5) 100%);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid rgba(167, 243, 208, 0.4);
        }
        ::-webkit-scrollbar { display: none; }
        html { scrollbar-width: none; -ms-overflow-style: none; }
      `}</style>

      <div className="p-8 relative z-10">
        <Header pageTitle="Dashboard" pageSubtitle="Manage your business efficiently" />

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {mockKpis.map((kpi, idx) => (
            <motion.div
              key={idx}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: idx * 0.1, type: "spring", stiffness: 100 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className={`${kpiCardStyle} glass-effect p-6 group cursor-pointer card-3d`}
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-gray-600 text-xs font-semibold uppercase tracking-wider">{kpi.title}</h3>
                  <p className="text-4xl font-bold text-gray-900 mt-3">{kpi.value}</p>
                  <p className="text-xs text-emerald-600 font-medium mt-3">{kpi.sub}</p>
                </div>
                <div className="bg-emerald-50 p-4 rounded-xl text-2xl group-hover:bg-emerald-100 transition-all duration-300 group-hover:scale-110 border border-emerald-200">
                  {kpi.icon}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Revenue + Top Products */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            whileHover={{ y: -10, scale: 1.01 }}
            className="glass-effect col-span-1 lg:col-span-2 p-8 card-3d group rounded-2xl border border-white/60"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Revenue Overview</h2>
                <p className="text-sm text-gray-600 mt-1">Weekly revenue performance</p>
              </div>
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="border border-emerald-200 rounded-lg px-4 py-2 text-sm bg-white hover:bg-emerald-50 transition-all focus:outline-none focus:ring-2 focus:ring-emerald-400 text-gray-700"
              >
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
                <option>Last 90 Days</option>
              </select>
            </div>

            <div className="h-64 -mx-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                  <XAxis dataKey="day" stroke="#9CA3AF" style={{ fontSize: "12px" }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.9)",
                      backdropFilter: "blur(10px)",
                      border: "1px solid rgba(255, 255, 255, 0.8)",
                      borderRadius: "12px",
                      boxShadow: "0 20px 40px rgba(16, 185, 129, 0.15)",
                    }}
                    cursor={{ fill: "rgba(16, 185, 129, 0.1)" }}
                  />
                  <Bar dataKey="value" radius={[10, 10, 0, 0]} fill="url(#colorGradient)" />
                  <defs>
                    <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10B981" />
                      <stop offset="100%" stopColor="#6EE7B7" />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            whileHover={{ y: -10, scale: 1.01 }}
            className="glass-effect p-8 card-3d rounded-2xl border border-white/60"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Top Products</h2>
              <p className="text-sm text-gray-600 mt-1">Most sold items</p>
            </div>

            <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
              {mockTopProducts.map((product, idx) => (
                <motion.div
                  key={product.id}
                  initial={{ x: 10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 + idx * 0.05 }}
                  whileHover={{ x: 8, scale: 1.02 }}
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-emerald-300/20 to-transparent rounded-lg hover:from-emerald-300/40 hover:shadow-md transition-all group cursor-pointer backdrop-blur-sm border border-white/40 hover:border-white/60"
                >
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800 group-hover:text-emerald-700 transition-colors">{product.name}</p>
                    <p className="text-sm text-gray-600">{product.totalSold} units sold</p>
                  </div>
                  <div className="bg-gradient-to-r from-emerald-300/40 to-green-300/20 text-emerald-700 px-3 py-1 rounded-full text-sm font-semibold">
                    #{idx + 1}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Order Status Cards */}
        <div>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Order Status</h2>
            <p className="text-sm text-gray-500 mt-1">Real-time order tracking across all statuses</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: "Delivered Orders", value: mockOrderStats.delivered, color: "emerald", borderColor: "border-l-emerald-400", note: "✓ Successfully completed", icon: "✅" },
              { label: "Shipped Orders", value: mockOrderStats.shipped, color: "green", borderColor: "border-l-green-400", note: "🚚 On the way", icon: "🚚" },
              { label: "Cancelled Orders", value: mockOrderStats.cancelled, color: "teal", borderColor: "border-l-teal-400", note: "✕ Cancelled", icon: "❌" },
              { label: "Pending Orders", value: mockOrderStats.pending, color: "lime", borderColor: "border-l-lime-400", note: "⏳ Awaiting confirmation", icon: "⏳" },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 + idx * 0.1 }}
                whileHover={{ y: -12, scale: 1.02 }}
                className={`glass-effect p-8 border-l-4 ${stat.borderColor} group cursor-pointer card-3d rounded-2xl border border-white/60`}
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-gray-700 text-sm font-semibold uppercase tracking-wider">{stat.label}</h3>
                    <p className={`text-4xl font-bold text-${stat.color}-600 mt-4`}>{stat.value}</p>
                    <p className={`text-xs text-${stat.color}-600 font-medium mt-3`}>{stat.note}</p>
                  </div>
                  <div className={`bg-${stat.color}-300/30 backdrop-blur-md p-4 rounded-xl text-2xl group-hover:bg-${stat.color}-300/50 group-hover:scale-125 transition-all duration-300`}>
                    {stat.icon}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
