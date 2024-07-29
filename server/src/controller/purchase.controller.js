const Product = require('../model/Product');
const Purchase = require('../model/Purchase');
const { ErrorHandler, responseSuccess } = require('../utils/response');
const { handleImageProduct } = require('./product.controller');
const { cloneDeep } = require('lodash');
const { STATUS, STATUS_PURCHASE } = require('../constants');

var that = (module.exports = {
  addToCart: async (req, res) => {
    const { product_id, buy_count } = req.body;
    const product = await Product.findById(product_id).lean();
    if (product) {
      if (buy_count > product.quantity) {
        throw new ErrorHandler(
          STATUS.NOT_ACCEPTABLE,
          'Số lượng vượt quá số lượng sản phẩm'
        );
      }
      const purchaseInDb = await Purchase.findOne({
        user: req.jwtDecoded.id,
        status: STATUS_PURCHASE.IN_CART,
        product: {
          _id: product_id,
        },
      }).populate({
        path: 'product',
        populate: {
          path: 'category',
        },
      });
      let data;
      if (purchaseInDb) {
        data = await Purchase.findOneAndUpdate(
          {
            user: req.jwtDecoded.id,
            status: STATUS_PURCHASE.IN_CART,
            product: {
              _id: product_id,
            },
          },
          {
            buy_count: purchaseInDb.buy_count + buy_count,
          },
          {
            new: true,
          }
        )
          .populate({
            path: 'product',
            populate: {
              path: 'category',
            },
          })
          .lean();
      } else {
        const purchase = {
          user: req.jwtDecoded.id,
          product: product._id,
          buy_count: buy_count,
          price: product.price,
          price_before_discount: product.price_before_discount,
          status: STATUS_PURCHASE.IN_CART,
        };
        const addedPurchase = await new Purchase(purchase).save();
        data = await Purchase.findById(addedPurchase._id).populate({
          path: 'product',
          populate: {
            path: 'category',
          },
        });
      }
      const response = {
        message: 'Thêm sản phẩm vào giỏ hàng thành công',
        data,
      };
      return responseSuccess(res, response);
    } else {
      throw new ErrorHandler(STATUS.NOT_FOUND, 'Không tìm thấy sản phẩm');
    }
  },

  updatePurchase: async (req, res) => {
    const { product_id, buy_count } = req.body;
    const purchaseInDb = await Purchase.findOne({
      user: req.jwtDecoded.id,
      status: STATUS_PURCHASE.IN_CART,
      product: {
        _id: product_id,
      },
    })
      .populate({
        path: 'product',
        populate: {
          path: 'category',
        },
      })
      .lean();
    if (purchaseInDb) {
      if (buy_count > purchaseInDb.product.quantity) {
        throw new ErrorHandler(
          STATUS.NOT_ACCEPTABLE,
          'Số lượng vượt quá số lượng sản phẩm'
        );
      }
      const data = await Purchase.findOneAndUpdate(
        {
          user: req.jwtDecoded.id,
          status: STATUS_PURCHASE.IN_CART,
          product: {
            _id: product_id,
          },
        },
        {
          buy_count,
        },
        {
          new: true,
        }
      )
        .populate({
          path: 'product',
          populate: {
            path: 'category',
          },
        })
        .lean();
      const response = {
        message: 'Cập nhật đơn thành công',
        data,
      };
      return responseSuccess(res, response);
    } else {
      throw new ErrorHandler(STATUS.NOT_FOUND, 'Không tìm thấy đơn');
    }
  },

  buyProducts: async (req, res) => {
    const purchases = [];
    for (const item of req.body) {
      const product = await Product.findById(item.product_id).lean();
      if (product) {
        if (item.buy_count > product.quantity) {
          throw new ErrorHandler(
            STATUS.NOT_ACCEPTABLE,
            'Số lượng mua vượt quá số lượng sản phẩm'
          );
        } else {
          let data = await Purchase.findOneAndUpdate(
            {
              user: req.jwtDecoded.id,
              status: STATUS_PURCHASE.IN_CART,
              product: {
                _id: item.product_id,
              },
            },
            {
              buy_count: item.buy_count,
              status: STATUS_PURCHASE.WAIT_FOR_CONFIRMATION,
            },
            {
              new: true,
            }
          )
            .populate({
              path: 'product',
              populate: {
                path: 'category',
              },
            })
            .lean();
          if (!data) {
            const purchase = {
              user: req.jwtDecoded.id,
              product: item.product_id,
              buy_count: item.buy_count,
              price: product.price,
              price_before_discount: product.price_before_discount,
              status: STATUS_PURCHASE.WAIT_FOR_CONFIRMATION,
            };
            const addedPurchase = await new Purchase(purchase).save();
            data = await Purchase.findById(addedPurchase._id).populate({
              path: 'product',
              populate: {
                path: 'category',
              },
            });
          }
          purchases.push(data);
        }
      } else {
        throw new ErrorHandler(STATUS.NOT_FOUND, 'Không tìm thấy sản phẩm');
      }
    }
    const response = {
      message: 'Mua thành công',
      data: purchases,
    };
    return responseSuccess(res, response);
  },

  getPurchases: async (req, res) => {
    const { status = STATUS_PURCHASE.ALL } = req.query;
    const user_id = req.jwtDecoded.id;
    let condition = {
      user: user_id,
      status: {
        $ne: STATUS_PURCHASE.IN_CART,
      },
    };
    if (Number(status) !== STATUS_PURCHASE.ALL) {
      condition.status = status;
    }

    let purchases = await Purchase.find(condition)
      .populate({
        path: 'product',
        populate: {
          path: 'category',
        },
      })
      .sort({
        createdAt: -1,
      })
      .lean();
    purchases = purchases.map((purchase) => {
      purchase.product = handleImageProduct(cloneDeep(purchase.product));
      return purchase;
    });
    const response = {
      message: 'Lấy đơn mua thành công',
      data: purchases,
    };
    return responseSuccess(res, response);
  },

  deletePurchases: async (req, res) => {
    const purchase_ids = req.body;k
    const user_id = req.jwtDecoded.id;
    const deletedData = await Purchase.delet({
      user: user_id,
      status: STATUS_PURCHASE.IN_CART,
      _id: { $in: purchase_ids },
    });
    return responseSuccess(res, {
      message: `Xoá ${deletedData.deletedCount} đơn thành công`,
      data: { deleted_count: deletedData.deletedCount },
    });
  },
});
