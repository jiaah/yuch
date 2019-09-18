import React from 'react';
import { Formik, Form } from 'formik';
/* --- Components --- */
import RestoForm from './restoForm';

const RestoFormBox = ({ id, resto, updateUserCatering }) => {
  const handleUpdateRestoSales = async (values, { setSubmitting }) => {
    updateUserCatering(id, values);
    return setSubmitting(false);
  };

  return (
    <Formik
      initialValues={resto}
      render={props => (
        <Form className="flex flex-column-m items-center justify-center">
          <RestoForm {...props} />
        </Form>
      )}
      onSubmit={handleUpdateRestoSales}
      // validationSchema={}
    />
  );
};

export default RestoFormBox;
