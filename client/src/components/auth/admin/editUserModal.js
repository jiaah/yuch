/* eslint-disable no-alert */
import React, { useState } from 'react';
import { Formik } from 'formik';
/* --- Components --- */
import EditUserForm from './editUserForm';
import Loader from '../../../shared/loader';
import {
  editUserAccountValidation,
  changePasswordByAdminValidation,
  passwordValidation,
} from '../formValidation';
import Modal from '../../../shared/modal';

const PasswordModal = Loader({
  loader: () =>
    import('./passwordModal' /* webpackChunkName: 'passwordModal' */),
});

const DeleteUserModal = Loader({
  loader: () =>
    import('./deleteUserModal' /* webpackChunkName: 'deleteUserModal' */),
});

const EditUserModal = ({
  show,
  clickedUserData,
  flashVariant,
  handleCloseModal,
  editUser,
  addFlashMessage,
  changePasswordByAdmin,
  deleteUser,
}) => {
  const [subModal, setSubModal] = useState({ id: null, show: false });

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
    const id = clickedUserData.id;

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

  const showSubModal = sub => setSubModal({ id: sub, show: true });
  const closeSubModal = () => setSubModal({ id: null, show: false });

  const values = clickedUserData || [];

  return (
    <div className="container">
      <Modal
        show={show}
        flashVariant={flashVariant}
        title="고객 계정"
        handleClose={() => handleCloseModal()}
        component={
          <Formik
            initialValues={values}
            render={props => (
              <EditUserForm {...props} showSubModal={showSubModal} />
            )}
            onSubmit={handleEditUser}
            validationSchema={editUserAccountValidation}
          />
        }
      />
      {subModal.id === 'password' ? (
        <PasswordModal
          show={subModal.show}
          closeSubModal={closeSubModal}
          handleCloseModal={handleCloseModal}
          flashVariant={flashVariant}
          addFlashMessage={addFlashMessage}
          clickedUserId={clickedUserData.id}
          changePasswordByAdminValidation={changePasswordByAdminValidation}
          changePasswordByAdmin={changePasswordByAdmin}
        />
      ) : (
        <DeleteUserModal
          show={subModal.show}
          closeSubModal={closeSubModal}
          handleCloseModal={handleCloseModal}
          flashVariant={flashVariant}
          addFlashMessage={addFlashMessage}
          clickedUserData={clickedUserData}
          passwordValidation={passwordValidation}
          deleteUser={deleteUser}
        />
      )}{' '}
    </div>
  );
};

export default EditUserModal;
