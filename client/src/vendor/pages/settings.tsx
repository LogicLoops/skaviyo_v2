import React, { useState } from "react";
import { motion } from "framer-motion";

const VendorSettings: React.FC = () => {
  const [profile, setProfile] = useState({
    storeName: "Premium Fashion Store",
    ownerName: "Rajesh Kumar",
    email: "rajesh@premiumfashion.com",
    phone: "+91 98765 43210",
    gst: "29ABCDE1234F1Z5",
    bankAccount: "1234567890",
    upiId: "rajesh@upi",
  });
  const [saved, setSaved] = useState(false);
  const [notifications, setNotifications] = useState({ newOrders: true, payments: true, reviews: true, marketing: false });

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 overflow-y-auto">
      <style>{`.glass-effect{background:linear-gradient(135deg,rgba(255,255,255,.95) 0%,rgba(240,253,250,.5) 100%);backdrop-filter:blur(8px);border:1px solid rgba(167,243,208,.4);} ::-webkit-scrollbar{display:none;} html{scrollbar-width:none;}`}</style>
      <div className="p-8">
        <motion.div initial={{ opacity:0, y:-20 }} animate={{ opacity:1, y:0 }} className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-1">Manage your vendor profile and preferences</p>
        </motion.div>

        <div className="max-w-3xl space-y-6">
          {/* Store Profile */}
          <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} className="glass-effect rounded-2xl p-8">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center text-white font-bold text-3xl shadow-lg">
                {profile.storeName.charAt(0)}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Store Profile</h2>
                <p className="text-sm text-gray-600">Update your store information</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label:"Store Name",   key:"storeName" },
                { label:"Owner Name",   key:"ownerName" },
                { label:"Email",        key:"email" },
                { label:"Phone",        key:"phone" },
                { label:"GST Number",   key:"gst" },
              ].map(f => (
                <div key={f.key} className={f.key === "storeName" || f.key === "email" ? "col-span-2" : ""}>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">{f.label}</label>
                  <input type="text" value={profile[f.key as keyof typeof profile]} onChange={e => setProfile({...profile, [f.key]: e.target.value})}
                    className="w-full px-4 py-3 border border-emerald-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white/80 text-sm transition" />
                </div>
              ))}
            </div>
            <motion.button whileHover={{ scale:1.02 }} whileTap={{ scale:0.98 }} onClick={handleSave}
              className="w-full mt-6 bg-gradient-to-r from-emerald-500 to-green-600 text-white py-3 rounded-xl font-semibold shadow-lg transition-all">
              {saved ? "✓ Saved!" : "Save Changes"}
            </motion.button>
          </motion.div>

          {/* Bank Details */}
          <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.1 }} className="glass-effect rounded-2xl p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Payment Details</h2>
            <div className="grid grid-cols-2 gap-4">
              {[{ label:"Bank Account Number", key:"bankAccount" }, { label:"UPI ID", key:"upiId" }].map(f => (
                <div key={f.key} className="col-span-2 sm:col-span-1">
                  <label className="block text-sm font-semibold text-gray-700 mb-1">{f.label}</label>
                  <input type="text" value={profile[f.key as keyof typeof profile]} onChange={e => setProfile({...profile, [f.key]: e.target.value})}
                    className="w-full px-4 py-3 border border-emerald-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white/80 text-sm transition" />
                </div>
              ))}
            </div>
            <button className="mt-4 px-6 py-2.5 border-2 border-emerald-500 text-emerald-700 rounded-xl font-semibold text-sm hover:bg-emerald-50 transition">
              Update Payment Details
            </button>
          </motion.div>

          {/* Notifications */}
          <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.2 }} className="glass-effect rounded-2xl p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Notification Preferences</h2>
            <div className="space-y-4">
              {[
                { key:"newOrders",  label:"New Order Alerts",    desc:"Get notified when you receive a new order" },
                { key:"payments",   label:"Payment Received",    desc:"Notify when payout is processed" },
                { key:"reviews",    label:"Customer Reviews",    desc:"Alert when a customer leaves a review" },
                { key:"marketing",  label:"Marketing Updates",   desc:"Receive tips to grow your store" },
              ].map(n => (
                <div key={n.key} className="flex items-center justify-between p-4 bg-white/60 rounded-xl hover:bg-white/80 transition">
                  <div>
                    <p className="font-semibold text-gray-800">{n.label}</p>
                    <p className="text-sm text-gray-500">{n.desc}</p>
                  </div>
                  <button onClick={() => setNotifications({...notifications, [n.key]: !notifications[n.key as keyof typeof notifications]})}
                    className={`relative w-12 h-6 rounded-full transition-all duration-300 ${notifications[n.key as keyof typeof notifications] ? "bg-emerald-500" : "bg-gray-300"}`}>
                    <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all duration-300 ${notifications[n.key as keyof typeof notifications] ? "left-6" : "left-0.5"}`} />
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default VendorSettings;
