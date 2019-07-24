import React from 'react';
import TextField from '@material-ui/core/TextField';
import { getIn } from 'formik';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  textField: {
    width: 300,
    margin: '20px 14px',
    [theme.breakpoints.up('md')]: {
      width: 400,
    },
  },
  // lunchQty, dinnerQty
  textFieldB: {
    width: 138,
    margin: '20px 14px',
    [theme.breakpoints.up('md')]: {
      width: 188,
    },
  },
  // create/edit user account forms
  textFieldC: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 250,
  },
  textFieldD: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 118,
  },
  textFieldE: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 250,
    [theme.breakpoints.up('md')]: {
      width: 604,
    },
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

    if (name === 'lunchQty' || name === 'dinnerQty' || name === 'mealPrice') {
      // to avoid isNaN('') === false, use parseInt('') // output: NaN
      if (inputValue !== '') {
        value = isNaN(inputValue) ? inputValue : parseInt(inputValue, 10);
      }
      if (inputValue === '') {
        value = inputValue;
      }
    }
    if (
      name === 'companyName' ||
      name === 'contactNo' ||
      name === 'address' ||
      name === 'email'
    ) {
      value = inputValue;
    }
    if (
      name === 'username' ||
      name === 'password' ||
      name === 'newPassword' ||
      name === 'confirmPassword'
    ) {
      value = inputValue.toLowerCase();
    }
    if (name === 'bankAccountId' || name === 'businessType') {
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
      />
    </React.Fragment>
  );
};

export default withStyles(styles)(Input);
