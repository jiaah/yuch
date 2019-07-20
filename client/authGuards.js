import React from 'react';
import { connect } from 'react-redux';
/* --- Components --- */
import { userLogout } from './src/actions/authAction';
import { clearLocalStorage } from './localStorage';

export default Component => {
  class LoginAuth extends React.Component {
    componentWillMount() {
      const { keepLoggedIn, userLogout, history } = this.props;
      if (!keepLoggedIn && !sessionStorage.getItem('keepLoggedIn')) {
        userLogout();
        clearLocalStorage();
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
  const mapDispatchToProps = dispatch => ({
    userLogout: () => dispatch(userLogout()),
  });

  return connect(
    mapPropsToState,
    mapDispatchToProps,
  )(LoginAuth);
};
