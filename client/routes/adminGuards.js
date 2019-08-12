import React from 'react';
import { connect } from 'react-redux';
/* --- Components --- */
import { userLogout } from '../src/actions/authAction';
import { clearStorage } from '../localStorage';
// when 'keepUserLoggedIn === false'
// -> on refresh : prevent from logging out user
// -> on reopen  : force logging out user

const AdminGuards = Component => {
  class LoginAuth extends React.Component {
    componentWillMount() {
      const { keepUserLoggedIn, isAdmin, history } = this.props;
      if (
        (!keepUserLoggedIn && !sessionStorage.getItem('keepUserLoggedIn')) || // when user reopen the browser ( keepUserLoggedIn is false)
        !isAdmin // if logged in user is not admin
      ) {
        userLogout();
        clearStorage();
        return history.push('/login');
      }
    }

    render() {
      return <Component {...this.props} />;
    }
  }

  const mapPropsToState = state => ({
    keepUserLoggedIn: state.auth.keepUserLoggedIn,
    isAdmin: state.auth.isAdmin,
  });
  return connect(
    mapPropsToState,
    { userLogout },
  )(LoginAuth);
};

export default AdminGuards;
