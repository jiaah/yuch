import React, { useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
/* --- Components --- */
import Modal from '../../../shared/modal';
import SpecialMealForm from './specialMealForm';
import { specialMealValidation } from '../../formValidation';

const createModal = ({
  formattedTmr,
  adminSpecialMealMsg,
  // local state
  clickedBtn,
  // global state
  clickedUserData,
  // actions
  hideModal,
  createSpecialMeal,
  addFlashMessage,
  getUsers,
  resetSelectedItemValue,
  saveClickedItemData,
  resetClickedItemData,
}) => {
  const inputValues = {
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

  const [state, setState] = useState({
    selectedUser: false,
    userId: null,
    users: [],
    inputValues,
  });

  const handleSuggestionSelected = modalSearchedUser => {
    if (modalSearchedUser)
      return setState({
        ...state,
        userId: modalSearchedUser.id,
        inputValues: {
          ...state.inputValues,
          companyName: modalSearchedUser.companyName,
          address: modalSearchedUser.address,
          contactNo: modalSearchedUser.contactNo,
        },
      });
  };

  // yuch client selection checkbox
  const handleChange = name => async event => {
    const checked = event.target.checked;
    return setState({ ...state, [name]: checked });
  };

  // get users list
  const fetchUsersData = async () => {
    const res = await getUsers();
    return setState({ ...state, users: res.activeUsers });
  };

  useEffect(() => {
    fetchUsersData();
    if (clickedUserData.length !== 0) resetClickedItemData();
  }, []);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    await setSubmitting(true);
    const sendingData = {
      userId: state.userId && state.selectedUser ? state.userId : null,
      ...values,
    };

    const res = await createSpecialMeal(sendingData);

    if (!res.error) {
      // to keep the created row on focus after re-render
      await saveClickedItemData(sendingData);
      await Promise.all([
        // render all users list if it's filtered by searching
        resetSelectedItemValue(),
        hideModal(),
        resetForm({}),
        addFlashMessage('success', `저장되었습니다.`),
      ]);
      window.location.reload(true);
    } else {
      await addFlashMessage('error', '서버오류입니다. 다시 시도해주세요.');
    }
    return setSubmitting(false);
  };

  return (
    <Modal
      title="특식 등록"
      handleClose={() => hideModal()}
      component={
        <Formik
          initialValues={state.inputValues}
          onSubmit={handleSubmit}
          render={props => (
            <Form>
              <SpecialMealForm
                {...props}
                handleChange={handleChange}
                state={state}
                adminSpecialMealMsg={adminSpecialMealMsg}
                handleSuggestionSelected={handleSuggestionSelected}
                clickedBtn={clickedBtn}
              />
            </Form>
          )}
          validationSchema={specialMealValidation}
        />
      }
    />
  );
};

export default createModal;
