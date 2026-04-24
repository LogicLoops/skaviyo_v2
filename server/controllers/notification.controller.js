const prisma = require('../lib/prisma');
const VendorModel = require('../models/vendor.model');
const { success, error } = require('../utils/response');
const { serialize } = require('../utils/bigint');

// In-DB notifications for user order history etc.
// Real-time vendor notifications go through Socket.io in order.controller.js

const getMyNotifications = async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * Number(limit);
    // Placeholder: extend schema with a notifications table if needed
    return success(res, []);
  } catch (err) {
    return error(res, err.message);
  }
};

module.exports = { getMyNotifications };
