const orderDao = require('../models/order/orderDao');

async function getOrder(id) {
  const orders = await orderDao.getOrder(id);
  return orders;
}

async function createOrder(orderData) {
  const newOrder = await orderDao.createOrder(orderData);
  return newOrder;
}

async function editOrderInfo(orderNumber, deliveryInfo) {
  const updated = await orderDao.editOrderInfo(orderNumber, deliveryInfo);
  return updated;
}

async function deleteOrder(orderNumber) {
  const deletedOrder = await orderDao.deleteOrder(orderNumber);
  return deletedOrder;
}

module.exports = {
  getOrder,
  createOrder,
  editOrderInfo,
  deleteOrder,
};
