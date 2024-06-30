const { Router } = require('express');
const ctrls = require('../../controller/user.controller');
const helpersMiddleware = require('../../middleware/helpers.middleware');
const authMiddleware = require('../../middleware/auth');
const { wrapAsync } = require('../../utils/response');
const {
  validateAddUser,
  validateUpdateUser,
} = require('../../middleware/validator');

const router = Router();
router.get(
  '/',
  authMiddleware.verifyAccessToken,
  authMiddleware.verifyAdmin,
  ctrls.getUsers
);
router.post(
  '/',
  authMiddleware.verifyAccessToken,
  authMiddleware.verifyAdmin,
  validateAddUser(),
  helpersMiddleware.entityValidator,
  wrapAsync(ctrls.addUser)
);
router.put(
  '/:user_id',
  authMiddleware.verifyAccessToken,
  authMiddleware.verifyAdmin,
  helpersMiddleware.idRule('user_id'),
  helpersMiddleware.idValidator,
  validateUpdateUser(),
  helpersMiddleware.entityValidator,
  wrapAsync(ctrls.updateUser)
);
router.get(
  '/:user_id',
  authMiddleware.verifyAccessToken,
  authMiddleware.verifyAdmin,
  helpersMiddleware.idRule('user_id'),
  helpersMiddleware.idValidator,
  wrapAsync(ctrls.deleteUser)
);
router.delete(
  '/delete/:user_id',
  authMiddleware.verifyAccessToken,
  authMiddleware.verifyAdmin,
  helpersMiddleware.idRule('user_id'),
  helpersMiddleware.idValidator,
  wrapAsync(ctrls.deleteUser)
);
module.exports = router;
