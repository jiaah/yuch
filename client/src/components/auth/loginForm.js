import React from 'react';
import TextField from '@material-ui/core/TextField';

const LoginForm = ({ handleChange, id, password }) => (
  <div className="mh1">
    <TextField
      id="id"
      label="ID"
      value={id}
      onChange={ev => handleChange(ev)}
      margin="normal"
      fullWidth
    />
    <TextField
      id="password"
      label="Password"
      value={password}
      onChange={ev => handleChange(ev)}
      margin="normal"
      fullWidth
    />
  </div>
);

export default LoginForm;
