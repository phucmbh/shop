const mongoose = require('mongoose');
const { STATUS_PURCHASE } = require('../constants/purchase');

const purchaseSchema =new mongoose.Schema(
  {
    user: { type: mongoose.SchemaTypes.ObjectId, ref: 'users' },
    product: { type: mongoose.SchemaTypes.ObjectId, ref: 'products' },
    buy_count: { type: Number, default: 0 },
    price: { type: Number, default: 0 },
    price_before_discount: { type: Number, default: 0 },
    status: { type: Number, default: STATUS_PURCHASE.WAIT_FOR_CONFIRMATION },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model('purchases', purchaseSchema);
