const router = require('express').Router();

router.use('/auth', require('./auth.routes'));
router.use('/products', require('./product.routes'));
router.use('/orders', require('./order.routes'));
router.use('/cart', require('./cart.routes'));
router.use('/vendors', require('./vendor.routes'));
router.use('/admin', require('./admin.routes'));
router.use('/categories', require('./category.routes'));
router.use('/notifications', require('./notification.routes'));

module.exports = router;
