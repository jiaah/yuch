import React from 'react';
import { Formik, Form } from 'formik';
/* --- Components --- */
import CateringForm from './cateringForm';

const CateringFormBox = ({ catering }) => {
  const handleUpdateCatering = async values => {
    console.log('values: ', values);
  };

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
