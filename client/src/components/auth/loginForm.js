import React from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
/* --- Components --- */
import Button from '../../shared/formButton';
import Icon from '../../../assets/icons';

const styles = theme => ({
  textField: {
    width: 300,
    [theme.breakpoints.up('md')]: {
      width: 400,
    },
  },
});

const Form = props => {
  const {
    values: { username, password },
    errors,
    touched,
    handleChange,
    handleSubmit,
    isSubmitting,
    handleBlur,
    classes,
  } = props;
  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="flex flex-column-m items-center">
        <TextField
          id="username"
          label="Username"
          name="username"
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
          }}
        />
        <Button
          typeValue="submit"
          variantValue="contained"
          buttonName="로그인"
          width="medium"
          isSubmitting={isSubmitting}
        />
      </form>
    </div>
  );
};

export default withStyles(styles)(Form);
