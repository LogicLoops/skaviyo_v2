import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Header from "../components/Header";
import UserDetailsModal from "../components/UserDetailsModal";

interface Customer {
  id: number;
  name: string;
  email: string;
  status: string;
  totalOrders: number;
  totalSpent: string;
  createdAt: string;
}

const MOCK_CUSTOMERS: Customer[] = [
  { id: 1, name: "Sarah Anderson", email: "sarah@example.com", status: "ACTIVE", totalOrders: 12, totalSpent: "54000", createdAt: "2024-01-15T10:30:00Z" },
  { id: 2, name: "Marcus Chen", email: "marcus@example.com", status: "ACTIVE", totalOrders: 8, totalSpent: "32000", createdAt: "2024-02-20T09:15:00Z" },
  { id: 3, name: "Emma Thompson", email: "emma@example.com", status: "BLOCKED", totalOrders: 3, totalSpent: "12000", createdAt: "2024-03-05T14:00:00Z" },
  { id: 4, name: "Raj Patel", email: "raj@example.com", status: "ACTIVE", totalOrders: 25, totalSpent: "98000", createdAt: "2023-11-10T11:30:00Z" },
  { id: 5, name: "Priya Nair", email: "priya@example.com", status: "ACTIVE", totalOrders: 6, totalSpent: "24000", createdAt: "2024-04-01T08:45:00Z" },
  { id: 6, name: "John Smith", email: "john@example.com", status: "ACTIVE", totalOrders: 15, totalSpent: "67000", createdAt: "2023-12-25T16:00:00Z" },
  { id: 7, name: "Aisha Khan", email: "aisha@example.com", status: "ACTIVE", totalOrders: 9, totalSpent: "38000", createdAt: "2024-01-30T12:00:00Z" },
  { id: 8, name: "David Lee", email: "david@example.com", status: "BLOCKED", totalOrders: 1, totalSpent: "4500", createdAt: "2024-03-18T07:30:00Z" },
];

