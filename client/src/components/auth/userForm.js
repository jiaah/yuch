import React from 'react';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
/* --- Components --- */
import FormButton from '../../shared/formButton';
import Button from '../../shared/button';

const UserForm = props => {
  const {
    values: {
      companyName,
      username,
      password,
      confirmPassword,
      contactNumber,
      mealPrice,
      lunchQuantity,
      dinnerQuantity,
    },
    errors,
    touched,
    handleChange,
    handleSubmit,
    isSubmitting,
    handleBlur,
    handleCheckbox,
    handleClose,
  } = props;

  const { checkedA, checkedB, submitBtnClicked } = props.state;
  return (
    <React.Fragment>
      <h3 className="f-en b"> 신규업체 등록 </h3>
      <form className="mh1 " onSubmit={handleSubmit}>
        <div className="users-form-fields mb4">
          <div>
            <TextField
              id="companyName"
              label="고객명"
              placeholder="유청"
              value={companyName}
              onChange={handleChange}
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
              placeholder="yucheong"
              value={username}
              onChange={handleChange}
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
              type="password"
              value={password}
              onChange={handleChange}
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
              type="password"
              helperText={
                submitBtnClicked &&
                (confirmPassword === '' || password !== confirmPassword)
                  ? '비밀번호가 일치하지 않습니다.'
                  : null
              }
              value={confirmPassword}
              onChange={handleChange}
              error={
                submitBtnClicked &&
                (confirmPassword === '' || password !== confirmPassword)
              }
              required={true}
              margin="normal"
              fullWidth
            />
          </div>
          <div>
            <TextField
              id="contactNumber"
              label="연락처"
              placeholder="054-745-0999"
              value={contactNumber}
              onChange={handleChange}
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
              placeholder="5000"
              value={mealPrice}
              onChange={handleChange}
              error={
                (mealPrice !== '' && isNaN(mealPrice)) ||
                (submitBtnClicked &&
                  (mealPrice === '' || mealPrice === undefined))
              }
              required={true}
              margin="normal"
              fullWidth
            />
            <div className="flex justify-between">
              <TextField
                id="lunchQuantity"
                label="중식 식수량"
                placeholder="70"
                value={lunchQuantity}
                onChange={handleChange}
                error={lunchQuantity !== '' && isNaN(lunchQuantity)}
                margin="normal"
                fullWidth
              />
              <TextField
                id="dinnerQuantity"
                label="석식 식수량"
                placeholder="35"
                value={dinnerQuantity}
                onChange={handleChange}
                error={dinnerQuantity !== '' && isNaN(dinnerQuantity)}
                margin="normal"
                fullWidth
              />
            </div>
            <FormGroup row className="mt3">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkedA}
                    value="checkedA"
                    onChange={handleCheckbox('checkedA')}
                  />
                }
                label="김귀자 농협"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkedB}
                    value="checkedB"
                    onChange={handleCheckbox('checkedB')}
                  />
                }
                label="이상환 농협"
              />
            </FormGroup>
          </div>
        </div>
        <FormButton
          typeValue="submit"
          variantValue="contained"
          buttonName="저장"
          width="medium"
          isSubmitting={isSubmitting}
        />
        <Button
          typeValue="reset"
          variantValue="contained"
          buttonName="닫기"
          width="medium"
          handleButtonClick={ev => handleClose(ev)}
        />
      </form>
    </React.Fragment>
  );
};

export default UserForm;
