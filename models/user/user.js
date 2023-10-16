const { model, Schema } = require('mongoose');
const { generate } = require('shortid');

const shortId = {
  type: String,
  default: () => {
    return generate();
  },
  required: true,
  index: true,
  unique: true,
};

const userSchema = new Schema(
  {
    userId: shortId,
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    agreement: {
      type: Boolean,
      default: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = model('User', userSchema);

module.exports = User;
