import React, { useState } from "react";
import { motion } from "framer-motion";
import Header from "../components/Header";

interface Category {
  id: number;
  name: string;
  products: number;
  status: string;
  image: string;
}

const MOCK_CATEGORIES: Category[] = [
  { id: 1, name: "Men", products: 45, status: "Active", image: "👔" },
  { id: 2, name: "Women", products: 38, status: "Active", image: "👗" },
  { id: 3, name: "Couples", products: 12, status: "Active", image: "💑" },
  { id: 4, name: "Group / Team", products: 8, status: "Active", image: "👥" },
  { id: 5, name: "Sports", products: 22, status: "Active", image: "⚽" },
  { id: 6, name: "Animated", products: 15, status: "Active", image: "🎨" },
  { id: 7, name: "Limited Edition", products: 6, status: "Active", image: "⭐" },
  { id: 8, name: "Create Your Own", products: 0, status: "Active", image: "✏️" },
];

const Categories: React.FC = () => {
  const [search, setSearch] = useState("");

  const filtered = MOCK_CATEGORIES.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

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
        <Header pageTitle="Categories Management" pageSubtitle="Manage product categories" />

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <motion.div whileHover={{ y: -5 }} className="glass-effect rounded-2xl p-6">
            <p className="text-xs text-gray-500 uppercase font-semibold tracking-wider">Total Categories</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{MOCK_CATEGORIES.length}</p>
          </motion.div>
          <motion.div whileHover={{ y: -5 }} className="glass-effect rounded-2xl p-6">
            <p className="text-xs text-gray-500 uppercase font-semibold tracking-wider">Total Products</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{MOCK_CATEGORIES.reduce((a, c) => a + c.products, 0)}</p>
          </motion.div>
          <motion.div whileHover={{ y: -5 }} className="glass-effect rounded-2xl p-6">
            <p className="text-xs text-gray-500 uppercase font-semibold tracking-wider">Active Categories</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{MOCK_CATEGORIES.filter(c => c.status === "Active").length}</p>
          </motion.div>
        </div>

        {/* Category Cards Grid */}
        <div className="mb-6 flex items-center justify-between">
          <div className="relative max-w-sm w-full">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-600 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search categories..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-2.5 bg-white/80 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-xl font-semibold text-sm shadow-lg hover:shadow-emerald-500/50 transition-all"
          >
            + Add Category
          </motion.button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((category, idx) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.06 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="glass-effect rounded-2xl p-6 cursor-pointer group"
            >
              <div className="text-5xl mb-4">{category.image}</div>
              <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-emerald-700 transition-colors">{category.name}</h3>
              <p className="text-sm text-gray-600 mb-4">{category.products} products</p>
              <div className="flex items-center justify-between">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${category.status === "Active" ? "bg-emerald-100 text-emerald-700 border border-emerald-200" : "bg-red-100 text-red-700 border border-red-200"}`}>
                  {category.status}
                </span>
                <div className="flex gap-2">
                  <button className="p-1.5 text-emerald-600 hover:bg-emerald-100 rounded-lg transition">✏️</button>
                  <button className="p-1.5 text-red-500 hover:bg-red-100 rounded-lg transition">🗑️</button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-gray-500">
            <p className="text-sm font-medium">No categories found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Categories;
