const prisma = require('../lib/prisma');

const findAll = () =>
  prisma.categories.findMany({
    orderBy: { name: 'asc' },
    include: { children: true },
    where: { parent_id: null },
  });

const findById = (id) =>
  prisma.categories.findUnique({ where: { id: BigInt(id) } });

const create = (data) =>
  prisma.categories.create({
    data: {
      name: data.name,
      parent_id: data.parent_id ? BigInt(data.parent_id) : null,
    },
  });

const updateById = (id, data) =>
  prisma.categories.update({ where: { id: BigInt(id) }, data });

const deleteById = (id) =>
  prisma.categories.delete({ where: { id: BigInt(id) } });

module.exports = { findAll, findById, create, updateById, deleteById };
