import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
/* --- Components --- */
import LoginForm from './loginForm';
import {
  isLoggedIn,
  saveUserTokens,
  clearStorage,
} from '../../../../localStorage';
import { loginValidation } from '../../formValidation';
import * as data from '../../../data/data';
/* --- Actions --- */
import { userLogin } from '../../../actions/authAction';
import { addFlashMessage } from '../../../actions/messageAction';

export const Login = ({
  history,
  // states
  userData,
  isLoggedInState,
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

    const res = await userLogin(username, password, keepMeLoggedIn);
    // res.error : when API request failed
    // res === undefined : when received token is undefined
    if (res.error || res === undefined || res === null) {
      console.log('res.error @ login : ', res);
      addFlashMessage('error', loginFailed);
      return setSubmitting(false);
    }
    await saveUserTokens(res, keepMeLoggedIn);
    await resetForm({});
    await setSubmitting(false);
    return history.push('/');
  };

  useEffect(() => {
    // Fix system bug: logout user, in case, user have tokens in localStorage but isLoggedIn state is still set to false.
    if (isLoggedIn() || !isLoggedInState) {
      clearStorage();
    }
  }, []);

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
  isLoggedInState: state.auth.isLoggedIn,
});
const mapDispatchToProps = dispatch => ({
  userLogin: (username, password, keepMeLoggedIn) =>
    dispatch(userLogin(username, password, keepMeLoggedIn)),
  addFlashMessage: (variant, message) =>
    dispatch(addFlashMessage(variant, message)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
