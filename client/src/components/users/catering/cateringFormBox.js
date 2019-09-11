import React from 'react';
import { Formik, Form } from 'formik';
/* --- Components --- */
import CateringForm from './cateringForm';

const CateringFormBox = ({ catering, id, updateUserCatering }) => {
  const handleUpdateCatering = async values => {
    updateUserCatering(id, values);
    console.log('values: ', values);
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
