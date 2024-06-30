const { validationResult, check, body } = require('express-validator');
const { STATUS } = require('../constants/status');
const { responseError, ErrorHandler } = require('../utils/response');
const { isMongoId } = require('../utils/validate');

const idRule = (...id) => {
  return id.map((item) => {
    return check(item).isMongoId().withMessage(`${item} không đúng định dạng`);
  });
};

const listIdRule = (list_id) => {
  return body(list_id)
    .custom((value) => value.findIndex((item) => !isMongoId(item)))
    .withMessage(`${list_id} không đúng định dạng`);
};

const idValidator = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const error = errors.array().reduce((result, item, index) => {
    result[item.param] = item.msg;
    return result;
  }, {});
  return responseError(res, new ErrorHandler(STATUS.BAD_REQUEST, error));
};

const entityValidator = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const error = errors
    .array({ onlyFirstError: true })
    .reduce((result, item, index) => {
      result[item.param] = item.msg;
      return result;
    }, {});

  return responseError(
    res,
    new ErrorHandler(STATUS.UNPROCESSABLE_ENTITY, error)
  );
};

const helpersMiddleware = {
  idRule,
  idValidator,
  entityValidator,
  listIdRule,
};
module.exports = helpersMiddleware;
