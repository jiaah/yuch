import React from 'react';
import { Formik, Form } from 'formik';
/* --- Components --- */
import CateringForm from './cateringForm';

const CateringFormBox = ({ today, id, catering, updateUserCatering }) => {
  const handleUpdateCatering = async (values, { setSubmitting }) => {
    // No permission when 'today > values.date'
    updateUserCatering(id, values);
    return setSubmitting(false);
  };
  console.log('catering: ', catering);
  return (
    <Formik
      initialValues={catering}
      render={props => (
        <Form className="flex flex-column-m items-center justify-center">
          <CateringForm {...props} />
        </Form>
      )}
      onSubmit={handleUpdateCatering}
      // validationSchema={}
    />
  );
};

export default CateringFormBox;
