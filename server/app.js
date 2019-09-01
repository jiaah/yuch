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

// catch 404 and forward to error handler
app.use((req, res, next) =>
  // const err = new Error('Not Found');
  res.status(404).send({ message: `Route${req.url} Not found.` }),
);

// production error handler (no stacktraces leaked to user)
if (app.get('env') === 'production') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500).send({
      message: err.message,
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
