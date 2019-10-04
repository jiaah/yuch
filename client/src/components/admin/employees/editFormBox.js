import React from 'react';
import { Formik, Form } from 'formik';
/* --- Components --- */
import EmployeeForm from './Form';

const EditFormBox = ({
  bankAccountValidation,
  // global state
  clickedUserData,
  // actions
  editEmployee,
  addFlashMessage,
  // func
  handleCloseModal,
}) => {
  const handleEditBankAccount = async (
    values,
    { setSubmitting, resetForm },
  ) => {
    const res = await editEmployee(values);
    if (!res.error) {
      await Promise.all([resetForm({}), handleCloseModal()]);
      return window.location.reload(true);
    }
    addFlashMessage(
      'error',
      `${
        values.accountHolder
      } 님의 은행계좌 수정에 실패하였습니다. 이미 등록한 계좌정보인지 확인하신후, 다시 시도해주세요.`,
    );
    return setSubmitting(false);
  };
  return (
    <Formik
      initialValues={clickedUserData}
      render={props => (
        <Form className="mh1">
          <EmployeeForm {...props} />
        </Form>
      )}
      onSubmit={handleEditBankAccount}
      // validationSchema={bankAccountValidation}
    />
  );
};

export default EditFormBox;
