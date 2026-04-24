const router = require('express').Router();
const {
  registerVendor, getVendorProfile, updateVendorProfile,
  getVendorOrders, updateOrderItemStatus,
} = require('../controllers/vendor.controller');
const { authenticate } = require('../middleware/auth.middleware');
const { authorize } = require('../middleware/role.middleware');

router.use(authenticate);

router.post('/register', registerVendor);
router.get('/profile', authorize('VENDOR'), getVendorProfile);
router.put('/profile', authorize('VENDOR'), updateVendorProfile);
router.get('/orders', authorize('VENDOR'), getVendorOrders);
router.patch('/orders/items/:itemId/status', authorize('VENDOR'), updateOrderItemStatus);

module.exports = router;
