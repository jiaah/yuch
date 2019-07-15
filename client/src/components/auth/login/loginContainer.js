import React from 'react';
import { Formik } from 'formik';
import { connect } from 'react-redux';
/* --- Components --- */
import Form from './loginForm';
import { isLoggedIn, saveUserToken } from '../../../../localStorage';
import { loginValidation } from '../formValidation';
import * as data from '../../../data/data';
/* --- Actions --- */
import { userLogin, keepMeLoggedIn } from '../../../actions/authAction';
import { addFlashMessage } from '../../../actions/messageAction';

const Login = ({
  history,
  userLogin,
  addFlashMessage,
  keepMeLoggedIn,
  keepLoggedIn,
}) => {
  const handleUserLogin = async (values, { setSubmitting, resetForm }) => {
    const { username, password } = values;
    const { loggedInUser, loginFailed } = data.message.auth;

    if (isLoggedIn()) {
      await addFlashMessage('warning', loggedInUser);
      await resetForm({});
      history.push('/');
      return setSubmitting(false);
    }

    try {
      const token = await userLogin(username, password);
      await saveUserToken(token);
      await resetForm({});
      history.push('/');
    } catch (error) {
      await addFlashMessage('error', loginFailed);
    }
    return setSubmitting(false);
  };

  const values = { username: '', password: '' };

  return (
    <React.Fragment>
      <Formik
        initialValues={values}
        render={props => (
          <Form
            {...props}
            keepMeLoggedIn={keepMeLoggedIn}
            keepLoggedIn={keepLoggedIn}
          />
        )}
        onSubmit={handleUserLogin}
        validationSchema={loginValidation}
      />
    </React.Fragment>
  );
};

const mapStateToProps = state => ({
  keepLoggedIn: state.auth.keepLoggedIn,
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
