const mongoose = require('mongoose');
const { model, Schema } = require('mongoose');
const uuid = require('uuid');

const guestOrderSchema = new Schema(
  {
    orderNumber: {
      type: String,
      default: () => {
        return uuid.v4();
      },
      index: true,
      unique: true,
      required: true,
    },
    deliveryStatus: {
      type: String,
      enum: ['주문완료', '상품준비중', '배송시작', '배송완료'],
      required: true,
    },
    recipient: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      required: true,
    },
    shippingAddress: {
      type: String,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    items: [
      {
        item: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Item',
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const GuestOrder = model('GuestOrder', guestOrderSchema);

module.exports = GuestOrder;
