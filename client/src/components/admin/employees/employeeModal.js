import React from 'react';
/* --- Components --- */
import Modal from '../../../shared/modal';
import Loader from '../../loader';
import { employeeValidation } from '../../formValidation';

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
  position,
  clickedUserData,
  selectedSearchItem,
  // actions
  hideModal,
  addFlashMessage,
  saveClickedItemData,
  resetClickedItemData,
  createEmployee,
  editEmployee,
  deleteEmployee,
}) => {
  const title =
    clickedBtn === 'edit'
      ? '직원정보 수정'
      : clickedBtn === 'create'
        ? '직원정보 등록'
        : null;

  return (
    <Modal
      title={title}
      handleClose={hideModal}
      component={
        <React.Fragment>
          {clickedBtn === 'edit' ? (
            <EditFormBox
              position={position}
              employeeValidation={employeeValidation}
              editEmployee={editEmployee}
              handleCloseModal={hideModal}
              addFlashMessage={addFlashMessage}
              clickedUserData={clickedUserData[0]}
            />
          ) : clickedBtn === 'create' ? (
            <CreateFormBox
              position={position}
              employeeValidation={employeeValidation}
              createEmployee={createEmployee}
              handleCloseModal={hideModal}
              addFlashMessage={addFlashMessage}
              saveClickedItemData={saveClickedItemData}
              resetClickedItemData={resetClickedItemData}
              clickedUserData={clickedUserData}
            />
          ) : clickedBtn === 'delete' ? (
            <DeleteFormBox
              deleteEmployee={deleteEmployee}
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
