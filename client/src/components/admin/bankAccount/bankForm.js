import React from 'react';
/* --- Components --- */
import FormikField from '../../../shared/form/formikField';
import FormButton from '../../../shared/form/formButton';

const BankForm = ({ isSubmitting }) => (
  <div className="mt4">
    <div className="mh1 media--justify-around">
      <FormikField
        label="예금주"
        name="accountHolder"
        type="text"
        icon="filledUser"
        styleName="textFieldC"
        placeholder="유청"
        required
      />
      <FormikField
        label="은행명"
        name="bankName"
        type="text"
        icon="bank"
        styleName="textFieldC"
        placeholder="농협"
        required
      />
      <FormikField
        label="계좌번호"
        name="accountNo"
        type="text"
        icon="payment"
        styleName="textFieldC"
        placeholder="054 - 745 - 0999"
        required
      />
    </div>
    <FormButton
      typeValue="submit"
      variantValue="contained"
      buttonName="저장"
      width="medium"
      isSubmitting={isSubmitting}
    />
  </div>
);

export default BankForm;
