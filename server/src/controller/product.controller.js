const { Success, ErrorHandler } = require('../utils/response');
const  Product  = require('../model/Product');
const { STATUS, ORDER, SORT_BY } = require('../constants');
const mongoose = require('mongoose');
const { isAdmin } = require('../utils/validate');
const { uploadFile, uploadManyFile } = require('../utils/upload');
const { HOST } = require('../utils/helper');
const { FOLDERS, FOLDER_UPLOAD, ROUTE_IMAGE } = require('../constants/config');
const fs = require('fs');
const { omitBy } = require('lodash');

var that = (module.exports = {
  handleImageProduct: (product) => {
    if (product.image !== undefined && product.image !== '') {
      product.image = HOST + `/${ROUTE_IMAGE}/` + product.image;
    }
    if (product.images !== undefined && product.images.length !== 0) {
      product.images = product.images.map((image) => {
        return image !== '' ? HOST + `/${ROUTE_IMAGE}/` + image : '';
      });
    }
    return product;
  },

  removeImageProduct: (image) => {
    if (image !== undefined && image !== '') {
      fs.unlink(`${FOLDER_UPLOAD}/${FOLDERS.PRODUCT}/${image}`, (err) => {
        if (err) console.error(err);
      });
    }
  },

  removeManyImageProduct: (images) => {
    if (images !== undefined && images.length > 0) {
      images.forEach((image) => {
        removeImageProduct(image);
      });
    }
  },

  addProduct: async (req, res) => {
    const form = req.body;
    const {
      name,
      description,
      category,
      image,
      images,
      price,
      rating,
      price_before_discount,
      quantity,
      sold,
      view,
    } = form;
    const product = {
      name,
      description,
      category,
      image,
      images,
      price,
      rating,
      price_before_discount,
      quantity,
      sold,
      view,
    };
    const productAdd = await new Product(product).save();
    cons = {
      message: 'Tạo sản phẩm thành công',
      data: productAdd.toObject({
        transform: (doc, ret, option) => {
          delete ret.__v;
          return handleImageProduct(ret);
        },
      }),
    };
    returSuccess(res);
  },

  getProducts: async (req, res) => {
    let {
      page = 1,
      limit = 30,
      category,
      exclude,
      sort_by,
      order,
      rating_filter,
      price_max,
      price_min,
      name,
    } = req.query;

    page = Number(page);
    limit = Number(limit);
    let condition = {};
    if (category) {
      condition.category = category;
    }
    if (exclude) {
      condition._id = { $ne: exclude };
    }
    if (rating_filter) {
      condition.rating = { $gte: rating_filter };
    }
    if (price_max) {
      condition.price = {
        $lte: price_max,
      };
    }
    if (price_min) {
      condition.price = condition.price
        ? { ...condition.price, $gte: price_min }
        : { $gte: price_min };
    }
    if (!ORDER.includes(order)) {
      order = ORDER[0];
    }
    if (!SORT_BY.includes(sort_by)) {
      sort_by = SORT_BY[0];
    }
    if (name) {
      condition.name = {
        $regex: name,
        $options: 'i',
      };
    }
    let [products, totalProducts] = await Promise.all([
      Product.find(condition)
        .populate({
          path: 'category',
        })
        .sort({ [sort_by]: order === 'desc' ? -1 : 1 })
        .skip(page * limit - limit)
        .limit(limit)
        .select({ __v: 0, description: 0 })
        .lean(),
      Product.find(condition).countDocuments().lean(),
    ]);
    products = products.map((product) => handleImageProduct(product));
    const page_size = Math.ceil(totalProducts / limit) || 1;
    cons = {
      message: 'Lấy các sản phẩm thành công',
      data: {
        products,
        pagination: {
          page,
          limit,
          page_size,
        },
      },
    };
    returSuccess(res);
  },

  getAllProducts: async (req, res) => {
    let { category } = req.query;
    let condition = {};
    if (category) {
      condition = { category: category };
    }
    let products = await Product.find(condition)
      .populate({ path: 'category' })
      .sort({ createdAt: -1 })
      .select({ __v: 0, description: 0 })
      .lean();
    products = products.map((product) => handleImageProduct(product));
    cons = {
      message: 'Lấy tất cả sản phẩm thành công',
      data: products,
    };
    returSuccess(res);
  },
  getProduct: async (req, res) => {
    let condition = { _id: req.params.product_id };
    const productDB = await Product.findOneAndUpdate(
      condition,
      { $inc: { view: 1 } },
      { new: true }
    )
      .populate('category')
      .select({ __v: 0 })
      .lean();
    if (productDB) {
      cons = {
        message: 'Lấy sản phẩm thành công',
        data: handleImageProduct(productDB),
      };
      returSuccess(res);
    } else {
      throw new ErrorHandler(STATUS.NOT_FOUND, 'Không tìm thấy sản phẩm');
    }
  },
  updateProduct: async (req, res) => {
    const form = req.body;
    const {
      name,
      description,
      category,
      image,
      rating,
      price,
      images,
      price_before_discount,
      quantity,
      sold,
      view,
    } = form;
    const product = omitBy(
      {
        name,
        description,
        category,
        image,
        rating,
        price,
        images,
        price_before_discount,
        quantity,
        sold,
        view,
      },
      (value) => value === undefined || value === ''
    );
    const productDB = await Product.findByIdAndUpdate(
      req.params.product_id,
      product,
      {
        new: true,
      }
    )
      .select({ __v: 0 })
      .lean();
    if (productDB) {
      cons = {
        message: 'Cập nhật sản phẩm thành công',
        data: handleImageProduct(productDB),
      };
      returSuccess(res);
    } else {
      throw new ErrorHandler(STATUS.NOT_FOUND, 'Không tìm thấy sản phẩm');
    }
  },
  deleteProduct: async (req, res) => {
    const product_id = req.params.product_id;
    const productDB = await Product.findByIdAndDelete(product_id).lean();
    if (productDB) {
      removeImageProduct(productDB.image);
      removeManyImageProduct(productDB.images);
      returSuccess(res, { message: 'Xóa thành công' });
    } else {
      throw new ErrorHandler(STATUS.NOT_FOUND, 'Không tìm thấy sản phẩm');
    }
  },

  deleteManyProducts: async (req, res) => {
    const list_id = req.body.list_id.map((id) => mongoose.Types.ObjectId(id));
    const productDB = await Product.find({
      _id: { $in: list_id },
    }).lean();
    const deletedData = await Product.deleteMany({
      _id: { $in: list_id },
    }).lean();
    productDB.forEach((product) => {
      removeImageProduct(product.image);
      removeManyImageProduct(product.images);
    });
    if (productDB.length > 0) {
      returSuccess(res, {
        message: `Xóa ${deletedData.deletedCount} sản phẩm thành công`,
        data: { deleted_count: deletedData.deletedCount },
      });
    } else {
      throw new ErrorHandler(STATUS.NOT_FOUND, 'Không tìm thấy sản phẩm');
    }
  },

  searchProduct: async (req, res) => {
    let { searchText } = req.query;
    searchText = decodeURI(searchText);
    let condition = { $text: { $search: `\"${searchText}\"` } };
    if (!isAdmin(req)) {
      condition = Object.assign(condition, { visible: true });
    }
    let products = await Product.find(condition)
      .populate('category')
      .sort({ createdAt: -1 })
      .select({ __v: 0, description: 0 })
      .lean();
    products = products.map((product) => handleImageProduct(product));
    cons = {
      message: 'Tìm các sản phẩm thành công',
      data: products,
    };
    returSuccess(res);
  },

  uploadProductImage: async (req, res) => {
    const path = await uploadFile(req, FOLDERS.PRODUCT);
    cons = {
      message: 'Upload ảnh thành công',
      data: path,
    };
    returSuccess(res);
  },

  uploadManyProductImages: async (req, res) => {
    const paths = await uploadManyFile(req, FOLDERS.PRODUCT);
    cons = {
      message: 'Upload các ảnh thành công',
      data: paths,
    };
    returSuccess(res);
  },
});
