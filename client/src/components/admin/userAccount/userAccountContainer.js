import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
/* --- Components --- */
import Loader from '../../loader';
import UserTable from './userTable';
import IconButton from '../../../shared/form/iconButton';
import SearchBar from '../../../shared/searchBar/searchBarContainer';
import IconMessage from '../../../shared/iconMessage';
import Paper from '../../../shared/paper';
import { ratesPageInfo } from '../../../data/message';
import Select from '../../../shared/form/select';
/* --- Actions --- */
import * as adminActions from '../../../actions/adminAccountAction';
import * as modalActions from '../../../actions/modalAction';
import { addFlashMessage } from '../../../actions/messageAction';
import * as selectedActions from '../../../actions/selectedAction';

const CreateUserModal = Loader({
  loader: () =>
    import('./createUserModal' /* webpackChunkName: 'UserAccountModal' */),
});

const EditUserModal = Loader({
  loader: () =>
    import('./editUserModal' /* webpackChunkName: 'EditAccountModal' */),
});

const UserAccountContainer = ({
  usersStatus,
  clickedUserData,
  selectedSearchItem,
  modalActions: { showModal, hideModal },
  adminActions: {
    getUsers,
    createUser,
    editUser,
    deleteUser,
    handleEndingService,
  },
  selectedActions: {
    resetSelectedItemValue,
    saveClickedItemData,
    resetClickedItemData,
  },
  addFlashMessage,
}) => {
  const [users, setUsers] = useState({
    activeUsers: [],
    inActiveUsers: [],
    allUsers: [],
  });
  const [bankAccount, setBankAccount] = useState([]);
  const [clickedBtn, setClickedBtn] = useState(null);

  const { activeUsers, inActiveUsers, allUsers } = users;

  const selctedUsers =
    usersStatus === '활성 계정'
      ? activeUsers
      : usersStatus === '비활성 계정'
        ? inActiveUsers
        : allUsers;

  const fetchUsersData = async () => {
    const data = await getUsers();

    const bankAccounts = [];
    if (data.error)
      return addFlashMessage('error', '서버오류입니다. 다시 시도해주세요.');
    return Promise.all([
      setUsers({
        activeUsers: data.activeUsers,
        inActiveUsers: data.inActiveUsers,
        allUsers: [...data.activeUsers, ...data.inActiveUsers],
      }),
      setBankAccount(bankAccounts),
    ]);
  };

  useEffect(() => {
    fetchUsersData();
    return () => {
      Promise.all([
        clickedUserData.length !== 0 ? resetClickedItemData() : null,
        selectedSearchItem !== null ? resetSelectedItemValue() : null,
        selectedSearchItem ? renderAllUsers() : null,
      ]);
    };
  }, []);

  const handleCloseModal = () => {
    if (clickedBtn === 'edit') {
      resetClickedItemData();
    }
    return hideModal();
  };

  const handleButtonClick = sub =>
    Promise.all([
      setClickedBtn(sub), // to select modal (edit, create) to open
      showModal(),
    ]);

  const getClickedUserData = async userId => {
    const userData = await selctedUsers.filter(user => user.id === userId);
    return userData[0];
  };

  const handleEditUserBtnClick = async (e, userId) => {
    e.preventDefault();
    const userData = await getClickedUserData(userId);
    // to display user's data on edit modal
    await saveClickedItemData(userData);
    return handleButtonClick('edit');
  };

  // Render all users list from a selected user list [Search]
  const renderAllUsers = () => {
    if (selectedSearchItem) resetSelectedItemValue();
  };

  const handleSearch = () => {
    // do nothing
  };

  return (
    <div className="container-a pw1">
      {/* auto complete search bar by companyName */}
      <h2>고객 계정</h2>
      <div className="paper-label-box justify-between ">
        <div className="flex">
          <SearchBar
            data={selctedUsers}
            handleSuggestionSelected={handleSearch}
            handleResetSearch={renderAllUsers}
          />
          <p className="f-mini ml3 paper-label-box--number">
            총 고객 수&#8201;&#8201;
            <span className="b">{selctedUsers.length}</span>
          </p>
        </div>
        <div className="flex">
          <Select
            label=""
            name="users"
            selectedValue={usersStatus}
            options={[
              { value: '활성 계정' },
              { value: '비활성 계정' },
              { value: '전체 계정' },
            ]}
          />
          <IconButton
            handleClick={() => handleButtonClick('create')}
            name="personAdd"
            width="30"
            height="30"
            viewBox="0 0 24 24"
          />
        </div>
      </div>
      <Paper
        component={
          <UserTable
            handleEditUserBtnClick={handleEditUserBtnClick}
            users={selctedUsers}
            selectedSearchItem={selectedSearchItem}
            bankAccount={bankAccount}
          />
        }
      />
      <IconMessage
        name="info"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fillOuter="#2196F3"
        fillInner="#ffffff"
        text={ratesPageInfo}
        position="end"
        iconBoxStyle="mt3 pw1"
        textStyle="icon-message--info"
      />
      {clickedBtn === 'create' ? (
        <CreateUserModal
          handleCloseModal={handleCloseModal}
          createUser={createUser}
          addFlashMessage={addFlashMessage}
          selectedSearchItem={selectedSearchItem}
          resetSelectedItemValue={resetSelectedItemValue}
          bankAccount={bankAccount}
        />
      ) : clickedBtn === 'edit' && clickedUserData ? (
        <EditUserModal
          handleCloseModal={handleCloseModal}
          editUser={editUser}
          clickedBtn={clickedBtn}
          clickedUserData={clickedUserData}
          deleteUser={deleteUser}
          addFlashMessage={addFlashMessage}
          bankAccount={bankAccount}
          handleEndingService={handleEndingService}
        />
      ) : null}
    </div>
  );
};

const mapStateToProps = state => ({
  clickedUserData: state.selected.data,
  selectedSearchItem: state.selected.value,
  usersStatus: state.selected.users,
});

const mapDispatchToProps = dispatch => ({
  adminActions: bindActionCreators(adminActions, dispatch),
  modalActions: bindActionCreators(modalActions, dispatch),
  addFlashMessage: (variant, message) =>
    dispatch(addFlashMessage(variant, message)),
  selectedActions: bindActionCreators(selectedActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserAccountContainer);
