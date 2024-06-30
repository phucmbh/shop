const { Router } = require('express');
const ctrls = require('../controller/product.controller');
const helpersMiddleware = require('../middleware/helpers.middleware');
const { wrapAsync } = require('../utils/response');
const { validateGetProduct } = require('../middleware/validator');

const router = Router();
/**
 * [Get products paginate]
 * @queryParam type: string, page: number, limit: number, category:mongoId, exclude: mongoId product
 * @route products
 * @method get
 */
router.get(
  '/',
  validateGetProduct(),
  helpersMiddleware.entityValidator,
  wrapAsync(ctrls.getProducts)
);

router.get(
  '/:product_id',
  helpersMiddleware.idRule('product_id'),
  helpersMiddleware.idValidator,
  wrapAsync(ctrls.getProduct)
);

router.get('/search', wrapAsync(ctrls.searchProduct));
module.exports = router;
