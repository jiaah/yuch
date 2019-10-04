import React from 'react';
/* --- Components --- */
import AdminVerificationContainer from '../../../shared/adminVerification/adminVerificationContainer';

const DeleteFormBox = ({
  // global state
  selectedSearchItem,
  // actions
  deleteEmployee,
  addFlashMessage,
  // funcs
  handleCloseModal,
}) => {
  const handleDeleteUser = async () => {
    const res = await deleteEmployee(selectedSearchItem);
    if (!res.error) {
      await handleCloseModal();
      return window.location.reload(true);
    }
    return addFlashMessage(
      'error',
      `은행계정 삭제에 실패하였습니다. 다시 시도해 주세요.`,
    );
  };

  return (
    <AdminVerificationContainer
      handleAdminVerificationSuccess={handleDeleteUser}
      confirmType="delete"
    />
  );
};

export default DeleteFormBox;
