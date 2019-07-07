import React from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
/* --- Components --- */
import FormButton from '../../../shared/formButton';
import { nextMonth } from '../../../shared/moment';

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 150,
  },
  formControl: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    marginTop: '16px',
    marginBottom: '8px',
    minWidth: 150,
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
  const month = nextMonth === '13' ? '1' : nextMonth;
  const [date, setDate] = React.useState(month);

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

  const handleChange = e => setDate(e.target.value);

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
      <FormControl className={classes.formControl}>
        <InputLabel required={true}>가격변동 적용되는 달</InputLabel>
        <Select
          value={date}
          onChange={handleChange}
          renderValue={value => value}
        >
          <MenuItem value="1월">1</MenuItem>
          <MenuItem value="2월">2</MenuItem>
          <MenuItem value="3월">3</MenuItem>
          <MenuItem value="4월">4</MenuItem>
          <MenuItem value="5월">5</MenuItem>
          <MenuItem value="6월">6</MenuItem>
          <MenuItem value="7월">7</MenuItem>
          <MenuItem value="8월">8</MenuItem>
          <MenuItem value="9월">9</MenuItem>
          <MenuItem value="10월">10</MenuItem>
          <MenuItem value="11월">11</MenuItem>
          <MenuItem value="12월">12</MenuItem>
        </Select>
      </FormControl>
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
