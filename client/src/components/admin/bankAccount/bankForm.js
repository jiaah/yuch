import React from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
/* --- Components --- */
import FormButton from '../../../shared/form/formButton';
import Icon from '../../../../assets/icons';

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 250,
  },
});

const BankForm = props => {
  const {
    values: { accountHolder, bankName, accountNo },
    errors,
    touched,
    handleChange,
    handleSubmit,
    isSubmitting,
    handleBlur,
    classes,
  } = props;

  return (
    <form className="mh1" onSubmit={handleSubmit}>
      <div className="mb2 user-form">
        <TextField
          id="accountHolder"
          label="예금주"
          placeholder="유청"
          value={accountHolder || ''}
          onChange={handleChange}
          onBlur={handleBlur}
          helperText={touched.accountHolder && errors.accountHolder}
          error={touched.accountHolder && Boolean(errors.accountHolder)}
          required={true}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Icon
                  name="filledUser"
                  width="20"
                  height="20"
                  viewBox="0 0 25 25"
                  fill="none"
                />
              </InputAdornment>
            ),
          }}
          margin="normal"
          className={classes.textField}
        />
        <TextField
          id="bankName"
          label="은행명"
          placeholder="농협"
          value={bankName || ''}
          onChange={handleChange}
          onBlur={handleBlur}
          helperText={touched.bankName && errors.bankName}
          error={touched.bankName && Boolean(errors.bankName)}
          margin="normal"
          className={classes.textField}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Icon
                  name="bank"
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
          id="accountNo"
          label="계좌번호"
          placeholder="054 - 745 - 0999"
          value={accountNo || ''}
          onChange={handleChange}
          onBlur={handleBlur}
          helperText={touched.accountNo && errors.accountNo}
          error={touched.accountNo && Boolean(errors.accountNo)}
          margin="normal"
          className={classes.textField}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Icon
                  name="bankAccount"
                  width="20"
                  height="20"
                  viewBox="0 0 25 25"
                  fill="none"
                />
              </InputAdornment>
            ),
          }}
        />
      </div>
      <div className="edit-userform--bottom">
        <FormButton
          typeValue="submit"
          variantValue="contained"
          buttonName="저장"
          width="medium"
          isSubmitting={isSubmitting}
        />
      </div>
    </form>
  );
};

export default withStyles(styles)(BankForm);
