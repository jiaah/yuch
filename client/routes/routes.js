import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { hot, setConfig } from 'react-hot-loader';
import { withRouter } from 'react-router';
/* --- Components --- */
import App from '../app';
import Loader from '../src/shared/loader';
/* --- Routes --- */
import UserGuards from './userGuards';
import AdminGuards from './adminGuards';
import LoggedOutRoute from './loggedOutRoute';
import Home from '../src/components/home/homeContainer';

const Login = Loader({
  loader: () =>
    import('../src/components/auth/login/loginContainer' /* webpackChunkName: 'Login' */),
});

const Forgot = Loader({
  loader: () =>
    import('../src/components/auth/login/forgotContainer' /* webpackChunkName: 'Forgot' */),
});

const Reset = Loader({
  loader: () =>
    import('../src/components/auth/password/resetPwContainer' /* webpackChunkName: 'Reset' */),
});

const UserAccountForAdmin = Loader({
  loader: () =>
    import('../src/components/admin/userAccounts/userAccountContainer' /* webpackChunkName: 'UserAccount' */),
});

const BankAccount = Loader({
  loader: () =>
    import('../src/components/admin/bankAccount/bankAccountContainer' /* webpackChunkName: 'BankAccount' */),
});

const CateringRates = Loader({
  loader: () =>
    import('../src/components/admin/rates/ratesContainer' /* webpackChunkName: 'CateringRatesAccount' */),
});

const AdminAccount = Loader({
  loader: () =>
    import('../src/components/admin/adminAccount/adminAccountContainer' /* webpackChunkName: 'AdminAccount' */),
});

const UserAccount = Loader({
  loader: () =>
    import('../src/components/users/userAccount/userAccountContainer' /* webpackChunkName: 'UserAccount' */),
});

const NoMatch = Loader({
  loader: () =>
    import('../src/components/noMatch' /* webpackChunkName: 'NoMatch' */),
});

const routes = props => (
  <div>
    <App history={props.history} />
    <Switch>
      <Route exact path="/" component={Home} />
      <LoggedOutRoute path="/login" component={Login} />
      <LoggedOutRoute path="/auth/forgot" component={Forgot} />
      <Route path="/reset" component={Reset} />
      <Route
        exact
        path="/admin/account/users"
        component={AdminGuards(UserAccountForAdmin)}
      />
      <Route
        exact
        path="/admin/account/bankaccount"
        component={AdminGuards(BankAccount)}
      />
      <Route
        exact
        path="/admin/account/me"
        component={AdminGuards(AdminAccount)}
      />
      <Route
        exact
        path="/admin/account/rates"
        component={AdminGuards(CateringRates)}
      />
      <Route
        exact
        path="/user/account/me"
        component={UserGuards(UserAccount)}
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
