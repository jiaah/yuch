const router = require('express').Router();
const dataLoader = require('../lib/middleware');

router.use('/reserve', require('./reserve')());
router.use('/auth', require('./auth')(dataLoader));

module.exports = router;
