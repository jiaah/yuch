import React from 'react';
/* --- Components --- */
import Modal from '../../shared/modal';
import Loader from '../../shared/loader';

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
  clickedBtn,
  clickedUserData,
  selectedSearchItem,
  hideModal,
  resetClickedItemData,
  resetSelectedItemValue,
  createBankAccount,
  editBankAccount,
  deleteBankAccount,
  addFlashMessage,
  bankAccount,
}) => {
  const title =
    clickedBtn === 'edit'
      ? '은행계좌 수정'
      : clickedBtn === 'create'
        ? '은행계좌 등록'
        : null;

  const handleCloseModal = async () => {
    await Promise.all([
      clickedUserData.length !== 0 ? resetClickedItemData() : null,
      selectedSearchItem !== null ? resetSelectedItemValue() : null,
    ]);
    return hideModal();
  };

  return (
    <div className="container">
      <Modal
        title={title}
        handleClose={handleCloseModal}
        component={
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
            />
          ) : (
            <DeleteBankFormBox
              deleteBankAccount={deleteBankAccount}
              selectedSearchItem={selectedSearchItem}
              handleCloseModal={handleCloseModal}
              bankAccount={bankAccount}
            />
          )
        }
      />
    </div>
  );
};

export default BankModal;
