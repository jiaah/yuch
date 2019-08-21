import React from 'react';
import { connect } from 'react-redux';
/* --- Components --- */
import { clearStorage } from '../localStorage';
/* --- Actions --- */
import { userLogout } from '../src/actions/authAction';
import { addFlashMessage } from '../src/actions/messageAction';
// when 'keepUserLoggedIn === false'
// -> on refresh : prevent from logging out user
// -> on reopen  : force logging out user

const AdminGuards = Component => {
  class LoginAuth extends React.Component {
    componentDidMount = async () => {
      const {
        keepUserLoggedIn,
        isAdmin,
        history,
        addFlashMessage,
        userLogout,
      } = this.props;
      if (
        (!keepUserLoggedIn && !sessionStorage.getItem('keepUserLoggedIn')) || // when user reopen the browser ( keepUserLoggedIn is false)
        !isAdmin // if logged in user is not admin
      ) {
        await userLogout();
        await clearStorage();
        addFlashMessage('warning', '로그인을 해주세요.');
        return history.push('/login');
      }
    };

    render() {
      return <Component {...this.props} />;
    }
  }

  const mapPropsToState = state => ({
    keepUserLoggedIn: state.keepUserLoggedIn.keepUserLoggedIn,
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
