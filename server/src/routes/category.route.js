const { Router } = require('express');
const ctrls = require('../controller/category.controller');
const helpersMiddleware = require('../middleware/helpers.middleware');
const { wrapAsync } = require('../utils/response');
const { validateGetCategory } = require('../middleware/validator');

const router = Router();
router.get(
  '/',
  validateGetCategory(),
  helpersMiddleware.entityValidator,
  wrapAsync(ctrls.getCategories)
);
router.get(
  '/:category_id',
  helpersMiddleware.idRule('category_id'),
  helpersMiddleware.idValidator,
  wrapAsync(ctrls.getCategory)
);
module.exports = router;
