const guestService = require('../services/guestService');

function getCartItem(req, res) {
  const cartItems = req.cookies.cart || [];
  res.json(cartItems);
}

function addToCart(req, res) {
  const { item, quantity } = req.body;
  // 현재 장바구니 쿠키를 가져오기 또는 초기화
  const currentCart = req.cookies.cart || [];
  // 새로운 아이템 추가
  currentCart.push({ item, quantity });
  // 장바구니 쿠키 설정
  res.cookie('cart', currentCart);
  res.json({ message: '장바구니에 상품을 추가했습니다.' });
}

function deleteCartItem(req, res) {
  const { item } = req.params;
  // 현재 장바구니 쿠키를 가져오기 또는 초기화
  const currentCart = req.cookies.cart || [];
  // 아이템 제거
  const updatedCart = currentCart.filter((el) => el.productId !== item);
  res.cookie('cart', updatedCart);
  res.json({ message: '장바구니 아이템을 제거했습니다.' });
}

async function getOrderByOrderNumber(req, res) {
  const { orderNumber } = req.params;
  try {
    const order = await guestService.getOrder(orderNumber);
    res.status(200).json(order);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

async function createOrder(req, res) {
  const { recipient, contact, shippingAddress, totalPrice, items } = req.body;
  const orderData = {
    deliveryStatus: '주문완료',
    recipient,
    contact,
    shippingAddress,
    totalPrice,
    items,
  };
  try {
    const newOrder = await guestService.createOrder(orderData);
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

async function editOrderInfo(req, res) {
  const { orderNumber } = req.params;
  const deliveryInfo = req.body;
  try {
    const updated = await guestService.editOrderInfo(orderNumber, deliveryInfo);
    res.status(200).json({ message: 'MODIFIED' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

async function deleteOrder(req, res) {
  const { orderNumber } = req.params;
  try {
    const deletedOrder = await guestService.deleteOrder(orderNumber);
    if (deletedOrder.deletedCount === 1) {
      res.status(200).json({ message: 'CANCELED_ORDER' });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

module.exports = {
  getCartItem,
  addToCart,
  deleteCartItem,
  getOrderByOrderNumber,
  createOrder,
  editOrderInfo,
  deleteOrder,
};
