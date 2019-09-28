import React, { useState } from 'react';
import { Formik, Form } from 'formik';
/* --- Components --- */
import Modal from '../../../shared/modal';
import SpecialMealForm from './specialMealForm';
import { specialMealValidation } from '../../formValidation';

const createModal = ({
  formattedTmr,
  users,
  selectedUser,
  // funcs
  handleChange,
  // actions
  hideModal,
  createSpecialMeal,
  addFlashMessage,
}) => {
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    await setSubmitting(true);
    const sendingData = { userId: '', ...values };
    const res = await createSpecialMeal(sendingData);
    if (!res.error) {
      Promise.all([
        hideModal(),
        resetForm({}),
        addFlashMessage('success', `저장되었습니다.`),
      ]);
      window.location.reload(true);
    } else {
      addFlashMessage('error', '서버오류입니다. 다시 시도해주세요.');
    }
    return setSubmitting(false);
  };

  const initialValues = {
    companyName: '',
    date: formattedTmr,
    time: '12:30',
    quantity: '',
    sideDish: '',
    mealPrice: '',
    address: '',
    contactNo: '',
    note: '',
  };
  return (
    <div className="container">
      <Modal
        title="특식 등록"
        handleClose={() => hideModal()}
        component={
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            render={props => (
              <Form>
                <SpecialMealForm
                  {...props}
                  users={users}
                  selectedUser={selectedUser}
                  handleChange={handleChange}
                />
              </Form>
            )}
            validationSchema={specialMealValidation}
          />
        }
      />
    </div>
  );
};

export default createModal;
