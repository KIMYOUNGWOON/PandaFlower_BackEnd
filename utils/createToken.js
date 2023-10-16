const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

function createToken(user) {
  const { userId, isAdmin } = user;

  const payload = {
    id: userId,
    auth: isAdmin,
  };

  const secretKey = process.env.JWT_SECRET_KEY;

  const options = {
    expiresIn: '2h',
  };

  const token = jwt.sign(payload, secretKey, options);

  return token;
}

module.exports = createToken;
