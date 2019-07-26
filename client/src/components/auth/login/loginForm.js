import React from 'react';
import { Link } from 'react-router-dom';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Formik, Form } from 'formik';
/* --- Components --- */
import FormikField from '../../../shared/form/formikField';
import PasswordField from '../../../shared/form/passwordField';
import Button from '../../../shared/form/formButton';

const LoginForm = ({
  keepMeLoggedIn,
  keepLoggedIn,
  userData,
  isSubmitting,
  handleUserLogin,
  loginValidation,
}) => {
  const foundUsername = userData.length !== 0 ? userData[0].username : '';
  const values = { username: foundUsername, password: '' };
  return (
    <Formik
      initialValues={values}
      render={() => (
        <div className="login-container">
          <Form className="flex flex-column-m">
            <FormikField
              label="아이디"
              name="username"
              type="text"
              icon="filledUser"
              styleName="textField"
              required
            />
            <PasswordField
              label="비밀번호"
              name="password"
              styleName="textField"
            />
            <Button
              typeValue="submit"
              variantValue="contained"
              buttonName="로그인"
              className="login-btn"
              isSubmitting={isSubmitting}
            />
          </Form>
          <div className="keep-me-logged-in">
            <FormControlLabel
              control={
                <Checkbox
                  data-testid="checkbox-login"
                  checked={keepLoggedIn}
                  onClick={keepMeLoggedIn}
                  value="keepLoggedIn"
                />
              }
              label="로그인 상태 유지"
            />
          </div>
          <div className="tc login-forgot">
            <Link
              to="/auth/forgot?value=username"
              className="td-none c-text-grey"
            >
              아이디 찾기
            </Link>
            &#8201;&#8201;&#124;&#8201;&#8201;
            <Link
              to="/auth/forgot?value=password"
              className="td-none c-text-grey"
            >
              비밀번호 찾기
            </Link>
          </div>
        </div>
      )}
      onSubmit={handleUserLogin}
      validationSchema={loginValidation}
    />
  );
};

export default LoginForm;
