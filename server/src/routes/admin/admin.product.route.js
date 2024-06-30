const { Router } = require('express');
const helpersMiddleware = require('../../middleware/helpers.middleware');
const authMiddleware = require('../../middleware/auth');
const ctrls = require('../../controller/product.controller');
const { wrapAsync } = require('../../utils/response');
const {
  validateGetProduct,
  validateGetAllProducts,
  validateAddProduct,
  validateUpdateProduct,
} = require('../../middleware/validator');

const router = Router();
/**
 * [Get products paginate]
 * @queryParam type: string, page: number, limit: number, category:mongoId
 * @route admin/products
 * @method get
 */
router.get(
  '/',
  authMiddleware.verifyAccessToken,
  authMiddleware.verifyAdmin,
  validateGetProduct(),
  helpersMiddleware.entityValidator,
  wrapAsync(ctrls.getProducts)
);
/**
 * [Get all products ]
 * @queryParam type: string, category:mongoId
 * @route admin/products/all
 * @method get
 */
router.get(
  '/all',
  authMiddleware.verifyAccessToken,
  authMiddleware.verifyAdmin,
  validateGetAllProducts(),
  helpersMiddleware.entityValidator,
  wrapAsync(ctrls.getAllProducts)
);

router.get(
  '/:product_id',
  authMiddleware.verifyAccessToken,
  authMiddleware.verifyAdmin,
  helpersMiddleware.idRule('product_id'),
  helpersMiddleware.idValidator,
  wrapAsync(ctrls.getProduct)
);
router.post(
  '',
  authMiddleware.verifyAccessToken,
  authMiddleware.verifyAdmin,
  validateAddProduct(),
  helpersMiddleware.entityValidator,
  wrapAsync(ctrls.addProduct)
);
router.put(
  '/:product_id',
  authMiddleware.verifyAccessToken,
  authMiddleware.verifyAdmin,
  helpersMiddleware.idRule('product_id'),
  helpersMiddleware.idValidator,
  validateUpdateProduct(),
  helpersMiddleware.entityValidator,
  wrapAsync(ctrls.updateProduct)
);

router.delete(
  '/delete/:product_id',
  authMiddleware.verifyAccessToken,
  authMiddleware.verifyAdmin,
  helpersMiddleware.idRule('product_id'),
  helpersMiddleware.idValidator,
  wrapAsync(ctrls.deleteProduct)
);

router.delete(
  '/delete-many',
  authMiddleware.verifyAccessToken,
  authMiddleware.verifyAdmin,
  helpersMiddleware.listIdRule('list_id'),
  helpersMiddleware.idValidator,
  wrapAsync(ctrls.deleteManyProducts)
);

router.post(
  '/upload-image',
  authMiddleware.verifyAccessToken,
  authMiddleware.verifyAdmin,
  wrapAsync(ctrls.uploadProductImage)
);
router.post(
  '/upload-images',
  authMiddleware.verifyAccessToken,
  authMiddleware.verifyAdmin,
  wrapAsync(ctrls.uploadManyProductImages)
);
module.exports = router;
