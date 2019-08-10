import React from 'react';
import { Formik, Form } from 'formik';
/* --- Components --- */
import AdminForm from './adminForm';

const AdminFormBox = ({
  adminData,
  adminAccountValidation,
  editAdminAccount,
  addFlashMessage,
  openPasswordForm,
}) => {
  const handleEditAdmin = async (values, { setSubmitting }) => {
    const { id, companyName } = adminData;

    const res = await editAdminAccount(id, values);
    if (!res.error) {
      addFlashMessage('success', `${companyName}님의 계정이 수정되었습니다.`);
    } else {
      addFlashMessage(
        'error',
        `${companyName}님의 계정 수정에 실패하였습니다. 다시 시도해 주세요.`,
      );
    }
    return setSubmitting(false);
  };

  return (
    <Formik
      initialValues={adminData}
      render={props => (
        <Form className="flex flex-column-m items-center justify-center">
          <AdminForm {...props} openPasswordForm={openPasswordForm} />
        </Form>
      )}
      onSubmit={handleEditAdmin}
      validationSchema={adminAccountValidation}
    />
  );
};

export default AdminFormBox;
