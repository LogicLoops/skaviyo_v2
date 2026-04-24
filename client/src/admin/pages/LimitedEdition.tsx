import React from "react";
import { motion } from "framer-motion";
import Header from "../components/Header";

const MOCK_LIMITED = [
  {
    id: 1,
    name: "Heritage Gold Edition",
    price: "₹11,999",
    stock: 15,
    sold: 85,
    total: 100,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    status: "Available",
  },
  {
    id: 2,
    name: "Artisan Series 01",
    price: "₹8,499",
    stock: 8,
    sold: 92,
    total: 100,
    image: "https://images.unsplash.com/photo-1473966699461-d1d8cc4b2e16?w=400&h=400&fit=crop",
    status: "Almost Gone",
  },
  {
    id: 3,
    name: "Midnight Prestige",
    price: "₹9,999",
    stock: 0,
    sold: 200,
    total: 200,
    image: "https://images.unsplash.com/photo-1505886657187-7dae51e27e22?w=400&h=400&fit=crop",
    status: "Sold Out",
  },
];

const LimitedEdition: React.FC = () => {
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
        <Header pageTitle="Limited Edition" pageSubtitle="Manage exclusive limited edition drops" />

        {/* Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-teal-900 via-teal-800 to-emerald-900 p-8 mb-10"
        >
          <div className="absolute top-0 right-0 w-72 h-72 bg-yellow-600/10 rounded-full blur-3xl -mr-24 -mt-24"></div>
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-yellow-600/20 border border-yellow-600/40 mb-4">
              <span className="text-xs font-semibold text-yellow-300 uppercase tracking-wider">⭐ Limited Availability</span>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">Limited Edition Management</h2>
            <p className="text-gray-300 mb-4">Exclusively designed pieces — once they're gone, they're gone forever.</p>
            <div className="flex gap-6">
              <div>
                <p className="text-sm text-gray-400">Active Drops</p>
                <p className="text-2xl font-bold text-yellow-400">3</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Total Sold</p>
                <p className="text-2xl font-bold text-yellow-400">377</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Revenue</p>
                <p className="text-2xl font-bold text-yellow-400">₹3.2M</p>
              </div>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="absolute right-8 top-1/2 -translate-y-1/2 px-6 py-3 bg-yellow-500 hover:bg-yellow-400 text-teal-900 font-bold rounded-full transition-all"
          >
            + Add New Drop
          </motion.button>
        </motion.div>

        {/* Products */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MOCK_LIMITED.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="glass-effect rounded-2xl overflow-hidden group cursor-pointer"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold ${
                  item.status === "Sold Out" ? "bg-red-500 text-white" :
                  item.status === "Almost Gone" ? "bg-yellow-500 text-teal-900" :
                  "bg-emerald-500 text-white"
                }`}>
                  {item.status}
                </span>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-1">{item.name}</h3>
                <p className="text-xs text-gray-500 mb-3">Only {item.stock} left • {item.sold}/{item.total} sold</p>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                  <div
                    className="bg-gradient-to-r from-emerald-500 to-green-600 h-2 rounded-full transition-all"
                    style={{ width: `${(item.sold / item.total) * 100}%` }}
                  ></div>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-xl font-bold text-emerald-700">{item.price}</p>
                  <div className="flex gap-2">
                    <button className="p-2 text-emerald-600 hover:bg-emerald-100 rounded-lg transition text-sm">✏️ Edit</button>
                    <button className="p-2 text-red-500 hover:bg-red-100 rounded-lg transition text-sm">🗑️</button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LimitedEdition;
