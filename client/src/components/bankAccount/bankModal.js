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

const BankModal = ({
  bankAccountValidation,
  clickedBtn,
  clickedUserData,
  hideModal,
  resetClickedItemData,
  editBankAccount,
  createBankAccount,
  addFlashMessage,
}) => {
  const title = clickedBtn === 'edit' ? '은행계좌 수정' : '은행계좌 등록';

  const handleCloseModal = () => {
    if (clickedBtn === 'edit') {
      return Promise.all([resetClickedItemData(), hideModal()]);
    }
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
          ) : null
        }
      />
    </div>
  );
};

export default BankModal;
