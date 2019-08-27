import React from 'react';
import { Formik, Form } from 'formik';
/* --- Components --- */
import CreateUserForm from './createUserForm';
import Modal from '../../../shared/modal';
import { addUserAccountValidation } from '../../formValidation';

const UserAccountModal = ({
  // local states
  bankAccount,
  // global states
  selectedSearchItem,
  // actions
  createUser,
  addFlashMessage,
  resetSelectedItemValue,
  // fncs from parent component
  handleCloseModal,
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

    const res = await createUser(userInfo);
    if (!res.error) {
      await Promise.all([
        resetForm({}),
        handleCloseModal(),
        selectedSearchItem !== null ? resetSelectedItemValue() : null, // to ensure to display all users list when reload page
      ]);
      return window.location.reload(true);
    }
    addFlashMessage(
      'error',
      `${companyName} 고객 등록에 실패하였습니다. 이미 존재하는 고객인지 확인해주세요.`,
    );
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
    bankAccountId: bankAccount.length !== 0 ? bankAccount[0].id : '',
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
            render={props => (
              <Form>
                <CreateUserForm {...props} bankAccount={bankAccount} />
              </Form>
            )}
            onSubmit={handleCreateUser}
            validationSchema={addUserAccountValidation}
          />
        }
      />
    </div>
  );
};

export default UserAccountModal;
