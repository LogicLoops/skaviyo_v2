import React, { useState } from "react";
import { motion } from "framer-motion";

const ORDERS = [
  { id: "#SK-8823", customer: "Sarah Anderson",  email: "sarah@example.com",  amount: "₹8,500",  items: 3, status: "Delivered", date: "Apr 15, 2024" },
  { id: "#SK-8824", customer: "Marcus Chen",     email: "marcus@example.com", amount: "₹4,299",  items: 1, status: "Shipped",   date: "Apr 14, 2024" },
  { id: "#SK-8825", customer: "Priya Nair",      email: "priya@example.com",  amount: "₹3,999",  items: 1, status: "Pending",   date: "Apr 13, 2024" },
  { id: "#SK-8826", customer: "Raj Patel",       email: "raj@example.com",    amount: "₹12,500", items: 4, status: "Delivered", date: "Apr 12, 2024" },
  { id: "#SK-8827", customer: "Emma Thompson",   email: "emma@example.com",   amount: "₹6,800",  items: 2, status: "Shipped",   date: "Apr 11, 2024" },
  { id: "#SK-8828", customer: "Aisha Khan",      email: "aisha@example.com",  amount: "₹5,200",  items: 2, status: "Cancelled", date: "Apr 10, 2024" },
];

const STATUS_COLORS: Record<string, string> = {
  Delivered: "bg-emerald-100 text-emerald-700 border border-emerald-200",
  Shipped:   "bg-blue-100 text-blue-700 border border-blue-200",
  Pending:   "bg-yellow-100 text-yellow-700 border border-yellow-200",
  Cancelled: "bg-red-100 text-red-700 border border-red-200",
};

const VendorOrders: React.FC = () => {
  const [search, setSearch]       = useState("");
  const [filterStatus, setFilter] = useState("All");

  const filtered = ORDERS.filter(o => {
    const matchSearch = o.customer.toLowerCase().includes(search.toLowerCase()) || o.id.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "All" || o.status === filterStatus;
    return matchSearch && matchStatus;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 overflow-y-auto">
      <style>{`
        .glass-effect{background:linear-gradient(135deg,rgba(255,255,255,.95) 0%,rgba(240,253,250,.5) 100%);backdrop-filter:blur(8px);border:1px solid rgba(167,243,208,.4);}
        ::-webkit-scrollbar{display:none;} html{scrollbar-width:none;}
      `}</style>
      <div className="p-8">
        <motion.div initial={{ opacity:0, y:-20 }} animate={{ opacity:1, y:0 }} className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">My Orders</h1>
          <p className="text-gray-600 mt-1">Track and manage your customer orders</p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { label:"Total",     v: ORDERS.length, icon:"🛍️" },
            { label:"Delivered", v: ORDERS.filter(o=>o.status==="Delivered").length, icon:"✅" },
            { label:"Shipped",   v: ORDERS.filter(o=>o.status==="Shipped").length,   icon:"🚚" },
            { label:"Pending",   v: ORDERS.filter(o=>o.status==="Pending").length,   icon:"⏳" },
          ].map((s,idx) => (
            <motion.div key={idx} whileHover={{ y:-5 }} className="glass-effect rounded-2xl p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-xs text-gray-500 uppercase font-semibold tracking-wider">{s.label}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{s.v}</p>
                </div>
                <span className="text-3xl">{s.icon}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} className="glass-effect rounded-2xl overflow-hidden">
          <div className="p-6 border-b border-white/20 flex flex-wrap items-center gap-4">
            <div className="relative flex-1 min-w-[200px] max-w-sm">
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-600 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input type="text" placeholder="Search orders..." value={search} onChange={e => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-2.5 bg-white/80 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm" />
            </div>
            <div className="flex gap-2 flex-wrap">
              {["All","Pending","Shipped","Delivered","Cancelled"].map(s => (
                <button key={s} onClick={() => setFilter(s)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${filterStatus === s ? "bg-emerald-600 text-white shadow-lg" : "border border-emerald-300 text-emerald-700 bg-white/60 hover:bg-emerald-50"}`}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          <table className="w-full">
            <thead className="bg-white/30 border-b border-white/20">
              <tr>
                {["Order ID","Customer","Amount","Items","Date","Status","Action"].map(h => (
                  <th key={h} className="px-6 py-4 text-left text-xs font-semibold text-emerald-900 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {filtered.map((o, idx) => (
                <motion.tr key={o.id} initial={{ opacity:0, x:-10 }} animate={{ opacity:1, x:0 }} transition={{ delay:idx*0.05 }}
                  className="hover:bg-white/30 transition">
                  <td className="px-6 py-4 text-sm font-mono font-semibold text-emerald-700">{o.id}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center text-white text-xs font-semibold">{o.customer.charAt(0)}</div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{o.customer}</p>
                        <p className="text-xs text-gray-500">{o.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-emerald-700">{o.amount}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{o.items}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{o.date}</td>
                  <td className="px-6 py-4"><span className={`px-3 py-1 rounded-full text-xs font-semibold ${STATUS_COLORS[o.status] || "bg-gray-100 text-gray-700"}`}>{o.status}</span></td>
                  <td className="px-6 py-4"><button className="px-3 py-1 text-xs border border-emerald-400 text-emerald-600 rounded-lg hover:bg-emerald-50 transition">View</button></td>
                </motion.tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && <div className="text-center py-12 text-gray-500 text-sm">No orders found</div>}
        </motion.div>
      </div>
    </div>
  );
};

export default VendorOrders;
