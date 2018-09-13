import React from 'react';
import TextField from '@material-ui/core/TextField';

const Pickers = ({ handleChange, tommrow }) => (
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
      fullWidth
      onChange={ev => handleChange(ev)}
      required
    />
  </form>
);

export default Pickers;
