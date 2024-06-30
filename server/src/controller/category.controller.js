const { responseSuccess, ErrorHandler } = require('../utils/response');
const { STATUS } = require('../constants/status');
const Category = require('../model/Category');

var that = (module.exports = {
  addCategory: async (req, res) => {
    const name = req.body.name;
    const categoryAdd = await new Category({ name }).save();
    const response = {
      message: 'Tạo Category thành công',
      data: categoryAdd.toObject({
        transform: (doc, ret, option) => {
          delete ret.__v;
          return ret;
        },
      }),
    };

    return responseSuccess(res, response);
  },

  getCategories: async (req, res) => {
    const { exclude } = req.query;
    let condition = exclude ? { _id: { $ne: exclude } } : {};
    const categories = await Category.find(condition).select({ __v: 0 }).lean();
    const response = {
      message: 'Lấy categories thành công',
      data: categories,
    };
    return responseSuccess(res, response);
  },

  getCategory: async (req, res) => {
    const categoryDB = await Category.findById(req.params.category_id)
      .select({ __v: 0 })
      .lean();
    if (categoryDB) {
      const response = {
        message: 'Lấy category thành công',
        data: categoryDB,
      };
      return responseSuccess(res, response);
    } else {
      throw new ErrorHandler(STATUS.BA, 'Không tìm thấy Category');
    }
  },

  updateCategory: async (req, res) => {
    const { name } = req.body;
    const categoryDB = await Category.findByIdAndUpdate(
      req.params.category_id,
      { name },
      { new: true }
    )
      .select({ __v: 0 })
      .lean();
    if (categoryDB) {
      const response = {
        message: 'Cập nhật category thành công',
        data: categoryDB,
      };
      return responseSuccess(res, response);
    } else {
      throw new ErrorHandler(STATUS.BA, 'Không tìm thấy Category');
    }
  },

  deleteCategory: async (req, res) => {
    const category_id = req.params.category_id;
    const categoryDB = await Category.findByIdAndDelete(category_id).lean();
    if (categoryDB) {
      return responseSuccess(res, { message: 'Xóa thành công' });
    } else {
      throw new ErrorHandler(STATUS.BA, 'Không tìm thấy Category');
    }
  },
});
