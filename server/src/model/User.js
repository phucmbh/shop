const mongoose = require('mongoose');
const { ROLE } = require('../constants/role.enum');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;
const SALT = 10;

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, minlength: 5, maxlength: 160 },
    name: { type: String, maxlength: 160 },
    password: { type: String, required: true, minlength: 6, maxlength: 160 },
    date_of_birth: { type: Date, maxlength: 160 },
    address: { type: String, maxlength: 160 },
    phone: { type: String, maxlength: 20 },
    roles: { type: [String], required: true, default: [ROLE.USER] },
    avatar: { type: String, maxlength: 1000 },
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function (next) {
  // only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, SALT);
  next();
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('users', userSchema);
