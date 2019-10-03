import React from 'react';
/* --- Components --- */
import Modal from '../../../shared/modal';
import Loader from '../../loader';

const CreateFormBox = Loader({
  loader: () =>
    import('./createFormBox' /* webpackChunkName: 'CreateFormBox' */),
});

const EditFormBox = Loader({
  loader: () => import('./editFormBox' /* webpackChunkName: 'EditFormBox' */),
});

const DeleteFormBox = Loader({
  loader: () =>
    import('./deleteFormBox' /* webpackChunkName: 'DeleteFormBox' */),
});

const EmployeeModal = ({
  bankAccountValidation,
  // local states
  clickedBtn,
  data,
  // global states
  clickedUserData,
  selectedSearchItem,
  // actions
  hideModal,
  resetClickedItemData,
  resetSelectedItemValue,
  createBankAccount,
  editBankAccount,
  deleteBankAccount,
  addFlashMessage,
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
    <Modal
      title={title}
      handleClose={handleCloseModal}
      component={
        <React.Fragment>
          {clickedBtn === 'edit' ? (
            <EditFormBox
              bankAccountValidation={bankAccountValidation}
              editBankAccount={editBankAccount}
              handleCloseModal={handleCloseModal}
              addFlashMessage={addFlashMessage}
              clickedUserData={clickedUserData}
            />
          ) : clickedBtn === 'create' ? (
            <CreateFormBox
              bankAccountValidation={bankAccountValidation}
              createBankAccount={createBankAccount}
              handleCloseModal={handleCloseModal}
              addFlashMessage={addFlashMessage}
              data={data}
            />
          ) : clickedBtn === 'delete' ? (
            <DeleteFormBox
              deleteBankAccount={deleteBankAccount}
              selectedSearchItem={selectedSearchItem}
              handleCloseModal={handleCloseModal}
              addFlashMessage={addFlashMessage}
              data={data}
            />
          ) : null}
        </React.Fragment>
      }
    />
  );
};

export default EmployeeModal;
