const CategoryModel = require('../models/category.model');
const { success, error } = require('../utils/response');
const { serialize } = require('../utils/bigint');

const getAll = async (req, res) => {
  try {
    const categories = await CategoryModel.findAll();
    return success(res, serialize(categories));
  } catch (err) {
    return error(res, err.message);
  }
};

const create = async (req, res) => {
  try {
    const category = await CategoryModel.create(req.body);
    return success(res, serialize(category), 'Category created', 201);
  } catch (err) {
    return error(res, err.message);
  }
};

const update = async (req, res) => {
  try {
    const category = await CategoryModel.updateById(req.params.id, req.body);
    return success(res, serialize(category), 'Category updated');
  } catch (err) {
    return error(res, err.message);
  }
};

const remove = async (req, res) => {
  try {
    await CategoryModel.deleteById(req.params.id);
    return success(res, null, 'Category deleted');
  } catch (err) {
    return error(res, err.message);
  }
};

module.exports = { getAll, create, update, remove };
