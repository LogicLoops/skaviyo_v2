const router = require('express').Router();
const { placeOrder, getMyOrders, getOrderById, updateOrderStatus, addTracking } = require('../controllers/order.controller');
const { authenticate } = require('../middleware/auth.middleware');
const { authorize } = require('../middleware/role.middleware');

router.post('/', authenticate, authorize('CUSTOMER'), placeOrder);
router.get('/my', authenticate, getMyOrders);
router.get('/:id', authenticate, getOrderById);
router.patch('/:id/status', authenticate, authorize('ADMIN'), updateOrderStatus);
router.post('/:id/tracking', authenticate, authorize('ADMIN', 'VENDOR'), addTracking);

module.exports = router;
