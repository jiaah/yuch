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
    <form noValidate className="reserve-form--box tc white">
      <div className="reserve-form">
        <TextField
          id="date"
          label="날짜"
          type="date"
          defaultValue={tommrow}
          InputLabelProps={{
            shrink: true,
          }}
          required={true}
          // minDate not working
          mindate={tommrow}
          onChange={ev => handleChange(ev)}
        />
      </div>
      {/* <div className="reserve-form"> */}
      <TextField
        id="time"
        label="시간"
        type="time"
        defaultValue="12:30"
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          step: 100, // 20 min
        }}
        required={true}
        onChange={ev => handleChange(ev)}
      />
      {/* </div> */}
    </form>
  );
};

const ReserveFormsWrapped = withStyles(styles)(ReserveForms);
export default ReserveFormsWrapped;
