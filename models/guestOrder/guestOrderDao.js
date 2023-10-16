const GuestOrder = require('./guestOrder.js');

async function getOrderByOrderNumber(orderNumber) {
  const order = await GuestOrder.findOne({ orderNumber });

  if (!order) {
    throw new Error('ORDER_HISTORY_EMPTY');
  }
  return order;
}

async function createOrder(orderData) {
  const newOrder = await GuestOrder.create(orderData);

  if (!newOrder) {
    throw new Error('ORDER_FAILED');
  }

  return newOrder;
}

async function editOrderInfo(orderNumber, deliveryInfo) {
  const filter = { orderNumber };
  const update = deliveryInfo;
  const updated = await GuestOrder.updateOne(filter, update);

  if (updated.modifiedCount === 0) {
    throw new Error('NOTHING_HAS_BEEN_MODIFIED');
  }

  return updated;
}

async function deleteOrder(orderNumber) {
  const order = await GuestOrder.findOne({ orderNumber });

  if (order && order.deliveryStatus !== '주문완료') {
    throw new Error('UNABLE_CANCEL_ORDER');
  }

  const deletedOrder = await GuestOrder.deleteOne({ orderNumber });

  if (deletedOrder.deletedCount === 0) {
    throw new Error('ORDER_CANCEL_FAILED');
  }

  return deletedOrder;
}

module.exports = {
  getOrderByOrderNumber,
  createOrder,
  editOrderInfo,
  deleteOrder,
};
