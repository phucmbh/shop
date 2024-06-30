require('dotenv').config();

const isProduction =
  process.env.NODE_ENV === 'production' || process.argv[2] === 'production';

const HOST = isProduction
  ? process.env.PRODUCTION_HOST
  : `http://${process.env.HOST}:${process.env.PORT}`;

function removeAccents(str) {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D');
}

module.exports = {
  isProduction,
  HOST,
  removeAccents,
};
