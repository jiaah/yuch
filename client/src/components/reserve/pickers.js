import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
/* --- Components --- */
import * as moment from '../../shared/moment';

const styles = () => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    width: 400,
    margin: 5,
  },
});

const Pickers = ({ handleChange }) => {
  const { tommrow } = moment;
  return (
    <form noValidate>
      <TextField
        id="date"
        label="날짜"
        type="date"
        // minDate not working !!
        defaultValue={tommrow}
        mindate={tommrow}
        InputLabelProps={{
          shrink: true,
        }}
        margin="normal"
        onChange={ev => handleChange(ev)}
        required
      />
      <TextField
        id="time"
        label="시간"
        type="time"
        defaultValue="12:30"
        inputProps={{
          step: 100, // 20 min
        }}
        InputLabelProps={{
          shrink: true,
        }}
        margin="normal"
        onChange={ev => handleChange(ev)}
        required
      />
    </form>
  );
};

export default withStyles(styles)(Pickers);
