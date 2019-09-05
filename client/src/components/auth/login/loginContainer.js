import React, { useState } from 'react';
import { connect } from 'react-redux';
/* --- Components --- */
import LoginForm from './loginForm';
import { isLoggedIn, saveUserTokens } from '../../../../localStorage';
import { loginValidation } from '../../formValidation';
import * as data from '../../../data/data';
/* --- Actions --- */
import { userLogin } from '../../../actions/authAction';
import { addFlashMessage } from '../../../actions/messageAction';

export const Login = ({
  history,
  // states
  userData,
  // actions
  userLogin,
  addFlashMessage,
}) => {
  const { loggedInUser, loginFailed } = data.message.auth;

  const [keepMeLoggedIn, setKeepMeLoggedIn] = useState(false);
  const handleKeepMeLoggedIn = () => setKeepMeLoggedIn(!keepMeLoggedIn);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const { username, password } = values;

    if (isLoggedIn()) {
      await addFlashMessage('warning', loggedInUser);
      resetForm({});
      setSubmitting(false);
      return history.push('/');
    }
    // dont save keepMeLoggedIn in store
    // keekMeLoggedIn === true, -> timeStamp
    // keepMeLoggedIn === false, -> timeStamp + 1yr
    const loggedInAt = '';
    const res = await userLogin(username, password, loggedInAt);
    // res.error : when API request failed
    // res === undefined : when received token is undefined
    if (res.error || res === undefined || res === null) {
      addFlashMessage('error', loginFailed);
      return setSubmitting(false);
    }
    await saveUserTokens(res, keepMeLoggedIn);
    await resetForm({});
    await setSubmitting(false);
    return history.push('/');
  };

  return (
    <LoginForm
      keepMeLoggedIn={keepMeLoggedIn}
      handleKeepMeLoggedIn={handleKeepMeLoggedIn}
      userData={userData}
      handleSubmit={handleSubmit}
      loginValidation={loginValidation}
    />
  );
};

const mapStateToProps = state => ({
  userData: state.httpHandler.data,
});
const mapDispatchToProps = dispatch => ({
  userLogin: (username, password) => dispatch(userLogin(username, password)),
  addFlashMessage: (variant, message) =>
    dispatch(addFlashMessage(variant, message)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
