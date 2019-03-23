const router = require('express').Router();

const passport = require('../auth/local');

router.use('/reserve', require('./reserve')());
router.use('/auth', require('./auth')());
router.use(
  '/user',
  passport.authenticate('jwt', { session: false }),
  require('./user')(),
);

module.exports = router;
