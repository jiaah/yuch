import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const styles = theme => ({
  formControl: {
    width: 200,
    marginTop: '30px',
    [theme.breakpoints.up('md')]: {
      marginLeft: '40px',
      marginTop: '18px',
      marginBottom: '11px',
    },
  },
});

const ExpireDateSelect = ({
  reserveDate,
  thisMonth,
  nextMonth,
  lastMonth,
  handleSelectChange,
  classes,
}) => (
  <FormControl className={classes.formControl}>
    <InputLabel required={true}>적용일자 (YYYY/MM/01)</InputLabel>
    <Select
      value={reserveDate}
      onChange={handleSelectChange}
      renderValue={value => value}
    >
      <MenuItem value={lastMonth}>{lastMonth}</MenuItem>
      <MenuItem value={thisMonth}>{thisMonth}</MenuItem>
      <MenuItem value={nextMonth}>{nextMonth}</MenuItem>
    </Select>
  </FormControl>
);

export default withStyles(styles)(ExpireDateSelect);
