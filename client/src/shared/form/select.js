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
  formControl: {
    margin: theme.spacing(-1.4, 1.3, 0, 0),
    minWidth: 60,
    height: 30,
    [theme.breakpoints.up('sm')]: {
      minWidth: 120,
    },
  },
  text: {
    fontSize: '0.9em',
    color: '#605E5E',
  },
});

const SelectForm = ({
  classes: { formControl, text },
  label,
  name,
  options,
  selectedValue,
  // actions
  saveSelectValue,
  resetSelectValue,
}) => {
  const handleChange = ({ target: name }) => {
    saveSelectValue(name.name, name.value);
  };

  useEffect(
    () => () => {
      resetSelectValue(name);
    },
    [],
  );

  return (
    <form>
      <FormControl variant="outlined" className={formControl}>
        <InputLabel htmlFor="filled-age-simple">{label}</InputLabel>
        <Select
          value={selectedValue}
          renderValue={selectedValue => selectedValue}
          onChange={handleChange}
          className={text}
          inputProps={{
            name: 'users',
            id: 'users-active-status',
          }}
        >
          {options.map(item => (
            <MenuItem key={item.value} className={text} value={item.value}>
              {item.value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </form>
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
