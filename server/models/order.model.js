const prisma = require('../lib/prisma');
const { v4: uuidv4 } = require('uuid');

const create = ({ userId, totalAmount, items, addressId }) =>
  prisma.orders.create({
    data: {
      user_id: BigInt(userId),
      order_number: `ORD-${uuidv4().slice(0, 8).toUpperCase()}`,
      total_amount: totalAmount,
      order_status: 'PENDING',
      payment_status: 'PENDING',
      items: {
        create: items.map((item) => ({
          vendor_id: BigInt(item.vendorId),
          product_variant_id: BigInt(item.productVariantId),
          price: item.price,
          quantity: item.quantity,
          item_status: 'PENDING',
        })),
      },
    },
    include: { items: true },
  });

const findById = (id) =>
  prisma.orders.findUnique({
    where: { id: BigInt(id) },
    include: {
      user: { select: { name: true, email: true } },
      items: { include: { product_variant: { include: { product: { include: { images: true } } } } } },
      payments: true,
      tracking: true,
    },
  });

const findByUserId = (userId) =>
  prisma.orders.findMany({
    where: { user_id: BigInt(userId) },
    orderBy: { created_at: 'desc' },
    include: { items: true },
  });

const findAll = ({ skip = 0, take = 10, order_status } = {}) =>
  prisma.orders.findMany({
    where: order_status ? { order_status } : {},
    skip,
    take,
    orderBy: { created_at: 'desc' },
    include: { user: { select: { name: true, email: true } } },
  });

const updateStatus = (id, order_status) =>
  prisma.orders.update({ where: { id: BigInt(id) }, data: { order_status } });

const countAll = () => prisma.orders.count();

module.exports = { create, findById, findByUserId, findAll, updateStatus, countAll };
