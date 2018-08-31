import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import Loadable from 'react-loadable';
import App from './App';
import Home from './src/components/Home';

const Spinner = () =>
  import('./src/components/Spinner' /* webpackChunkName: 'Spinner' */);

const Loading = props => {
  if (props.error) {
    return <div> Routing Error!</div>;
  }
  Spinner();
  return null;
};

const User = Loadable({
  loader: () => import('./src/components/User'),
  /* webpackChunkName: 'User', webpackPrefetch: true */
  loading: Loading,
});

const NoMatch = Loadable({
  loader: () =>
    import('./src/components/NoMatch' /* webpackChunkName: 'NoMatch' */),
  loading: Loading,
});

const routes = () => (
  <div>
    <App />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/user" component={User} />
      <Route component={NoMatch} />
    </Switch>
  </div>
);

const Routes =
  !module.hot || process.env.NODE_ENV === 'production'
    ? routes
    : hot(module)(routes);

export default Routes;
