import React from 'react';
import { Link } from 'react-router-dom';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Form } from 'formik';
/* --- Components --- */
import FormikField from '../../../shared/form/formikField';
import Password from '../../../shared/form/password';
import Button from '../../../shared/form/formButton';

const LoginForm = ({ keepMeLoggedIn, keepLoggedIn, isSubmitting }) => {
  const handleChangeCheckBox = () => keepMeLoggedIn();

  return (
    <div data-test="loginformComponent">
      <Form className="flex flex-column-m">
        <FormikField
          label="아이디"
          name="username"
          type="text"
          icon="filledUser"
          styleName="textField"
          required
        />
        <Password label="비밀번호" name="password" styleName="textField" />
        <Button
          typeValue="submit"
          variantValue="contained"
          buttonName="로그인"
          className="login-btn"
          isSubmitting={isSubmitting}
          data-test="submit-btn"
        />
      </Form>
      <div className="keep-me-logged-in">
        <FormControlLabel
          control={
            <Checkbox
              checked={keepLoggedIn}
              onChange={handleChangeCheckBox}
              value="keepLoggedIn"
            />
          }
          label="로그인 상태 유지"
        />
      </div>
      <div className="tc login-forgot">
        <Link to="/auth/forgot?value=username" className="td-none c-text-grey">
          아이디 찾기
        </Link>
        &#8201;&#8201;&#124;&#8201;&#8201;
        <Link to="/auth/forgot?value=password" className="td-none c-text-grey">
          비밀번호 찾기
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
