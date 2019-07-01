import React from 'react';
/* --- Components --- */
import AdminConfirmContainer from '../../shared/adminConfirm/adminConfirmContainer';

const DeleteBankFormBox = ({
  deleteBankAccount,
  selectedSearchItem,
  addFlashMessage,
  handleCloseModal,
  bankAccount,
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
    <React.Fragment>
      {bankAccount.length < 2 ? (
        <div className="mb3">
          <p className="mb3">
            계좌가 <span className="c-point2">최소한 하나</span>는
            등록되어있어야 합니다.
          </p>
          <p>
            변경을 원하신다면, 새로운 계좌를 등록하거나
            <span className="c-point2">&#8201;수정을 해주세요</span>.
          </p>
        </div>
      ) : (
        <AdminConfirmContainer
          handleButtonClick={handleDeleteUser}
          confirmType="delete"
        />
      )}
    </React.Fragment>
  );
};

export default DeleteBankFormBox;
