import React from 'react';
import { Formik, Form } from 'formik';
/* --- Components --- */
import Modal from '../../../shared/modal';
import SpecialMealForm from './specialMealForm';
import { specialMealValidation } from '../../formValidation';

const createModal = ({
  formattedTmr,
  // state
  clickedUserData,
  // actions
  hideModal,
  addFlashMessage,
  updateSpecialMeal,
}) => {
  const { id, userId, ...initialValues } = clickedUserData;

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    await setSubmitting(true);
    const sendingData = { userId: '', ...values };
    const res = await updateSpecialMeal(sendingData);
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
                <SpecialMealForm {...props} />
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
