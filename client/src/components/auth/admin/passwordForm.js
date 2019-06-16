import React from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
/* --- Components --- */
import Icon from '../../../../assets/icons';
import FormButton from '../../../shared/formButton';

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 250,
  },
  textFieldB: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 118,
  },
  formControl: {
    display: 'flex',
    justifyContent: 'center',
    margin: theme.spacing.unit * 3,
    [theme.breakpoints.up('md')]: {
      marginLeft: theme.spacing.unit * 5,
    },
  },
  formLabel: {
    marginLeft: '8px',
  },
  formControlLabel: {
    [theme.breakpoints.up('md')]: {
      marginRight: '50px',
    },
  },
});

const PasswordForm = props => {
  const {
    values: { password, newPassword, confirmPassword },
    userId,
    errors,
    touched,
    handleChange,
    handleSubmit,
    isSubmitting,
    handleBlur,
    classes,
  } = props;

  return (
    <form
      className="mh1 flex flex-column-m items-center"
      onSubmit={handleSubmit}
    >
      <TextField
        id="password"
        label="현재 비밀번호"
        type="password"
        placeholder=""
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
                name="lock"
                width="20"
                height="20"
                viewBox="0 0 25 25"
                fill="none"
              />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        id="newPassword"
        label="새 비밀번호"
        type="newPassword"
        placeholder="(특수문자 사용불가)"
        value={newPassword || ''}
        onChange={handleChange}
        onBlur={handleBlur}
        helperText={touched.newPassword && errors.newPassword}
        error={touched.newPassword && Boolean(errors.newPassword)}
        required={true}
        margin="normal"
        className={classes.textField}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Icon
                name="lock"
                width="20"
                height="20"
                viewBox="0 0 25 25"
                fill="none"
              />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        id="confirmPassword"
        label="비밀번호 확인"
        type="password"
        value={confirmPassword || ''}
        onChange={handleChange}
        onBlur={handleBlur}
        helperText={touched.confirmPassword && errors.confirmPassword}
        error={touched.confirmPassword && Boolean(errors.confirmPassword)}
        required={true}
        margin="normal"
        className={classes.textField}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Icon
                name="lock"
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
        buttonName="저장"
        width="medium"
        isSubmitting={isSubmitting}
      />
    </form>
  );
};

export default withStyles(styles)(PasswordForm);
