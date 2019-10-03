import React from 'react';
/* --- Components --- */
import FormikField from '../../../shared/form/formikField';
import FormButton from '../../../shared/form/formButton';

const Form = ({ isSubmitting }) => (
  <div className=" mt4">
    <div className="mh1 media--justify-around">
      <FormikField
        label="직원명"
        name="name"
        type="text"
        icon="filledUser"
        styleName="textFieldC"
        required
      />
      <FormikField
        label="예금주"
        name="accountHolder"
        type="text"
        icon="filledUser"
        styleName="textFieldC"
        required
      />
      <FormikField
        label="은행명"
        name="bankName"
        type="text"
        icon="bank"
        styleName="textFieldC"
        required
      />
      <FormikField
        label="계좌번호"
        name="accountNo"
        type="text"
        icon=""
        styleName="textFieldC"
        required
      />
      <FormikField
        label="직원명"
        name="contactNo"
        type="text"
        icon="phone"
        styleName="textFieldC"
        required
      />
      <FormikField
        label="주소"
        name="address"
        type="text"
        icon="address"
        styleName="textFieldC"
      />
      <FormikField
        label="시작일"
        name="startedAt"
        type="date"
        icon="calendar"
        styleName="textFieldC"
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

export default Form;
