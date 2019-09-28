import React from 'react';
/* --- Components --- */
import Loader from '../../loader';

const CreateModal = Loader({
  loader: () =>
    import('./createSpecialMealModal' /* webpackChunkName: 'BankModal' */),
});
const EditModal = Loader({
  loader: () =>
    import('./editSpecialMealModal' /* webpackChunkName: 'BankModal' */),
});
const DeleteModal = Loader({
  loader: () =>
    import('./deleteSpecialMealModal' /* webpackChunkName: 'BankModal' */),
});

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
        clickedUserData={clickedUserData}
        resetClickedItemData={resetClickedItemData}
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
