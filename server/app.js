require('dotenv').config();
const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const bodyParser = require('body-parser');
const { Model } = require('objection');
const knex = require('./database');
const routes = require('./routes');

// Bind all Models to a knex instance.
Model.knex(knex);

const app = express();

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

// production error handler (no stacktraces leaked to user)
if (app.get('env') === 'production') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500).send({
      message: err,
      error: {},
    });
  });
}
// development error handler (will print stacktrace)
else {
  app.use((err, req, res, next) => {
    res.status(err.status || 500).send({
      message: err.message,
      error: err.stack,
    });
  });
}

module.exports = app;
