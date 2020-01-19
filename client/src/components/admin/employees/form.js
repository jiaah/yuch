import React from 'react';
/* --- Components --- */
import FormikField from '../../../shared/form/formikField';
import FormButton from '../../../shared/form/formButton';
import Select from '../../../shared/form/select';

const Form = ({ isSubmitting, position }) => (
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
        <Select
          label="직책"
          name="position"
          selectedValue={position}
          options={[
            { value: '사장' },
            { value: '부사장' },
            { value: '매니저' },
            { value: '주방장' },
            { value: '주방보조' },
            { value: '부장' },
            { value: '기사' },
            { value: '직원' },
          ]}
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
          label="주소"
          name="address"
          type="text"
          icon="address"
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
        <FormikField
          label="시작일"
          name="startDate"
          type="date"
          icon="calendar"
          styleName="textFieldC"
        />
      </div>
    </div>
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
