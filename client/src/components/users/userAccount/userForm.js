import React from 'react';
/* --- Components --- */
import FormikField from '../../../shared/form/formikField';
import FormButton from '../../../shared/form/formButton';
import Button from '../../../shared/form/button';

const UserForm = ({ isSubmitting, openPasswordForm }) => (
  <React.Fragment>
    <FormikField
      label="고객명"
      name="companyName"
      type="text"
      icon="filledUser"
      styleName="textField"
      required
    />
    <FormikField
      label="고객 아이디"
      name="username"
      type="text"
      icon="user"
      styleName="textField"
      required
    />
    <FormikField
      label="연락처"
      name="contactNo"
      type="text"
      icon="phone"
      styleName="textField"
      placeholder="000-0000-0000"
      required
    />
    <FormikField
      label="이메일"
      name="email"
      type="email"
      icon="email"
      styleName="textField"
      placeholder="yuchung@hanmail.net"
      required
    />
    <FormikField
      label="사업자번호"
      name="businessNo"
      type="text"
      icon="bankAccount"
      styleName="textField"
      placeholder="000-00-00000"
    />
    <div className="flex justify-center">
      <FormikField
        label="중식 식수량"
        name="lunchQty"
        type="text"
        icon="catering"
        styleName="textFieldB"
      />
      <FormikField
        label="석식 식수량"
        name="dinnerQty"
        type="text"
        icon="catering"
        styleName="textFieldB"
      />
    </div>
    <FormikField
      label="식수가격"
      name="mealPrice"
      type="text"
      icon="money"
      styleName="textField"
      disabled
    />
    <FormikField
      label="주소"
      name="address"
      type="text"
      icon="address"
      styleName="textField"
    />
    <div>
      <Button
        typeValue="button"
        variantValue="outlined"
        buttonName="비밀번호 변경"
        width="medium"
        handleButtonClick={openPasswordForm}
        testId="to-password-modal-btn"
      />
      <FormButton
        typeValue="submit"
        variantValue="contained"
        buttonName="저장"
        width="medium"
        isSubmitting={isSubmitting}
      />
    </div>
  </React.Fragment>
);

export default UserForm;
