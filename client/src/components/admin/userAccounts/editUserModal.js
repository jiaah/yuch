import React, { useState } from 'react';
/* --- Components --- */
import Loader from '../../loader';
import {
  editUserAccountValidation,
  resetPasswordValidation,
} from '../../formValidation';
import Modal from '../../../shared/modal';
import EditUserFormBox from './editUserFormBox';

const ResetPasswordBox = Loader({
  loader: () =>
    import('./resetPasswordBox' /* webpackChunkName: 'resetPassword' */),
});

const DeleteUser = Loader({
  loader: () => import('./deleteUser' /* webpackChunkName: 'deleteUser' */),
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
  deleteUser,
  // fncs from parent component
  handleCloseModal,
}) => {
  const [subModal, setSubModal] = useState(null);
  const showSubModal = sub => setSubModal(sub);
  const closeSubModal = () => setSubModal(null);
  const title =
    subModal === 'password'
      ? '비밀번호 변경'
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
          subModal === 'password' ? (
            <ResetPasswordBox
              closeSubModal={closeSubModal}
              handleCloseModal={handleCloseModal}
              addFlashMessage={addFlashMessage}
              clickedUserId={clickedUserData.id}
              resetPasswordValidation={resetPasswordValidation}
              resetPassword={resetPassword}
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
