import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
/* --- Components --- */
import Button from '../../shared/formButton';
import Icon from '../../../assets/icons';
import IconButton from '../../shared/iconButton';

const styles = theme => ({
  textField: {
    width: 300,
    margin: '20px 14px',
    [theme.breakpoints.up('md')]: {
      width: 400,
    },
  },
});

const Form = ({
  values: { username, password },
  keepMeLoggedIn,
  keepLoggedIn,
  errors,
  touched,
  handleChange,
  handleSubmit,
  isSubmitting,
  handleBlur,
  classes,
}) => {
  // hide & show password
  const [visible, setVisible] = useState(false);
  const handleClickShowPassword = () => setVisible(!visible);
  const type = visible ? 'text' : 'password';
  const visibleIcon = visible ? 'visibility' : 'visibilityOff';

  const handleChangeCheckBox = () => keepMeLoggedIn();

  return (
    <div className="login-container" data-test="loginformComponent">
      <form onSubmit={handleSubmit} className="flex flex-column-m">
        <TextField
          id="username"
          label="Username"
          name="username"
          type="text"
          value={username || ''}
          onChange={handleChange}
          onBlur={handleBlur}
          helperText={touched.username && errors.username}
          error={touched.username && Boolean(errors.username)}
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
        <TextField
          id="password"
          label="Password"
          name="password"
          type={type}
          value={password || ''}
          onChange={handleChange}
          onBlur={handleBlur}
          helperText={touched.password && errors.password}
          error={touched.password && Boolean(errors.password)}
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
      </form>
      <div className="keep-me-logged-in float-left">
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
    </div>
  );
};

export const Unwrapped = Form;
export default withStyles(styles)(Form);
