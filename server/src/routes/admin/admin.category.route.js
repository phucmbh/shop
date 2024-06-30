const express = require('express');
const helpersMiddleware = require('../../middleware/helpers.middleware');
const authMiddleware = require('../../middleware/auth');
const ctrls = require('../../controller/category.controller');
const { wrapAsync } = require('../../utils/response');
const {
  validateGetCategory,
  validateAddCategory,
  validateUpdateCategory,
} = require('../../middleware/validator');

const router = express.Router();
router.get(
  '/',
  authMiddleware.verifyAccessToken,
  authMiddleware.verifyAdmin,
  validateGetCategory(),
  helpersMiddleware.entityValidator,
  wrapAsync(ctrls.getCategories)
);
router.get(
  '/:category_id',
  authMiddleware.verifyAccessToken,
  authMiddleware.verifyAdmin,
  helpersMiddleware.idRule('category_id'),
  helpersMiddleware.idValidator,
  wrapAsync(ctrls.getCategory)
);
router.post(
  '',
  authMiddleware.verifyAccessToken,
  authMiddleware.verifyAdmin,
  validateAddCategory(),
  helpersMiddleware.entityValidator,
  wrapAsync(ctrls.addCategory)
);
router.put(
  '/:category_id',
  authMiddleware.verifyAccessToken,
  authMiddleware.verifyAdmin,
  helpersMiddleware.idRule('category_id'),
  helpersMiddleware.idValidator,
  validateUpdateCategory(),
  helpersMiddleware.entityValidator,
  wrapAsync(ctrls.updateCategory)
);
router.delete(
  '/delete/:category_id',
  authMiddleware.verifyAccessToken,
  authMiddleware.verifyAdmin,
  helpersMiddleware.idRule('category_id'),
  helpersMiddleware.idValidator,
  wrapAsync(ctrls.deleteCategory)
);
module.exports = router;
