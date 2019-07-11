import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
/* --- Components --- */
import Icon from '../../../../assets/icons';
import FormButton from '../../../shared/formButton';
import Button from '../../../shared/button';
import IconButton from '../../../shared/iconButton';

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '90%',
    [theme.breakpoints.up('md')]: {
      width: '60%',
    },
  },
});

const PasswordForm = ({
  values: { password, newPassword, confirmPassword },
  errors,
  touched,
  handleSubmit,
  isSubmitting,
  handleBlur,
  classes,
  setFieldValue,
  closePasswordForm,
}) => {
  // show & hide password
  const [visible, setVisible] = useState(false);
  const handleClickShowPassword = () => setVisible(!visible);
  const type = visible ? 'text' : 'password';
  const visibleIcon = visible ? 'visibility' : 'visibilityOff';

  const change = (e, name, shouldValidate) => {
    e.persist();
    const inputValue = e.target.value;
    const value = inputValue.toLowerCase();
    return setFieldValue(name, value, shouldValidate);
  };

  return (
    <form className="flex flex-column-m items-center" onSubmit={handleSubmit}>
      <TextField
        id="password"
        label="비밀번호"
        type={type}
        value={password || ''}
        onChange={e => change(e, 'password', true)}
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
      <TextField
        id="newPassword"
        label="새 비밀번호"
        type={type}
        placeholder="( 숫자 or 숫자+영문 조합 )"
        value={newPassword || ''}
        onChange={e => change(e, 'newPassword', true)}
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
      <TextField
        id="confirmPassword"
        label="비밀번호 확인"
        type={type}
        value={confirmPassword || ''}
        onChange={e => change(e, 'confirmPassword', true)}
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
      <div>
        <Button
          typeValue="button"
          variantValue="outlined"
          buttonName="취소"
          width="medium"
          handleButtonClick={closePasswordForm}
        />
        <FormButton
          typeValue="submit"
          variantValue="contained"
          buttonName="변경"
          width="medium"
          isSubmitting={isSubmitting}
        />
      </div>
    </form>
  );
};

export default withStyles(styles)(PasswordForm);
