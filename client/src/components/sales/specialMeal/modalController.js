import React, { useEffect, useState } from 'react';
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
}) => {
  const [users, setUsers] = useState(null);

  // yuch client selection checkbox
  const [state, setState] = useState({ selectedUser: false });
  const handleChange = name => event =>
    setState({ ...state, [name]: event.target.checked });

  const fetchUsersData = async () => {
    const res = await getUsers();
    return setUsers(res.activeUsers);
  };

  useEffect(() => {
    fetchUsersData();
  }, []);

  return (
    <React.Fragment>
      {clickedBtn === 'create' && (
        <CreateModal
          formattedTmr={formattedTmr}
          hideModal={hideModal}
          addFlashMessage={addFlashMessage}
          createSpecialMeal={createSpecialMeal}
          users={users}
          handleChange={handleChange}
          selectedUser={state.selectedUser}
        />
      )}
      {clickedBtn === 'edit' && (
        <EditModal
          hideModal={hideModal}
          addFlashMessage={addFlashMessage}
          updateSpecialMeal={updateSpecialMeal}
          resetClickedItemData={resetClickedItemData}
          clickedUserData={clickedUserData}
          users={users}
          handleChange={handleChange}
          selectedUser={state.selectedUser}
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
};

export default ModalController;
