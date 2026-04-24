const OrderModel = require('../models/order.model');
const OrderItemModel = require('../models/orderItem.model');
const CartModel = require('../models/cart.model');
const VendorModel = require('../models/vendor.model');
const prisma = require('../lib/prisma');
const { success, error } = require('../utils/response');
const { serialize } = require('../utils/bigint');
const { getIO } = require('../socket');

const placeOrder = async (req, res) => {
  try {
    const { items, addressId } = req.body;
    const userId = req.user.id;

    const totalAmount = items.reduce((sum, i) => sum + Number(i.price) * i.quantity, 0);
    const order = await OrderModel.create({ userId, totalAmount, items, addressId });

    // Notify each unique vendor via Socket.io
    const vendorIds = [...new Set(items.map((i) => i.vendorId.toString()))];
    for (const vendorId of vendorIds) {
      const payload = {
        type: 'new_order',
        orderId: order.id.toString(),
        orderNumber: order.order_number,
        message: `New order ${order.order_number} received.`,
      };
      getIO().to(`vendor_${vendorId}`).emit('new_order', payload);
    }

    // Clear cart after successful order
    const cart = await CartModel.getOrCreate(userId);
    await CartModel.clearCart(cart.id);

    return success(res, serialize(order), 'Order placed successfully', 201);
  } catch (err) {
    return error(res, err.message);
  }
};

const getMyOrders = async (req, res) => {
  try {
    const orders = await OrderModel.findByUserId(req.user.id);
    return success(res, serialize(orders));
  } catch (err) {
    return error(res, err.message);
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await OrderModel.findById(req.params.id);
    if (!order) return error(res, 'Order not found', 404);

    const isOwner = order.user_id.toString() === req.user.id.toString();
    if (!isOwner && req.user.role !== 'ADMIN') return error(res, 'Unauthorized', 403);

    return success(res, serialize(order));
  } catch (err) {
    return error(res, err.message);
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const updated = await OrderModel.updateStatus(req.params.id, req.body.order_status);
    return success(res, serialize(updated), 'Order status updated');
  } catch (err) {
    return error(res, err.message);
  }
};

const addTracking = async (req, res) => {
  try {
    const tracking = await prisma.order_tracking.create({
      data: {
        order_id: BigInt(req.params.id),
        status: req.body.status,
        location: req.body.location || null,
      },
    });
    return success(res, serialize(tracking), 'Tracking added', 201);
  } catch (err) {
    return error(res, err.message);
  }
};

module.exports = { placeOrder, getMyOrders, getOrderById, updateOrderStatus, addTracking };
