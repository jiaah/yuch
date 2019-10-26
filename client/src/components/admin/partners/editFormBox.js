import React from 'react';
import { Formik, Form } from 'formik';
/* --- Components --- */
import EmployeeForm from './form';

const EditFormBox = ({
  partnerValidation,
  // global state
  clickedUserData,
  // actions
  editPartner,
  addFlashMessage,
  // func
  handleCloseModal,
}) => {
  const handleEditPartner = async (values, { setSubmitting, resetForm }) => {
    const id = clickedUserData.id;
    const sendingData = { id, ...values };
    const res = await editPartner(sendingData);
    if (!res.error) {
      addFlashMessage(
        'success',
        `${values.companyName} 거래처 정보를 수정하였습니다.`,
      );
      await Promise.all([resetForm({}), handleCloseModal()]);
      window.location.reload(true);
    } else {
      addFlashMessage(
        'error',
        `${
          values.companyName
        } 님의 정보 수정에 실패하였습니다. 이미 등록한 거래처인지 확인하신 후, 다시 시도해주세요.`,
      );
    }
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
      onSubmit={handleEditPartner}
      validationSchema={partnerValidation}
    />
  );
};

export default EditFormBox;
