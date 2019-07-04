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
});

const PasswordForm = props => {
  const {
    values: { newPassword, confirmPassword },
    errors,
    touched,
    handleSubmit,
    isSubmitting,
    handleBlur,
    classes,
    setFieldValue,
  } = props;

  const change = (e, name, shouldValidate) => {
    e.persist();
    const inputValue = e.target.value;
    const value = inputValue.toLowerCase();
    return setFieldValue(name, value, shouldValidate);
  };

  return (
    <form
      className="mh3 flex flex-column-m items-center"
      onSubmit={handleSubmit}
    >
      <TextField
        id="newPassword"
        label="새 비밀번호"
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
        }}
      />
      <TextField
        id="confirmPassword"
        label="비밀번호 확인"
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