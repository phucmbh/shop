const User = require('../model/User');
const { omitBy, omit } = require('lodash');
const { ErrorHandler, responseSuccess } = require('../utils/response');
const { hashValue } = require('../utils/crypt');
const { generateAccessToken } = require('../middleware/jwt');
const AccessToken = require('../model/AccessToken');
const { ROLE, STATUS } = require('../constants');

const { JWT_EXPIRE } = process.env;

var that = (module.exports = {
  register: async (req, res) => {
    const { email, password } = req.body;
    const userInDB = await User.findOne({ email: email }).exec();
    if (!userInDB) {
      const userAdd = (
        await new User({
          email,
          password,
        }).save()
      ).toObject();

      const payloadJWT = {
        email,
        id: userAdd._id,
        roles: [ROLE.USER],
        created_at: new Date().toISOString(),
      };
      const access_token = generateAccessToken(payloadJWT);
      await new AccessToken({
        user_id: userAdd._id,
        token: access_token,
      }).save();
      const response = {
        message: 'Đăng ký thành công',
        data: {
          access_token: 'Bearer ' + access_token,
          expires: JWT_EXPIRE,
          user: omit(userAdd, ['password']),
        },
      };
      return responseSuccess(res, response);
    }
    throw new ErrorHandler(STATUS.UNPROCESSABLE_ENTITY, {
      email: 'Email đã tồn tại',
    });
  },

  login: async (req, res) => {
    const { email, password } = req.body;
    const userInDB = await User.findOne({ email: email });
    if (!userInDB) {
      throw new ErrorHandler(STATUS.UNPROCESSABLE_ENTITY, {
        password: 'Email hoặc password không đúng',
      });
    } else {
      const match = await userInDB.comparePassword(password);
      if (!match) {
        throw new ErrorHandler(STATUS.UNPROCESSABLE_ENTITY, {
          password: 'Email hoặc password không đúng',
        });
      }
      let payloadJWT = {
        _id: userInDB._id,
        email: userInDB.email,
        roles: userInDB.roles,
        created_at: new Date().toISOString(),
      };

      const access_token = generateAccessToken(payloadJWT);

      await new AccessToken({
        user_id: userInDB._id,
        token: access_token,
      }).save();
      const response = {
        message: 'Đăng nhập thành công',
        data: {
          access_token: 'Bearer ' + access_token,
          expires: JWT_EXPIRE,
          user: omit(userInDB, ['password']),
        },
      };
      return responseSuccess(res, response);
    }
  },

  logout: async (req, res) => {
    const access_token = req.headers.authorization?.replace('Bearer ', '');
    await AccessToken.findOneAndDelete({
      token: access_token,
    }).exec();
    return responseSuccess(res, { message: 'Đăng xuất thành công' });
  },

  addUser: async (req, res) => {
    const form = req.body;
    const {
      email,
      password,
      address,
      date_of_birth,
      name,
      phone,
      roles,
      avatar,
    } = form;
    const userInDB = await User.findOne({ email: email }).exec();
    if (!userInDB) {
      const user = {
        email,
        password,
        roles,
        address,
        date_of_birth,
        name,
        phone,
        avatar,
      };
      Object.keys(user).forEach(
        (key) => user[key] === undefined && delete user[key]
      );
      const userAdd = await new User(user).save();
      const response = {
        message: 'Tạo người dùng thành công',
        data: userAdd.toObject({
          transform: (doc, ret, option) => {
            delete ret.password;
            delete ret.__v;
            return ret;
          },
        }),
      };
      return responseSuccess(res, response);
    }
    throw new ErrorHandler(422, { email: 'Email đã tồn tại' });
  },

  getUsers: async (req, res) => {
    const usersDB = await User.find({}).select({ password: 0, __v: 0 }).lean();
    const response = {
      message: 'Lấy người dùng thành công',
      data: usersDB,
    };
    return responseSuccess(res, response);
  },

  getDetailMySelf: async (req, res) => {
    const userDB = await User.findById(req.jwtDecoded.id)
      .select({ password: 0, __v: 0 })
      .lean();
    if (userDB) {
      const response = {
        message: 'Lấy người dùng thành công',
        data: userDB,
      };
      return responseSuccess(res, response);
    } else {
      throw new ErrorHandler(STATUS.UNAUTHORIZED, 'Không tìm thấy người dùng');
    }
  },

  getUser: async (req, res) => {
    const userDB = await User.findById(req.params.user_id)
      .select({ password: 0, __v: 0 })
      .lean();
    if (userDB) {
      const response = {
        message: 'Lấy người dùng thành công',
        data: userDB,
      };
      return responseSuccess(res, response);
    } else {
      throw new ErrorHandler(STATUS.BAD_REQUEST, 'Không tìm thấy người dùng');
    }
  },

  updateUser: async (req, res) => {
    const form = req.body;
    const { password, address, date_of_birth, name, phone, roles, avatar } =
      form;
    const user = omitBy(
      {
        password,
        address,
        date_of_birth,
        name,
        phone,
        roles,
        avatar,
      },
      (value) => value === undefined || value === ''
    );
    const userDB = await User.findByIdAndUpdate(req.params.user_id, user, {
      new: true,
    })
      .select({ password: 0, __v: 0 })
      .lean();
    if (userDB) {
      const response = {
        message: 'Cập nhật người dùng thành công',
        data: userDB,
      };
      return responseSuccess(res, response);
    } else {
      throw new ErrorHandler(STATUS.BAD_REQUEST, 'Không tìm thấy người dùng');
    }
  },

  updateMe: async (req, res) => {
    const form = req.body;
    const {
      email,
      password,
      new_password,
      address,
      date_of_birth,
      name,
      phone,
      avatar,
    } = form;
    const user = omitBy(
      {
        email,
        password,
        address,
        date_of_birth,
        name,
        phone,
        avatar,
      },
      (value) => value === undefined || value === ''
    );
    const userDB = await User.findById(req.jwtDecoded.id).lean();
    if (user.password) {
      const hash_password = hashValue(password);
      if (hash_password === userDB.password) {
        Object.assign(user, { password: hashValue(new_password) });
      } else {
        throw new ErrorHandler(STATUS.UNPROCESSABLE_ENTITY, {
          password: 'Password không đúng',
        });
      }
    }
    const updatedUserDB = await User.findByIdAndUpdate(
      req.jwtDecoded.id,
      user,
      { new: true }
    )
      .select({ password: 0, __v: 0 })
      .lean();
    const response = {
      message: 'Cập nhật thông tin thành công',
      data: updatedUserDB,
    };
    return responseSuccess(res, response);
  },

  deleteUser: async (req, res) => {
    const user_id = req.params.user_id;
    const userDB = await User.findByIdAndDelete(user_id).lean();
    if (userDB) {
      return responseSuccess(res, { message: 'Xóa thành công' });
    } else {
      throw new ErrorHandler(STATUS.BAD_REQUEST, 'Không tìm thấy người dùng');
    }
  },
});
