const orderDao = require('../models/order/orderDao');

async function getAllOrder() {
  const allOrders = await orderDao.getAllOrder();
  return allOrders;
}

async function editDeliveryStatus(orderNumber, deliveryStatus) {
  const updatedOrder = await orderDao.editDeliveryStatus(
    orderNumber,
    deliveryStatus
  );
  return updatedOrder;
}

async function deleteOrderbyAdmin(orderNumber) {
  const allOrders = await orderDao.deleteOrderbyAdmin(orderNumber);
  return allOrders;
}

module.exports = {
  getAllOrder,
  editDeliveryStatus,
  deleteOrderbyAdmin,
};
