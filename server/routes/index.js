const router = require('express').Router();
const reserveRoute = require('./reserve');
const authRoute = require('./auth');

router.use('/reserve', reserveRoute());
router.use('/auth', authRoute());

module.exports = router;
