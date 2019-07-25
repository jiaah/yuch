import React from 'react';
/* --- Components --- */
import FormikField from '../../../shared/form/formikField';
import FormButton from '../../../shared/form/formButton';

const BankForm = ({ isSubmitting }) => (
  <React.Fragment>
    <div className="mt5 mb2 user-form">
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
        label="은행명"
        name="accountNo"
        type="text"
        icon="bankAccount"
        styleName="textFieldC"
        placeholder="054 - 745 - 0999"
        required
      />
    </div>
    <div className="edit-userform--bottom">
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

export default BankForm;
