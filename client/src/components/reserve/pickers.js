import React from 'react';
import TextField from '@material-ui/core/TextField';

const Pickers = ({ tommrow, reserveInfo, btnClicked, handleChange }) => {
  const { date, time } = reserveInfo;
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
        fullWidth
        error={btnClicked && date === ''}
        onChange={ev => handleChange(ev)}
        required={true}
      />
      <TextField
        id="time"
        label="시간"
        type="time"
        defaultValue="12:30"
        inputProps={{
          step: 900,
        }}
        InputLabelProps={{
          shrink: true,
        }}
        margin="normal"
        fullWidth
        error={btnClicked && time === ''}
        onChange={ev => handleChange(ev)}
        required={true}
      />
    </form>
  );
};

export default Pickers;
