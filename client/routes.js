import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { hot, setConfig } from 'react-hot-loader';
import { withRouter } from 'react-router';
/* --- Components --- */
import App from './app';
import Loader from './src/shared/loader';
import AuthGuards from './authGuards';

const Home = Loader({
  loader: () =>
    import('./src/components/home/homeContainer' /* webpackChunkName: 'Home' */),
});

const Login = Loader({
  loader: () =>
    import('./src/components/auth/login/loginContainer' /* webpackChunkName: 'Login' */),
});

const Forgot = Loader({
  loader: () =>
    import('./src/components/auth/login/forgotContainer' /* webpackChunkName: 'Forgot' */),
});

const Reset = Loader({
  loader: () =>
    import('./src/components/auth/resetPassword/resetContainer' /* webpackChunkName: 'Reset' */),
});

const UserAccountForAdmin = Loader({
  loader: () =>
    import('./src/components/admin/userAccounts/userAccountContainer' /* webpackChunkName: 'UserAccount' */),
});

const BankAccount = Loader({
  loader: () =>
    import('./src/components/admin/bankAccount/bankAccountContainer' /* webpackChunkName: 'BankAccount' */),
});

const CateringRates = Loader({
  loader: () =>
    import('./src/components/admin/rates/ratesContainer' /* webpackChunkName: 'CateringRatesAccount' */),
});

const AdminAccount = Loader({
  loader: () =>
    import('./src/components/admin/adminAccount/adminAccountContainer' /* webpackChunkName: 'AdminAccount' */),
});

const UserAccount = Loader({
  loader: () =>
    import('./src/components/users/userAccount/userAccountContainer' /* webpackChunkName: 'UserAccount' */),
});

const NoMatch = Loader({
  loader: () =>
    import('./src/components/noMatch' /* webpackChunkName: 'NoMatch' */),
});

const routes = props => (
  <div>
    <App history={props.history} />
    <Switch>
      <Route exact path="/" component={AuthGuards(Home)} />
      <Route path="/login" render={props => <Login {...props} />} />
      <Route path="/auth/forgot" render={props => <Forgot {...props} />} />
      <Route path="/reset" render={props => <Reset {...props} />} />
      {/* <Route path="/auth/forgot" render={AuthGuards(Forgot)} />
      <Route path="/reset" render={AuthGuards(Reset)} /> */}
      <Route
        path="/admin/account/users"
        component={AuthGuards(UserAccountForAdmin)}
      />
      <Route
        path="/admin/account/bankaccount"
        component={AuthGuards(BankAccount)}
      />
      <Route path="/admin/account/me" component={AuthGuards(AdminAccount)} />
      <Route
        path="/admin/account/rates"
        component={AuthGuards(CateringRates)}
      />
      <Route path="/user/account/me" component={AuthGuards(UserAccount)} />
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
