const { body, query } = require('express-validator');
const { isMongoId } = require('../utils/validate');

var that = (module.exports = {
  validateRegister: () => {
    return [
      body('email')
        .isEmail()
        .withMessage('Email không đúng định dạng')
        .isLength({ min: 5, max: 160 })
        .withMessage('Email phải từ 5-160 kí tự'),
      body('password')
        .exists({ checkFalsy: true })
        .withMessage('Mật khẩu không được để trống')
        .isLength({ min: 6, max: 160 })
        .withMessage('Mật khẩu phải từ 6-160 kí tự'),
    ];
  },
  validateLogin: () => {
    return [
      body('email')
        .isEmail()
        .withMessage('Email không đúng định dạng')
        .isLength({ min: 5, max: 160 })
        .withMessage('Email phải từ 5-160 kí tự'),
      body('password')
        .isLength({ min: 6, max: 160 })
        .withMessage('Mật khẩu phải từ 6-160 kí tự'),
    ];
  },
  validateAddCategory: () => {
    return [
      body('name')
        .exists({ checkFalsy: true })
        .withMessage('Tên không được để trống')
        .isLength({ max: 160 })
        .withMessage('Tên phải ít hơn 160 kí tự'),
    ];
  },

  validateUpdateCategory: () => {
    return that.validateAddCategory;
  },
  validateGetCategory: () => {
    return [
      query('exclude')
        .if((value) => value)
        .isMongoId()
        .withMessage('exclude không đúng định dạng'),
    ];
  },

  validateGetProduct: () => {
    return [
      query('page')
        .if((value) => value !== undefined)
        .isInt()
        .withMessage('page không đúng định dạng'),
      query('limit')
        .if((value) => value !== undefined)
        .isInt()
        .withMessage('limit không đúng định dạng'),
      query('category')
        .if((value) => value !== undefined)
        .isMongoId()
        .withMessage('category không đúng định dạng'),
      query('exclude')
        .if((value) => value !== undefined)
        .isMongoId()
        .withMessage('exclude không đúng định dạng'),
    ];
  },

  validateGetAllProducts: () => {
    return [
      query('category')
        .if((value) => value !== undefined)
        .isMongoId()
        .withMessage('category không đúng định dạng'),
    ];
  },

  validateGetPage: () => {
    return [
      query('limit').isInt().withMessage('limit không đúng định dạng'),
      query('category')
        .if((value) => value !== undefined)
        .isMongoId()
        .withMessage('category không đúng định dạng'),
    ];
  },

  validateAddProduct: () => {
    return [
      body('name')
        .exists({ checkFalsy: true })
        .withMessage('Tiêu đề không được để trống')
        .isLength({ max: 160 })
        .withMessage('Tiêu đề  phải ít hơn 160 kí tự'),
      body('image')
        .exists({ checkFalsy: true })
        .withMessage('image không được để trống')
        .isLength({ max: 1000 })
        .withMessage('image  phải ít hơn 1000 kí tự'),
      body('images')
        .if((value) => value !== undefined)
        .isArray()
        .withMessage('images phải dạng string[]'),
      body('category')
        .exists({ checkFalsy: true })
        .withMessage('category không được để trống')
        .isMongoId()
        .withMessage(`category phải là id`),
      body('price')
        .if((value) => value !== undefined)
        .isNumeric()
        .withMessage('price phải ở định dạng number'),
      body('price_before_discount')
        .if((value) => value !== undefined)
        .isNumeric()
        .withMessage('price_before_discount phải ở định dạng number'),
      body('quantity')
        .if((value) => value !== undefined)
        .isNumeric()
        .withMessage('quantity phải ở định dạng number'),
      body('view')
        .if((value) => value !== undefined)
        .isNumeric()
        .withMessage('view phải ở định dạng number'),
      body('sold')
        .if((value) => value !== undefined)
        .isNumeric()
        .withMessage('sold phải ở định dạng number'),
      body('rating')
        .if((value) => value !== undefined)
        .isNumeric()
        .withMessage('rating phải ở định dạng number'),
    ];
  },

  validateUpdateProduct: () => {
    return that.validateAddProduct();
  },

  validateBuyProduct: () => {
    return [
      body()
        .isArray()
        .withMessage('body phải là array')
        .custom((value) => {
          if (value.length === 0) {
            return false;
          }
          const isPassed = value.every((item) => {
            if (
              isMongoId(item.product_id) &&
              Number.isInteger(item.buy_count)
            ) {
              return true;
            }
            return false;
          });
          return isPassed;
        })
        .withMessage('body không đúng định dạng'),
    ];
  },

  validateAddToCard: () => {
    return [
      body('product_id')
        .exists({ checkFalsy: true })
        .withMessage('product_id không được để trống')
        .isMongoId()
        .withMessage('product_id không đúng định dạng'),
      body('buy_count')
        .exists({ checkFalsy: true })
        .withMessage('buy_count không được để trống')
        .custom((value) => {
          if (
            typeof value !== 'number' ||
            value < 1 ||
            !Number.isInteger(value)
          ) {
            return false;
          }
          return true;
        })
        .withMessage('buy_count phải là số nguyên lớn hơn 0'),
    ];
  },

  validateUpdatePurchase: () => {
    return that.validateAddToCard;
  },

  validateDeletePurchase: () => {
    return [
      body()
        .isArray()
        .withMessage('body phải là array')
        .custom((value) => {
          if (value.length === 0) {
            return false;
          }
          return value.every((id) => isMongoId(id));
        })
        .withMessage('body phải là array id'),
    ];
  },

  validateAddUser: () => {
    return [
      body('email')
        .isEmail()
        .withMessage('Email không đúng định dạng')
        .isLength({ min: 6, max: 160 })
        .withMessage('Email phải từ 6-160 kí tự'),
      body('name')
        .exists({ checkFalsy: true })
        .withMessage('Tên không được để trống')
        .isLength({ max: 160 })
        .withMessage('Tên phải ít hơn 160 kí tự'),
      body('password')
        .isLength({ min: 6, max: 160 })
        .withMessage('Mật khẩu phải từ 6-160 kí tự'),
      body('date_of_birth')
        .if((value) => value !== undefined)
        .isISO8601()
        .withMessage('Ngày sinh không đúng định dạng'),
      body('address')
        .if((value) => value !== undefined)
        .isLength({ max: 160 })
        .withMessage('Địa chỉ phải ít hơn 160 kí tự'),
      body('phone')
        .if((value) => value !== undefined)
        .isLength({ max: 20 })
        .withMessage('SDT không được lớn hơn 20 kí tự'),
      body('roles')
        .exists({ checkFalsy: true })
        .withMessage('Phân quyền không được để trống')
        .custom((value) => {
          if (!Array.isArray(value)) {
            return false;
          }
          if (value.some((item) => typeof item !== 'string')) {
            return false;
          }
          return true;
        })
        .withMessage('Role không đúng định dạng'),
      body('avatar')
        .if((value) => value !== undefined)
        .isString()
        .withMessage('avatar phải là string url')
        .isLength({ max: 1000 })
        .withMessage('URL avatar không được lớn hơn 1000 ký tự'),
    ];
  },

  validateUpdateUser: () => {
    return [
      body('name')
        .if((value) => value !== undefined)
        .exists({ checkFalsy: true })
        .withMessage('Tên không được để trống')
        .isLength({ max: 160 })
        .withMessage('Tên phải ít hơn 160 kí tự'),
      body('date_of_birth')
        .if((value) => value !== undefined)
        .isISO8601()
        .withMessage('Ngày sinh không đúng định dạng'),
      body('address')
        .if((value) => value !== undefined)
        .isLength({ max: 160 })
        .withMessage('Địa chỉ phải ít hơn 160 kí tự'),
      body('phone')
        .if((value) => value !== undefined)
        .isLength({ max: 20 })
        .withMessage('SDT phải ít hơn 20 kí tự'),
      body('roles')
        .if((value) => value !== undefined)
        .custom((value) => {
          if (!Array.isArray(value)) {
            return false;
          }
          if (value.some((item) => typeof item !== 'string')) {
            return false;
          }
          return true;
        })
        .withMessage('Role không đúng định dạng'),
      body('avatar')
        .if((value) => value !== undefined)
        .isString()
        .withMessage('avatar phải là string url')
        .isLength({ max: 1000 })
        .withMessage('URL avatar không được lớn hơn 1000 ký tự'),
      body('password')
        .if((value) => value !== undefined)
        .isLength({ min: 6, max: 160 })
        .withMessage('Mật khẩu phải từ 6-160 kí tự'),
      body('new_password')
        .if((value) => value !== undefined)
        .isLength({ min: 6, max: 160 })
        .withMessage('Mật khẩu mới phải từ 6-160 kí tự'),
    ];
  },

  validateUpdateMe: () => {
    return [
      body('name')
        .if((value) => value !== undefined)
        .isString()
        .withMessage('Tên phải ở định dạng string')
        .isLength({ max: 160 })
        .withMessage('Tên phải ít hơn 160 kí tự'),
      body('date_of_birth')
        .if((value) => value !== undefined)
        .isISO8601()
        .withMessage('Ngày sinh không đúng định dạng'),
      body('address')
        .if((value) => value !== undefined)
        .isString()
        .withMessage('Địa chỉ phải ở định dạng string')
        .isLength({ max: 160 })
        .withMessage('Địa chỉ phải ít hơn 160 kí tự'),
      body('phone')
        .if((value) => value !== undefined)
        .isString()
        .withMessage('SDT phải ở định dạng string')
        .isLength({ max: 20 })
        .withMessage('SDT phải ít hơn 20 kí tự'),
      body('avatar')
        .if((value) => value !== undefined)
        .isString()
        .withMessage('avatar phải là string url')
        .isLength({ max: 1000 })
        .withMessage('URL avatar không được lớn hơn 1000 ký tự'),
      body('password')
        .if((value) => value !== undefined)
        .isString()
        .withMessage('Mật khẩu phải ở định dạng string')
        .isLength({ min: 6, max: 160 })
        .withMessage('Mật khẩu phải từ 6-160 kí tự'),
      body('new_password')
        .if((value) => value !== undefined)
        .isString()
        .withMessage('Mật khẩu mới phải ở định dạng string')
        .isLength({ min: 6, max: 160 })
        .withMessage('Mật khẩu mới phải từ 6-160 kí tự'),
    ];
  },
});
