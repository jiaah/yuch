import React from 'react';
/* --- Components --- */
import PasswordField from '../../../shared/form/passwordField';
import FormButton from '../../../shared/form/formButton';

const ResetPwForm = ({ isSubmitting }) => (
  <div className="mh3 flex flex-column-m items-center">
    <PasswordField
      label="새 비밀번호"
      name="newPassword"
      styleName="textField"
      placeholder="(숫자 or 숫자+영문 조합)"
    />
    <PasswordField
      label="비밀번호 확인"
      name="confirmPassword"
      styleName="textField"
    />
    <FormButton
      typeValue="submit"
      variantValue="contained"
      buttonName="변경"
      width="medium"
      isSubmitting={isSubmitting}
    />
  </div>
);

export default ResetPwForm;
