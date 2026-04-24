import React, { useState } from "react";
import { motion } from "framer-motion";
import Header from "../components/Header";

interface Order {
  id: string;
  customer: string;
  email: string;
  amount: string;
  date: string;
  status: string;
  items: number;
}

const MOCK_ORDERS: Order[] = [
  { id: "#SK-001234", customer: "Sarah Anderson", email: "sarah@example.com", amount: "₹8,500", date: "2024-04-15", status: "Delivered", items: 3 },
  { id: "#SK-001235", customer: "Marcus Chen", email: "marcus@example.com", amount: "₹4,299", date: "2024-04-14", status: "Shipped", items: 1 },
  { id: "#SK-001236", customer: "Raj Patel", email: "raj@example.com", amount: "₹15,200", date: "2024-04-13", status: "Pending", items: 4 },
  { id: "#SK-001237", customer: "Emma Thompson", email: "emma@example.com", amount: "₹3,999", date: "2024-04-12", status: "Cancelled", items: 1 },
  { id: "#SK-001238", customer: "Priya Nair", email: "priya@example.com", amount: "₹9,800", date: "2024-04-11", status: "Delivered", items: 2 },
  { id: "#SK-001239", customer: "John Smith", email: "john@example.com", amount: "₹5,600", date: "2024-04-10", status: "Shipped", items: 2 },
  { id: "#SK-001240", customer: "Aisha Khan", email: "aisha@example.com", amount: "₹12,000", date: "2024-04-09", status: "Pending", items: 3 },
  { id: "#SK-001241", customer: "David Lee", email: "david@example.com", amount: "₹4,500", date: "2024-04-08", status: "Delivered", items: 1 },
];

const statusColors: Record<string, string> = {
  Delivered: "bg-emerald-100 text-emerald-700 border border-emerald-200",
  Shipped: "bg-blue-100 text-blue-700 border border-blue-200",
  Pending: "bg-yellow-100 text-yellow-700 border border-yellow-200",
  Cancelled: "bg-red-100 text-red-700 border border-red-200",
};

const Orders: React.FC = () => {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const filtered = MOCK_ORDERS.filter((o) => {
    const matchSearch =
      o.customer.toLowerCase().includes(search.toLowerCase()) ||
      o.id.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "All" || o.status === filterStatus;
    return matchSearch && matchStatus;
  });

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
        <Header pageTitle="Orders Management" pageSubtitle="Track and manage all customer orders" />

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { label: "Total Orders", value: "3,621", icon: "🛍️", note: "+8.2% this week" },
            { label: "Delivered", value: "2,840", icon: "✅", note: "78.4% completion" },
            { label: "In Transit", value: "412", icon: "🚚", note: "On the way" },
            { label: "Pending", value: "173", icon: "⏳", note: "Needs attention" },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="glass-effect rounded-2xl p-6"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-xs text-gray-500 uppercase font-semibold tracking-wider">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  <p className="text-xs text-emerald-600 font-medium mt-1">{stat.note}</p>
                </div>
                <span className="text-3xl">{stat.icon}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-effect rounded-2xl overflow-hidden"
        >
          {/* Search & Filter */}
          <div className="p-6 border-b border-white/20 flex items-center gap-4 flex-wrap">
            <div className="relative flex-1 min-w-[200px] max-w-sm">
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-600 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search by order ID or customer..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-2.5 bg-white/80 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {["All", "Pending", "Shipped", "Delivered", "Cancelled"].map((status) => (
                <motion.button
                  key={status}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setFilterStatus(status)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${filterStatus === status ? "bg-emerald-600 text-white shadow-lg" : "border border-emerald-300 text-emerald-700 hover:bg-emerald-50 bg-white/60"}`}
                >
                  {status}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/30 border-b border-white/20">
                <tr>
                  {["Order ID", "Customer", "Amount", "Items", "Date", "Status"].map((h) => (
                    <th key={h} className="px-6 py-4 text-left text-xs font-semibold text-emerald-900 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {filtered.map((order, idx) => (
                  <motion.tr
                    key={order.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.04 }}
                    className="hover:bg-white/30 transition"
                  >
                    <td className="px-6 py-4 text-sm font-mono font-semibold text-emerald-700">{order.id}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center text-white text-xs font-semibold">
                          {order.customer.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{order.customer}</p>
                          <p className="text-xs text-gray-500">{order.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-emerald-700">{order.amount}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{order.items} items</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{order.date}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[order.status] || "bg-gray-100 text-gray-700"}`}>
                        {order.status}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <p className="text-sm font-medium">No orders found</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Orders;
