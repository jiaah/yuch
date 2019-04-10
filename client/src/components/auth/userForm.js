import React from 'react';
import TextField from '@material-ui/core/TextField';

import Buttons from '../../shared/buttons';

const UserForm = ({
  inputValue,
  handleChange,
  handleCreateUser,
  handleClose,
}) => {
  const {
    companyName,
    username,
    password,
    contactNumber,
    submitBtnClicked,
  } = inputValue;

  return (
    <React.Fragment>
      <h3 className="f-en b"> 신규업체 등록 </h3>
      <div className="mh1">
        <TextField
          id="companyName"
          label="고객명"
          value={companyName}
          onChange={ev => handleChange(ev)}
          error={
            submitBtnClicked &&
            (companyName === '' || companyName === undefined)
          }
          required={true}
          margin="normal"
          fullWidth
        />
        <TextField
          id="username"
          label="고객 아이디"
          value={username}
          onChange={ev => handleChange(ev)}
          error={
            submitBtnClicked && (username === '' || username === undefined)
          }
          required={true}
          margin="normal"
          fullWidth
        />
        <TextField
          id="password"
          label="비밀번호"
          value={password}
          onChange={ev => handleChange(ev)}
          error={
            submitBtnClicked && (password === '' || password === undefined)
          }
          required={true}
          margin="normal"
          fullWidth
        />
        <TextField
          id="contactNumber"
          label="연락처"
          value={contactNumber}
          onChange={ev => handleChange(ev)}
          error={
            submitBtnClicked &&
            (contactNumber === '' || contactNumber === undefined)
          }
          required={true}
          margin="normal"
          fullWidth
        />
      </div>
      <Buttons
        handleFirstButtonClick={handleCreateUser}
        handleSecondButtonClick={handleClose}
        firstButtonName="가입하기"
        secondButtonName="닫기"
      />
    </React.Fragment>
  );
};

export default UserForm;
