import React, { useState } from "react";
import { motion } from "framer-motion";
import Header from "../components/Header";

interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  stock: number;
  vendor: string;
  status: string;
}

const MOCK_PRODUCTS: Product[] = [
  { id: 1, name: "The Signature White", category: "Men", price: "₹4,500", stock: 150, vendor: "Premium Fashion Store", status: "Active" },
  { id: 2, name: "Royal Emerald Tee", category: "Men", price: "₹3,999", stock: 98, vendor: "StyleHub India", status: "Active" },
  { id: 3, name: "Royal Blue Print", category: "Men", price: "₹4,299", stock: 75, vendor: "Urban Threads", status: "Active" },
  { id: 4, name: "Heritage Gold Edition", category: "Limited", price: "₹11,999", stock: 15, vendor: "Premium Fashion Store", status: "Limited" },
  { id: 5, name: "Women Blossom Tee", category: "Women", price: "₹3,799", stock: 120, vendor: "Fashion Forward", status: "Active" },
  { id: 6, name: "Couples Perfect Match", category: "Couples", price: "₹8,499", stock: 45, vendor: "Urban Threads", status: "Active" },
  { id: 7, name: "Sport Performance", category: "Sports", price: "₹5,299", stock: 0, vendor: "StyleHub India", status: "Out of Stock" },
  { id: 8, name: "Anime Cosmic", category: "Animated", price: "₹3,499", stock: 200, vendor: "Fashion Forward", status: "Active" },
];

const Products: React.FC = () => {
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");

  const filtered = MOCK_PRODUCTS.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.vendor.toLowerCase().includes(search.toLowerCase());
    const matchCat = filterCategory === "All" || p.category === filterCategory;
    return matchSearch && matchCat;
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
        <Header pageTitle="Products Management" pageSubtitle="View and manage all products" />

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { label: "Total Products", value: MOCK_PRODUCTS.length.toString(), icon: "👕", color: "emerald" },
            { label: "Active", value: MOCK_PRODUCTS.filter(p => p.status === "Active").length.toString(), icon: "✅", color: "green" },
            { label: "Limited", value: MOCK_PRODUCTS.filter(p => p.status === "Limited").length.toString(), icon: "⭐", color: "yellow" },
            { label: "Out of Stock", value: MOCK_PRODUCTS.filter(p => p.status === "Out of Stock").length.toString(), icon: "❌", color: "red" },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="glass-effect rounded-2xl p-6"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-xs text-gray-500 uppercase font-semibold tracking-wider">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
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
          <div className="p-6 border-b border-white/20 flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-600 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search products or vendors..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-2.5 bg-white/80 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              {["All", "Men", "Women", "Couples", "Sports", "Animated", "Limited"].map((cat) => (
                <motion.button
                  key={cat}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setFilterCategory(cat)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${filterCategory === cat ? "bg-emerald-600 text-white shadow-lg" : "border border-emerald-300 text-emerald-700 hover:bg-emerald-50 bg-white/60"}`}
                >
                  {cat}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/30 border-b border-white/20">
                <tr>
                  {["ID", "Product Name", "Category", "Price", "Stock", "Vendor", "Status"].map((h) => (
                    <th key={h} className="px-6 py-4 text-left text-xs font-semibold text-emerald-900 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {filtered.map((product, idx) => (
                  <motion.tr
                    key={product.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.04 }}
                    className="hover:bg-white/30 transition"
                  >
                    <td className="px-6 py-4 text-sm text-gray-500 font-mono">#{product.id}</td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-semibold text-gray-900">{product.name}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100/80 text-emerald-700 border border-emerald-200">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-emerald-700">{product.price}</td>
                    <td className="px-6 py-4 text-sm text-gray-700 font-medium">{product.stock}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{product.vendor}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        product.status === "Active" ? "bg-emerald-100 text-emerald-700" :
                        product.status === "Limited" ? "bg-yellow-100 text-yellow-700" :
                        "bg-red-100 text-red-700"
                      }`}>
                        {product.status}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <p className="text-sm font-medium">No products found</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Products;
