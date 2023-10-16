const passport = require('passport');
const userService = require('../services/userService');
const createToken = require('../utils/createToken');

async function signUp(req, res, next) {
  const { name, email, password, passwordConfirm, phoneNumber, address } =
    req.body;

  try {
    const createUser = await userService.signUp(
      name,
      email,
      password,
      passwordConfirm,
      phoneNumber,
      address
    );

    res.status(201).json(createUser);
  } catch (err) {
    next(err);
  }
}

async function login(req, res) {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    try {
      if (err) {
        throw new Error(err);
      }

      if (info) {
        throw new Error(info.message);
      }

      req.login(user, { session: false }, (loginError) => {
        if (loginError) {
          throw new Error(loginError);
        }

        const token = createToken(user);
        res.json({ accessToken: token });
      });
    } catch (err) {
      res.status(401).json({ message: err.message });
    }
  })(req, res);
}

async function getUserInfo(req, res) {
  const { userId } = req.user;
  try {
    const user = await userService.getUserInfo(userId);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
}

async function editUserInfo(req, res) {
  const { userId } = req.user;
  const updateData = req.body;

  try {
    const updatedUser = await userService.editUserInfo(userId, updateData);
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

async function deleteUser(req, res) {
  const { userId } = req.user;
  try {
    const result = await userService.deleteUser(userId);
    if (result === 1) {
      res.status(200).json({ message: 'SUCCESS_DELETE' });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

module.exports = {
  signUp,
  login,
  getUserInfo,
  editUserInfo,
  deleteUser,
};
