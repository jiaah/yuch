import React from 'react';
import { Formik } from 'formik';
/* --- Components --- */
import Form from './adminForm';

const AdminFormBox = () => {
  const handleEditAdmin = async (values, { setSubmitting, resetForm }) => {
    console.log(values);
  };

  const values = {
    companyName: '',
    username: '',
    contactNo: '',
    email: '',
  };
  return (
    <Formik
      initialValues={values}
      render={props => <Form {...props} />}
      onSubmit={handleEditAdmin}
      // validationSchema={}
    />
  );
};

export default AdminFormBox;
