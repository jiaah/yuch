import React from 'react';
/* --- Components --- */
import Modal from '../../../shared/modal';
import Loader from '../../loader';
import { partnerValidation } from '../../formValidation';

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
  // local states
  clickedBtn,
  // global states
  clickedUserData,
  selectedSearchItem,
  // actions
  hideModal,
  addFlashMessage,
  saveClickedItemData,
  resetClickedItemData,
  resetSelectedItemValue,
  createPartner,
  editPartner,
  deletePartner,
}) => {
  const title =
    clickedBtn === 'edit'
      ? '거래처 수정'
      : clickedBtn === 'create'
        ? '거래처 등록'
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
              partnerValidation={partnerValidation}
              editPartner={editPartner}
              handleCloseModal={handleCloseModal}
              addFlashMessage={addFlashMessage}
              clickedUserData={clickedUserData}
            />
          ) : clickedBtn === 'create' ? (
            <CreateFormBox
              partnerValidation={partnerValidation}
              createPartner={createPartner}
              handleCloseModal={handleCloseModal}
              addFlashMessage={addFlashMessage}
              saveClickedItemData={saveClickedItemData}
            />
          ) : clickedBtn === 'delete' ? (
            <DeleteFormBox
              deletePartner={deletePartner}
              selectedSearchItem={selectedSearchItem}
              handleCloseModal={handleCloseModal}
              addFlashMessage={addFlashMessage}
            />
          ) : null}
        </React.Fragment>
      }
    />
  );
};

export default EmployeeModal;
