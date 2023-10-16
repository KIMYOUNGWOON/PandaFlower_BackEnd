const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const cartService = require('../services/cartService');
const cartDao = require('../models/cart/cartDao');
const Cart = require('../models/cart/cart');

async function getCartByUser(req, res) {
  const { _id } = req.user;
  try {
    const cartItems = await cartService.getCartByUser(_id);
    res.status(200).json(cartItems);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

async function addItemToCart(req, res) {
  const { _id } = req.user;
  const { item, quantity } = req.body;

  try {
    const cartItems = await cartDao.getCartByUser(_id);

    if (cartItems.length !== 0) {
      const checkCart = cartItems.some((cartItem) => {
        const objectId = new mongoose.Types.ObjectId(item);
        return cartItem.item._id.equals(objectId);
      });

      if (checkCart) {
        const update = { $inc: { quantity: quantity } };
        await Cart.findOneAndUpdate({ user: _id, item }, update);
        return res.status(201).json({ message: 'ADD_SUCCESS' });
      }
    }

    const addData = {
      user: _id,
      item,
      quantity,
    };

    const added = await cartService.addItemToCart(addData);
    res.status(201).json(added);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

async function editCartItem(req, res) {
  const { _id } = req.user;
  const items = req.body;
  try {
    const operations = items.map((item) => ({
      updateOne: {
        filter: { user: _id, item: item.item },
        update: { $set: { quantity: item.quantity } },
      },
    }));
    await Cart.bulkWrite(operations);
    res.status(200).json({ message: 'QUANTITY_CHANGE_SUCCESS' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

async function deleteCartItem(req, res) {
  const { _id } = req.user;
  const items = req.body;
  try {
    await cartService.deleteCartItem(_id, items);
    res.status(200).json({ message: 'DELETE_SUCCESS' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

module.exports = {
  getCartByUser,
  addItemToCart,
  editCartItem,
  deleteCartItem,
};
