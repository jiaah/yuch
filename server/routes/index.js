const router = require('express').Router();
require('dotenv').config();

router.use('/reserve', require('./reserve')());
router.use('/auth', require('./auth')());

module.exports = router;
