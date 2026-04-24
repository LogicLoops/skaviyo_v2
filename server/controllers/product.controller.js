const ProductModel = require('../models/product.model');
const VendorModel = require('../models/vendor.model');
const { success, error } = require('../utils/response');
const { paginationMeta } = require('../utils/pagination');
const { serialize } = require('../utils/bigint');

const getAllProducts = async (req, res) => {
  try {
    const { page = 1, limit = 10, categoryId, search } = req.query;
    const skip = (page - 1) * Number(limit);
    const [products, total] = await Promise.all([
      ProductModel.findAll({ skip, take: Number(limit), categoryId, search }),
      ProductModel.countAll(),
    ]);
    return success(res, { products: serialize(products), pagination: paginationMeta(total, page, limit) });
  } catch (err) {
    return error(res, err.message);
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id);
    if (!product) return error(res, 'Product not found', 404);
    return success(res, serialize(product));
  } catch (err) {
    return error(res, err.message);
  }
};

const createProduct = async (req, res) => {
  try {
    const vendor = await VendorModel.findByUserId(req.user.id);
    if (!vendor) return error(res, 'Vendor profile not found', 404);
    if (vendor.status !== 'ACTIVE') return error(res, 'Vendor account is not active', 403);

    const product = await ProductModel.create({ ...req.body, vendorId: vendor.id });
    return success(res, serialize(product), 'Product created', 201);
  } catch (err) {
    return error(res, err.message);
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id);
    if (!product) return error(res, 'Product not found', 404);

    const vendor = await VendorModel.findByUserId(req.user.id);
    const isAdmin = req.user.role === 'ADMIN';
    const isOwner = vendor && vendor.id === product.vendor_id;

    if (!isAdmin && !isOwner) return error(res, 'Unauthorized', 403);

    const updated = await ProductModel.updateById(req.params.id, req.body);
    return success(res, serialize(updated), 'Product updated');
  } catch (err) {
    return error(res, err.message);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id);
    if (!product) return error(res, 'Product not found', 404);

    const vendor = await VendorModel.findByUserId(req.user.id);
    const isAdmin = req.user.role === 'ADMIN';
    const isOwner = vendor && vendor.id === product.vendor_id;

    if (!isAdmin && !isOwner) return error(res, 'Unauthorized', 403);

    await ProductModel.softDelete(req.params.id);
    return success(res, null, 'Product deleted');
  } catch (err) {
    return error(res, err.message);
  }
};

module.exports = { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct };
