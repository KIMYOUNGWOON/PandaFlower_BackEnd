const { Router } = require('express');
const userController = require('../controllers/userController');
const validateUser = require('../middlewares/validateUser');
const validateToken = require('../middlewares/validateToken');

const router = Router();

router.post('/signup', validateUser, userController.signUp);

router.post('/login', userController.login);

router.get('/my', validateToken, userController.getUserInfo);

router.patch('/my', validateToken, userController.editUserInfo);

router.delete('/my', validateToken, userController.deleteUser);

module.exports = router;
