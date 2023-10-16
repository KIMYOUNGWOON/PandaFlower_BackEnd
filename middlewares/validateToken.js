const passport = require('passport');

module.exports = async (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    try {
      if (err) {
        throw new Error(err);
      }

      if (!user) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      req.user = user;
      console.log('회원 인증 완료');
      next();
    } catch (err) {
      res.status(401).json({ message: err.message });
    }
  })(req, res, next);
};
