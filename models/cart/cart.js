const mongoose = require('mongoose');
const { Schema, model } = require('mongoose');

const cartSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const Cart = model('Cart', cartSchema);

module.exports = Cart;
