import React from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
/* --- Components --- */
import FormButton from '../../../shared/form/formButton';
import Icon from '../../../../assets/icons';

const styles = theme => ({
  textField: {
    margin: '5px 14px',
    width: 300,
    [theme.breakpoints.up('md')]: {
      width: 400,
    },
  },
});

const UsernameForm = ({
  values: { email },
  errors,
  touched,
  handleChange,
  handleSubmit,
  isSubmitting,
  handleBlur,
  classes,
}) => (
  <form className="flex flex-column-m items-center mt4" onSubmit={handleSubmit}>
    <TextField
      id="email"
      placeholder="sleket12@hanmail.net"
      value={email || ''}
      onChange={handleChange}
      onBlur={handleBlur}
      error={touched.email && Boolean(errors.email)}
      margin="normal"
      className={classes.textField}
      variant="outlined"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Icon
              name="email"
              width="20"
              height="20"
              viewBox="0 0 25 25"
              fill="none"
            />
          </InputAdornment>
        ),
      }}
    />
    <FormButton
      typeValue="submit"
      variantValue="contained"
      buttonName="계속하기"
      className="login-btn"
      isSubmitting={isSubmitting}
    />
  </form>
);

export default withStyles(styles)(UsernameForm);
