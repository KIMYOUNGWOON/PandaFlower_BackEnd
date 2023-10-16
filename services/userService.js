const bcrypt = require('bcrypt');
const User = require('../models/user/user');
const makeHash = require('../utils/makeHash');
const userDao = require('../models/user/userDao');
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[@#$%^&+=!]).{8,}$/;
const phoneNumberRegex = /^010-\d{4}-\d{4}$/;

async function signUp(
  name,
  email,
  password,
  passwordConfirm,
  phoneNumber,
  address
) {
  if (!emailRegex.test(email)) {
    throw new Error('EMAIL_INVALID');
  }

  if (!passwordRegex.test(password)) {
    throw new Error('PASSWORD_INVALID');
  }

  if (!(password === passwordConfirm)) {
    throw new Error('PASSWORD_MISMATCH');
  }

  if (!phoneNumberRegex.test(phoneNumber)) {
    throw new Error('PHONE_NUMBER_INVALID');
  }

  const createUser = await userDao.createUser(
    name,
    email,
    password,
    phoneNumber,
    address
  );

  return createUser;
}

async function getUserInfo(userId) {
  const user = await userDao.getUser(userId);
  return user;
}

async function editUserInfo(userId, updateData) {
  const { password, passwordConfirm, address } = updateData;

  if (password === '') {
    const updatedUser = await userDao.editUser(userId, { address });
    return updatedUser;
  }

  const user = await User.findOne({ userId: userId });
  const compareResult = await bcrypt.compare(password, user.password);

  if (compareResult) {
    throw new Error('CURRENT_USE_PASSWORD');
  }

  if (password !== passwordConfirm) {
    throw new Error('INCORRECT_PASSWORD');
  }

  const hashedPassword = await makeHash(password);

  const data = address
    ? { password: hashedPassword, address }
    : { password: hashedPassword };

  const updatedUser = await userDao.editUser(userId, data);

  return updatedUser;
}

async function deleteUser(userId) {
  const user = await userDao.deleteUser(userId);
  return user;
}

module.exports = { signUp, getUserInfo, editUserInfo, deleteUser };
