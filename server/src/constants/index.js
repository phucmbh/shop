const { config, FOLDER_UPLOAD, FOLDERS, ROUTE_IMAGE } = require('./config');
const { SORT_BY, ORDER } = require('./product');
const { STATUS_PURCHASE } = require('./purchase');
const { ROLE } = require('./role.enum');
const { STATUS } = require('./status');

module.exports = {
  STATUS,
  ROLE,
  STATUS_PURCHASE,
  SORT_BY,
  ORDER,
  config,
  FOLDER_UPLOAD,
  FOLDERS,
  ROUTE_IMAGE,
};
