const prisma = require('../lib/prisma');

const getOrCreate = async (userId) => {
  let cart = await prisma.cart.findFirst({ where: { user_id: BigInt(userId) } });
  if (!cart) {
    cart = await prisma.cart.create({ data: { user_id: BigInt(userId) } });
  }
  return cart;
};

const findByUserId = (userId) =>
  prisma.cart.findFirst({
    where: { user_id: BigInt(userId) },
    include: {
      items: {
        include: {
          product_variant: {
            include: { product: { include: { images: true } } },
          },
        },
      },
    },
  });

const addItem = async (cartId, { productVariantId, quantity }) => {
  const existing = await prisma.cart_items.findFirst({
    where: { cart_id: BigInt(cartId), product_variant_id: BigInt(productVariantId) },
  });

  if (existing) {
    return prisma.cart_items.update({
      where: { id: existing.id },
      data: { quantity: existing.quantity + quantity },
    });
  }

  return prisma.cart_items.create({
    data: {
      cart_id: BigInt(cartId),
      product_variant_id: BigInt(productVariantId),
      quantity,
    },
  });
};

const updateItem = (itemId, quantity) =>
  prisma.cart_items.update({ where: { id: BigInt(itemId) }, data: { quantity } });

const removeItem = (itemId) =>
  prisma.cart_items.delete({ where: { id: BigInt(itemId) } });

const clearCart = (cartId) =>
  prisma.cart_items.deleteMany({ where: { cart_id: BigInt(cartId) } });

module.exports = { getOrCreate, findByUserId, addItem, updateItem, removeItem, clearCart };
