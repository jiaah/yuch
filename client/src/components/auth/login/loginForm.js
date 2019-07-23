import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Field, Form } from 'formik';
/* --- Components --- */
import Button from '../../../shared/form/formButton';
import IconButton from '../../../shared/form/iconButton';
import Icon from '../../../../assets/icons';
import Input from '../../../shared/form/input';

const styles = theme => ({
  textField: {
    width: 300,
    margin: '20px 14px',
    [theme.breakpoints.up('md')]: {
      width: 400,
    },
  },
});

const LoginForm = ({ keepMeLoggedIn, keepLoggedIn, isSubmitting, classes }) => {
  // hide & show password
  const [visible, setVisible] = useState(false);
  const handleClickShowPassword = () => setVisible(!visible);
  const type = visible ? 'text' : 'password';
  const visibleIcon = visible ? 'visibility' : 'visibilityOff';

  const handleChangeCheckBox = () => keepMeLoggedIn();

  return (
    <div className="login-container" data-test="loginformComponent">
      <Form className="flex flex-column-m">
        <Field
          label="Username"
          name="username"
          type="text"
          component={Input}
          required={true}
          margin="normal"
          className={classes.textField}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Icon
                  name="filledUser"
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                />
              </InputAdornment>
            ),
          }}
        />
        <Field
          label="Password"
          name="password"
          type={type}
          component={Input}
          required={true}
          margin="normal"
          className={classes.textField}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Icon
                  name="filledLock"
                  width="30"
                  height="30"
                  viewBox="0 0 30 30"
                  fill="none"
                />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="Toggle password visibility"
                  name={visibleIcon}
                  width="20"
                  height="20"
                  viewBox="0 0 25 25"
                  handleClick={handleClickShowPassword}
                />
              </InputAdornment>
            ),
          }}
        />
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

export const Unwrapped = LoginForm;
export default withStyles(styles)(LoginForm);
