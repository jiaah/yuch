import React, { useState } from 'react';
/* --- Components --- */
import Loader from '../../loader';
import {
  editUserAccountValidation,
  resetPasswordValidation,
} from '../../formValidation';
import Modal from '../../../shared/modal';
import EditUserFormBox from './editUserFormBox';
import { formatWithDash, formatToYYYYMMDD } from '../../../utils/date';

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
}) => {
  const [subModal, setSubModal] = useState(null);
  const showSubModal = sub => setSubModal(sub);
  const closeSubModal = () => setSubModal(null);

  const title = subModal ? `${clickedUserData.companyName}` : '고객 계정';

  const formattedUserEndDate = clickedUserData.endDate
    ? formatWithDash(clickedUserData.endDate)
    : clickedUserData.endDate;

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
            userId={clickedUserData.id}
            formattedUserEndDate={formattedUserEndDate}
            handleEndingService={handleEndingService}
            formatToYYYYMMDD={formatToYYYYMMDD}
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
          />
        )
      }
    />
  );
};

export default EditUserModal;
