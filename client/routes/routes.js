import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { hot, setConfig } from 'react-hot-loader';
import { withRouter } from 'react-router';
/* --- Components --- */
import App from '../app';
import Loader from '../src/components/loader';
/* --- Routes --- */
import UserGuards from './userGuards';
import AdminGuards from './adminGuards';
import LoggedOutRoute from './loggedOutRoute';
import Home from '../src/components/home/homeContainer';

/* --- AUTH --- */
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

/* --- ADMIN --- */
// 유청계정
const AdminAccount = Loader({
  loader: () =>
    import('../src/components/admin/adminAccount/adminAccountContainer' /* webpackChunkName: 'AdminAccount' */),
});

const BankAccount = Loader({
  loader: () =>
    import('../src/components/admin/bankAccount/bankAccountContainer' /* webpackChunkName: 'BankAccount' */),
});

const EmployeesAccount = Loader({
  loader: () =>
    import('../src/components/admin/employees/employeesContainer' /* webpackChunkName: 'EmployeesAccount' */),
});

const PartnerAccount = Loader({
  loader: () =>
    import('../src/components/admin/partners/partnerContainer' /* webpackChunkName: 'PartnerAccount' */),
});

// 고객관리
const CateringRates = Loader({
  loader: () =>
    import('../src/components/admin/rates/ratesContainer' /* webpackChunkName: 'CateringRates' */),
});

const UserAccountForAdmin = Loader({
  loader: () =>
    import('../src/components/admin/userAccount/userAccountContainer' /* webpackChunkName: 'UserAccountForAdmin' */),
});

const UserBusinessNo = Loader({
  loader: () =>
    import('../src/components/admin/userBusinessNo/userBusinessNoContainer' /* webpackChunkName: 'UserBusinessNo' */),
});

const UserGuide = Loader({
  loader: () =>
    import('../src/components/admin/userGuide/userGuideContainer' /* webpackChunkName: 'UserGuide' */),
});

// 식수현황
const RestoSales = Loader({
  loader: () =>
    import('../src/components/admin/resto/restoContainer' /* webpackChunkName: 'RestoSales' */),
});

const RestoQty = Loader({
  loader: () =>
    import('../src/components/admin/restoQty/restoQtyContainer' /* webpackChunkName: 'RestoQty' */),
});

const AdminCatering = Loader({
  loader: () =>
    import('../src/components/admin/catering/cateringContainer' /* webpackChunkName: 'AdminCatering' */),
});

const AdminSpecailMeal = Loader({
  loader: () =>
    import('../src/components/admin/specialMeal/specialMealContainer' /* webpackChunkName: 'AdminSpecailMeal' */),
});

// 인보이스
const AdminInvoice = Loader({
  loader: () =>
    import('../src/components/admin/invoice/invoiceContainer' /* webpackChunkName: 'AdminInvoice' */),
});

const Revenue = Loader({
  loader: () =>
    import('../src/components/admin/revenue/revenueContainer' /* webpackChunkName: 'Revenue' */),
});

const SpecialMealInvoice = Loader({
  loader: () =>
    import('../src/components/admin/specialMeal/specialMealInvoice' /* webpackChunkName: 'SpecialMealInvoice' */),
});

/* --- USER --- */
const UserAccount = Loader({
  loader: () =>
    import('../src/components/users/userAccount/userAccountContainer' /* webpackChunkName: 'UserAccount' */),
});

const UserCatering = Loader({
  loader: () =>
    import('../src/components/users/catering/cateringContainer' /* webpackChunkName: 'UserCatering' */),
});

const UserSpecialMeal = Loader({
  loader: () =>
    import('../src/components/users/specialMeal/specialMealContainer' /* webpackChunkName: 'UserSpecialMeal' */),
});

/* --- ECS --- */
const Invoice = Loader({
  loader: () =>
    import('../src/components/invoice/invoiceContainer' /* webpackChunkName: 'Invoice' */),
});

const NoMatch = Loader({
  loader: () =>
    import('../src/components/noMatch' /* webpackChunkName: 'NoMatch' */),
});

const routes = () => (
  <div>
    <App />
    <Switch>
      <Route exact path="/" component={Home} />
      {/* --- AUTH --- */}
      <LoggedOutRoute path="/login" component={Login} />
      <LoggedOutRoute path="/auth/forgot" component={Forgot} />
      <Route path="/reset" component={Reset} />
      {/* --- ADMIN --- */}
      {/* 식수현황 */}
      <Route
        exact
        path="/admin/count/catering/dd"
        component={AdminGuards(AdminCatering)}
      />
      <Route
        exact
        path="/admin/count/restaurant/companies/dd"
        component={AdminGuards(RestoQty)}
      />
      <Route
        exact
        path="/admin/count/restaurant/dd"
        component={AdminGuards(RestoSales)}
      />
      <Route
        exact
        path="/admin/count/specialmeal"
        component={AdminGuards(AdminSpecailMeal)}
      />
      {/* 인보이스 */}
      <Route
        exact
        path="/admin/invoice/users"
        component={AdminGuards(AdminInvoice)}
      />
      <Route exact path="/admin/revenue" component={AdminGuards(Revenue)} />
      {/* 고객관리 */}
      <Route
        exact
        path="/admin/account/rates"
        component={AdminGuards(CateringRates)}
      />
      <Route
        exact
        path="/admin/account/users"
        component={AdminGuards(UserAccountForAdmin)}
      />
      <Route
        exact
        path="/admin/account/business"
        component={AdminGuards(UserBusinessNo)}
      />
      <Route
        exact
        path="/admin/account/user/guide"
        component={AdminGuards(UserGuide)}
      />
      {/* 유청계정 */}
      <Route
        exact
        path="/admin/account"
        component={AdminGuards(AdminAccount)}
      />
      <Route
        exact
        path="/admin/account/bank"
        component={AdminGuards(BankAccount)}
      />
      <Route
        exact
        path="/admin/account/employees"
        component={AdminGuards(EmployeesAccount)}
      />
      <Route
        exact
        path="/admin/account/partners"
        component={AdminGuards(PartnerAccount)}
      />
      {/* Invoice */}
      <Route exact path="/invoice/user" component={Invoice} />
      <Route
        exact
        path="/invoice/special-meal"
        component={SpecialMealInvoice}
      />
      {/* --- USER --- */}
      <Route exact path="/user/catering" component={UserGuards(UserCatering)} />
      <Route
        exact
        path="/user/special-meal"
        component={UserGuards(UserSpecialMeal)}
      />
      <Route exact path="/user/account" component={UserGuards(UserAccount)} />
      <Route component={NoMatch} />
    </Switch>
  </div>
);

// enable to use react-hot-loader with React Hooks
setConfig({
  // set this flag to support SFC if patch is not landed
  pureSFC: true,
  showReactDomPatchNotification: false,
});

const Routes =
  !module.hot || process.env.NODE_ENV === 'production'
    ? routes
    : hot(module)(routes);

export default withRouter(Routes);
