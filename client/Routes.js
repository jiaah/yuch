import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import App from './src/app';
/* --- Components --- */
import Loader from './src/shared/loader';

const Home = Loader({
  loader: () => import('./src/components/Home' /* webpackChunkName: 'Home' */),
});

const Login = Loader({
  loader: () =>
    import('./src/components/login' /* webpackChunkName: 'Login' */),
});

const NoMatch = Loader({
  loader: () =>
    import('./src/shared/NoMatch' /* webpackChunkName: 'NoMatch' */),
});

const routes = () => (
  <div>
    <App />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route component={NoMatch} />
    </Switch>
  </div>
);

const Routes =
  !module.hot || process.env.NODE_ENV === 'production'
    ? routes
    : hot(module)(routes);

export default Routes;
