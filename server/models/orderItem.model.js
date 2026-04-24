const prisma = require('../lib/prisma');

const findByOrderId = (orderId) =>
  prisma.order_items.findMany({
    where: { order_id: BigInt(orderId) },
    include: {
      product_variant: { include: { product: { include: { images: true } } } },
    },
  });

const findByVendorId = (vendorId, { skip = 0, take = 10 } = {}) =>
  prisma.order_items.findMany({
    where: { vendor_id: BigInt(vendorId) },
    skip,
    take,
    orderBy: { created_at: 'desc' },
    include: {
      order: { select: { order_number: true, order_status: true, created_at: true, user: { select: { name: true, email: true } } } },
      product_variant: { include: { product: { select: { title: true, images: true } } } },
    },
  });

const updateItemStatus = (id, item_status) =>
  prisma.order_items.update({ where: { id: BigInt(id) }, data: { item_status } });

module.exports = { findByOrderId, findByVendorId, updateItemStatus };
