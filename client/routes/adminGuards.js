import React from 'react';
import { connect } from 'react-redux';
/* --- Components --- */
import { getToken, getRefreshToken } from '../localStorage';
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
        id,
        httpStatus,
        history,
        addFlashMessage,
        userLogout,
      } = this.props;

      if (
        (!keepMeLoggedIn && !sessionStorage.getItem('keepMeLoggedIn')) || // if user reopen the browser ( keepMeLoggedIn is false)
        !isLoggedIn ||
        !isAdmin || // if logged in user is not admin
        httpStatus === 401 || // token authentication failure on API request by a loggedIn user
        !getToken ||
        !getRefreshToken // In case token doesn't exist, but somehow isLoggedIn in redux-store is true.
      ) {
        await userLogout(id);
        addFlashMessage('warning', '로그인을 해주세요.');
        return history.push('/login');
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
    id: state.auth.id,
    httpStatus: state.httpHandler.status,
  });

  const mapDispatchToProps = dispatch => ({
    userLogout: id => dispatch(userLogout(id)),
    addFlashMessage: (variant, message) =>
      dispatch(addFlashMessage(variant, message)),
  });

  return connect(
    mapPropsToState,
    mapDispatchToProps,
  )(LoginAuth);
};

export default AdminGuards;
