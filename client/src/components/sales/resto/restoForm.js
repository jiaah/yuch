import React from 'react';
/* --- Components --- */
import FormikField from '../../../shared/form/formikField';
import FormButton from '../../../shared/form/formButton';

const CateringForm = ({ isSubmitting }) => (
  <React.Fragment>
    <div className="pb2">
      <FormikField
        label="중식"
        name="lunchQty"
        type="text"
        icon="catering"
        styleName="textFieldC"
        variant="outlined"
      />
      <FormikField
        label="석식"
        name="dinnerQty"
        type="text"
        icon="catering"
        styleName="textFieldC"
        variant="outlined"
      />
    </div>
    <FormButton
      typeValue="submit"
      variantValue="contained"
      buttonName="저장"
      width="extraBig"
      isSubmitting={isSubmitting}
    />
  </React.Fragment>
);

export default CateringForm;
