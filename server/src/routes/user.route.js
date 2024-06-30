const { Router } = require('express');
const authMiddleware = require('../middleware/auth');
const ctrls = require('../controller/user.controller');
const { wrapAsync } = require('../utils/response');
const helpersMiddleware = require('../middleware/helpers.middleware');
const {
  validateLogin,
  validateRegister,
  validateUpdateUser,
  validateUpdateMe,
} = require('../middleware/validator');
const router = Router();

router.post(
  '/login',
  validateLogin(),
  helpersMiddleware.entityValidator,
  wrapAsync(ctrls.login)
);

router.post(
  '/logout',
  authMiddleware.verifyAccessToken,
  wrapAsync(ctrls.logout)
);

router.post(
  '/register',
  validateRegister(),
  helpersMiddleware.entityValidator,
  wrapAsync(ctrls.register)
);

router.get(
  '/me',
  authMiddleware.verifyAccessToken,
  wrapAsync(ctrls.getDetailMySelf)
);
router.put(
  '/me',
  authMiddleware.verifyAccessToken,
  validateUpdateUser(),
  helpersMiddleware.entityValidator,
  wrapAsync(ctrls.updateMe)
);

router.put(
  '/user',
  validateUpdateMe(),
  helpersMiddleware.entityValidator,
  authMiddleware.verifyAccessToken,
  wrapAsync(ctrls.updateMe)
);

router.get(
  '/user',
  authMiddleware.verifyAccessToken,
  wrapAsync(ctrls.getDetailMySelf)
);
module.exports = router;
