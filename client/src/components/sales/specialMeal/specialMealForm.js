import React from 'react';

/* --- Components --- */
import FormikField from '../../../shared/form/formikField';
import TextArea from '../../../shared/form/textAreaFormik';
import FormButton from '../../../shared/form/formButton';
import TimeField from '../../../shared/form/timeField';

const SpecialMealForm = ({ isSubmitting }) => (
  <React.Fragment>
    <div className="mt4 mb2 media--justify-around">
      <div className="media--flex-column-m">
        <FormikField
          label="고객명"
          name="companyName"
          type="text"
          icon="filledUser"
          styleName="textFieldC"
          required
        />
        <FormikField
          label="일자"
          name="date"
          type="date"
          icon="calendar"
          styleName="textFieldC"
          required
        />
      </div>
      <div className="media--flex-column-m">
        <FormikField
          label="연락처"
          name="contactNo"
          type="text"
          icon="phone"
          styleName="textFieldC"
          placeholder="054-745-0999"
          required
        />
        <TimeField styleName="textFieldC" required />
      </div>
    </div>
    <div className="flex justify-center">
      <FormikField
        label="반찬개수"
        name="sideDish"
        type="text"
        icon="catering"
        styleName="textFieldD"
        required
      />
      <FormikField
        label="식수량"
        name="quantity"
        type="text"
        icon="catering"
        styleName="textFieldD"
        required
      />
      <FormikField
        label="식수가격"
        name="mealPrice"
        type="text"
        icon="money"
        styleName="textFieldD"
        required
      />
    </div>
    <FormikField
      label="주소"
      name="address"
      type="text"
      icon="address"
      styleName="textFieldH"
    />
    <TextArea
      name="note"
      type="text"
      styleName="textField"
      placeholder="메모 ( 작성된 메모를 등록된 고객이 볼 수 있습니다. )"
      rows={6}
    />
    <div className="mt2 justify-center">
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

export default SpecialMealForm;
