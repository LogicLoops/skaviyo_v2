const router = require('express').Router();
const {
  getAllProducts, getProductById, createProduct, updateProduct, deleteProduct,
} = require('../controllers/product.controller');
const { authenticate } = require('../middleware/auth.middleware');
const { authorize } = require('../middleware/role.middleware');

router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/', authenticate, authorize('VENDOR'), createProduct);
router.put('/:id', authenticate, authorize('VENDOR', 'ADMIN'), updateProduct);
router.delete('/:id', authenticate, authorize('VENDOR', 'ADMIN'), deleteProduct);

module.exports = router;
