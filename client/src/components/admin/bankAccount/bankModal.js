import React from 'react';
/* --- Components --- */
import Modal from '../../../shared/modal';
import Loader from '../../../shared/loader';
import AdminVerificationContainer from '../../../shared/adminVerification/adminVerificationContainer';

const CreateBankFormBox = Loader({
  loader: () =>
    import('./createBankFormBox' /* webpackChunkName: 'CreateBankFormBox' */),
});

const EditBankFormBox = Loader({
  loader: () =>
    import('./editBankFormBox' /* webpackChunkName: 'EditBankFormBox' */),
});

const DeleteBankFormBox = Loader({
  loader: () =>
    import('./deleteBankFormBox' /* webpackChunkName: 'DeleteBankFormBox' */),
});

const BankModal = ({
  bankAccountValidation,
  // local states
  clickedBtn,
  bankAccount,
  // global states
  clickedUserData,
  selectedSearchItem,
  isAdminVerified,
  // actions
  hideModal,
  resetClickedItemData,
  resetSelectedItemValue,
  createBankAccount,
  editBankAccount,
  deleteBankAccount,
  addFlashMessage,
  handleAdminVerificationStatus,
}) => {
  const title =
    clickedBtn === 'edit'
      ? '은행계좌 수정'
      : clickedBtn === 'create'
        ? '은행계좌 등록'
        : null;

  const handleAdminVerificationSuccess = () => {
    if (!isAdminVerified) handleAdminVerificationStatus();
  };

  const handleCloseModal = async () => {
    await Promise.all([
      clickedUserData.length !== 0 ? resetClickedItemData() : null,
      selectedSearchItem !== null ? resetSelectedItemValue() : null,
      // makes sure that admin user has to verify itself every single change regarding to bank account
      // bank account info is considered as a highly sensitive data.
      isAdminVerified ? handleAdminVerificationStatus() : null,
    ]);
    return hideModal();
  };

  // when clickedBtn is 'create' or 'edit', check admin password first then renders form.
  // when clickedBtn is 'delete, check admin password only when account length is bigger than 1.
  return (
    <div className="container">
      <Modal
        title={title}
        handleClose={handleCloseModal}
        component={
          <React.Fragment>
            {clickedBtn !== null &&
              clickedBtn !== 'delete' &&
              !isAdminVerified && (
                <AdminVerificationContainer
                  handleAdminVerificationSuccess={
                    handleAdminVerificationSuccess
                  }
                  confirmType={clickedBtn}
                />
              )}
            {isAdminVerified ? (
              clickedBtn === 'edit' ? (
                <EditBankFormBox
                  bankAccountValidation={bankAccountValidation}
                  editBankAccount={editBankAccount}
                  handleCloseModal={handleCloseModal}
                  addFlashMessage={addFlashMessage}
                  clickedUserData={clickedUserData}
                />
              ) : clickedBtn === 'create' ? (
                <CreateBankFormBox
                  bankAccountValidation={bankAccountValidation}
                  createBankAccount={createBankAccount}
                  handleCloseModal={handleCloseModal}
                  addFlashMessage={addFlashMessage}
                  bankAccount={bankAccount}
                />
              ) : null
            ) : null}
            {clickedBtn === 'delete' && (
              <DeleteBankFormBox
                deleteBankAccount={deleteBankAccount}
                selectedSearchItem={selectedSearchItem}
                handleCloseModal={handleCloseModal}
                addFlashMessage={addFlashMessage}
                bankAccount={bankAccount}
              />
            )}
          </React.Fragment>
        }
      />
    </div>
  );
};

export default BankModal;
