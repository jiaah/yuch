import React from 'react';
/* --- Components --- */
import FormikField from '../../../shared/form/formikField';
import MealPriceField from '../../../shared/form/mealPriceField';
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
      placeholder="(한글) 유청"
      required
    />
    <FormikField
      label="고객 아이디"
      name="username"
      type="text"
      icon="user"
      styleName="textField"
      placeholder="(영문) yucheong"
      required
    />
    <FormikField
      label="연락처"
      name="contactNo"
      type="text"
      icon="phone"
      styleName="textField"
      placeholder="054 - 745 - 0999"
      required
    />
    <FormikField
      label="이메일"
      name="email"
      type="email"
      icon="email"
      styleName="textField"
      placeholder="sleket12@hanmail.net"
      required
    />
    <div className="flex justify-center">
      <FormikField
        label="중식 식수량"
        name="lunchQty"
        type="text"
        icon="catering"
        styleName="textFieldB"
        placeholder="70"
      />
      <FormikField
        label="석식 식수량"
        name="dinnerQty"
        type="text"
        icon="catering"
        styleName="textFieldB"
        placeholder="35"
      />
    </div>
    <MealPriceField
      label="식수가격"
      name="mealPrice"
      type="text"
      icon="user"
      styleName="textField"
      placeholder="5000"
      disabled
    />
    <FormikField
      label="주소"
      name="address"
      type="text"
      icon="address"
      styleName="textField"
      placeholder="황성동 1071-1번지 강남골프장 맞은편"
    />
    <div>
      <Button
        typeValue="button"
        variantValue="outlined"
        buttonName="비밀번호 변경"
        width="medium"
        handleButtonClick={openPasswordForm}
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
