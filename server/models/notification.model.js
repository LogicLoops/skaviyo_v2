const db = require('../config/db');

const create = ({ userId, vendorId = null, type, message, metadata = {} }) =>
  db.query(
    `INSERT INTO notifications (user_id, vendor_id, type, message, metadata)
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [userId, vendorId, type, message, JSON.stringify(metadata)]
  );

const findByUserId = (userId, { limit = 20, offset = 0 } = {}) =>
  db.query(
    'SELECT * FROM notifications WHERE user_id = $1 ORDER BY created_at DESC LIMIT $2 OFFSET $3',
    [userId, limit, offset]
  );

const findByVendorId = (vendorId, { limit = 20, offset = 0 } = {}) =>
  db.query(
    'SELECT * FROM notifications WHERE vendor_id = $1 ORDER BY created_at DESC LIMIT $2 OFFSET $3',
    [vendorId, limit, offset]
  );

const markAsRead = (id) =>
  db.query('UPDATE notifications SET is_read = true WHERE id = $1 RETURNING *', [id]);

const markAllAsRead = (userId) =>
  db.query('UPDATE notifications SET is_read = true WHERE user_id = $1', [userId]);

module.exports = { create, findByUserId, findByVendorId, markAsRead, markAllAsRead };
