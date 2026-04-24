import React, { useState } from "react";
import { motion } from "framer-motion";
import Header from "../components/Header";

const Settings: React.FC = () => {
  const [formData, setFormData] = useState({
    username: "Super Admin",
    email: "admin@skaviyo.com",
    phone: "+91 98765 43210",
  });
  const [notifications, setNotifications] = useState({
    email: true,
    sms: true,
    marketing: false,
    orders: true,
    vendors: true,
  });
  const [saved, setSaved] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

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
        <Header pageTitle="Settings" pageSubtitle="Manage your account preferences" />

        <div className="max-w-3xl space-y-6">
          {/* Account Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-effect rounded-2xl p-8"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center text-white font-bold text-3xl shadow-lg">
                A
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Account Settings</h2>
                <p className="text-sm text-gray-600">Update your personal information</p>
              </div>
            </div>

            <div className="space-y-6">
              {[
                { label: "Username", name: "username", type: "text", placeholder: "Enter username" },
                { label: "Email Address", name: "email", type: "email", placeholder: "Enter email" },
                { label: "Phone Number", name: "phone", type: "tel", placeholder: "Enter phone number" },
              ].map((field) => (
                <div key={field.name}>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">{field.label}</label>
                  <input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name as keyof typeof formData]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    className="w-full px-4 py-3 border border-emerald-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white/80 text-gray-900 transition"
                  />
                </div>
              ))}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSave}
                className="w-full bg-gradient-to-r from-emerald-500 to-green-600 text-white py-3 rounded-xl hover:from-emerald-600 hover:to-green-700 transition-all duration-300 font-semibold text-lg shadow-lg"
              >
                {saved ? "✓ Saved Successfully!" : "Save Changes"}
              </motion.button>
            </div>
          </motion.div>

          {/* Password Change */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-effect rounded-2xl p-8"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-6">Change Password</h2>
            <div className="space-y-4">
              {["Current Password", "New Password", "Confirm New Password"].map((label) => (
                <div key={label}>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">{label}</label>
                  <input
                    type="password"
                    placeholder={`Enter ${label.toLowerCase()}`}
                    className="w-full px-4 py-3 border border-emerald-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white/80 text-gray-900 transition"
                  />
                </div>
              ))}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-3 border-2 border-emerald-500 text-emerald-700 rounded-xl font-semibold hover:bg-emerald-50 transition"
              >
                Update Password
              </motion.button>
            </div>
          </motion.div>

          {/* Notification Preferences */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-effect rounded-2xl p-8"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-6">Notification Preferences</h2>
            <div className="space-y-4">
              {[
                { key: "email", label: "Email Notifications", description: "Receive important updates via email" },
                { key: "sms", label: "SMS Notifications", description: "Get text alerts for critical events" },
                { key: "orders", label: "Order Alerts", description: "Notify when new orders are placed" },
                { key: "vendors", label: "Vendor Alerts", description: "Notify when vendors request approval" },
                { key: "marketing", label: "Marketing Emails", description: "Receive promotional campaigns" },
              ].map((notif) => (
                <div key={notif.key} className="flex items-center justify-between p-4 bg-white/60 rounded-xl hover:bg-white/80 transition">
                  <div>
                    <p className="font-semibold text-gray-800">{notif.label}</p>
                    <p className="text-sm text-gray-500">{notif.description}</p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setNotifications({ ...notifications, [notif.key]: !notifications[notif.key as keyof typeof notifications] })}
                    className={`relative w-12 h-6 rounded-full transition-all duration-300 ${notifications[notif.key as keyof typeof notifications] ? "bg-emerald-500" : "bg-gray-300"}`}
                  >
                    <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all duration-300 ${notifications[notif.key as keyof typeof notifications] ? "left-6" : "left-0.5"}`}></div>
                  </motion.button>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
