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
  adminSpecialMealMsg,
  adminSpecialMealunregisteredMsg,
  // globalState
  clickedUserData,
  // actions
  hideModal,
  addFlashMessage,
  createSpecialMeal,
  updateSpecialMeal,
  deleteSpecialMeal,
  resetSelectedItemValue,
  saveClickedItemData,
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
        resetSelectedItemValue={resetSelectedItemValue}
        saveClickedItemData={saveClickedItemData}
        resetClickedItemData={resetClickedItemData}
        clickedUserData={clickedUserData}
        clickedBtn={clickedBtn}
        adminSpecialMealMsg={adminSpecialMealMsg}
        adminSpecialMealunregisteredMsg={adminSpecialMealunregisteredMsg}
      />
    )}
    {clickedBtn === 'edit' &&
      clickedUserData.length !== 0 && (
        <EditModal
          hideModal={hideModal}
          addFlashMessage={addFlashMessage}
          updateSpecialMeal={updateSpecialMeal}
          clickedUserData={clickedUserData[0]}
          adminSpecialMealMsg={adminSpecialMealMsg}
          getUsers={getUsers}
          resetSelectedItemValue={resetSelectedItemValue}
          resetClickedItemData={resetClickedItemData}
        />
      )}
    {clickedBtn === 'delete' && (
      <DeleteModal
        hideModal={hideModal}
        addFlashMessage={addFlashMessage}
        deleteSpecialMeal={deleteSpecialMeal}
        clickedUserData={clickedUserData[0]}
      />
    )}
  </React.Fragment>
);

export default ModalController;
