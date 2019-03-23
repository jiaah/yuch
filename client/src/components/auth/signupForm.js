import React from 'react';
import TextField from '@material-ui/core/TextField';

import Buttons from '../../shared/buttons';

const SignupAuth = ({
  companyName,
  username,
  contactNumber,
  handleChange,
  handleUserSignup,
  handleClose,
}) => (
  <React.Fragment>
    <p className="lh-1">
      죄송합니다. <br />
      유청 고객님께 좀 더 나은 서비스를 제공하고자 서버를 준비중입니다.
      <br />
    </p>
    <div className="mh1">
      <TextField
        id="companyName"
        label="고객명"
        value={companyName}
        onChange={ev => handleChange(ev)}
        margin="normal"
        fullWidth
      />
      <TextField
        id="username"
        label="고객 아이디"
        value={username}
        onChange={ev => handleChange(ev)}
        margin="normal"
        fullWidth
      />
      <TextField
        id="contactNumber"
        label="연락처"
        value={contactNumber}
        onChange={ev => handleChange(ev)}
        margin="normal"
        fullWidth
      />
    </div>
    <Buttons
      handleFirstButtonClick={handleUserSignup}
      handleSecondButtonClick={handleClose}
      firstButtonName="가입하기"
      secondButtonName="닫기"
    />
  </React.Fragment>
);

export default SignupAuth;
