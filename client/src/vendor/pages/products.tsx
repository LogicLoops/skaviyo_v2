import React, { useState } from "react";
import { motion } from "framer-motion";

const PRODUCTS = [
  { id: 1, name: "The Signature White",  category: "Men",     price: "₹4,500", stock: 45, sold: 128, status: "Active" },
  { id: 2, name: "Royal Emerald Tee",    category: "Men",     price: "₹3,999", stock: 12, sold: 98,  status: "Low Stock" },
  { id: 3, name: "Royal Blue Print",     category: "Men",     price: "₹4,299", stock: 0,  sold: 75,  status: "Out of Stock" },
  { id: 4, name: "Vintage Classic",      category: "Men",     price: "₹5,299", stock: 30, sold: 56,  status: "Active" },
  { id: 5, name: "Women Blossom Tee",    category: "Women",   price: "₹3,799", stock: 55, sold: 42,  status: "Active" },
  { id: 6, name: "Sport Performance",    category: "Sports",  price: "₹5,999", stock: 20, sold: 35,  status: "Active" },
];

const VendorProducts: React.FC = () => {
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);

  const filtered = PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 overflow-y-auto">
      <style>{`
        .glass-effect{background:linear-gradient(135deg,rgba(255,255,255,.95) 0%,rgba(240,253,250,.5) 100%);backdrop-filter:blur(8px);border:1px solid rgba(167,243,208,.4);}
        ::-webkit-scrollbar{display:none;} html{scrollbar-width:none;}
      `}</style>
      <div className="p-8">
        <motion.div initial={{ opacity:0, y:-20 }} animate={{ opacity:1, y:0 }} className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">My Products</h1>
            <p className="text-gray-600 mt-1">Manage your product listings</p>
          </div>
          <motion.button whileHover={{ scale:1.05 }} whileTap={{ scale:0.95 }} onClick={() => setShowModal(true)}
            className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-emerald-500/50 transition-all">
            + Add Product
          </motion.button>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { label:"Total Products", v: PRODUCTS.length.toString(), icon:"👕" },
            { label:"Active", v: PRODUCTS.filter(p=>p.status==="Active").length.toString(), icon:"✅" },
            { label:"Low Stock", v: PRODUCTS.filter(p=>p.status==="Low Stock").length.toString(), icon:"⚠️" },
            { label:"Out of Stock", v: PRODUCTS.filter(p=>p.status==="Out of Stock").length.toString(), icon:"❌" },
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
          <div className="p-6 border-b border-white/20 flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-600 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input type="text" placeholder="Search products..." value={search} onChange={e => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-2.5 bg-white/80 border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm" />
            </div>
          </div>

          <table className="w-full">
            <thead className="bg-white/30 border-b border-white/20">
              <tr>
                {["Product","Category","Price","Stock","Sold","Status","Actions"].map(h => (
                  <th key={h} className="px-6 py-4 text-left text-xs font-semibold text-emerald-900 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {filtered.map((p, idx) => (
                <motion.tr key={p.id} initial={{ opacity:0, x:-10 }} animate={{ opacity:1, x:0 }} transition={{ delay:idx*0.05 }}
                  className="hover:bg-white/30 transition">
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">{p.name}</td>
                  <td className="px-6 py-4"><span className="px-2 py-1 bg-emerald-100/80 text-emerald-700 rounded-lg text-xs font-semibold">{p.category}</span></td>
                  <td className="px-6 py-4 text-sm font-bold text-emerald-700">{p.price}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{p.stock}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{p.sold}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      p.status === "Active" ? "bg-emerald-100 text-emerald-700" :
                      p.status === "Low Stock" ? "bg-yellow-100 text-yellow-700" :
                      "bg-red-100 text-red-700"}`}>{p.status}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="px-3 py-1 text-xs border border-emerald-400 text-emerald-600 rounded-lg hover:bg-emerald-50 transition">✏️ Edit</button>
                      <button className="px-3 py-1 text-xs border border-red-300 text-red-500 rounded-lg hover:bg-red-50 transition">🗑️</button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* Add Product Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/20">
            <motion.div initial={{ scale:0.95, opacity:0 }} animate={{ scale:1, opacity:1 }}
              className="bg-white rounded-2xl w-full max-w-lg p-8 shadow-2xl border border-emerald-100">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Add New Product</h2>
                <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 rounded-full transition">✕</button>
              </div>
              <div className="space-y-4">
                {["Product Name","Category","Price","Stock Quantity","Description"].map(f => (
                  <div key={f}>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">{f}</label>
                    {f === "Description"
                      ? <textarea rows={3} className="w-full px-4 py-2 border border-emerald-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none text-sm" placeholder={`Enter ${f.toLowerCase()}`} />
                      : <input type="text" className="w-full px-4 py-2 border border-emerald-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none text-sm" placeholder={`Enter ${f.toLowerCase()}`} />
                    }
                  </div>
                ))}
                <div className="flex gap-3 pt-2">
                  <button onClick={() => setShowModal(false)} className="flex-1 py-2.5 border border-gray-300 rounded-xl text-gray-700 font-semibold text-sm hover:bg-gray-50 transition">Cancel</button>
                  <button onClick={() => setShowModal(false)} className="flex-1 py-2.5 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-xl font-semibold text-sm shadow-lg transition">Add Product</button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VendorProducts;
