/* eslint-disable no-alert */
import React from 'react';
import { Formik } from 'formik';
/* --- Components --- */
import DeleteUserForm from './deleteUserForm';
import Modal from '../../../shared/modal';

const DeleteUserModal = ({
  show,
  flashVariant,
  handleCloseModal,
  addFlashMessage,
  closeSubModal,
  deleteUser,
  passwordValidation,
  clickedUserData,
}) => {
  const handleDeleteUser = async (values, { setSubmitting, resetForm }) => {
    const { password } = values;
    const { id, companyName } = clickedUserData;
    try {
      // pass userId to be deleted & admin user password
      await deleteUser(id, password);
      await alert(`${companyName} 고객 계정이 삭제되었습니다.`);
      await Promise.all([resetForm({}), closeSubModal(), handleCloseModal()]);
      return window.location.reload(true);
    } catch (err) {
      await addFlashMessage(
        'error',
        `${companyName} 고객 계정 삭제에 실패하였습니다. 다시 시도해 주세요.`,
      );
    }
    return setSubmitting(false);
  };

  const deleteValues = {
    password: '',
  };

  return (
    <div className="container">
      <Modal
        show={show}
        flashVariant={flashVariant}
        title=""
        handleClose={() => closeSubModal()}
        component={
          <Formik
            initialValues={deleteValues}
            render={props => <DeleteUserForm {...props} />}
            onSubmit={handleDeleteUser}
            validationSchema={passwordValidation}
          />
        }
      />
    </div>
  );
};

export default DeleteUserModal;
