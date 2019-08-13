import React from 'react';
/* --- Components --- */
import AdminVerificationContainer from '../../../shared/adminVerification/adminVerificationContainer';
import { deleteBankAccountMsg } from '../../../data/message';

const DeleteBankFormBox = ({
  deleteBankAccount,
  selectedSearchItem,
  addFlashMessage,
  handleCloseModal,
  bankAccount,
}) => {
  const handleDeleteUser = async () => {
    const res = await deleteBankAccount(selectedSearchItem);
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
    <React.Fragment>
      {bankAccount.length < 2 ? (
        <React.Fragment>{deleteBankAccountMsg}</React.Fragment>
      ) : (
        <AdminVerificationContainer
          handleButtonClick={handleDeleteUser}
          confirmType="delete"
        />
      )}
    </React.Fragment>
  );
};

export default DeleteBankFormBox;
