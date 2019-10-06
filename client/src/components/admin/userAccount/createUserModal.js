import React, { useEffect } from 'react';
import { Formik, Form } from 'formik';
/* --- Components --- */
import CreateUserForm from './createUserForm';
import Modal from '../../../shared/modal';
import { emptyStrToNull } from '../../../utils/reformat';

const UserAccountModal = ({
  // local states
  bankAccount,
  // global states
  clickedUserData,
  selectedSearchItem,
  // actions
  createUser,
  addFlashMessage,
  saveClickedItemData,
  resetClickedItemData,
  resetSelectedItemValue,
  // fncs from parent component
  handleCloseModal,
  userAccountValidation,
}) => {
  useEffect(() => {
    if (clickedUserData.length !== 0) resetClickedItemData();
  }, []);

  const handleCreateUser = async (values, { setSubmitting, resetForm }) => {
    const {
      companyName,
      confirmPassword,
      lunchQty,
      dinnerQty,
      lateNightSnackQty,
      ...others
    } = values;

    // re-assign to null if value is empty.
    const newLunch = await emptyStrToNull(lunchQty);
    const newDinner = await emptyStrToNull(dinnerQty);
    const newLatNightSnack = await emptyStrToNull(lateNightSnackQty);

    const userInfo = {
      companyName,
      lunchQty: newLunch,
      dinnerQty: newDinner,
      lateNightSnackQty: newLatNightSnack,
      ...others,
    };

    const res = await createUser(userInfo);

    if (!res.error) {
      await saveClickedItemData(userInfo);
      await Promise.all([
        resetForm({}),
        handleCloseModal(),
        // to ensure to display all users list when reload page
        selectedSearchItem ? resetSelectedItemValue() : null,
      ]);
      window.location.reload(true);
    } else {
      await addFlashMessage(
        'error',
        `${companyName} 고객 등록에 실패하였습니다. 이미 존재하는 고객인지 확인해주세요.`,
      );
    }
    return setSubmitting(false);
  };

  const values = {
    username: '',
    password: '',
    confirmPassword: '',
    companyName: '',
    contactNo: '',
    email: '',
    address: '',
    mealPrice: '',
    lunchQty: '',
    dinnerQty: '',
    lateNightSnackQty: '',
    bankAccountId: bankAccount.length !== 0 ? bankAccount[0].id : '',
    businessType: 'catering',
    businessNo: '',
  };

  return (
    <Modal
      title="신규업체 등록"
      handleClose={handleCloseModal}
      component={
        <Formik
          initialValues={values}
          render={props => (
            <Form>
              <CreateUserForm {...props} bankAccount={bankAccount} />
            </Form>
          )}
          onSubmit={handleCreateUser}
          validationSchema={userAccountValidation}
        />
      }
    />
  );
};

export default UserAccountModal;
