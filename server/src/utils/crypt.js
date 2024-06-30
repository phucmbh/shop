const crypto = require('crypto');

const hashValue = (value) => {
  return crypto.createHash('sha256').update(value).digest('hex');
};

const compareValue = (plainText, hash) => {
  return hashValue(plainText) === hash;
};

module.exports = { hashValue, compareValue };
