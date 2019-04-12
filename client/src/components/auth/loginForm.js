import React from 'react';
import TextField from '@material-ui/core/TextField';
/* --- Components --- */
import Button from '../../shared/button';

const LoginForm = ({
  handleChange,
  handleUserLogin,
  submitBtnClicked,
  username,
  password,
}) => (
  <form className="mh1">
    <TextField
      id="username"
      label="Username"
      value={username}
      onChange={ev => handleChange(ev)}
      onKeyPress={ev => {
        if (ev.key === 'Enter') handleUserLogin(ev);
      }}
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
      onKeyPress={ev => {
        if (ev.key === 'Enter') handleUserLogin(ev);
      }}
      error={submitBtnClicked && (password === '' || password === undefined)}
      required={true}
      margin="normal"
      fullWidth
    />
    <div className="float-left flex">
      <Button
        typeValue="submit"
        handleButtonClick={handleUserLogin}
        variantValue="contained"
        buttonName="로그인"
        width="medium"
      />
    </div>
  </form>
);

export default LoginForm;
