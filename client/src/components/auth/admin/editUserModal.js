/* eslint-disable no-alert */
import React, { useState } from 'react';
import { Formik } from 'formik';
/* --- Components --- */
import Form from './editUserForm';
import Loader from '../../../shared/loader';
import { editUserAccountValidation } from '../formValidation';
import Modal from '../../../shared/modal';

const PasswordForm = Loader({
  loader: () => import('./passwordForm' /* webpackChunkName: 'passwordForm' */),
});

const UserAccountModal = ({
  show,
  data,
  flashVariant,
  handleCloseModal,
  editUser,
  addFlashMessage,
  openPasswordModal,
  handleOpenPasswordModal,
}) => {
  console.log('openPasswordModal: ', openPasswordModal);

  const handleEditUser = async (values, { setSubmitting, resetForm }) => {
    const { bankAccountId, lunchQty, dinnerQty, ...others } = values;
    // to save values as number type in database
    const bankAccount = parseInt(bankAccountId, 10);
    const lunchQtyValue = lunchQty === '' ? null : lunchQty;
    const dinnerQtyValue = dinnerQty === '' ? null : dinnerQty;
    const id = data[0].id;

    const userInfo = {
      id,
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
  const title = openPasswordModal ? '비밀번호 변경' : '고객 계정';
  const values = data ? data[0] : [];
  const passwordValues = {
    password: '',
    newPassword: '',
    confirmPassword: '',
  };

  return (
    <div className="container">
      <Modal
        show={show}
        flashVariant={flashVariant}
        title={title}
        handleClose={handleCloseModal}
        component={
          openPasswordModal ? (
            <Formik
              initialValues={passwordValues}
              render={props => <PasswordForm {...props} />}
              // onSubmit={handleEditUser}
              // validationSchema={editUserAccountValidation}
            />
          ) : (
            <Formik
              initialValues={values}
              render={props => <Form {...props} />}
              onSubmit={handleEditUser}
              validationSchema={editUserAccountValidation}
              handleOpenPasswordModal={handleOpenPasswordModal}
            />
          )
        }
      />
    </div>
  );
};

export default UserAccountModal;
