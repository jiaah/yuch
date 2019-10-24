import React, { useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputAdornment from '@material-ui/core/InputAdornment';
import Icon from '../../../assets/icons';
/* --- Actions --- */
import {
  saveSelectValue,
  resetSelectValue,
} from '../../actions/selectedAction';

const styles = theme => ({
  users: {
    margin: theme.spacing(-1.4, 1.3, 0, 0),
  },
  inputC: {
    margin: theme.spacing(2, 1, 1, 1),
    // marginRight: theme.spacing(1),
    width: 260,
  },
  regular: {
    margin: '1em',
  },
  text: {
    fontSize: '0.9em',
    color: '#605E5E',
  },
  small: {
    minWidth: 60,
    height: 30,
    [theme.breakpoints.up('sm')]: {
      minWidth: 120,
    },
  },
  large: {
    width: 200,
  },
  labelPosition: { marginTop: '9.7px', marginLeft: '-13.8px' },
});

const SelectForm = ({
  classes: { users, text, small, large, regular, inputC, labelPosition },
  label,
  name,
  options,
  size,
  // global state
  selectedValue,
  // actions
  saveSelectValue,
  resetSelectValue,
}) => {
  const handleChange = ({ target: name }) =>
    saveSelectValue(name.name, name.value);

  useEffect(() => () => resetSelectValue(name), []);

  const font = size === 'small' ? text : '';

  let width;
  if (size === 'small') {
    width = small;
  }
  if (size === 'large') {
    width = large;
  }

  let formControl;
  if (name === 'users' || name === 'employees' || name === 'guide') {
    formControl = users;
  }
  if (name === 'position') {
    formControl = inputC;
  }
  if (name === 'updateInvoice') {
    formControl = regular;
  }

  return (
    <div className="no-print">
      <FormControl variant="outlined" className={`${formControl} ${width}`}>
        <InputLabel htmlFor="filled-age-simple" className={labelPosition}>
          {label}
        </InputLabel>
        <Select
          value={selectedValue}
          renderValue={selectedValue => selectedValue}
          onChange={handleChange}
          className={font}
          inputProps={{
            name,
            id: 'users-active-status',
          }}
        >
          {options.map(item => (
            <MenuItem key={item.value} className={font} value={item.value}>
              {item.value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  saveSelectValue: (name, value) => dispatch(saveSelectValue(name, value)),
  resetSelectValue: value => dispatch(resetSelectValue(value)),
});

export default withStyles(styles)(
  connect(
    null,
    mapDispatchToProps,
  )(SelectForm),
);
