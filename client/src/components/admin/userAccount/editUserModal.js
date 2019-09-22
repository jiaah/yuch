import React, { useState } from 'react';
/* --- Components --- */
import Loader from '../../loader';
import { editUserAccountValidation } from '../../formValidation';
import Modal from '../../../shared/modal';
import EditUserFormBox from './editUserFormBox';

const DeleteUser = Loader({
  loader: () => import('./deleteUser' /* webpackChunkName: 'deleteUser' */),
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
  // resetPassword,
  deleteUser,
  handleEndingService,
  // fncs from parent component
  handleCloseModal,
}) => {
  const [subModal, setSubModal] = useState(null);
  const showSubModal = sub => setSubModal(sub);
  const closeSubModal = () => setSubModal(null);
  const title =
    subModal === 'service'
      ? `${clickedUserData.companyName}`
      : subModal === 'delete'
        ? ''
        : '고객 계정';
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
              closeSubModal={closeSubModal}
              handleCloseModal={handleCloseModal}
              addFlashMessage={addFlashMessage}
              userId={clickedUserData.id}
              handleEndingService={handleEndingService}
            />
          ) : subModal === 'delete' ? (
            <DeleteUser
              closeSubModal={closeSubModal}
              handleCloseModal={handleCloseModal}
              addFlashMessage={addFlashMessage}
              clickedUserData={clickedUserData}
              deleteUser={deleteUser}
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
    </div>
  );
};

export default EditUserModal;
