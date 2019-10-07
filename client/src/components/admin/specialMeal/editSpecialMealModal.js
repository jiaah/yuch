import React, { useState } from 'react';
import { Formik, Form } from 'formik';
/* --- Components --- */
import Modal from '../../../shared/modal';
import SpecialMealForm from './specialMealForm';
import { specialMealValidation } from '../../formValidation';

const EditModal = ({
  adminSpecialMealMsg,
  // state
  clickedUserData,
  users,
  // actions
  addFlashMessage,
  updateSpecialMeal,
  hideModal,
  resetSelectedItemValue,
}) => {
  const { id, userId, ...initialValues } = clickedUserData;

  const [state, setState] = useState({
    userId: clickedUserData.userId,
    selectedUser: !!clickedUserData.userId,
    companyName: initialValues.companyName,
  });

  const handleChange = name => async event => {
    const checked = event.target.checked;
    return setState({
      ...state,
      [name]: checked,
    });
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const userId = state.selectedUser ? state.userId : null;
    const id = clickedUserData.id;
    await setSubmitting(true);
    const sendingData = { id, userId, ...values };

    const res = await updateSpecialMeal(sendingData);
    if (!res.error) {
      Promise.all([
        resetSelectedItemValue(),
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
                handleChange={handleChange}
                state={state}
                adminSpecialMealMsg={adminSpecialMealMsg}
              />
            </Form>
          )}
          validationSchema={specialMealValidation}
        />
      }
    />
  );
};

export default EditModal;
