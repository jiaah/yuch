import React from 'react';
import TextField from '@material-ui/core/TextField';

const TextFields = ({ loginform, handleChange }) => (
  <div>
    {loginform &&
      loginform.map(e => (
        <TextField
          key={e.key}
          // id={e.id}
          label={e.label}
          value={e.value}
          // InputLabelProps={{ shrink: true }}
          margin="normal"
          fullWidth
          onChange={ev => handleChange(ev)}
          // required={true}
        />
      ))}
  </div>
);

export default TextFields;
