import React from 'react';
/* --- Components --- */
import FormikField from '../../../shared/form/formikField';
import FormButton from '../../../shared/form/formButton';

const SpecialMealForm = ({ isSubmitting }) => (
  <React.Fragment>
    <div className="mh1 mb2 media--justify-around">
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
          type="text"
          icon=""
          styleName="textFieldC"
          required
        />
        <FormikField
          label="식수량"
          name="quantity"
          type="text"
          icon="catering"
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
          required
        />
        <FormikField
          label="시간"
          name="time"
          type="text"
          icon=""
          styleName="textFieldC"
          required
        />
        <FormikField
          label="식수가격"
          name="mealPrice"
          type="text"
          icon="money"
          styleName="textFieldC"
          required
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
    <FormikField
      label="메모"
      name="memo"
      type="text"
      icon=""
      styleName="textFieldH"
      required
    />
    <div className="justify-center">
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
