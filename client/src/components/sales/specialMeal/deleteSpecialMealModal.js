import React from 'react';
/* --- Components --- */
import Modal from '../../../shared/modal';
import AdminVerificationContainer from '../../../shared/adminVerification/adminVerificationContainer';

const DeleteModal = ({
  selectedSearchItem,
  // actions
  addFlashMessage,
  deleteSpecialMeal,
  // func
  handleCloseModal,
}) => {
  const handleDeleteUser = async () => {
    const res = await deleteSpecialMeal(selectedSearchItem);
    if (!res.error) {
      await handleCloseModal();
      return window.location.reload(true);
    }
    return addFlashMessage(
      'error',
      `고객 은행계정 삭제에 실패하였습니다. 다시 시도해 주세요.`,
    );
  };

  return (
    <div className="container">
      <Modal
        title=""
        handleClose={() => handleCloseModal()}
        component={
          <AdminVerificationContainer
            handleAdminVerificationSuccess={handleDeleteUser}
            confirmType="delete"
          />
        }
      />
    </div>
  );
};

export default DeleteModal;
