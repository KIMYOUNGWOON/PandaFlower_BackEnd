const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/user/user');

module.exports = () => {
  const passportConfig = {
    usernameField: 'email',
    passwordField: 'password',
    session: false,
  };

  passport.use(
    new LocalStrategy(passportConfig, async (email, password, done) => {
      const user = await User.findOne({ email });
      if (!user) {
        return done(null, false, { message: 'NON_EXISTENT_USER' });
      }
      if (user) {
        const compareResult = await bcrypt.compare(password, user.password);
        if (compareResult) {
          return done(null, user);
        } else {
          return done(null, false, { message: 'INCORRECT_PASSWORD' });
        }
      }
    })
  );
};
