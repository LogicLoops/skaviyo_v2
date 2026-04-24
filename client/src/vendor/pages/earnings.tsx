import React from "react";
import { motion } from "framer-motion";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, LineChart, Line } from "recharts";

const monthlyData = [
  { month: "Jan", revenue: 32000, payout: 28000 },
  { month: "Feb", revenue: 45000, payout: 40000 },
  { month: "Mar", revenue: 38000, payout: 34000 },
  { month: "Apr", revenue: 62000, payout: 55000 },
  { month: "May", revenue: 55000, payout: 49000 },
  { month: "Jun", revenue: 71000, payout: 63000 },
];

const TRANSACTIONS = [
  { id: "PAY-001", date: "Apr 30, 2024", amount: "₹55,000", orders: 28, status: "Paid" },
  { id: "PAY-002", date: "Mar 31, 2024", amount: "₹34,000", orders: 19, status: "Paid" },
  { id: "PAY-003", date: "Feb 29, 2024", amount: "₹40,000", orders: 24, status: "Paid" },
  { id: "PAY-004", date: "May 31, 2024", amount: "₹49,000", orders: 31, status: "Processing" },
];

const VendorEarnings: React.FC = () => (
  <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 overflow-y-auto">
    <style>{`
      .glass-effect{background:linear-gradient(135deg,rgba(255,255,255,.95) 0%,rgba(240,253,250,.5) 100%);backdrop-filter:blur(8px);border:1px solid rgba(167,243,208,.4);}
      ::-webkit-scrollbar{display:none;} html{scrollbar-width:none;}
    `}</style>
    <div className="p-8">
      <motion.div initial={{ opacity:0, y:-20 }} animate={{ opacity:1, y:0 }} className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900">Earnings</h1>
        <p className="text-gray-600 mt-1">Track your revenue and payouts</p>
      </motion.div>

      {/* Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { label:"Total Revenue", v:"₹3.03L", sub:"+22% this quarter", icon:"💰" },
          { label:"Total Payout",  v:"₹2.69L", sub:"89% payout ratio",  icon:"🏦" },
          { label:"Pending",       v:"₹49,000", sub:"This month",         icon:"⏳" },
          { label:"Avg Per Order", v:"₹2,305",  sub:"Based on 357 orders",icon:"📊" },
        ].map((s,idx) => (
          <motion.div key={idx} whileHover={{ y:-5, scale:1.02 }} className="glass-effect rounded-2xl p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold tracking-wider">{s.label}</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{s.v}</p>
                <p className="text-xs text-emerald-600 font-medium mt-1">{s.sub}</p>
              </div>
              <span className="text-3xl">{s.icon}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.2 }} className="glass-effect rounded-2xl p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Revenue vs Payout</h2>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <XAxis dataKey="month" stroke="#9CA3AF" style={{ fontSize:"11px" }} />
                <YAxis stroke="#9CA3AF" style={{ fontSize:"11px" }} tickFormatter={v => `₹${(v as number)/1000}k`} />
                <Tooltip formatter={(v,n) => [`₹${(v as number).toLocaleString()}`, n === "revenue" ? "Revenue" : "Payout"]} contentStyle={{ borderRadius:"12px" }} />
                <Bar dataKey="revenue" radius={[6,6,0,0]} fill="#10B981" />
                <Bar dataKey="payout"  radius={[6,6,0,0]} fill="#6EE7B7" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.3 }} className="glass-effect rounded-2xl p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Revenue Trend</h2>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
                <XAxis dataKey="month" stroke="#9CA3AF" style={{ fontSize:"11px" }} />
                <YAxis stroke="#9CA3AF" style={{ fontSize:"11px" }} tickFormatter={v => `₹${(v as number)/1000}k`} />
                <Tooltip formatter={v => [`₹${(v as number).toLocaleString()}`, "Revenue"]} contentStyle={{ borderRadius:"12px" }} />
                <Line type="monotone" dataKey="revenue" stroke="#10B981" strokeWidth={3} dot={{ fill:"#10B981" }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Payout History */}
      <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.4 }} className="glass-effect rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-white/20">
          <h2 className="text-xl font-bold text-gray-900">Payout History</h2>
        </div>
        <table className="w-full">
          <thead className="bg-white/30 border-b border-white/20">
            <tr>
              {["Payout ID","Date","Amount","Orders","Status"].map(h => (
                <th key={h} className="px-6 py-4 text-left text-xs font-semibold text-emerald-900 uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {TRANSACTIONS.map((t,idx) => (
              <motion.tr key={t.id} initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:idx*0.05 }}
                className="hover:bg-white/30 transition">
                <td className="px-6 py-4 text-sm font-mono font-semibold text-emerald-700">{t.id}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{t.date}</td>
                <td className="px-6 py-4 text-sm font-bold text-gray-900">{t.amount}</td>
                <td className="px-6 py-4 text-sm text-gray-700">{t.orders} orders</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${t.status === "Paid" ? "bg-emerald-100 text-emerald-700" : "bg-yellow-100 text-yellow-700"}`}>{t.status}</span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  </div>
);

export default VendorEarnings;
