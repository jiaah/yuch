import React from 'react';
import { connect } from 'react-redux';
/* --- Components --- */
import { userLogout } from '../src/actions/authAction';
import { clearStorage } from '../localStorage';
// when 'keepLoggedIn === false'
// -> on refresh : prevent from logging out user
// -> on reopen  : force logging out user

export default Component => {
  class LoginAuth extends React.Component {
    componentWillMount() {
      const { keepLoggedIn, userLogout, history } = this.props;
      // ERROR: can not redirect from '/login' to '/' for logged out user -> 'userLoggout()' gets called.
      // const onLoginPage = history.location.pathname;
      if (!keepLoggedIn && !sessionStorage.getItem('keepLoggedIn')) {
        userLogout();
        clearStorage();
        // if (onLoginPage) {
        //   return history.push('/');
        // }
        return history.push('/login');
      }
    }

    render() {
      return <Component {...this.props} />;
    }
  }

  const mapPropsToState = state => ({
    keepLoggedIn: state.auth.keepLoggedIn,
  });
  return connect(
    mapPropsToState,
    { userLogout },
  )(LoginAuth);
};

// when 'keepLoggedIn === false'
// !keepLoggedIn === true
// on refresh, !sessionStorage.getItem('keepLoggedIn') === false   ( !false === false )
// on reopen,  !sessionStorage.getItem('keepLoggedIn') === true    ( !null  === true  )
