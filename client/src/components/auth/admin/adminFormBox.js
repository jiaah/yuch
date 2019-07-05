import React from 'react';
import { Formik } from 'formik';
/* --- Components --- */
import AdminForm from './adminForm';

const AdminFormBox = ({
  adminData,
  adminAccountValidation,
  editAdminAccount,
  addFlashMessage,
}) => {
  const handleEditAdmin = async (values, { setSubmitting }) => {
    const { id, companyName } = adminData;
    try {
      await editAdminAccount(id, values);
      await addFlashMessage(
        'success',
        `${companyName}님의 계정이 수정되었습니다.`,
      );
    } catch (error) {
      await addFlashMessage(
        'error',
        `${companyName}님의 계정 수정에 실패하였습니다. 다시 시도해 주세요.`,
      );
    }
    return setSubmitting(false);
  };
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
