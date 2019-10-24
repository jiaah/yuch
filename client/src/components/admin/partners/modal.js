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

  return (
    <Modal
      title={title}
      handleClose={hideModal}
      component={
        <React.Fragment>
          {clickedBtn === 'edit' ? (
            <EditFormBox
              partnerValidation={partnerValidation}
              editPartner={editPartner}
              handleCloseModal={hideModal}
              addFlashMessage={addFlashMessage}
              clickedUserData={clickedUserData[0]}
            />
          ) : clickedBtn === 'create' ? (
            <CreateFormBox
              partnerValidation={partnerValidation}
              createPartner={createPartner}
              handleCloseModal={hideModal}
              addFlashMessage={addFlashMessage}
              saveClickedItemData={saveClickedItemData}
              resetClickedItemData={resetClickedItemData}
              clickedUserData={clickedUserData}
            />
          ) : clickedBtn === 'delete' ? (
            <DeleteFormBox
              deletePartner={deletePartner}
              selectedSearchItem={selectedSearchItem}
              handleCloseModal={hideModal}
              addFlashMessage={addFlashMessage}
            />
          ) : null}
        </React.Fragment>
      }
    />
  );
};

export default EmployeeModal;
