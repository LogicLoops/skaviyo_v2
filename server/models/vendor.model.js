const prisma = require('../lib/prisma');

const create = (data) =>
  prisma.vendors.create({
    data: {
      user_id: BigInt(data.userId),
      store_name: data.store_name,
      gst_number: data.gst_number || null,
      bank_account: data.bank_account || null,
      status: 'PENDING',
    },
  });

const findByUserId = (userId) =>
  prisma.vendors.findUnique({ where: { user_id: BigInt(userId) } });

const findById = (id) =>
  prisma.vendors.findUnique({ where: { id: BigInt(id) } });

const findAll = ({ skip = 0, take = 10 } = {}) =>
  prisma.vendors.findMany({
    skip,
    take,
    orderBy: { created_at: 'desc' },
    include: { user: { select: { name: true, email: true } } },
  });

const updateById = (id, data) =>
  prisma.vendors.update({ where: { id: BigInt(id) }, data });

const updateStatus = (id, status) =>
  prisma.vendors.update({ where: { id: BigInt(id) }, data: { status } });

module.exports = { create, findByUserId, findById, findAll, updateById, updateStatus };
