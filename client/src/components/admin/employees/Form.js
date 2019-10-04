import React from 'react';
/* --- Components --- */
import FormikField from '../../../shared/form/formikField';
import FormButton from '../../../shared/form/formButton';

const Form = ({ isSubmitting }) => (
  <React.Fragment>
    <div className="mt4 media--justify-around">
      <div className="media--flex-column-m">
        <FormikField
          label="직원명"
          name="name"
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
          label="시작일"
          name="startedAt"
          type="date"
          icon="calendar"
          styleName="textFieldC"
        />
      </div>
      <div className="media--flex-column-m">
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
      </div>
    </div>
    <FormikField
      label="주소"
      name="address"
      type="text"
      icon="address"
      styleName="textFieldH"
    />
    <FormButton
      typeValue="submit"
      variantValue="contained"
      buttonName="저장"
      width="medium"
      isSubmitting={isSubmitting}
    />
  </React.Fragment>
);

export default Form;
