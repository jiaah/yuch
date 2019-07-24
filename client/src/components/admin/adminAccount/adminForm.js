import React from 'react';
/* --- Components --- */
import FormikField from '../../../shared/form/formikField';
import FormButton from '../../../shared/form/formButton';
import Button from '../../../shared/form/button';

const AdminForm = ({ isSubmitting, openPasswordForm }) => (
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

export default AdminForm;
