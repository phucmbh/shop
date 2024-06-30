const { ROLE } = require('../constants/role.enum');
const mongoose = require('mongoose');

const REGEX_EMAIL =
  /^[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/;
const isEmail = (email) => {
  return REGEX_EMAIL.test(email);
};

const isAdmin = (req) => {
  return req.jwtDecoded?.roles?.includes(ROLE.ADMIN);
};

const isMongoId = (id) => mongoose.Types.ObjectId.isValid(id);

module.exports = {
  isEmail,
  isAdmin,
  isMongoId,
};
