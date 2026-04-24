const UserModel = require('../models/user.model');
const VendorModel = require('../models/vendor.model');
const ProductModel = require('../models/product.model');
const OrderModel = require('../models/order.model');
const { success, error } = require('../utils/response');
const { paginationMeta } = require('../utils/pagination');
const { serialize } = require('../utils/bigint');

const getDashboardStats = async (req, res) => {
  try {
    const [totalUsers, totalProducts, totalOrders] = await Promise.all([
      UserModel.countAll(),
      ProductModel.countAll(),
      OrderModel.countAll(),
    ]);
    return success(res, { totalUsers, totalProducts, totalOrders });
  } catch (err) {
    return error(res, err.message);
  }
};

const getAllUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * Number(limit);
    const [users, total] = await Promise.all([
      UserModel.findAll({ skip, take: Number(limit) }),
      UserModel.countAll(),
    ]);
    return success(res, {
      users: serialize(users),
      pagination: paginationMeta(total, page, limit),
    });
  } catch (err) {
    return error(res, err.message);
  }
};

const updateUserStatus = async (req, res) => {
  try {
    const user = await UserModel.updateById(req.params.id, { status: req.body.status });
    return success(res, serialize(user), 'User status updated');
  } catch (err) {
    return error(res, err.message);
  }
};

const deleteUser = async (req, res) => {
  try {
    await UserModel.deleteById(req.params.id);
    return success(res, null, 'User deleted');
  } catch (err) {
    return error(res, err.message);
  }
};

const getAllVendors = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * Number(limit);
    const vendors = await VendorModel.findAll({ skip, take: Number(limit) });
    return success(res, serialize(vendors));
  } catch (err) {
    return error(res, err.message);
  }
};

const updateVendorStatus = async (req, res) => {
  try {
    const vendor = await VendorModel.updateStatus(req.params.id, req.body.status);
    return success(res, serialize(vendor), 'Vendor status updated');
  } catch (err) {
    return error(res, err.message);
  }
};

const getAllOrders = async (req, res) => {
  try {
    const { page = 1, limit = 10, order_status } = req.query;
    const skip = (page - 1) * Number(limit);
    const [orders, total] = await Promise.all([
      OrderModel.findAll({ skip, take: Number(limit), order_status }),
      OrderModel.countAll(),
    ]);
    return success(res, {
      orders: serialize(orders),
      pagination: paginationMeta(total, page, limit),
    });
  } catch (err) {
    return error(res, err.message);
  }
};

const getAllProducts = async (req, res) => {
  try {
    const { page = 1, limit = 10, search } = req.query;
    const skip = (page - 1) * Number(limit);
    const [products, total] = await Promise.all([
      ProductModel.findAll({ skip, take: Number(limit), search }),
      ProductModel.countAll(),
    ]);
    return success(res, {
      products: serialize(products),
      pagination: paginationMeta(total, page, limit),
    });
  } catch (err) {
    return error(res, err.message);
  }
};

module.exports = {
  getDashboardStats, getAllUsers, updateUserStatus, deleteUser,
  getAllVendors, updateVendorStatus, getAllOrders, getAllProducts,
};
