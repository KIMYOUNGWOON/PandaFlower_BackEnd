const Order = require('./order');

async function getAllOrder() {
  const orders = await Order.find({});

  if (orders.length === 0) {
    throw new Error('ORDER_HISTORY_EMPTY');
  }

  return orders;
}

async function getOrder(id) {
  const orders = await Order.find({ user: id }).populate('items.item');

  if (orders.length === 0) {
    throw new Error('ORDER_HISTORY_EMPTY');
  }
  return orders;
}

async function createOrder(orderData) {
  const newOrder = await Order.create(orderData);

  if (!newOrder) {
    throw new Error('ORDER_FAILED');
  }

  return newOrder;
}

async function editOrderInfo(orderNumber, deliveryInfo) {
  const filter = { orderNumber };
  const update = deliveryInfo;
  const updated = await Order.updateOne(filter, update);

  if (updated.modifiedCount === 0) {
    throw new Error('NOTHING_HAS_BEEN_MODIFIED');
  }

  return updated;
}

async function deleteOrder(orderNumber) {
  const order = await Order.findOne({ orderNumber });

  if (order && order.deliveryStatus !== '주문완료') {
    throw new Error('UNABLE_CANCEL_ORDER');
  }

  const deletedOrder = await Order.deleteOne({ orderNumber });

  if (deletedOrder.deletedCount === 0) {
    throw new Error('ORDER_CANCEL_FAILED');
  }

  return deletedOrder;
}

async function editDeliveryStatus(orderNumber, deliveryStatus) {
  const filter = { orderNumber };
  const update = {
    $set: {
      deliveryStatus,
    },
  };

  const updatedOrder = await Order.findOneAndUpdate(filter, update, {
    new: true,
  });

  if (!updatedOrder) {
    throw new Error('NOT_UPDATED');
  }
  return updatedOrder;
}

async function deleteOrderbyAdmin(orderNumber) {
  const deleted = await Order.deleteOne({ orderNumber });
  return deleted;
}

module.exports = {
  getAllOrder,
  getOrder,
  createOrder,
  editOrderInfo,
  deleteOrder,
  editDeliveryStatus,
  deleteOrderbyAdmin,
};
