import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const styles = theme => ({
  formControl: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginTop: '16px',
    marginBottom: '8px',
    minWidth: 180,
  },
});

const ExpireDateSelect = ({
  reserveDate,
  thisMonth,
  nextMonth,
  inTwoMonths,
  handleSelectChange,
  classes,
}) => (
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
);

export default withStyles(styles)(ExpireDateSelect);
