import React from 'react';
import TextField from '@material-ui/core/TextField';

const LoginForm = ({ handleChange, submitBtnClicked, username, password }) => (
  <div className="mh1">
    <TextField
      id="username"
      label="Username"
      value={username}
      onChange={ev => handleChange(ev)}
      error={submitBtnClicked && (username === '' || username === undefined)}
      required={true}
      margin="normal"
      fullWidth
    />
    <TextField
      id="password"
      label="Password"
      value={password}
      onChange={ev => handleChange(ev)}
      error={submitBtnClicked && (password === '' || password === undefined)}
      required={true}
      margin="normal"
      fullWidth
    />
  </div>
);

export default LoginForm;
