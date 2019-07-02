import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
/* --- Components --- */
import Loader from '../../../shared/loader';
import UserTable from './userTable';
import IconButton from '../../../shared/iconButton';
import SearchBar from '../../../shared/searchBar/searchBar';
import IconMessage from '../../../shared/iconMessage';
import Paper from '../../../shared/paper';
import { userAccountPageInfo } from '../../../shared/data';
/* --- Actions --- */
import * as authActions from '../../../actions/authAction';
import * as modalActions from '../../../actions/modalAction';
import { addFlashMessage } from '../../../actions/messageAction';
import * as userActions from '../../../actions/userAction';
import * as selectedActions from '../../../actions/selectedAction';
import { getBankAccount } from '../../../actions/bankAction';

const CreateUserModal = Loader({
  loader: () =>
    import('./createUserModal' /* webpackChunkName: 'UserAccountModal' */),
});

const EditUserModal = Loader({
  loader: () =>
    import('./editUserModal' /* webpackChunkName: 'EditAccountModal' */),
});

const UserAccountContainer = ({
  modalActions: { showModal, hideModal },
  authActions: { createUser, editUser, changePasswordByAdmin, deleteUser },
  userActions: { getUsers },
  selectedActions: {
    resetSelectedItemValue,
    saveClickedItemData,
    resetClickedItemData,
  },
  addFlashMessage,
  getBankAccount,
  clickedUserData,
  selectedSearchItem,
}) => {
  const [users, setUsers] = useState([]);
  const [bankAccount, setBankAccount] = useState([]);
  const [clickedBtn, setClickedBtn] = useState(null);

  const fetchUsersData = async () => {
    const users = await getUsers();
    const bankAccount = await getBankAccount();
    return Promise.all([setUsers(users), setBankAccount(bankAccount)]);
  };

  useEffect(() => {
    fetchUsersData();
    return () => {
      Promise.all([
        clickedUserData.length !== 0 ? resetClickedItemData() : null,
        selectedSearchItem !== null ? resetSelectedItemValue() : null,
      ]);
    };
  }, []);

  const closeModal = () => {
    if (clickedBtn === 'edit') {
      return Promise.all([resetClickedItemData(), hideModal()]);
    }
    return hideModal();
  };

  const handleButtonClick = sub =>
    Promise.all([setClickedBtn(sub), showModal()]);

  const getClickedUserData = async userId => {
    const userData = await users.filter(user => user.id === userId);
    return userData[0];
  };

  const handleEditUserBtnClick = async (e, userId) => {
    e.preventDefault();
    const userData = await getClickedUserData(userId);
    await saveClickedItemData(userData);
    return handleButtonClick('edit');
  };
  // Render all users list from a selected user list [Search]
  const renderAllUsers = () => {
    if (selectedSearchItem !== null) resetSelectedItemValue();
  };
  return (
    <div className="container">
      {/* auto complete search bar by companyName */}
      <h2 onClick={renderAllUsers}>고객 계정</h2>
      <div className="paper-label--box justify-between ">
        <div className="flex">
          <SearchBar users={users} />
          <p className="f-mini ml3 user-account--user-number">
            총 고객 수&#8201;&#8201;
            <span className="b">{users.length}</span>
          </p>
        </div>
        <IconButton
          handleClick={() => handleButtonClick('create')}
          name="personAdd"
          width="30"
          height="30"
          viewBox="0 0 24 24"
        />
      </div>
      <Paper
        component={
          <UserTable
            handleEditUserBtnClick={handleEditUserBtnClick}
            users={users}
            selectedSearchItem={selectedSearchItem}
            bankAccount={bankAccount}
          />
        }
      />
      <div className="flex justify-end mt3 pw1">
        <IconMessage
          name="info"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fillOuter="#2196F3"
          fillInner="#ffffff"
          text={userAccountPageInfo}
          classes="icon-message--info"
        />
      </div>
      {clickedBtn === 'create' ? (
        <CreateUserModal
          handleCloseModal={closeModal}
          createUser={createUser}
          addFlashMessage={addFlashMessage}
          selectedSearchItem={selectedSearchItem}
          resetSelectedItemValue={resetSelectedItemValue}
          bankAccount={bankAccount}
        />
      ) : clickedBtn === 'edit' ? (
        <EditUserModal
          handleCloseModal={closeModal}
          editUser={editUser}
          clickedBtn={clickedBtn}
          clickedUserData={clickedUserData[0]}
          changePasswordByAdmin={changePasswordByAdmin}
          deleteUser={deleteUser}
          addFlashMessage={addFlashMessage}
          bankAccount={bankAccount}
        />
      ) : null}
    </div>
  );
};

const mapStateToProps = state => ({
  clickedUserData: state.selected.data,
  selectedSearchItem: state.selected.value,
});

const mapDispatchToProps = dispatch => ({
  authActions: bindActionCreators(authActions, dispatch),
  modalActions: bindActionCreators(modalActions, dispatch),
  addFlashMessage: (variant, message) =>
    dispatch(addFlashMessage(variant, message)),
  userActions: bindActionCreators(userActions, dispatch),
  selectedActions: bindActionCreators(selectedActions, dispatch),
  getBankAccount: () => dispatch(getBankAccount()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserAccountContainer);
