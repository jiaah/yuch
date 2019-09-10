import React from 'react';
/* --- Components --- */
import FormikField from '../../../shared/form/formikField';
import FormButton from '../../../shared/form/formButton';

const CateringForm = ({ isSubmitting }) => (
  <React.Fragment>
    <div>
      <FormikField
        label="중식"
        name="lunchQty"
        type="text"
        icon="catering"
        styleName="textFieldC"
      />
      <FormikField
        label="석식"
        name="dinnerQty"
        type="text"
        icon="catering"
        styleName="textFieldC"
      />
      <FormikField
        label="야식"
        name="lateNightSnackQty"
        type="text"
        icon="catering"
        styleName="textFieldC"
      />
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

export default CateringForm;
