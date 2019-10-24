import React from 'react';
import { Formik, Form } from 'formik';
/* --- Components --- */
import EmployeeForm from './form';

const EditFormBox = ({
  employeeValidation,
  // global state
  position,
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
    const data = { ...values, position };

    const res = await editEmployee(data);
    if (!res.error) {
      addFlashMessage(
        'success',
        `${values.companyName} 님의 정보를 수정하였습니다.`,
      );
      await Promise.all([resetForm({}), handleCloseModal()]);
      window.location.reload(true);
    } else {
      addFlashMessage(
        'error',
        `${
          values.companyName
        } 님의 정보 수정에 실패하였습니다. 이미 등록한 직원인지 확인하신 후, 다시 시도해주세요.`,
      );
    }
    return setSubmitting(false);
  };
  return (
    <Formik
      initialValues={clickedUserData}
      render={props => (
        <Form className="mh1">
          <EmployeeForm {...props} position={position} />
        </Form>
      )}
      onSubmit={handleEditBankAccount}
      validationSchema={employeeValidation}
    />
  );
};

export default EditFormBox;
