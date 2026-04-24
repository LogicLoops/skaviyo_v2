const prisma = require('../lib/prisma');

const findAll = ({ skip = 0, take = 10, categoryId, vendorId, search } = {}) => {
  const where = {
    is_active: true,
    ...(categoryId && { category_id: BigInt(categoryId) }),
    ...(vendorId && { vendor_id: BigInt(vendorId) }),
    ...(search && { title: { contains: search } }),
  };

  return prisma.products.findMany({
    where,
    skip,
    take,
    orderBy: { created_at: 'desc' },
    include: {
      category: { select: { name: true } },
      vendor: { select: { store_name: true } },
      images: true,
      variants: true,
    },
  });
};

const findById = (id) =>
  prisma.products.findUnique({
    where: { id: BigInt(id) },
    include: {
      category: true,
      vendor: { select: { store_name: true } },
      images: true,
      variants: true,
    },
  });

const create = (data) =>
  prisma.products.create({
    data: {
      vendor_id: BigInt(data.vendorId),
      category_id: BigInt(data.category_id),
      title: data.title,
      description: data.description || null,
      brand: data.brand || null,
    },
    include: { images: true, variants: true },
  });

const updateById = (id, data) =>
  prisma.products.update({
    where: { id: BigInt(id) },
    data,
    include: { images: true, variants: true },
  });

const softDelete = (id) =>
  prisma.products.update({ where: { id: BigInt(id) }, data: { is_active: false } });

const countAll = (where = { is_active: true }) =>
  prisma.products.count({ where });

module.exports = { findAll, findById, create, updateById, softDelete, countAll };
