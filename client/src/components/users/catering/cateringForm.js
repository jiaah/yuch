import React from 'react';
/* --- Components --- */
import FormButton from '../../../shared/form/formButton';
import InputFields from './inputFields';

const CateringForm = ({
  isSubmitting,
  isLunchQtyDisabled,
  isDinnerQtyDisabled,
  businessType,
}) => (
  <React.Fragment>
    <InputFields
      isLunchQtyDisabled={isLunchQtyDisabled}
      isDinnerQtyDisabled={isDinnerQtyDisabled}
      businessType={businessType}
    />
    <FormButton
      typeValue="submit"
      variantValue="contained"
      buttonName="저장"
      width="extraBig"
      isSubmitting={(isLunchQtyDisabled && isDinnerQtyDisabled) || isSubmitting}
    />
  </React.Fragment>
);

export default CateringForm;
