const { STATUS } = require('../constants/status');

const wrapAsync = (func) => {
  return function (req, res, next) {
    func(req, res, next).catch(next);
  };
};

class ErrorHandler extends Error {
  constructor(status, error) {
    super();
    this.status = status;
    this.error = error;
  }
}

const responseError = (res, error) => {
  if (error) {
    const status = error.status || 500;
    console.log(error);
    // Case just string
    if (typeof error.error === 'string') {
      const message = error.error;
      return res.status(status).send({ message });
    }
    // Case error is object
    const errorObject = error.error;
    return res.status(status).send({
      message: 'Lỗi',
      data: errorObject,
    });
  }
  return res
    .status(STATUS.INTERNAL_SERVER_ERROR)
    .send({ message: error.message });
};

const responseSuccess = (res, data) => {
  return res.status(STATUS.OK).send(data);
};

module.exports = {
  wrapAsync,
  ErrorHandler,
  responseError,
  responseSuccess,
};
