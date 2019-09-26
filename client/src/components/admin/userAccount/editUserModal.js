import React, { useState } from 'react';
/* --- Components --- */
import { editUserAccountValidation } from '../../formValidation';
import Modal from '../../../shared/modal';
import EditUserFormBox from './editUserFormBox';
import { formatWithDash, formatToYYYYMMDD } from '../../../utils/date';

const EndService = Loader({
  loader: () =>
    import('./endServiceFormBox' /* webpackChunkName: 'EndService' */),
});

const ResetPassword = Loader({
  loader: () =>
    import('./resetPasswordBox' /* webpackChunkName: 'ResetPassword' */),
});

const EditUserModal = ({
  // local states
  bankAccount,
  // global states
  clickedUserData,
  // actions
  editUser,
  addFlashMessage,
  // resetPassword,
  handleEndingService,
  // fncs from parent component
  handleCloseModal,
}) => {
  const [subModal, setSubModal] = useState(null);
  const showSubModal = sub => setSubModal(sub);
  const closeSubModal = () => setSubModal(null);

  const title = subModal ? `${clickedUserData.companyName}` : '';

  const formattedUserEndDate = clickedUserData.endDate
    ? formatWithDash(clickedUserData.endDate)
    : clickedUserData.endDate;

  return (
    <div className="container">
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
              addFlashMessage={addFlashMessage}
              userId={clickedUserData.id}
              formattedUserEndDate={formattedUserEndDate}
              handleEndingService={handleEndingService}
              formatToYYYYMMDD={formatToYYYYMMDD}
            />
          ) : subModal === 'password' ? (
            <ResetPassword />
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
    </div>
  );
};

export default EditUserModal;
