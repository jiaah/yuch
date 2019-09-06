import React from 'react';
import { connect } from 'react-redux';
/* --- Actions --- */
import { userLogout } from '../src/actions/authAction';
import { addFlashMessage } from '../src/actions/messageAction';

const UserGuards = Component => {
  class LoginAuth extends React.Component {
    componentDidMount = async () => {
      const {
        keepMeLoggedIn,
        isAdmin,
        history,
        addFlashMessage,
        userLogout,
      } = this.props;

      if (
        (!keepMeLoggedIn && !sessionStorage.getItem('keepMeLoggedIn')) || // if user reopen the browser ( keepMeLoggedIn is false)
        isAdmin
      ) {
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
    keepMeLoggedIn: state.auth.keepMeLoggedIn,
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
