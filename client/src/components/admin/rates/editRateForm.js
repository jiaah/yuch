import React from 'react';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
/* --- Components --- */
import FormButton from '../../../shared/form/formButton';
import IconMessage from '../../../shared/iconMessage';
import * as data from '../../../data/message';

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
  values: { reservePrice },
  reserveDate,
  thisMonth,
  nextMonth,
  inTwoMonths,
  handleSelectChange,
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
    <React.Fragment>
      <form className="mh2 rate-edit-form" onSubmit={handleSubmit}>
        <div className="flex">
          <TextField
            id="reservePrice"
            label="변동가격"
            value={reservePrice || ''}
            onChange={e => change(e, 'reservePrice', true)}
            onBlur={handleBlur}
            helperText={touched.reservePrice && errors.reservePrice}
            error={touched.reservePrice && Boolean(errors.reservePrice)}
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
            <InputLabel required={true}>적용날짜 (YYYY/MM)</InputLabel>
            <Select
              value={reserveDate}
              onChange={handleSelectChange}
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
          width="18"
          height="18"
          viewBox="0 0 20 20"
          fillOuter="#2196F3"
          fillInner="#ffffff"
          text={data.updateRateMessage}
          classes="icon-message--info f-mini"
        />
      </div>
    </React.Fragment>
  );
};

export default withStyles(styles)(EditUserForm);
