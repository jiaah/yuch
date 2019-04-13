import React from 'react';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
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
      bankAccount,
    },
    errors,
    touched,
    handleChange,
    handleSubmit,
    isSubmitting,
    handleBlur,
    handleClose,
  } = props;
  return (
    <React.Fragment>
      <h3 className="f-en b"> 신규업체 등록 </h3>
      <form className="mh1 " onSubmit={handleSubmit}>
        <div className="users-form-fields mb4">
          <div>
            <TextField
              id="companyName"
              label="고객명"
              placeholder="(한글) 유청"
              value={companyName}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.companyName && errors.companyName}
              error={touched.companyName && Boolean(errors.companyName)}
              required={true}
              margin="normal"
              fullWidth
            />
            <TextField
              id="username"
              label="고객 아이디"
              placeholder="(영문) yucheong"
              value={username}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.username && errors.username}
              error={touched.username && Boolean(errors.username)}
              required={true}
              margin="normal"
              fullWidth
            />
            <TextField
              id="password"
              label="비밀번호"
              type="password"
              placeholder="(영문 or 숫자)"
              value={password}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.password && errors.password}
              error={touched.password && Boolean(errors.password)}
              required={true}
              margin="normal"
              fullWidth
            />
            <TextField
              id="confirmPassword"
              label="비밀번호 확인"
              type="password"
              value={confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.confirmPassword && errors.confirmPassword}
              error={touched.confirmPassword && Boolean(errors.confirmPassword)}
              required={true}
              margin="normal"
              fullWidth
            />
          </div>
          <div>
            <TextField
              id="contactNumber"
              label="연락처"
              placeholder="0547450999"
              value={contactNumber}
              onChange={handleChange}
              onBlur={handleBlur}
              helperText={touched.contactNumber && errors.contactNumber}
              error={
                (contactNumber !== '' && isNaN(contactNumber)) ||
                (touched.contactNumber && Boolean(errors.contactNumber))
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
              onBlur={handleBlur}
              helperText={touched.mealPrice && errors.mealPrice}
              error={
                (mealPrice !== '' && isNaN(mealPrice)) ||
                (touched.mealPrice && Boolean(errors.mealPrice))
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
                onBlur={handleBlur}
                helperText={touched.lunchQuantity && errors.lunchQuantity}
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
                onBlur={handleBlur}
                helperText={touched.dinnerQuantity && errors.dinnerQuantity}
                error={dinnerQuantity !== '' && isNaN(dinnerQuantity)}
                margin="normal"
                fullWidth
              />
            </div>
            <FormControl>
              <FormLabel className="mt3">입금 계좌번호</FormLabel>
              <RadioGroup
                aria-label="bankAccount"
                name="bankAccount"
                value={bankAccount}
                onChange={handleChange}
                row
              >
                <FormControlLabel
                  value="1"
                  control={<Radio color="primary" />}
                  label="김귀자 농협"
                  labelPlacement="end"
                />
                <FormControlLabel
                  value="2"
                  control={<Radio color="primary" />}
                  label="이상환 농협"
                  labelPlacement="end"
                />
              </RadioGroup>
            </FormControl>
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
