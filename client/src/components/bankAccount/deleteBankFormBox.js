import React from 'react';
/* --- Components --- */
import AdminConfirmContainer from '../../shared/adminConfirm/adminConfirmContainer';

const DeleteBankFormBox = ({
  deleteBankAccount,
  selectedSearchItem,
  handleCloseModal,
}) => {
  const handleDeleteUser = async () => {
    try {
      await deleteBankAccount(selectedSearchItem);
      await handleCloseModal();
      return window.location.reload(true);
    } catch (err) {
      return addFlashMessage(
        'error',
        `고객 은행계정 삭제에 실패하였습니다. 다시 시도해 주세요.`,
      );
    }
  };

  return (
    <AdminConfirmContainer
      handleButtonClick={handleDeleteUser}
      confirmType="delete"
    />
  );
};

export default DeleteBankFormBox;
