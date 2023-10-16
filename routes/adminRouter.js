const { Router } = require('express');
const validateAdmin = require('../middlewares/validateAdmin');
const adminController = require('../controllers/adminController');

const router = Router();

router.get('/orders', validateAdmin, adminController.getAllOrder);

router.patch('/orders', validateAdmin, adminController.editDeliveryStatus);

router.delete('/orders', validateAdmin, adminController.deleteOrderbyAdmin);

module.exports = router;
