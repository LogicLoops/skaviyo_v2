import React from "react";
import { motion } from "framer-motion";

interface HeaderProps {
  pageTitle: string;
  pageSubtitle?: string;
  adminName?: string;
  adminRole?: string;
}

const Header: React.FC<HeaderProps> = ({
  pageTitle,
  pageSubtitle = "Manage and monitor your data",
  adminName = "Admin",
  adminRole = "Super Admin",
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex justify-between items-center mb-8"
    >
      <div>
        <h1 className="text-4xl font-bold text-gray-900">{pageTitle}</h1>
        <p className="text-gray-600 mt-1">{pageSubtitle}</p>
      </div>

      <div className="flex items-center gap-4">
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="bg-white p-3 rounded-full shadow-md hover:shadow-lg transition-all border border-emerald-200 cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.1 }}
          className="bg-white p-3 rounded-full shadow-md hover:shadow-lg transition-all border border-emerald-200 relative cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span className="absolute top-2 right-2 w-2 h-2 bg-emerald-600 rounded-full"></span>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.03 }}
          className="flex items-center gap-3 bg-white px-5 py-3 rounded-full shadow-md hover:shadow-lg transition-all ml-2 border border-emerald-200 cursor-pointer"
        >
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
            {adminName.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800">{adminName}</p>
            <p className="text-xs text-gray-600">{adminRole}</p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Header;
