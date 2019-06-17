/* eslint-disable no-alert */
import React, { useState } from 'react';
import { Formik } from 'formik';
/* --- Components --- */
import EditUserForm from './editUserForm';
import Loader from '../../../shared/loader';
import {
  editUserAccountValidation,
  changePasswordValidation,
  passwordValidation,
} from '../formValidation';
import Modal from '../../../shared/modal';

const PasswordForm = Loader({
  loader: () => import('./passwordForm' /* webpackChunkName: 'passwordForm' */),
});

const DeleteUserForm = Loader({
  loader: () =>
    import('./deleteUserForm' /* webpackChunkName: 'deleteUserFrom' */),
});

const UserAccountModal = ({
  show,
  data,
  flashVariant,
  handleCloseModal,
  editUser,
  addFlashMessage,
  changePassword,
}) => {
  const [subModal, setSubModal] = useState(null);

  const handleEditUser = async (values, { setSubmitting, resetForm }) => {
    const {
      companyName,
      bankAccountId,
      lunchQty,
      dinnerQty,
      ...others
    } = values;
    // to save values as number type in database
    const bankAccount = parseInt(bankAccountId, 10);
    const lunchQtyValue = lunchQty === '' ? null : lunchQty;
    const dinnerQtyValue = dinnerQty === '' ? null : dinnerQty;
    const id = data.id;

    const userInfo = {
      id,
      companyName,
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
        `${companyName} 고객 계정 수정에 실패하였습니다. 다시 시도해 주세요.`,
      );
    }
    return setSubmitting(false);
  };

  const showSubModal = sub => setSubModal(sub);

  const closeSubModal = () => {
    console.log('closeSubModal fn is called');
    setSubModal(null);
  };

  const handleChangePassword = async (values, { setSubmitting, resetForm }) => {
    const { id, companyName, password, newPassword } = values;
    try {
      const userData = await changePassword(id, password, newPassword);
      await alert(`${userData} 고객정보가 수정되었습니다.`);
      resetForm({});
      closeSubModal();
      return handleCloseModal();
    } catch (error) {
      await addFlashMessage(
        'error',
        `${companyName} 고객 계정 비밀번호 수정에 실패하였습니다. 다시 시도해 주세요.`,
      );
    }
    return setSubmitting(false);
  };

  const handleDeleteUser = () => console.log('delele user is submit');

  const title =
    subModal === 'password'
      ? '비밀번호 변경'
      : subModal === 'delete'
        ? ''
        : '고객 계정';
  const values = data || [];
  const passwordValues = {
    password: '',
    newPassword: '',
    confirmPassword: '',
  };
  const deleteValues = {
    password: '',
  };
  return (
    <div className="container">
      <Modal
        show={show}
        flashVariant={flashVariant}
        title={title}
        handleClose={() => {
          if (subModal) closeSubModal();
          return handleCloseModal();
        }}
        component={
          subModal === 'password' ? (
            <Formik
              initialValues={passwordValues}
              render={props => <PasswordForm {...props} />}
              onSubmit={handleChangePassword}
              validationSchema={changePasswordValidation}
            />
          ) : subModal === 'delete' ? (
            <Formik
              initialValues={deleteValues}
              render={props => <DeleteUserForm {...props} />}
              onSubmit={handleDeleteUser}
              validationSchema={passwordValidation}
            />
          ) : (
            <Formik
              initialValues={values}
              render={props => (
                <EditUserForm {...props} showSubModal={showSubModal} />
              )}
              onSubmit={handleEditUser}
              validationSchema={editUserAccountValidation}
            />
          )
        }
      />
    </div>
  );
};

export default UserAccountModal;
