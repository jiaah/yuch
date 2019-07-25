import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
/* --- Components --- */
import MealPriceField from '../../../shared/form/mealPriceField';
import FormButton from '../../../shared/form/formButton';
import IconMessage from '../../../shared/iconMessage';
import * as data from '../../../data/message';

const styles = theme => ({
  formControl: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    marginTop: '16px',
    marginBottom: '8px',
    minWidth: 180,
  },
});

const EditUserForm = ({
  reserveDate,
  thisMonth,
  nextMonth,
  inTwoMonths,
  handleSelectChange,
  isSubmitting,
  classes,
}) => (
  <React.Fragment>
    <div className="mh2 rate-edit-form">
      <div className="flex">
        <MealPriceField
          label="변동가격"
          name="reservePrice"
          type="text"
          styleName="textFieldF"
          placeholder="8000"
          required
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
    </div>
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

export default withStyles(styles)(EditUserForm);
