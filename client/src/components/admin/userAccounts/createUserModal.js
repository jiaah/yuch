import React from 'react';
import { Formik } from 'formik';
/* --- Components --- */
import Form from './createUserForm';
import Modal from '../../../shared/modal';
import { addUserAccountValidation } from '../../formValidation';

const UserAccountModal = ({
  createUser,
  addFlashMessage,
  selectedSearchItem,
  resetSelectedItemValue,
  handleCloseModal,
  bankAccount,
}) => {
  const handleCreateUser = async (values, { setSubmitting, resetForm }) => {
    const {
      companyName,
      confirmPassword,
      lunchQty,
      dinnerQty,
      ...others
    } = values;
    // to save values as number type in database
    // No need for 'mealPrice' as it's required field.
    const lunchQtyValue = lunchQty === '' ? null : lunchQty;
    const dinnerQtyValue = dinnerQty === '' ? null : dinnerQty;

    const userInfo = {
      companyName,
      lunchQty: lunchQtyValue,
      dinnerQty: dinnerQtyValue,
      ...others,
    };

    try {
      await createUser(userInfo);
      await Promise.all([
        resetForm({}),
        handleCloseModal(),
        selectedSearchItem !== null ? resetSelectedItemValue() : null, // to ensure to display all users list when reload page
      ]);
      return window.location.reload(true);
    } catch (error) {
      await addFlashMessage(
        'error',
        `${companyName} 고객 등록에 실패하였습니다. 이미 존재하는 '고객명'이나 '고객아이디' 입니다.`,
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
    bankAccountId: bankAccount[0].id,
    businessType: 'catering',
  };

  return (
    <div className="container">
      <Modal
        title="신규업체 등록"
        handleClose={handleCloseModal}
        component={
          <Formik
            initialValues={values}
            render={props => <Form {...props} bankAccount={bankAccount} />}
            onSubmit={handleCreateUser}
            validationSchema={addUserAccountValidation}
          />
        }
      />
    </div>
  );
};

export default UserAccountModal;
