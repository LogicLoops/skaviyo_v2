// Prisma returns BigInt for @id fields — JSON.stringify can't handle them
const serialize = (data) =>
  JSON.parse(JSON.stringify(data, (_, v) => (typeof v === 'bigint' ? v.toString() : v)));

module.exports = { serialize };
