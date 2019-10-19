const router = require('express').Router();

router.use('/mail', require('./mail')());
router.use('/auth', require('./auth')());
router.use('/admin', require('./admin')());
router.use('/user', require('./user')());
router.use('/catering', require('./catering')());
router.use('/special', require('./special')());
router.use('/resto', require('./resto')());
router.use('/invoice', require('./invoice')());
router.use('/revenue', require('./revenue')());
router.use('/partner', require('./partner')());

module.exports = router;
