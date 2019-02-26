/* eslint no-console: 0 */
const express = require('express');
const path = require('path');
const webpack = require('webpack');
const cors = require('cors');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const devMiddleware = require('webpack-dev-middleware');
const hotMiddleware = require('webpack-hot-middleware');
const config = require('../webpack.dev');

// Routes
const reserveRoute = require('./routes/reserve');
const authRoute = require('./routes/auth');

require('dotenv').config();

const app = express();

const isProd = process.env.NODE_ENV === 'production';
const corsOptions = {
  origin: 'https://yu-chung.com',
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.use(bodyParser.json());
app.use(cookieParser());

const DIST_DIR = path.join(__dirname, '../', 'public/dist');
const HTML_FILE = path.join(DIST_DIR, 'index.html');

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
}

app.use('/reserve', reserveRoute());
app.use('/auth', authRoute());

// error handlers
app.use((req, res) =>
  res.status(404).send({ message: `Route${req.url} Not found.` }),
);

if (app.get('env') === 'production') {
  app.use((err, req, res) => {
    console.error(err);
    res.status(err.status || 500).send({
      error: {},
    });
  });
} else {
  app.use((err, req, res) => {
    console.error(err);
    res.status(err.status || 500).send({
      error: err,
    });
  });
}

const PORT = process.env.PORT || 9080;
app.listen(PORT, () => {
  console.log(`Sever is listening on ${PORT} in ${process.env.NODE_ENV}`);
});
