import React from "react";
import { motion } from "framer-motion";

interface VendorDetailsData {
  id: number;
  userId: number;
  storeName: string;
  vendorName: string;
  email: string;
  phone: string;
  gstNumber: string | null;
  bankAccount: string | null;
  status: string;
  totalProducts: number;
  totalOrders: number;
  totalRevenue: string;
  createdAt: string;
}

interface VendorDetailsModalProps {
  vendorId: number | null;
  isOpen: boolean;
  onClose: () => void;
}

const getMockVendor = (id: number): VendorDetailsData => ({
  id,
  userId: id,
  storeName: "Premium Fashion Store",
  vendorName: "Rajesh Kumar",
  email: "rajesh@premiumfashion.com",
  phone: "+91 98765 43210",
  gstNumber: "29ABCDE1234F1Z5",
  bankAccount: "12345678901234",
  status: "ACTIVE",
  totalProducts: 45,
  totalOrders: 128,
  totalRevenue: "356000",
  createdAt: "2023-06-15T10:30:00Z",
});

const VendorDetailsModal: React.FC<VendorDetailsModalProps> = ({ vendorId, isOpen, onClose }) => {
  if (!isOpen || !vendorId) return null;

  const vendorDetails = getMockVendor(vendorId);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active": return "bg-green-100 text-green-700";
      case "pending": return "bg-yellow-100 text-yellow-700";
      case "suspended": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/20">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={onClose}
        className="absolute inset-0"
      />

      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="relative bg-gradient-to-br from-white via-white to-emerald-50 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden shadow-2xl border border-emerald-100"
      >
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-[#DCEBE7] to-[#E6F3EF] px-8 py-6 border-b border-[#D9E4E1] flex items-center justify-between shadow-sm">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Vendor Details</h2>
            <p className="text-sm text-gray-600 mt-1">Complete vendor information and performance metrics</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="p-2 hover:bg-white rounded-full transition duration-200 border border-transparent hover:border-emerald-200"
          >
            <svg className="w-7 h-7 text-gray-600 hover:text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </motion.button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-8" style={{ maxHeight: "calc(90vh - 130px)" }}>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            {/* Vendor Info */}
            <div className="bg-gradient-to-br from-[#F4F7F6] to-white rounded-2xl p-8 border border-[#E6EFEC] hover:shadow-lg transition-all duration-300">
              <div className="grid grid-cols-2 gap-6">
                {[
                  { label: "Store Name", value: vendorDetails.storeName },
                  { label: "Owner Name", value: vendorDetails.vendorName },
                  { label: "Email", value: vendorDetails.email },
                  { label: "Phone", value: vendorDetails.phone },
                  { label: "GST Number", value: vendorDetails.gstNumber || "Not provided" },
                ].map((field) => (
                  <div key={field.label}>
                    <p className="text-xs text-[#6B7C78] uppercase font-bold tracking-wider">{field.label}</p>
                    <p className="text-lg font-bold text-gray-900 mt-2">{field.value}</p>
                  </div>
                ))}
                <div>
                  <p className="text-xs text-[#6B7C78] uppercase font-bold tracking-wider">Status</p>
                  <span className={`inline-block mt-2 px-4 py-2 rounded-full text-xs font-semibold ${getStatusColor(vendorDetails.status)}`}>
                    {vendorDetails.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Bank Account */}
            <div className="bg-gradient-to-br from-[#F4F7F6] to-white rounded-2xl p-8 border border-[#E6EFEC] hover:shadow-lg transition-all duration-300">
              <p className="text-xs text-[#6B7C78] uppercase font-bold tracking-wider mb-4">Bank Account</p>
              <p className="text-lg font-bold text-gray-900">
                {vendorDetails.bankAccount
                  ? vendorDetails.bankAccount.replace(/(\d{4})\d+(?=\d{4})/, "$1****")
                  : "Not provided"}
              </p>
            </div>

            {/* Performance Stats */}
            <div>
              <p className="text-xs text-[#6B7C78] uppercase font-bold tracking-wider mb-4">Performance Overview</p>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: "Total Products", value: vendorDetails.totalProducts.toString() },
                  { label: "Total Orders", value: vendorDetails.totalOrders.toString() },
                  { label: "Total Revenue", value: `₹${vendorDetails.totalRevenue}` },
                ].map((stat, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -5 }}
                    className="bg-gradient-to-br from-emerald-50 via-white to-emerald-50 rounded-2xl p-6 border border-[#E6EFEC] hover:shadow-lg transition-all duration-300"
                  >
                    <p className="text-xs text-[#6B7C78] uppercase font-bold tracking-wider">{stat.label}</p>
                    <p className="text-3xl font-bold text-[#0F6D5B] mt-3">{stat.value}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Joined Date */}
            <div className="bg-gradient-to-br from-[#F4F7F6] to-white rounded-2xl p-8 border border-[#E6EFEC] hover:shadow-lg transition-all duration-300">
              <p className="text-xs text-[#6B7C78] uppercase font-bold tracking-wider mb-3">Joined Since</p>
              <p className="text-lg font-bold text-gray-900">
                {new Date(vendorDetails.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default VendorDetailsModal;
