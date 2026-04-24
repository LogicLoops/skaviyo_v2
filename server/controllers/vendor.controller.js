const VendorModel = require('../models/vendor.model');
const OrderItemModel = require('../models/orderItem.model');
const prisma = require('../lib/prisma');
const { success, error } = require('../utils/response');
const { serialize } = require('../utils/bigint');

const registerVendor = async (req, res) => {
  try {
    const existing = await VendorModel.findByUserId(req.user.id);
    if (existing) return error(res, 'Vendor profile already exists', 409);

    const vendor = await VendorModel.create({ userId: req.user.id, ...req.body });

    // Upgrade user role to VENDOR
    await prisma.users.update({
      where: { id: BigInt(req.user.id) },
      data: { role: 'VENDOR' },
    });

    return success(res, serialize(vendor), 'Vendor registered. Awaiting approval.', 201);
  } catch (err) {
    return error(res, err.message);
  }
};

const getVendorProfile = async (req, res) => {
  try {
    const vendor = await VendorModel.findByUserId(req.user.id);
    if (!vendor) return error(res, 'Vendor profile not found', 404);
    return success(res, serialize(vendor));
  } catch (err) {
    return error(res, err.message);
  }
};

const updateVendorProfile = async (req, res) => {
  try {
    const vendor = await VendorModel.findByUserId(req.user.id);
    if (!vendor) return error(res, 'Vendor profile not found', 404);

    const updated = await VendorModel.updateById(vendor.id, req.body);
    return success(res, serialize(updated), 'Vendor profile updated');
  } catch (err) {
    return error(res, err.message);
  }
};

const getVendorOrders = async (req, res) => {
  try {
    const vendor = await VendorModel.findByUserId(req.user.id);
    if (!vendor) return error(res, 'Vendor profile not found', 404);

    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * Number(limit);
    const items = await OrderItemModel.findByVendorId(vendor.id, { skip, take: Number(limit) });
    return success(res, serialize(items));
  } catch (err) {
    return error(res, err.message);
  }
};

const updateOrderItemStatus = async (req, res) => {
  try {
    const updated = await OrderItemModel.updateItemStatus(req.params.itemId, req.body.item_status);
    return success(res, serialize(updated), 'Item status updated');
  } catch (err) {
    return error(res, err.message);
  }
};

module.exports = { registerVendor, getVendorProfile, updateVendorProfile, getVendorOrders, updateOrderItemStatus };
