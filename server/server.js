/* eslint no-console: 0 */
const express = require('express');
const path = require('path');
const webpack = require('webpack');
const cors = require('cors');
const devMiddleware = require('webpack-dev-middleware');
const hotMiddleware = require('webpack-hot-middleware');
const config = require('../webpack.dev');

const app = require('./app');

const isProd = process.env.NODE_ENV === 'production';
const DIST_DIR = path.join(__dirname, '../', 'public/dist');
const HTML_FILE = path.join(DIST_DIR, 'index.html');

const whitelist = ['https://yu-chung.com'];

const corsOptions = {
  origin(origin, callback) {
    const originIsWhitelisted = whitelist.indexOf(origin) !== -1;
    callback(null, originIsWhitelisted);
  },
  credentials: true,
};

app.use(cors(corsOptions));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST', 'PATCH', 'DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
  } else {
    res.header('Access-Control-Allow-Origin', 'https://yu-chung.com');
  }

  return next();
});

if (!isProd) {
  const compiler = webpack(config);

  app.use(
    devMiddleware(compiler, {
      hot: true,
      noInfo: true,
      publicPath: config.output.publicPath,
    }),
  );
  app.use(
    hotMiddleware(compiler, {
      log: console.log, // eslint-disable-line
      heartbeat: 10 * 1000,
    }),
  );

  app.get(/^\/(?!api\/)(?!assets\/)(?!.*\.json$).*/, (req, res, next) => {
    compiler.outputFileSystem.readFile(HTML_FILE, (err, result) => {
      if (err) {
        return next(err);
      }
      res.set('content-type', 'text/html');
      res.send(result);
      return res.end();
    });
  });
} else {
  app.use(express.static(DIST_DIR));

  app.get('*', cors(corsOptions), (req, res) => res.sendFile(HTML_FILE));

  app.get('/', cors(corsOptions), (req, res) => {
    res.redirect('https://yu-chung.com');
  });

  // catch 404 and forward to error handler
  app.use((req, res, next) =>
    // const err = new Error('Not Found');
    res.status(404).send({ message: `Route${req.url} Not found.` }),
  );
}

module.exports = app;
