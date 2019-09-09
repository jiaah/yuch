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
        isLoggedIn,
        id,
        httpStatus,
        history,
        addFlashMessage,
        userLogout,
      } = this.props;

      if (
        (!keepMeLoggedIn && !sessionStorage.getItem('keepMeLoggedIn')) ||
        !isLoggedIn ||
        httpStatus === 401
      ) {
        addFlashMessage('warning', '로그인을 해주세요.');
        await userLogout(id);
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

export default UserGuards;
