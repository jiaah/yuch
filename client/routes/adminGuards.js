import React from 'react';
import { connect } from 'react-redux';
/* --- Actions --- */
import { userLogout } from '../src/actions/authAction';
import { addFlashMessage } from '../src/actions/messageAction';
// when 'keepMeLoggedIn === false'
// -> on refresh : prevent from logging out user
// -> on reopen  : force logging out user

const AdminGuards = Component => {
  class LoginAuth extends React.Component {
    componentDidMount = async () => {
      const {
        keepMeLoggedIn,
        isLoggedIn,
        isAdmin,
        history,
        addFlashMessage,
        userLogout,
      } = this.props;

      if (
        (!keepMeLoggedIn && !sessionStorage.getItem('keepMeLoggedIn')) || // when user reopen the browser ( keepMeLoggedIn is false)
        !isLoggedIn ||
        !isAdmin // if logged in user is not admin
      ) {
        await userLogout();
        addFlashMessage('warning', '로그인을 해주세요.');
        return history.push('/');
      }
    };

    render() {
      return <Component {...this.props} />;
    }
  }

  const mapPropsToState = state => ({
    keepMeLoggedIn: state.auth.keepMeLoggedIn,
    isLoggedIn: state.auth.isLoggedIn,
    isAdmin: state.auth.isAdmin,
  });

  const mapDispatchToProps = dispatch => ({
    userLogout: () => dispatch(userLogout()),
    addFlashMessage: (variant, message) =>
      dispatch(addFlashMessage(variant, message)),
  });

  return connect(
    mapPropsToState,
    mapDispatchToProps,
  )(LoginAuth);
};

export default AdminGuards;
