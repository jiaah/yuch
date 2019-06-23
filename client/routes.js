import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { hot, setConfig } from 'react-hot-loader';
import { withRouter } from 'react-router';
/* --- Components --- */
import App from './app';
import Loader from './src/shared/loader';

const Home = Loader({
  loader: () =>
    import('./src/components/home/homeContainer' /* webpackChunkName: 'Home' */),
});

const Login = Loader({
  loader: () =>
    import('./src/components/auth/loginContainer' /* webpackChunkName: 'Login' */),
});

const UserAccount = Loader({
  loader: () =>
    import('./src/components/auth/admin/userAccountContainer' /* webpackChunkName: 'UserAccountContainer' */),
});

const BankAccountContainer = Loader({
  loader: () =>
    import('./src/components/bankAccount/bankAccountContainer' /* webpackChunkName: 'BankAccountContainer' */),
});

const NoMatch = Loader({
  loader: () =>
    import('./src/components/noMatch' /* webpackChunkName: 'NoMatch' */),
});

const routes = props => (
  <div>
    <App history={props.history} />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/login" render={props => <Login {...props} />} />
      <Route path="/admin/account/clientlist" component={UserAccount} />
      <Route
        path="/admin/account/bankaccount"
        component={BankAccountContainer}
      />
      <Route component={NoMatch} />
    </Switch>
  </div>
);

// enable to use react-hot-loader with React Hooks
setConfig({
  // set this flag to support SFC if patch is not landed
  pureSFC: true,
});

const Routes =
  !module.hot || process.env.NODE_ENV === 'production'
    ? routes
    : hot(module)(routes);

export default withRouter(Routes);
