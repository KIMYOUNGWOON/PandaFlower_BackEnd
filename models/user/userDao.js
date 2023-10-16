const User = require('./user');
const makeHash = require('../../utils/makeHash');

async function getUser(userId) {
  const user = await User.findOne({ userId });

  if (!user) {
    throw new Error('USER_NOT_FOUND');
  }

  return user;
}

async function createUser(name, email, password, phoneNumber, address) {
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Error('REGISTERED_USER');
  }

  const hashedPassword = await makeHash(password);

  const createUser = await User.create({
    name,
    email,
    password: hashedPassword,
    phoneNumber,
    address,
  });

  return createUser;
}

async function editUser(userId, updateData) {
  const updatedUser = await User.findOneAndUpdate(
    { userId },
    { $set: updateData },
    { new: true }
  );

  if (!updatedUser) {
    throw new Error('UPDATE_FAILED');
  }

  return updatedUser;
}

async function deleteUser(userId) {
  const result = await User.deleteOne({ userId });

  if (result.deletedCount === 0) {
    throw new Error('DELETE_FAILED');
  }

  return result.deletedCount;
}

module.exports = { getUser, createUser, editUser, deleteUser };
