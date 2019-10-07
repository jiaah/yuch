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
    id,
    userId,
    selectedUser: !!userId,
  });

  const handleChange = name => async event => {
    const checked = event.target.checked;

    if (checked) {
      return setState({
        ...state,
        [name]: checked,
        userId: clickedUserData.userId,
      });
    }
    if (!checked) {
      return setState({
        ...state,
        [name]: checked,
        userId: null,
      });
    }
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const { id, userId } = state;
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
