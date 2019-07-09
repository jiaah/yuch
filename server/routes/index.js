const router = require('express').Router();

router.use('/reserve', require('./reserve')());
router.use('/auth', require('./auth')());

router.use('/admin', require('./admin')());
router.use('/user', require('./user')());

module.exports = router;
