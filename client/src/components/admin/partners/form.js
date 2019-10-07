import React from 'react';
/* --- Components --- */
import FormikField from '../../../shared/form/formikField';
import FormButton from '../../../shared/form/formButton';

const Form = ({ isSubmitting }) => (
  <div className="mt4 flex flex-column-m items-center">
    <FormikField
      label="업체명"
      name="companyName"
      type="text"
      icon="filledUser"
      styleName="textFieldC"
      required
    />
    <FormikField
      label="연락처"
      name="contactNo"
      type="text"
      icon="phone"
      styleName="textFieldC"
      required
    />
    <FormikField
      label="예금주"
      name="accountHolder"
      type="text"
      icon="filledUser"
      styleName="textFieldC"
    />
    <FormikField
      label="은행명"
      name="bankName"
      type="text"
      icon="bank"
      styleName="textFieldC"
    />
    <FormikField
      label="계좌번호"
      name="accountNo"
      type="text"
      icon="payment"
      styleName="textFieldC"
    />
    <FormButton
      typeValue="submit"
      variantValue="contained"
      buttonName="저장"
      width="medium"
      isSubmitting={isSubmitting}
    />
  </div>
);

export default Form;
