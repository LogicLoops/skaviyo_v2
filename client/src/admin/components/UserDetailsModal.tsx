import React, { useState } from "react";
import { motion } from "framer-motion";

interface OrderItem {
  id: number;
  productName: string;
  quantity: number;
  price: string;
}

interface Order {
  id: number;
  orderNumber: string;
  totalAmount: string;
  orderStatus: string;
  paymentStatus: string;
  createdAt: string;
  items: OrderItem[];
}

interface CustomerDetailsData {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: string;
  totalOrders: number;
  totalSpent: string;
  createdAt: string;
  orders: Order[];
}

interface UserDetailsModalProps {
  customerId: number | null;
  isOpen: boolean;
  onClose: () => void;
}

// Mock data for UI display
const getMockCustomer = (id: number): CustomerDetailsData => ({
  id,
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "+91 98765 43210",
  status: "ACTIVE",
  totalOrders: 5,
  totalSpent: "24500",
  createdAt: "2024-01-15T10:30:00Z",
  orders: [
    {
      id: 1,
      orderNumber: "#SK-001234",
      totalAmount: "8500",
      orderStatus: "delivered",
      paymentStatus: "paid",
      createdAt: "2024-03-10T14:00:00Z",
      items: [
        { id: 1, productName: "The Signature White", quantity: 2, price: "4500" },
        { id: 2, productName: "Royal Emerald Tee", quantity: 1, price: "3999" },
      ],
    },
    {
      id: 2,
      orderNumber: "#SK-001456",
      totalAmount: "5200",
      orderStatus: "shipped",
      paymentStatus: "paid",
      createdAt: "2024-04-05T09:00:00Z",
      items: [
        { id: 3, productName: "Heritage Gold Edition", quantity: 1, price: "5200" },
      ],
    },
  ],
});

const UserDetailsModal: React.FC<UserDetailsModalProps> = ({ customerId, isOpen, onClose }) => {
  const [expandedOrderId, setExpandedOrderId] = useState<number | null>(null);

  if (!isOpen || !customerId) return null;

  const customerDetails = getMockCustomer(customerId);

  const getOrderStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "delivered": return "bg-green-100 text-green-700";
      case "shipped": return "bg-blue-100 text-blue-700";
      case "pending": return "bg-yellow-100 text-yellow-700";
      case "cancelled": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "paid": return "bg-green-100 text-green-700";
      case "pending": return "bg-yellow-100 text-yellow-700";
      case "failed": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/20">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0"
      />

      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="relative bg-gradient-to-br from-white via-white to-emerald-50 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden shadow-2xl border border-emerald-100"
      >
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-[#DCEBE7] to-[#E6F3EF] px-8 py-6 border-b border-[#D9E4E1] flex items-center justify-between shadow-sm">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Customer Details</h2>
            <p className="text-sm text-gray-600 mt-1">Complete customer information and order history</p>
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
            {/* Customer Info */}
            <div className="bg-gradient-to-br from-[#F4F7F6] to-white rounded-2xl p-8 border border-[#E6EFEC] hover:shadow-lg transition-all duration-300">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-xs text-[#6B7C78] uppercase font-bold tracking-wider">Name</p>
                  <p className="text-lg font-bold text-gray-900 mt-2">{customerDetails.name}</p>
                </div>
                <div>
                  <p className="text-xs text-[#6B7C78] uppercase font-bold tracking-wider">Email</p>
                  <p className="text-lg font-bold text-gray-900 mt-2">{customerDetails.email}</p>
                </div>
                <div>
                  <p className="text-xs text-[#6B7C78] uppercase font-bold tracking-wider">Phone</p>
                  <p className="text-lg font-bold text-gray-900 mt-2">{customerDetails.phone}</p>
                </div>
                <div>
                  <p className="text-xs text-[#6B7C78] uppercase font-bold tracking-wider">Status</p>
                  <span className={`inline-block mt-2 px-4 py-2 rounded-full text-xs font-semibold ${
                    customerDetails.status === "ACTIVE" ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
                  }`}>
                    {customerDetails.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div>
              <p className="text-xs text-[#6B7C78] uppercase font-bold tracking-wider mb-4">Overview</p>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: "Total Orders", value: customerDetails.totalOrders.toString() },
                  { label: "Total Spent", value: `₹${customerDetails.totalSpent}` },
                  { label: "Member Since", value: new Date(customerDetails.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }) },
                ].map((stat, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -5 }}
                    className="bg-gradient-to-br from-emerald-50 via-white to-emerald-50 rounded-2xl p-6 border border-[#E6EFEC] hover:shadow-lg transition-all duration-300"
                  >
                    <p className="text-xs text-[#6B7C78] uppercase font-bold tracking-wider">{stat.label}</p>
                    <p className="text-2xl font-bold text-[#0F6D5B] mt-3">{stat.value}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Orders */}
            <div>
              <p className="text-xs text-[#6B7C78] uppercase font-bold tracking-wider mb-4">Order History</p>
              <div className="space-y-3">
                {customerDetails.orders.map((order, idx) => (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="bg-white border border-[#E6EFEC] rounded-xl overflow-hidden hover:shadow-lg transition-all duration-200"
                  >
                    <motion.button
                      whileHover={{ x: 4 }}
                      onClick={() => setExpandedOrderId(expandedOrderId === order.id ? null : order.id)}
                      className="w-full p-6 text-left hover:bg-gradient-to-r hover:from-emerald-50/50 hover:to-white transition-all duration-200"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className="font-bold text-gray-900">{order.orderNumber}</p>
                          <p className="text-xs text-gray-500 mt-1">{new Date(order.createdAt).toLocaleDateString()}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <p className="text-2xl font-bold text-[#0F6D5B]">₹{order.totalAmount}</p>
                          <span className={`transform transition-transform ${expandedOrderId === order.id ? "rotate-180" : ""}`}>▼</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 mt-4 flex-wrap">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getOrderStatusColor(order.orderStatus)}`}>
                          {order.orderStatus}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getPaymentStatusColor(order.paymentStatus)}`}>
                          {order.paymentStatus}
                        </span>
                        <span className="text-xs text-gray-600 bg-gray-100 px-3 py-1 rounded-full font-medium">
                          {order.items.length} items
                        </span>
                      </div>
                    </motion.button>

                    {expandedOrderId === order.id && (
                      <div className="border-t border-[#E6EFEC] p-6 bg-gradient-to-b from-emerald-50/30 to-white space-y-3">
                        <p className="text-xs text-[#6B7C78] uppercase font-bold tracking-wider mb-4">Items Purchased</p>
                        {order.items.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center justify-between p-4 bg-white rounded-lg border border-[#E6EFEC]"
                          >
                            <div>
                              <p className="font-semibold text-gray-900">{item.productName}</p>
                              <p className="text-xs text-gray-600 mt-1">Quantity: {item.quantity}</p>
                            </div>
                            <p className="text-sm font-bold text-[#0F6D5B]">₹{item.price}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default UserDetailsModal;
