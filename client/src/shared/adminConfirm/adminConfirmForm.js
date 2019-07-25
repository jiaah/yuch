import React from 'react';
/* --- Components --- */
import PasswordField from '../form/passwordField';
import FormButton from '../form/formButton';
import ConfirmMessage from './confirmMessage';

const AdminConfirmForm = ({ isSubmitting, confirmType }) => (
  <div className="mh3 lh-3 mh-auto">
    <ConfirmMessage type={confirmType} />
    <div className="flex justify-center mt4">
      <PasswordField
        label="비밀번호"
        name="password"
        styleName="textField"
        variant="outlined"
      />
      <div className="ml3 mt2">
        <FormButton
          typeValue="submit"
          variantValue="contained"
          buttonName="삭제"
          width="medium"
          isSubmitting={isSubmitting}
        />
      </div>
    </div>
  </div>
);

export default AdminConfirmForm;
