/* eslint-disable no-alert */
import React from 'react';
import { Formik } from 'formik';
/* --- Components --- */
import PasswordForm from './passwordForm';
import Modal from '../../../shared/modal';

const PasswordModal = ({
  show,
  flashVariant,
  handleCloseModal,
  addFlashMessage,
  changePasswordByAdmin,
  closeSubModal,
  changePasswordByAdminValidation,
  clickedUserId,
}) => {
  const handleChangePassword = async (values, { setSubmitting, resetForm }) => {
    const { companyName, newPassword } = values;
    try {
      const userData = await changePasswordByAdmin(clickedUserId, newPassword);
      await alert(`${userData} 고객정보가 수정되었습니다.`);
      await Promise.all([resetForm({}), closeSubModal(), handleCloseModal()]);
      return window.location.reload(true);
    } catch (error) {
      await addFlashMessage(
        'error',
        `${companyName} 고객 계정 비밀번호 수정에 실패하였습니다. 다시 시도해 주세요.`,
      );
    }
    return setSubmitting(false);
  };

  const passwordValues = {
    newPassword: '',
    confirmPassword: '',
  };

  return (
    <div className="container">
      <Modal
        show={show}
        flashVariant={flashVariant}
        title="비밀번호 변경"
        handleClose={closeSubModal}
        component={
          <Formik
            initialValues={passwordValues}
            render={props => <PasswordForm {...props} />}
            onSubmit={handleChangePassword}
            validationSchema={changePasswordByAdminValidation}
          />
        }
      />
    </div>
  );
};

export default PasswordModal;
