import React from 'react';
import { Formik, Form } from 'formik';
/* --- Components --- */
import CateringForm from './cateringForm';

const CateringFormBox = ({
  id,
  catering,
  updateUserCatering,
  isLunchQtyDisabled,
  isDinnerQtyDisabled,
}) => {
  console.log('catering: ', catering);
  const handleUpdateCatering = async (values, { setSubmitting }) => {
    updateUserCatering(id, values);
    return setSubmitting(false);
  };

  return (
    <Formik
      initialValues={catering}
      render={props => (
        <Form className="flex flex-column-m items-center justify-center">
          <CateringForm
            {...props}
            isLunchQtyDisabled={isLunchQtyDisabled}
            isDinnerQtyDisabled={isDinnerQtyDisabled}
          />
        </Form>
      )}
      onSubmit={handleUpdateCatering}
      // validationSchema={}
    />
  );
};

export default CateringFormBox;
