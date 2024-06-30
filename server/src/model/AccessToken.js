const mongoose = require('mongoose');

const accessTokenSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'users',
    },
    token: { type: String, unique: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('access_tokens', accessTokenSchema);
