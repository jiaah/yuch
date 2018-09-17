/* eslint no-console: 0 */
import express from 'express';
import path from 'path';
import webpack from 'webpack';
import logger from 'morgan';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import devMiddleware from 'webpack-dev-middleware';
import hotMiddleware from 'webpack-hot-middleware';
// import expressStaticGzip from 'express-static-gzip');
import config from '../webpack.dev';

require('dotenv').config();

const app = express();

const isProd = process.env.NODE_ENV === 'production';

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
  app.get('*', (req, res) => res.sendFile(HTML_FILE));
  // app.use(
  //   expressStaticGzip(DIST_DIR, {
  //     enableBrotli: true,
  //     orderPreference: ['br'],
  //   }),
  // );
}

app.use('/api', require('./api'));

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
