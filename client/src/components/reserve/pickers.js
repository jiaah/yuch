import React from 'react';
import TextField from '@material-ui/core/TextField';

const Pickers = ({ today, tommrow, reserveInfo, btnClicked, handleChange }) => {
  const { date, time } = reserveInfo;
  return (
    <form>
      <TextField
        id="date"
        label="날짜"
        type="date"
        defaultValue={tommrow}
        margin="normal"
        fullWidth
        // maxDate={today}
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
