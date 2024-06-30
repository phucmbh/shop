const { Router } = require('express');
const authMiddleware = require('../middleware/auth');
const helpersMiddleware = require('../middleware/helpers.middleware');
const ctrls = require('../controller/purchase.controller');
const { wrapAsync } = require('../utils/response');
const {
  validateAddToCard,
  validateUpdatePurchase,
  validateDeletePurchase,
} = require('../middleware/validator');

const router = Router();

router.post(
  '/buy-products',
  helpersMiddleware.entityValidator,
  authMiddleware.verifyAccessToken,
  wrapAsync(ctrls.buyProducts)
);

router.post(
  '/add-to-cart',
  validateAddToCard(),
  helpersMiddleware.entityValidator,
  authMiddleware.verifyAccessToken,
  wrapAsync(ctrls.addToCart)
);

router.put(
  '/update-purchase',
  validateUpdatePurchase(),
  helpersMiddleware.entityValidator,
  authMiddleware.verifyAccessToken,
  wrapAsync(ctrls.updatePurchase)
);

router.delete(
  '',
  validateDeletePurchase(),
  helpersMiddleware.entityValidator,
  authMiddleware.verifyAccessToken,
  wrapAsync(ctrls.deletePurchases)
);

router.get('', authMiddleware.verifyAccessToken, wrapAsync(ctrls.getPurchases));

module.exports = router;
