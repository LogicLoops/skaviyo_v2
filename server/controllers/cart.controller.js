const CartModel = require('../models/cart.model');
const { success, error } = require('../utils/response');
const { serialize } = require('../utils/bigint');

const getCart = async (req, res) => {
  try {
    const cart = await CartModel.findByUserId(req.user.id);
    return success(res, serialize(cart));
  } catch (err) {
    return error(res, err.message);
  }
};

const addToCart = async (req, res) => {
  try {
    const cart = await CartModel.getOrCreate(req.user.id);
    const item = await CartModel.addItem(cart.id, req.body);
    return success(res, serialize(item), 'Item added to cart', 201);
  } catch (err) {
    return error(res, err.message);
  }
};

const updateCartItem = async (req, res) => {
  try {
    const item = await CartModel.updateItem(req.params.itemId, req.body.quantity);
    return success(res, serialize(item), 'Cart item updated');
  } catch (err) {
    return error(res, err.message);
  }
};

const removeCartItem = async (req, res) => {
  try {
    await CartModel.removeItem(req.params.itemId);
    return success(res, null, 'Item removed');
  } catch (err) {
    return error(res, err.message);
  }
};

const clearCart = async (req, res) => {
  try {
    const cart = await CartModel.getOrCreate(req.user.id);
    await CartModel.clearCart(cart.id);
    return success(res, null, 'Cart cleared');
  } catch (err) {
    return error(res, err.message);
  }
};

module.exports = { getCart, addToCart, updateCartItem, removeCartItem, clearCart };
