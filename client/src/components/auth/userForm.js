import React from 'react';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
/* --- Components --- */
import Buttons from '../../shared/buttons';

const UserForm = ({
  inputValue,
  handleCheckbox,
  handleChange,
  handleCreateUser,
  handleClose,
}) => {
  const {
    companyName,
    username,
    password,
    confirmPassword,
    contactNumber,
    mealPrice,
    lunchQuantity,
    dinnerQuantity,
    checkedA,
    checkedB,
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
          id="confirmPassword"
          label="비밀번호 확인"
          value={confirmPassword}
          onChange={ev => handleChange(ev)}
          error={
            submitBtnClicked &&
            (confirmPassword === '' || password !== confirmPassword)
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
            (contactNumber !== '' && isNaN(contactNumber)) ||
            (submitBtnClicked &&
              (contactNumber === '' || contactNumber === undefined))
          }
          required={true}
          margin="normal"
          fullWidth
        />
        <TextField
          id="mealPrice"
          label="식수가격"
          value={mealPrice}
          onChange={ev => handleChange(ev)}
          error={
            (mealPrice !== '' && isNaN(mealPrice)) ||
            (submitBtnClicked && (mealPrice === '' || mealPrice === undefined))
          }
          required={true}
          margin="normal"
          fullWidth
        />
        <div>
          <TextField
            id="lunchQuantity"
            label="중식 식수량"
            value={lunchQuantity}
            onChange={ev => handleChange(ev)}
            error={lunchQuantity !== '' && isNaN(lunchQuantity)}
            margin="normal"
            fullWidth
          />
          <TextField
            id="dinnerQuantity"
            label="석식 식수량"
            value={dinnerQuantity}
            onChange={ev => handleChange(ev)}
            error={dinnerQuantity !== '' && isNaN(dinnerQuantity)}
            margin="normal"
            fullWidth
          />
        </div>
      </div>
      <Checkbox
        checked={checkedA}
        value="checkedA"
        onChange={handleCheckbox('checkedA')}
      />
      <Checkbox
        checked={checkedB}
        value="checkedB"
        onChange={handleCheckbox('checkedB')}
      />
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
