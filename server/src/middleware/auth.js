const { verifyToken } = require('./jwt');
const { ROLE, STATUS } = require('../constants');
const { responseError, ErrorHandler } = require('../utils/response');
const AccessToken = require('../model/AccessToken');
const User = require('../model/User');

const verifyAccessToken = async (req, res, next) => {
  const access_token = req.headers.authorization?.replace('Bearer ', '');
  if (!access_token)
    return responseError(
      res,
      new ErrorHandler(STATUS.UNAUTHORIZED, 'Token không được gửi')
    );

  try {
    const decoded = verifyToken(access_token);
    req.jwtDecoded = decoded;
    const accessTokenDB = await AccessToken.findOne({
      token: access_token,
    }).exec();

    if (accessTokenDB) {
      return next();
    }
    return responseError(
      res,
      new ErrorHandler(STATUS.UNAUTHORIZED, 'Không tồn tại token')
    );
  } catch (error) {
    return responseError(res, error);
  }
};

const verifyAdmin = async (req, res, next) => {
  console.log(req.jwtDecoded);
  const userDB = await User.findById(req.jwtDecoded.id).lean();
  if (userDB.roles.includes(ROLE.ADMIN)) {
    return next();
  }
  return responseError(
    res,
    new ErrorHandler(STATUS.FORBIDDEN, 'Không có quyền truy cập')
  );
};

module.exports = {
  verifyAccessToken,
  verifyAdmin,
};
