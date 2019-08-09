import React from 'react';
/* --- Components --- */
import PasswordField from '../../../shared/form/passwordField';
import FormButton from '../../../shared/form/formButton';
import Button from '../../../shared/form/button';

const ChangePwForm = ({ isSubmitting, closePasswordForm }) => (
  <React.Fragment>
    <PasswordField label="비밀번호" name="password" styleName="textField" />
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
    <div>
      <Button
        typeValue="button"
        variantValue="outlined"
        buttonName="취소"
        width="medium"
        handleButtonClick={closePasswordForm}
      />
      <FormButton
        typeValue="submit"
        variantValue="contained"
        buttonName="변경"
        width="medium"
        isSubmitting={isSubmitting}
      />
    </div>
  </React.Fragment>
);

export default ChangePwForm;
