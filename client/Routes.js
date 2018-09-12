import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import { withRouter } from 'react-router';
/* --- Components --- */
import App from './src/app';
import Loader from './src/utils/loader';

const Home = Loader({
  loader: () =>
    import('./src/components/home/homeContainer' /* webpackChunkName: 'Home' */),
});

const Login = Loader({
  loader: () =>
    import('./src/components/auth/login' /* webpackChunkName: 'Login' */),
});

const NoMatch = Loader({
  loader: () =>
    import('./src/shared/noMatch' /* webpackChunkName: 'NoMatch' */),
});

const routes = props => (
  <div>
    <App history={props.history} />
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

export default withRouter(Routes);
