const guestOrderDao = require('../models/guestOrder/guestOrderDao');

async function getOrderByOrderNumber(orderNumber) {
  const order = await guestOrderDao.getOrderByOrderNumber(orderNumber);
  return order;
}

async function createOrder(orderData) {
  const newOrder = await guestOrderDao.createOrder(orderData);
  return newOrder;
}

async function editOrderInfo(orderNumber, deliveryInfo) {
  const updated = await guestOrderDao.editOrderInfo(orderNumber, deliveryInfo);
  return updated;
}

async function deleteOrder(orderNumber) {
  const deletedOrder = await guestOrderDao.deleteOrder(orderNumber);
  return deletedOrder;
}

module.exports = {
  getOrderByOrderNumber,
  createOrder,
  editOrderInfo,
  deleteOrder,
};
