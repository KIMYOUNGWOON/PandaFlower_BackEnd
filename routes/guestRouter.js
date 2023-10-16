const { Router } = require('express');
const guestController = require('../controllers/guestController');

const router = Router();

router.get('/cart', guestController.getCartItem);

router.post('/cart', guestController.addToCart);

router.delete('/cart', guestController.deleteCartItem);

router.get('/order', guestController.createOrder);

router.post('/order', guestController.createOrder);

router.patch('/order/:orderNumber', guestController.editOrderInfo);

router.delete('/order/:orderNumber', guestController.deleteOrder);

module.exports = router;
