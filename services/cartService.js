const cartDao = require('../models/cart/cartDao');

async function getCartByUser(id) {
  const cartItems = await cartDao.getCartByUser(id);
  return cartItems;
}

async function addItemToCart(addData) {
  const added = await cartDao.addItemToCart(addData);
  return added;
}

async function deleteCartItem(id, items) {
  const deleted = await cartDao.deleteCartItem(id, items);
  return deleted;
}

module.exports = { getCartByUser, addItemToCart, deleteCartItem };
