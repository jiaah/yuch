import React from 'react';
/* --- Components --- */
import FormButton from '../../../shared/form/formButton';
import InputFields from './inputFields';

const CateringForm = ({
  date,
  endDate,
  isSubmitting,
  isLunchQtyDisabled,
  isDinnerQtyDisabled,
}) => {
  const endService = date >= endDate;
  return (
    <React.Fragment>
      <InputFields
        isLunchQtyDisabled={isLunchQtyDisabled}
        isDinnerQtyDisabled={isDinnerQtyDisabled}
      />
      <FormButton
        typeValue="submit"
        variantValue="contained"
        buttonName="저장"
        width="extraBig"
        isSubmitting={
          (isLunchQtyDisabled && isDinnerQtyDisabled) ||
          isSubmitting ||
          endService
        }
      />
    </React.Fragment>
  );
};

export default CateringForm;
