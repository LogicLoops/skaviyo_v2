const prisma = require('../lib/prisma');

const findByEmail = (email) =>
  prisma.users.findUnique({ where: { email } });

const findById = (id) =>
  prisma.users.findUnique({
    where: { id: BigInt(id) },
    select: { id: true, name: true, email: true, role: true, phone: true, status: true, created_at: true },
  });

const create = (data) =>
  prisma.users.create({
    data: {
      name: data.name,
      email: data.email,
      password: data.password,
      role: data.role || 'CUSTOMER',
      status: 'ACTIVE',
      phone: data.phone || null,
    },
    select: { id: true, name: true, email: true, role: true, status: true, created_at: true },
  });

const updateById = (id, data) =>
  prisma.users.update({
    where: { id: BigInt(id) },
    data,
    select: { id: true, name: true, email: true, role: true, phone: true, status: true },
  });

const findAll = ({ skip = 0, take = 10 } = {}) =>
  prisma.users.findMany({
    skip,
    take,
    orderBy: { created_at: 'desc' },
    select: { id: true, name: true, email: true, role: true, phone: true, status: true, created_at: true },
  });

const countAll = () => prisma.users.count();

const deleteById = (id) =>
  prisma.users.delete({ where: { id: BigInt(id) } });

module.exports = { findByEmail, findById, create, updateById, findAll, countAll, deleteById };
