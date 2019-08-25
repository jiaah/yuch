import React from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import { getIn } from 'formik';

const styles = theme => ({
  textField: {
    width: 300,
    margin: '20px 14px',
    [theme.breakpoints.up('md')]: {
      width: 500,
    },
  },
  // forgot id, password
  textFieldA: {
    width: 250,
    margin: '14px 10px',
    [theme.breakpoints.up('md')]: {
      width: 520,
    },
  },
  // lunchQty, dinnerQty
  textFieldB: {
    width: 138,
    margin: '20px 14px',
    [theme.breakpoints.up('md')]: {
      width: 238,
    },
  },
  // [C,D,E] create/edit user account forms
  // [C] bank account, confirm admin password
  textFieldC: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 250,
  },
  textFieldD: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 118,
  },
  textFieldE: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 250,
    [theme.breakpoints.up('md')]: {
      width: 570,
    },
  },
  // rate form : reservePrice
  textFieldF: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(3),
    width: 180,
  },
});

const Input = ({
  classes,
  styleName,
  field: { name, value, onBlur },
  form: { errors, touched, setFieldValue },
  ...props
}) => {
  const errorMessage = getIn(errors, name);
  const isTouched = getIn(touched, name);

  const change = (e, name, shouldValidate) => {
    e.persist();
    const inputValue = e.target.value;
    let value;

    if (
      name === 'lunchQty' ||
      name === 'dinnerQty' ||
      name === 'mealPrice' ||
      name === 'reservePrice'
    ) {
      // to avoid isNaN('') === false, use parseInt('') // output: NaN
      if (inputValue !== '') {
        value = isNaN(inputValue) ? inputValue : parseInt(inputValue, 10);
      }
      if (inputValue === '') {
        value = inputValue;
      }
    }
    if (
      name === 'username' ||
      name === 'password' ||
      name === 'newPassword' ||
      name === 'confirmPassword'
    ) {
      value = inputValue.toLowerCase();
    }
    if (
      name === 'companyName' ||
      name === 'contactNo' ||
      name === 'address' ||
      name === 'email' ||
      name === 'bankAccountId' ||
      name === 'businessType' ||
      name === 'accountHolder' ||
      name === 'bankName' ||
      name === 'accountNo'
    ) {
      value = inputValue;
    }
    return setFieldValue(name, value, shouldValidate);
  };

  return (
    <React.Fragment>
      <TextField
        name={name}
        value={value || ''}
        onChange={e => change(e, name, true)}
        onBlur={onBlur}
        {...props}
        className={classes[styleName]}
        helperText={isTouched && errorMessage}
        error={isTouched && Boolean(errorMessage)}
        inputProps={{ 'data-testid': name, tabIndex: name }}
      />
    </React.Fragment>
  );
};

export default withStyles(styles)(Input);
