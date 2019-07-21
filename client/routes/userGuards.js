import React from 'react';
import { connect } from 'react-redux';
/* --- Components --- */
import { userLogout } from '../src/actions/authAction';
import { clearStorage } from '../localStorage';
// when 'keepLoggedIn === false'
// -> on refresh : prevent from logging out user
// -> on reopen  : force logging out user

const UserGuards = Component => {
  class LoginAuth extends React.Component {
    componentWillMount() {
      const { keepLoggedIn, userLogout, isLoggedIn, history } = this.props;
      // if (!isLoggedIn) {
      //   return history.push('/login');
      // }
      if (!keepLoggedIn && !sessionStorage.getItem('keepLoggedIn')) {
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
    keepLoggedIn: state.auth.keepLoggedIn,
    isLoggedIn: state.auth.isLoggedIn,
  });
  return connect(
    mapPropsToState,
    { userLogout },
  )(LoginAuth);
};

export default UserGuards;
