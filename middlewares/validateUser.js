module.exports = (req, res, next) => {
  const { name, email, password, passwordConfirm, phoneNumber, address } =
    req.body;

  try {
    if (!name) {
      throw new Error('NAME_KEY_ERROR');
    }

    if (!email) {
      throw new Error('EMAIL_KEY_ERROR');
    }

    if (!password) {
      throw new Error('PASSWORD_KEY_ERROR');
    }

    if (!passwordConfirm) {
      throw new Error('PASSWORD_CONFIRM_KEY_ERROR');
    }

    if (!phoneNumber) {
      throw new Error('PHONE_NUMBER_KEY_ERROR');
    }

    if (!address) {
      throw new Error('ADDRESS_KEY_ERROR');
    }

    next();
  } catch (err) {
    next(err);
  }
};
