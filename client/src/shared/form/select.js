import React, { useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
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
  labelPosition: { marginTop: '9.7px' },
});

const SelectForm = ({
  classes: { users, text, small, large, regular, inputC, labelPosition },
  label,
  name,
  options,
  size,
  variant,
  required,
  // global state
  selectedValue,
  // actions
  saveSelectValue,
  resetSelectValue,
}) => {
  console.log('Select > selectedValue: ',selectedValue);

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
  if (name === 'users' || name === 'employees' || name === 'guide' || name === 'type') {
    formControl = users;
  }
  if (name === 'position') {
    formControl = inputC;
  }
  if (name === 'updateInvoice') {
    formControl = regular;
  }

  const addLabelMargin = name === 'position' ? labelPosition : '';

  return (
    <div className="no-print">
      <FormControl
        variant={variant}
        required={!!required}
        className={`${formControl} ${width}`}
      >
        <InputLabel htmlFor={label} className={addLabelMargin}>
          {label}
        </InputLabel>
        <Select
          value={selectedValue}
          renderValue={value => value}
          onChange={handleChange}
          className={font}
          inputProps={{
            name,
            id: { label },
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
  connect(null, mapDispatchToProps)(SelectForm),
);
