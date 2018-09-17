const api = require('express').Router();
require('dotenv').config();

api.use('/reserve', require('./reserve.js'));

api.use((req, res, next) => {
  const err = new Error('API Route not found!');
  err.status = 404;
  next(err);
});

module.exports = api;
