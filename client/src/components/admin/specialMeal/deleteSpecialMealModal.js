import React from 'react';
/* --- Components --- */
import Modal from '../../../shared/modal';
import AdminVerificationContainer from '../../../shared/adminVerification/adminVerificationContainer';

const DeleteModal = ({
  clickedUserData,
  // actions
  addFlashMessage,
  deleteSpecialMeal,
  hideModal,
}) => {
  const handleDeleteUser = async () => {
    const res = await deleteSpecialMeal(clickedUserData.id);

    if (!res.error) {
      await hideModal();
      return window.location.reload(true);
    }
    return addFlashMessage(
      'error',
      `고객 은행계정 삭제에 실패하였습니다. 다시 시도해 주세요.`,
    );
  };

  return (
    <Modal
      title=""
      handleClose={() => hideModal()}
      component={
        <AdminVerificationContainer
          handleAdminVerificationSuccess={handleDeleteUser}
          confirmType="delete"
        />
      }
    />
  );
};

export default DeleteModal;
