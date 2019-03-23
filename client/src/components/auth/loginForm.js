import React from 'react';
import TextField from '@material-ui/core/TextField';

const LoginForm = ({ handleChange, username, password }) => (
  <div className="mh1">
    <TextField
      id="username"
      label="Username"
      value={username}
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
