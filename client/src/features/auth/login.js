import React from 'react';
import TextFields from './textFields';
import * as data from '../../shared/data';
import Buttons from './buttons';

const Login = () => (
  <div className="tc login-container">
    <TextFields loginform={data.loginForm} />
    <Buttons loginbtn={data.loginBtn} />
  </div>
);
export default Login;
