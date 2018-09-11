import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
/* --- Components --- */
import * as moment from '../../shared/moment';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
});

const ReserveForms = ({ handleChange }) => {
  const { tommrow } = moment;
  return (
    <div className="tc white reserve-container">
      <form noValidate className="flex justify-around">
        <TextField
          id="date"
          label="날짜"
          type="date"
          defaultValue={tommrow}
          InputLabelProps={{
            shrink: true,
          }}
          margin="normal"
          required={true}
          // minDate not working
          mindate={tommrow}
          onChange={ev => handleChange(ev)}
        />
        <TextField
          id="time"
          label="시간"
          type="time"
          defaultValue="12:30"
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            step: 100, // 30 min
          }}
          margin="normal"
          required={true}
          onChange={ev => handleChange(ev)}
        />
      </form>
    </div>
  );
};

export default withStyles(styles)(ReserveForms);
