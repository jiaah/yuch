import React from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
/* --- Components --- */
import FormButton from '../../../shared/formButton';

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 250,
  },
});

const EditUserForm = ({
  values: { mealPrice },
  errors,
  touched,
  handleSubmit,
  isSubmitting,
  handleBlur,
  setFieldValue,
  classes,
}) => {
  const change = (e, name, shouldValidate) => {
    e.persist();
    const inputValue = e.target.value;
    let value;
    if (inputValue !== '') {
      value = isNaN(inputValue) ? inputValue : parseInt(inputValue, 10);
    }
    if (inputValue === '') {
      value = inputValue;
    }
    return setFieldValue(name, value, shouldValidate);
  };

  return (
    <form className="mh1" onSubmit={handleSubmit}>
      <TextField
        id="mealPrice"
        label="식수가격"
        placeholder="5000"
        value={mealPrice || ''}
        onChange={e => change(e, 'mealPrice', true)}
        onBlur={handleBlur}
        helperText={touched.mealPrice && errors.mealPrice}
        error={touched.mealPrice && Boolean(errors.mealPrice)}
        required={true}
        InputProps={{
          startAdornment: <InputAdornment position="start">₩</InputAdornment>,
        }}
        margin="normal"
        className={classes.textField}
      />
      <FormButton
        typeValue="submit"
        variantValue="contained"
        buttonName="수정"
        width="medium"
        isSubmitting={isSubmitting}
      />
    </form>
  );
};

export default withStyles(styles)(EditUserForm);