const Users: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>(MOCK_CUSTOMERS);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const [filterStatus, setFilterStatus] = useState("All Status");
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const [selectedCustomerId, setSelectedCustomerId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredAndSortedUsers = useMemo(() => {
    let filtered = customers.filter((customer) => {
      const matchesSearch =
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.id.toString().includes(searchTerm);
      const matchesStatus = filterStatus === "All Status" || customer.status === filterStatus;
      return matchesSearch && matchesStatus;
    });

    if (sortOrder === "newest") {
      filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else if (sortOrder === "oldest") {
      filtered.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    } else if (sortOrder === "highest_spent") {
      filtered.sort((a, b) => parseFloat(b.totalSpent) - parseFloat(a.totalSpent));
    } else if (sortOrder === "most_orders") {
      filtered.sort((a, b) => b.totalOrders - a.totalOrders);
    }

    return filtered;
  }, [customers, searchTerm, filterStatus, sortOrder]);

  const totalUsers = filteredAndSortedUsers.length;
  const totalPages = Math.ceil(totalUsers / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalUsers);
  const paginatedUsers = filteredAndSortedUsers.slice(startIndex, endIndex);

  const generatePageNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("...");
      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
        if (!pages.includes(i)) pages.push(i);
      }
      if (currentPage < totalPages - 2) pages.push("...");
      if (!pages.includes(totalPages)) pages.push(totalPages);
    }
    return pages;
  };

  const handleToggleStatus = (customerId: number, currentStatus: string) => {
    const newStatus = currentStatus === "ACTIVE" ? "BLOCKED" : "ACTIVE";
    setCustomers(customers.map((c) => (c.id === customerId ? { ...c, status: newStatus } : c)));
  };

  const handleDeleteUser = (customerId: number) => {
    if (window.confirm("Are you sure you want to delete this customer?")) {
      setCustomers(customers.filter((c) => c.id !== customerId));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 relative overflow-y-auto">
      <div className="fixed top-0 right-0 w-96 h-96 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-15 -z-10"></div>
      <div className="fixed bottom-0 left-0 w-96 h-96 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-15 -z-10"></div>

      <style>{`
        .glass-effect {
          background: linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(240,253,250,0.5) 100%);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid rgba(167,243,208,0.4);
        }
        ::-webkit-scrollbar { display: none; }
        html { scrollbar-width: none; }
      `}</style>

      <div className="p-8 relative z-10">
        <Header pageTitle="User Management" pageSubtitle="Manage and monitor all customers" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="glass-effect rounded-2xl overflow-hidden"
        >
          {/* Search & Filter Bar */}
          <div className="p-8 border-b border-white/20">
            <div className="flex items-center justify-between gap-6">
              <div className="flex-1">
                <div className="relative max-w-sm">
                  <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-600 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search by name, email, or ID..."
                    className="w-full pl-12 pr-4 py-3 h-11 bg-white/80 backdrop-blur-sm border border-emerald-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm text-gray-700 transition hover:bg-white"
                    value={searchTerm}
                    onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                  />
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="relative">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                    className="inline-flex items-center gap-2 px-4 py-2.5 border border-emerald-300 rounded-lg text-emerald-700 transition bg-white/60 font-semibold text-sm hover:bg-white hover:shadow-md"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" /></svg>
                    <span>Filter: {filterStatus}</span>
                  </motion.button>

                  {showStatusDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute top-full right-0 mt-2 w-48 bg-white border border-emerald-200 rounded-lg z-20 shadow-lg"
                    >
                      {["All Status", "ACTIVE", "BLOCKED"].map((status, idx) => (
                        <motion.button
                          key={status}
                          whileHover={{ x: 4 }}
                          className={`w-full text-left px-4 py-3 transition text-sm font-medium ${idx < 2 ? "border-b border-emerald-100" : ""} ${filterStatus === status ? "bg-emerald-50 text-emerald-700" : "text-gray-700 hover:bg-emerald-50"}`}
                          onClick={() => { setFilterStatus(status); setShowStatusDropdown(false); setCurrentPage(1); }}
                        >
                          {status}
                        </motion.button>
                      ))}
                    </motion.div>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    const opts = ["newest", "oldest", "highest_spent", "most_orders"];
                    setSortOrder(opts[(opts.indexOf(sortOrder) + 1) % opts.length]);
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2.5 border border-emerald-300 rounded-lg text-emerald-700 transition bg-white/60 font-semibold text-sm hover:bg-white hover:shadow-md"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" /></svg>
                  <span>Sort: {sortOrder === "newest" ? "Newest" : sortOrder === "oldest" ? "Oldest" : sortOrder === "highest_spent" ? "Highest Spent" : "Most Orders"}</span>
                </motion.button>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/30 backdrop-blur-sm border-b border-white/20">
                <tr>
                  {["USER", "JOIN DATE", "ORDERS", "SPENT", "STATUS", "ACTIONS"].map((h) => (
                    <th key={h} className="px-6 py-4 text-left text-xs font-semibold text-emerald-900 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {paginatedUsers.map((customer, idx) => (
                  <motion.tr
                    key={customer.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="hover:bg-white/30 transition"
                  >
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center text-white font-semibold text-sm flex-shrink-0 shadow-md">
                          {customer.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">{customer.name}</p>
                          <p className="text-xs text-gray-600">{customer.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-sm text-gray-700">{new Date(customer.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-5 text-sm font-semibold text-gray-900">{customer.totalOrders}</td>
                    <td className="px-6 py-5 text-sm font-semibold text-emerald-700">₹{customer.totalSpent}</td>
                    <td className="px-6 py-5">
                      <span className={`px-3 py-1.5 rounded-full text-xs font-semibold inline-flex items-center gap-1.5 shadow-sm ${customer.status === "ACTIVE" ? "bg-emerald-100/80 text-emerald-700 border border-emerald-200" : "bg-red-100/80 text-red-700 border border-red-200"}`}>
                        <span className={`w-2 h-2 rounded-full ${customer.status === "ACTIVE" ? "bg-emerald-600" : "bg-red-600"}`}></span>
                        {customer.status}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => { setSelectedCustomerId(customer.id); setIsModalOpen(true); }}
                          className="px-3 py-1.5 border border-emerald-500 text-emerald-600 rounded-lg text-xs font-semibold hover:bg-emerald-50 transition inline-flex items-center gap-1.5 bg-white/60"
                        >
                          👁️ View
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleToggleStatus(customer.id, customer.status)}
                          className="px-3 py-1.5 border border-orange-400 text-orange-600 rounded-lg text-xs font-semibold hover:bg-orange-50 transition inline-flex items-center gap-1.5 bg-white/60"
                        >
                          🔒 {customer.status === "ACTIVE" ? "Block" : "Unblock"}
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleDeleteUser(customer.id)}
                          className="px-3 py-1.5 border border-red-400 text-red-600 rounded-lg text-xs font-semibold hover:bg-red-50 transition inline-flex items-center gap-1.5 bg-white/60"
                        >
                          🗑️
                        </motion.button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>

            {paginatedUsers.length === 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16 text-gray-500">
                <p className="text-sm font-medium">No customers found</p>
              </motion.div>
            )}
          </div>

          {/* Pagination */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="px-8 py-6 border-t border-white/20 flex items-center justify-between bg-white/20 backdrop-blur-sm"
          >
            <p className="text-sm font-medium text-gray-700">
              Showing {totalUsers === 0 ? 0 : startIndex + 1}–{endIndex} of {totalUsers} users
            </p>
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="p-2 border border-emerald-300 rounded-lg text-emerald-600 hover:bg-white/60 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                ‹
              </motion.button>
              {generatePageNumbers().map((page, index) =>
                page === "..." ? (
                  <span key={`dots-${index}`} className="px-2 text-gray-600 font-medium">...</span>
                ) : (
                  <motion.button
                    key={page}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrentPage(page as number)}
                    className={`w-8 h-8 rounded-lg text-sm font-semibold transition ${currentPage === page ? "bg-emerald-600 text-white shadow-lg" : "border border-emerald-300 text-gray-700 hover:bg-white/60"}`}
                  >
                    {page}
                  </motion.button>
                )
              )}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages || totalPages === 0}
                className="p-2 border border-emerald-300 rounded-lg text-emerald-600 hover:bg-white/60 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                ›
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <UserDetailsModal
        customerId={selectedCustomerId}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Users;
