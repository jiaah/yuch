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
import { thisMonth, nextMonth, inTwoMonths } from '../../../shared/moment';
import IconMessage from '../../../shared/iconMessage';

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit * 3,
    width: 180,
  },
  formControl: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    marginTop: '16px',
    marginBottom: '8px',
    minWidth: 180,
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
  const [date, setDate] = React.useState(nextMonth);

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
    <React.Fragment>
      <form className="mh2 rate-edit-form" onSubmit={handleSubmit}>
        <div className="flex">
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
              startAdornment: (
                <InputAdornment position="start">₩</InputAdornment>
              ),
            }}
            margin="normal"
            className={classes.textField}
          />
          <FormControl className={classes.formControl}>
            <InputLabel required={true}>날짜</InputLabel>
            <Select
              value={date}
              onChange={handleChange}
              renderValue={value => value}
            >
              <MenuItem value={thisMonth}>{thisMonth}</MenuItem>
              <MenuItem value={nextMonth}>{nextMonth}</MenuItem>
              <MenuItem value={inTwoMonths}>{inTwoMonths}</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="rate-edit-form--btn">
          <FormButton
            typeValue="submit"
            variantValue="contained"
            buttonName="수정"
            width="medium"
            isSubmitting={isSubmitting}
          />
        </div>
      </form>
      <div className="flex justify-end pw3">
        <IconMessage
          name="info"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fillOuter="#2196F3"
          fillInner="#ffffff"
          text="입력되는 달부터 가격변동이 적용됩니다."
          classes="icon-message--info f-mini"
        />
      </div>
    </React.Fragment>
  );
};

export default withStyles(styles)(EditUserForm);
