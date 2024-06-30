const jwt = require('jsonwebtoken');
const { STATUS } = require('../constants/status');
const ErrorHandler = require('../utils/response');

const { JWT_SECRET_KEY } = process.env;

module.exports = {
  generateAccessToken: ({ _id, email, roles, created_at }) =>
    jwt.sign({ _id, roles, email, created_at }, JWT_SECRET_KEY, {
      expiresIn: '7d',
    }),
  generateRefreshToken: (uid) =>
    jwt.sign({ _id: uid }, JWT_SECRET_KEY, { expiresIn: '7d' }),

  verifyToken: (token) => {
    jwt.verify(token, JWT_SECRET_KEY, (error, decoded) => {
      if (error) {
        if (error.name === 'TokenExpiredError') {
          throw new ErrorHandler(STATUS.UNAUTHORIZED, {
            message: 'Token hết hạn',
            name: 'EXPIRED_TOKEN',
          });
        } else {
          throw new ErrorHandler(STATUS.UNAUTHORIZED, 'Token không đúng');
        }
      }
      return decoded;
    });
  },
};
