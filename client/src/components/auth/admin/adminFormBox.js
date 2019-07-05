import React from 'react';
import { Formik } from 'formik';
/* --- Components --- */
import AdminForm from './adminForm';

const AdminFormBox = ({
  adminData,
  editAdminAccount,
  adminAccountValidation,
}) => {
  console.log('adminData::: ', adminData);
  const handleEditAdmin = async (values, { setSubmitting, resetForm }) => {
    console.log('values:', values);
    const { id } = adminData;
    const res = await editAdminAccount(id, values);
    console.log('res: ', res);
  };

  const values = { companyName: '', username: '', contactNo: '', email: '' };
  return (
    <Formik
      initialValues={adminData}
      render={props => <AdminForm {...props} />}
      onSubmit={handleEditAdmin}
      validationSchema={adminAccountValidation}
    />
  );
};

export default AdminFormBox;
