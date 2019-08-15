import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
/* --- Components --- */
import Loader from '../../../shared/loader';
import UserTable from './userTable';
import IconButton from '../../../shared/form/iconButton';
import SearchBar from '../../../shared/searchBar/searchBarContainer';
import IconMessage from '../../../shared/iconMessage';
import Paper from '../../../shared/paper';
import { ratesPageInfoA, ratesPageInfoB } from '../../../data/message';
/* --- Actions --- */
import * as adminActions from '../../../actions/adminAction';
import * as modalActions from '../../../actions/modalAction';
import { addFlashMessage } from '../../../actions/messageAction';
import * as selectedActions from '../../../actions/selectedAction';
import { resetPassword } from '../../../actions/authAction';

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
  adminActions: { getUsers, createUser, editUser, deleteUser },
  selectedActions: {
    resetSelectedItemValue,
    saveClickedItemData,
    resetClickedItemData,
  },
  resetPassword,
  addFlashMessage,
  clickedUserData,
  selectedSearchItem,
}) => {
  const [users, setUsers] = useState([]);
  const [bankAccount, setBankAccount] = useState([]);
  const [clickedBtn, setClickedBtn] = useState(null);

  const fetchUsersData = async () => {
    const data = await getUsers();
    const { users, bankAccounts } = data;
    if (data.error)
      return addFlashMessage('error', '서버오류입니다. 다시 시도해주세요.');
    if (users.length === 0)
      return addFlashMessage('info', '데이터에 저장된 업체정보가 없습니다.');
    return Promise.all([setUsers(users), setBankAccount(bankAccounts)]);
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

  const handleCloseModal = () => {
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
    <div className="container w-95">
      {/* auto complete search bar by companyName */}
      <h2 onClick={renderAllUsers}>고객 계정</h2>
      <div className="paper-label-box justify-between ">
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
          text={ratesPageInfoA}
          classes="icon-message--info"
        />
      </div>
      <div className="flex justify-end mt3 pw1 pb4">
        <IconMessage
          name="info"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fillOuter="#2196F3"
          fillInner="#ffffff"
          text={ratesPageInfoB}
          classes="icon-message--info"
        />
      </div>
      {clickedBtn === 'create' ? (
        <CreateUserModal
          handleCloseModal={handleCloseModal}
          createUser={createUser}
          addFlashMessage={addFlashMessage}
          selectedSearchItem={selectedSearchItem}
          resetSelectedItemValue={resetSelectedItemValue}
          bankAccount={bankAccount}
        />
      ) : clickedBtn === 'edit' ? (
        <EditUserModal
          handleCloseModal={handleCloseModal}
          editUser={editUser}
          clickedBtn={clickedBtn}
          clickedUserData={clickedUserData[0]}
          resetPassword={resetPassword}
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
  adminActions: bindActionCreators(adminActions, dispatch),
  modalActions: bindActionCreators(modalActions, dispatch),
  addFlashMessage: (variant, message) =>
    dispatch(addFlashMessage(variant, message)),
  selectedActions: bindActionCreators(selectedActions, dispatch),
  resetPassword: (id, newPassword) => dispatch(resetPassword(id, newPassword)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserAccountContainer);
