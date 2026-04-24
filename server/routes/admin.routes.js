const router = require('express').Router();
const {
  getDashboardStats, getAllUsers, updateUserStatus, deleteUser,
  getAllVendors, updateVendorStatus, getAllOrders, getAllProducts,
} = require('../controllers/admin.controller');
const { authenticate } = require('../middleware/auth.middleware');
const { authorize } = require('../middleware/role.middleware');

router.use(authenticate, authorize('ADMIN'));

router.get('/stats', getDashboardStats);
router.get('/users', getAllUsers);
router.patch('/users/:id/status', updateUserStatus);
router.delete('/users/:id', deleteUser);
router.get('/vendors', getAllVendors);
router.patch('/vendors/:id/status', updateVendorStatus);
router.get('/orders', getAllOrders);
router.get('/products', getAllProducts);

module.exports = router;
