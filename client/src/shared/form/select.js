import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
/* --- Actions --- */
import { saveSelectedItemValue } from '../../actions/selectedAction';

const styles = theme => ({
  formControl: {
    margin: theme.spacing(-1.6, 1.3, 0, 0),
    minWidth: 120,
    height: 30,
    fontSize: '0.4em',
    color: '#605E5E',
  },
  text: {
    fontSize: '0.4em',
    color: '#605E5E',
  },
});

const SelectForm = ({
  classes: { formControl, text },
  label,
  initValue,
  options,
  saveSelectedItemValue,
  selectedItemValue,
}) => {
  const [value, setValue] = useState(initValue);
  const handleChange = event => {
    const newValue = event.target.value;
    saveSelectedItemValue(newValue);
    setValue(newValue);
  };

  return (
    <form>
      <FormControl variant="outlined" className={formControl}>
        <InputLabel htmlFor="filled-age-simple">{label}</InputLabel>
        <Select
          value={value}
          renderValue={value => value}
          onChange={handleChange}
          classes={text}
        >
          {options.map(item => (
            <MenuItem className={item} value={item.view}>
              {item.view}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </form>
  );
};

const mapStateToProps = state => ({
  selectedItemValue: state.selected.value,
});

const mapDispatchToProps = dispatch => ({
  saveSelectedItemValue: item => dispatch(saveSelectedItemValue(item)),
});

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(SelectForm),
);
