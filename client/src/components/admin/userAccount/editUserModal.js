import React, { useState } from 'react';
/* --- Components --- */
import Loader from '../../loader';
import Modal from '../../../shared/modal';
import EditUserFormBox from './editUserFormBox';

const ResetPassword = Loader({
  loader: () =>
    import('./resetPasswordBox' /* webpackChunkName: 'resetPassword' */),
});

const EndService = Loader({
  loader: () =>
    import('./endServiceFormBox' /* webpackChunkName: 'deleteUser' */),
});

const EditUserModal = ({
  // local states
  bankAccount,
  // global states
  clickedUserData,
  // actions
  editUser,
  addFlashMessage,
  resetPassword,
  handleEndingService,
  // fncs from parent component
  handleCloseModal,
  editUserAccountValidation,
  resetPasswordValidation,
  formatToYYYYMMDD,
}) => {
  const [subModal, setSubModal] = useState(null);
  const showSubModal = sub => setSubModal(sub);
  const closeSubModal = () => setSubModal(null);

  const title = subModal ? `${clickedUserData.companyName}` : '고객 계정';

  return (
    <Modal
      title={title}
      handleClose={() => {
        if (subModal === null) {
          return handleCloseModal();
        }
        return closeSubModal();
      }}
      component={
        subModal === 'service' ? (
          <EndService
            closeSubModal={closeSubModal}
            handleCloseModal={handleCloseModal}
            addFlashMessage={addFlashMessage}
            handleEndingService={handleEndingService}
            formatToYYYYMMDD={formatToYYYYMMDD}
            clickedUserData={clickedUserData}
          />
        ) : subModal === 'password' ? (
          <ResetPassword
            handleCloseModal={handleCloseModal}
            closeSubModal={closeSubModal}
            addFlashMessage={addFlashMessage}
            resetPassword={resetPassword}
            resetPasswordValidation={resetPasswordValidation}
            clickedUserData={clickedUserData}
          />
        ) : (
          <EditUserFormBox
            showSubModal={showSubModal}
            handleCloseModal={handleCloseModal}
            addFlashMessage={addFlashMessage}
            clickedUserData={clickedUserData}
            editUserAccountValidation={editUserAccountValidation}
            editUser={editUser}
            bankAccount={bankAccount}
            formatToYYYYMMDD={formatToYYYYMMDD}
          />
        )
      }
    />
  );
};

export default EditUserModal;
