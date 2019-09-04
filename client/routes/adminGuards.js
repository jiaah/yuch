import React from 'react';
import { connect } from 'react-redux';
/* --- Components --- */
import {
  clearStorage,
  getRefreshToken,
  getRefreshTokenRenewTime,
  saveRefreshToken,
  getToken,
  getExpireTime,
} from '../localStorage';
import {
  isRefreshTokenOld,
  wasUserAwayForWeeks,
} from '../src/helpers/refreshTokenChecker';
/* --- Actions --- */
import { userLogout, renewRefreshToken } from '../src/actions/authAction';
import { addFlashMessage } from '../src/actions/messageAction';
// when 'keepUserLoggedIn === false'
// -> on refresh : prevent from logging out user
// -> on reopen  : force logging out user

const AdminGuards = Component => {
  class LoginAuth extends React.Component {
    componentDidMount = async () => {
      const accessToken = getToken();
      const accessTokenExpireTime = getExpireTime();
      const {
        keepUserLoggedIn,
        isAdmin,
        history,
        addFlashMessage,
        userLogout,
        renewRefreshToken,
      } = this.props;

      if (
        (!keepUserLoggedIn && !sessionStorage.getItem('keepUserLoggedIn')) || // when user reopen the browser ( keepUserLoggedIn is false)
        !isAdmin || // if logged in user is not admin
        (!!accessToken && wasUserAwayForWeeks(accessTokenExpireTime)) // if user did't visit the website quite a while
      ) {
        const message =
          !!accessToken && wasUserAwayForWeeks(accessTokenExpireTime)
            ? '접속한지 오래되어 로그아웃 되었습니다.'
            : '로그인을 해주세요.';

        await userLogout();
        await clearStorage();
        addFlashMessage('warning', message);
        return history.push('/login');
      }

      const refreshToken = getRefreshToken();
      const refreshTokenRenewTime = getRefreshTokenRenewTime();
      // if refresh token is created quite a while ago, renew it.
      if (refreshToken && isRefreshTokenOld(refreshTokenRenewTime)) {
        const newToken = await renewRefreshToken();
        await saveRefreshToken(newToken);
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
    renewRefreshToken: () => dispatch(renewRefreshToken()),
    addFlashMessage: (variant, message) =>
      dispatch(addFlashMessage(variant, message)),
  });

  return connect(
    mapPropsToState,
    mapDispatchToProps,
  )(LoginAuth);
};

export default AdminGuards;
