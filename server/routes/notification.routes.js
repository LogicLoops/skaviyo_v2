const router = require('express').Router();
const { getMyNotifications } = require('../controllers/notification.controller');
const { authenticate } = require('../middleware/auth.middleware');

router.use(authenticate);
router.get('/', getMyNotifications);

module.exports = router;
