require('dotenv').config();
const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const bodyParser = require('body-parser');
const routes = require('./routes');

const app = express();

app.set('corsOptions', {
  origin: 'https://yu-chung.com',
  optionsSuccessStatus: 200,
});

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST', 'PATCH', 'DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
app.use(cors(app.get('corsOptions')));
app.use(logger('dev'));
// extract POST data from HTTP request
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

// routes
app.use('/api', routes);

module.exports = app;
