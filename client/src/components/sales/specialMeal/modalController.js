import React from 'react';
/* --- Components --- */
import CreateModal from './createSpecialMealModal';
import EditModal from './editSpecialMealModal';
import DeleteModal from './deleteSpecialMealModal';

const ModalController = ({
  clickedBtn,
  formattedTmr,
  // globalState
  clickedUserData,
  selectedItemValue,
  // actions
  hideModal,
  addFlashMessage,
  createSpecialMeal,
  updateSpecialMeal,
  deleteSpecialMeal,
  resetClickedItemData,
  getUsers,
}) => (
  <React.Fragment>
    {clickedBtn === 'create' && (
      <CreateModal
        formattedTmr={formattedTmr}
        hideModal={hideModal}
        addFlashMessage={addFlashMessage}
        createSpecialMeal={createSpecialMeal}
        getUsers={getUsers}
      />
    )}
    {clickedBtn === 'edit' && (
      <EditModal
        hideModal={hideModal}
        addFlashMessage={addFlashMessage}
        updateSpecialMeal={updateSpecialMeal}
        resetClickedItemData={resetClickedItemData}
        clickedUserData={clickedUserData}
      />
    )}{' '}
    {clickedBtn === 'delete' && (
      <DeleteModal
        hideModal={hideModal}
        addFlashMessage={addFlashMessage}
        deleteSpecialMeal={deleteSpecialMeal}
        selectedItemValue={selectedItemValue}
      />
    )}
  </React.Fragment>
);

export default ModalController;
