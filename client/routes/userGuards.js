import React from 'react';
import { connect } from 'react-redux';
/* --- Components --- */
import { clearStorage } from '../localStorage';
/* --- Actions --- */
import { userLogout } from '../src/actions/authAction';
import { addFlashMessage } from '../src/actions/messageAction';

const UserGuards = Component => {
  class LoginAuth extends React.Component {
    componentWillMount = async () => {
      const {
        keepUserLoggedIn,
        isAdmin,
        isLoggedIn,
        history,
        addFlashMessage,
        userLogout,
      } = this.props;
      if (
        (!keepUserLoggedIn && !sessionStorage.getItem('keepUserLoggedIn')) || // if user reopen the browser ( keepUserLoggedIn is false)
        !isLoggedIn || // if user is not logged in
        isAdmin // if logged in user is admin
      ) {
        await clearStorage();
        await userLogout();
        await addFlashMessage('warning', '로그인을 해주세요.');
        return history.push('/');
      }
    };

    render() {
      return <Component {...this.props} />;
    }
  }

  const mapPropsToState = state => ({
    keepUserLoggedIn: state.keepUserLoggedIn.keepUserLoggedIn,
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

export default UserGuards;
