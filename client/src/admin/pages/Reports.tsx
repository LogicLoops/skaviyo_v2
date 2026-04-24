import React, { useState } from "react";
import { motion } from "framer-motion";
import Header from "../components/Header";
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, LineChart, Line,
  PieChart, Pie, Cell, Legend,
} from "recharts";

const monthlyRevenue = [
  { month: "Jan", revenue: 45000 },
  { month: "Feb", revenue: 52000 },
  { month: "Mar", revenue: 48000 },
  { month: "Apr", revenue: 61000 },
  { month: "May", revenue: 55000 },
  { month: "Jun", revenue: 67000 },
  { month: "Jul", revenue: 72000 },
  { month: "Aug", revenue: 68000 },
  { month: "Sep", revenue: 78000 },
  { month: "Oct", revenue: 82000 },
  { month: "Nov", revenue: 95000 },
  { month: "Dec", revenue: 112000 },
];

const userGrowth = [
  { month: "Jan", users: 120 },
  { month: "Feb", users: 185 },
  { month: "Mar", users: 240 },
  { month: "Apr", users: 310 },
  { month: "May", users: 380 },
  { month: "Jun", users: 450 },
  { month: "Jul", users: 520 },
  { month: "Aug", users: 610 },
  { month: "Sep", users: 720 },
  { month: "Oct", users: 890 },
  { month: "Nov", users: 1050 },
  { month: "Dec", users: 1284 },
];

const categoryData = [
  { name: "Men", value: 35 },
  { name: "Women", value: 28 },
  { name: "Couples", value: 12 },
  { name: "Sports", value: 15 },
  { name: "Animated", value: 6 },
  { name: "Limited", value: 4 },
];

const COLORS = ["#10B981", "#34D399", "#6EE7B7", "#A7F3D0", "#059669", "#047857"];

const Reports: React.FC = () => {
  const [period, setPeriod] = useState("2024");

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 relative overflow-y-auto">
      <style>{`
        .glass-effect {
          background: linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(240,253,250,0.5) 100%);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(167,243,208,0.4);
        }
        ::-webkit-scrollbar { display: none; }
        html { scrollbar-width: none; }
      `}</style>

      <div className="p-8 relative z-10">
        <Header pageTitle="Reports" pageSubtitle="Business analytics and performance metrics" />

        {/* Summary Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { label: "Total Revenue", value: "₹8.35L", change: "+22.4%", up: true },
            { label: "Total Orders", value: "3,621", change: "+18.2%", up: true },
            { label: "New Users", value: "1,284", change: "+34.5%", up: true },
            { label: "Avg Order Value", value: "₹2,305", change: "+4.1%", up: true },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="glass-effect rounded-2xl p-6"
            >
              <p className="text-xs text-gray-500 uppercase font-semibold tracking-wider">{stat.label}</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
              <p className={`text-xs font-semibold mt-2 ${stat.up ? "text-emerald-600" : "text-red-600"}`}>
                {stat.change} vs last year
              </p>
            </motion.div>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Monthly Revenue */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-effect rounded-2xl p-8"
          >
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Monthly Revenue</h2>
                <p className="text-sm text-gray-600 mt-1">Year {period} performance</p>
              </div>
              <select
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                className="border border-emerald-200 rounded-lg px-3 py-1.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
              >
                <option>2024</option>
                <option>2023</option>
              </select>
            </div>
            <div className="h-60">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyRevenue}>
                  <XAxis dataKey="month" stroke="#9CA3AF" style={{ fontSize: "11px" }} />
                  <YAxis stroke="#9CA3AF" style={{ fontSize: "11px" }} tickFormatter={(v) => `₹${v / 1000}k`} />
                  <Tooltip
                    formatter={(v) => [`₹${(v as number).toLocaleString()}`, "Revenue"]}
                    contentStyle={{ borderRadius: "12px", border: "1px solid rgba(167,243,208,0.4)" }}
                  />
                  <Bar dataKey="revenue" radius={[8, 8, 0, 0]} fill="url(#barGrad)" />
                  <defs>
                    <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10B981" />
                      <stop offset="100%" stopColor="#6EE7B7" />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* User Growth */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-effect rounded-2xl p-8"
          >
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900">User Growth</h2>
              <p className="text-sm text-gray-600 mt-1">Monthly new registrations</p>
            </div>
            <div className="h-60">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={userGrowth}>
                  <XAxis dataKey="month" stroke="#9CA3AF" style={{ fontSize: "11px" }} />
                  <YAxis stroke="#9CA3AF" style={{ fontSize: "11px" }} />
                  <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid rgba(167,243,208,0.4)" }} />
                  <Line type="monotone" dataKey="users" stroke="#10B981" strokeWidth={3} dot={{ fill: "#10B981", strokeWidth: 2 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* Category Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="glass-effect rounded-2xl p-8"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-2">Sales by Category</h2>
          <p className="text-sm text-gray-600 mb-6">Revenue distribution across categories</p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={categoryData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} dataKey="value" paddingAngle={4}>
                    {categoryData.map((_, idx) => (
                      <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v) => [`${v}%`, "Share"]} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-3">
              {categoryData.map((cat, idx) => (
                <div key={cat.name} className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: COLORS[idx % COLORS.length] }}></div>
                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-semibold text-gray-800">{cat.name}</span>
                      <span className="text-sm text-emerald-700 font-bold">{cat.value}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div className="h-1.5 rounded-full transition-all" style={{ width: `${cat.value}%`, backgroundColor: COLORS[idx % COLORS.length] }}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Reports;
