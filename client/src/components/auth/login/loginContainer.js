import React from 'react';
import { connect } from 'react-redux';
/* --- Components --- */
import LoginForm from './loginForm';
import { isLoggedIn, saveUserToken } from '../../../../localStorage';
import { loginValidation } from '../../formValidation';
import * as data from '../../../data/data';
/* --- Actions --- */
import { userLogin, keepMeLoggedIn } from '../../../actions/authAction';
import { addFlashMessage } from '../../../actions/messageAction';

export const Login = ({
  history,
  // states
  keepUserLoggedIn,
  userData,
  // actions
  userLogin,
  addFlashMessage,
  keepMeLoggedIn,
}) => {
  const { loggedInUser, loginFailed } = data.message.auth;
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const { username, password } = values;

    if (isLoggedIn()) {
      await addFlashMessage('warning', loggedInUser);
      resetForm({});
      setSubmitting(false);
      return history.push('/');
    }

    const res = await userLogin(username, password);
    // res.error : when API request failed
    // res === undefined : when received token is undefined
    if (res.error || res === undefined || res === null) {
      addFlashMessage('error', loginFailed);
      return setSubmitting(false);
    }
    await saveUserToken(res, keepUserLoggedIn);
    await resetForm({});
    await setSubmitting(false);
    return history.push('/');
  };

  return (
    <LoginForm
      keepMeLoggedIn={keepMeLoggedIn}
      keepUserLoggedIn={keepUserLoggedIn}
      userData={userData}
      handleSubmit={handleSubmit}
      loginValidation={loginValidation}
    />
  );
};

const mapStateToProps = state => ({
  keepUserLoggedIn: state.keepUserLoggedIn.keepUserLoggedIn,
  userData: state.httpHandler.data,
});
const mapDispatchToProps = dispatch => ({
  userLogin: (username, password) => dispatch(userLogin(username, password)),
  keepMeLoggedIn: () => dispatch(keepMeLoggedIn()),
  addFlashMessage: (variant, message) =>
    dispatch(addFlashMessage(variant, message)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
