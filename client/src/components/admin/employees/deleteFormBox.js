import React from 'react';
/* --- Components --- */
import AdminVerificationContainer from '../../../shared/adminVerification/adminVerificationContainer';
import { deleteBankAccountMsg } from '../../../data/message';

const DeleteFormBox = ({
  deleteBankAccount,
  selectedSearchItem,
  addFlashMessage,
  handleCloseModal,
  data,
}) => {
  const handleDeleteUser = async () => {
    const res = await deleteBankAccount(selectedSearchItem);
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
    <React.Fragment>
      {data.length < 2 ? (
        <React.Fragment>{deleteBankAccountMsg}</React.Fragment>
      ) : (
        <AdminVerificationContainer
          handleAdminVerificationSuccess={handleDeleteUser}
          confirmType="delete"
        />
      )}
    </React.Fragment>
  );
};

export default DeleteFormBox;
