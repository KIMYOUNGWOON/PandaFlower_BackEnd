const orderService = require('../services/orderService');

async function getOrderByUser(req, res) {
  const { _id } = req.user;
  try {
    const orders = await orderService.getOrder(_id);
    res.status(200).json(orders);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

async function createOrder(req, res) {
  const { _id } = req.user;
  const { recipient, contact, shippingAddress, totalPrice, items } = req.body;

  const orderData = {
    user: _id,
    deliveryStatus: '주문완료',
    recipient,
    contact,
    shippingAddress,
    totalPrice,
    items,
  };
  try {
    const newOrder = await orderService.createOrder(orderData);
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

async function editOrderInfo(req, res) {
  const { orderNumber } = req.params;
  const deliveryInfo = req.body;
  try {
    const updated = await orderService.editOrderInfo(orderNumber, deliveryInfo);
    res.status(200).json({ message: 'MODIFIED' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

async function deleteOrder(req, res) {
  const { orderNumber } = req.params;
  try {
    const deletedOrder = await orderService.deleteOrder(orderNumber);
    if (deletedOrder.deletedCount === 1) {
      res.status(200).json({ message: 'CANCELED_ORDER' });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

module.exports = {
  getOrderByUser,
  createOrder,
  editOrderInfo,
  deleteOrder,
};
