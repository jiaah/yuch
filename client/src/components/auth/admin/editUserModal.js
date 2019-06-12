/* eslint-disable no-alert */
import React from 'react';
import { Formik } from 'formik';
/* --- Components --- */
import Form from './userAccountForm';
import Loader from '../../../shared/loader';
import { editUserAccountValidation } from '../formValidation';

const Modal = Loader({
  loader: () =>
    import('../../../shared/modal' /* webpackChunkName: 'simpleModal' */),
});

const UserAccountModal = ({
  show,
  clickedBtn,
  data,
  flashVariant,
  handleCloseModal,
  editUser,
  addFlashMessage,
}) => {
  const handleCreateUser = async (values, { setSubmitting, resetForm }) => {
    const {
      confirmPassword,
      bankAccountId,
      lunchQty,
      dinnerQty,
      ...others
    } = values;
    // to save values as number type in database
    const bankAccount = parseInt(bankAccountId, 10);
    const lunchQtyValue = lunchQty === '' ? 0 : lunchQty;
    const dinnerQtyValue = dinnerQty === '' ? 0 : dinnerQty;

    const userInfo = {
      bankAccount,
      lunchQtyValue,
      dinnerQtyValue,
      ...others,
    };

    try {
      const userData = await editUser(userInfo);
      await alert(`${userData} 고객정보가 수정되었습니다.`);
      await resetForm({});
      handleCloseModal();
      return window.location.reload(true);
    } catch (error) {
      await addFlashMessage(
        'error',
        `${
          values.companyName
        } 고객 계정 수정에 실패하였습니다. 다시 시도해 주세요.`,
      );
    }
    return setSubmitting(false);
  };

  const values = data ? data[0] : [];
  return (
    <div className="container">
      <Modal
        show={show}
        flashVariant={flashVariant}
        title="고객 계정"
        handleClose={handleCloseModal}
        component={
          <Formik
            initialValues={values}
            render={props => <Form {...props} clickedBtn={clickedBtn} />}
            onSubmit={handleCreateUser}
            validationSchema={editUserAccountValidation}
          />
        }
      />
    </div>
  );
};

export default UserAccountModal;
