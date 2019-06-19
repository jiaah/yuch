/* eslint-disable no-alert */
import React, { useState } from 'react';
/* --- Components --- */
import Loader from '../../../shared/loader';
import {
  editUserAccountValidation,
  changePasswordByAdminValidation,
  passwordValidation,
} from '../formValidation';
import Modal from '../../../shared/modal';
import EditUserFormBox from './editUserFormBox';

const PasswordFormBox = Loader({
  loader: () =>
    import('./passwordFormBox' /* webpackChunkName: 'passwordFormBox' */),
});

const DeleteUserFormBox = Loader({
  loader: () =>
    import('./deleteUserFormBox' /* webpackChunkName: 'deleteUserFormBox' */),
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
        show={show}
        flashVariant={flashVariant}
        title={title}
        handleClose={() => {
          if (subModal === null) {
            return handleCloseModal();
          }
          return closeSubModal();
        }}
        component={
          subModal === 'password' ? (
            <PasswordFormBox
              closeSubModal={closeSubModal}
              handleCloseModal={handleCloseModal}
              addFlashMessage={addFlashMessage}
              clickedUserId={clickedUserData.id}
              changePasswordByAdminValidation={changePasswordByAdminValidation}
              changePasswordByAdmin={changePasswordByAdmin}
            />
          ) : subModal === 'delete' ? (
            <DeleteUserFormBox
              closeSubModal={closeSubModal}
              handleCloseModal={handleCloseModal}
              addFlashMessage={addFlashMessage}
              clickedUserData={clickedUserData}
              passwordValidation={passwordValidation}
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
            />
          )
        }
      />
    </div>
  );
};

export default EditUserModal;
