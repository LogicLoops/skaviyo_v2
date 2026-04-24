import React, { useState } from "react";
import { motion } from "framer-motion";

const REVIEWS = [
  { id: 1, customer: "Sarah Anderson", product: "The Signature White", rating: 5, comment: "Absolutely love this tee! Premium quality and fits perfectly. Worth every rupee.", date: "Apr 15, 2024", replied: false },
  { id: 2, customer: "Marcus Chen",    product: "Royal Emerald Tee",   rating: 5, comment: "The fabric quality is exceptional. It's soft, durable, and feels luxurious. Highly recommend!", date: "Apr 12, 2024", replied: true },
  { id: 3, customer: "Priya Nair",     product: "Royal Blue Print",    rating: 4, comment: "Great product overall. The colour is vibrant and exactly as shown in pictures.", date: "Apr 10, 2024", replied: false },
  { id: 4, customer: "Raj Patel",      product: "Vintage Classic",     rating: 5, comment: "My 3rd order from this vendor. Never disappointed. Top quality every time!", date: "Apr 08, 2024", replied: true },
  { id: 5, customer: "Emma Thompson",  product: "The Signature White", rating: 3, comment: "Good quality but the shipping took a bit longer than expected.", date: "Apr 05, 2024", replied: false },
];

const Stars = ({ rating }: { rating: number }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: 5 }).map((_, i) => (
      <span key={i} className={`text-sm ${i < rating ? "text-yellow-400" : "text-gray-300"}`}>★</span>
    ))}
  </div>
);

const VendorReviews: React.FC = () => {
  const [filter, setFilter]     = useState("All");
  const [replyId, setReplyId]   = useState<number | null>(null);
  const [replyText, setReplyText] = useState("");

  const filtered = REVIEWS.filter(r => filter === "All" || (filter === "Replied" ? r.replied : !r.replied));

  const avgRating = (REVIEWS.reduce((a, r) => a + r.rating, 0) / REVIEWS.length).toFixed(1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 overflow-y-auto">
      <style>{`.glass-effect{background:linear-gradient(135deg,rgba(255,255,255,.95) 0%,rgba(240,253,250,.5) 100%);backdrop-filter:blur(8px);border:1px solid rgba(167,243,208,.4);} ::-webkit-scrollbar{display:none;} html{scrollbar-width:none;}`}</style>
      <div className="p-8">
        <motion.div initial={{ opacity:0, y:-20 }} animate={{ opacity:1, y:0 }} className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Customer Reviews</h1>
          <p className="text-gray-600 mt-1">Manage and respond to customer feedback</p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { label:"Avg Rating",    v: `${avgRating} ★`,  icon:"⭐" },
            { label:"Total Reviews", v: REVIEWS.length.toString(), icon:"💬" },
            { label:"Replied",       v: REVIEWS.filter(r=>r.replied).length.toString(), icon:"✅" },
            { label:"Pending Reply", v: REVIEWS.filter(r=>!r.replied).length.toString(), icon:"⏳" },
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

        {/* Filter */}
        <div className="flex gap-2 mb-6">
          {["All","Pending Reply","Replied"].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${filter === f ? "bg-emerald-600 text-white shadow-lg" : "border border-emerald-300 text-emerald-700 bg-white/60 hover:bg-emerald-50"}`}>
              {f}
            </button>
          ))}
        </div>

        {/* Review Cards */}
        <div className="space-y-4">
          {filtered.map((review, idx) => (
            <motion.div key={review.id} initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ delay:idx*0.07 }}
              className="glass-effect rounded-2xl p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                    {review.customer.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 flex-wrap">
                      <p className="font-bold text-gray-900">{review.customer}</p>
                      <Stars rating={review.rating} />
                      <span className="text-xs text-gray-400">{review.date}</span>
                    </div>
                    <p className="text-sm text-emerald-700 font-semibold mt-1">📦 {review.product}</p>
                    <p className="text-gray-700 mt-2 leading-relaxed">"{review.comment}"</p>

                    {/* Reply input */}
                    {replyId === review.id && (
                      <motion.div initial={{ opacity:0, y:-10 }} animate={{ opacity:1, y:0 }} className="mt-4">
                        <textarea rows={3} value={replyText} onChange={e => setReplyText(e.target.value)}
                          placeholder="Write your reply..."
                          className="w-full px-4 py-3 border border-emerald-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none text-sm" />
                        <div className="flex gap-3 mt-2">
                          <button onClick={() => { setReplyId(null); setReplyText(""); }}
                            className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition">Cancel</button>
                          <button onClick={() => { setReplyId(null); setReplyText(""); }}
                            className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-lg text-sm font-semibold shadow-lg transition">Send Reply</button>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${review.replied ? "bg-emerald-100 text-emerald-700" : "bg-yellow-100 text-yellow-700"}`}>
                    {review.replied ? "✓ Replied" : "⏳ Pending"}
                  </span>
                  {!review.replied && replyId !== review.id && (
                    <button onClick={() => setReplyId(review.id)}
                      className="px-3 py-1.5 border border-emerald-400 text-emerald-600 rounded-lg text-xs font-semibold hover:bg-emerald-50 transition">
                      Reply
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VendorReviews;
