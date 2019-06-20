/* eslint-disable no-alert */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Paper from '@material-ui/core/Paper';
/* --- Components --- */
import Loader from '../../../shared/loader';
import UserTable from './userTable';
import IconButton from '../../../shared/iconButton';
import SearchBar from '../../../shared/searchBar/searchBar';
import Icon from '../../../../assets/icons';
/* --- Actions --- */
import * as authActions from '../../../actions/authAction';
import * as modalActions from '../../../actions/modalAction';
import { addFlashMessage } from '../../../actions/messageAction';
import * as userActions from '../../../actions/userAction';
import { deleteSelectedItem } from '../../../actions/selectedItemAction';

const CreateUserModal = Loader({
  loader: () =>
    import('./createUserModal' /* webpackChunkName: 'UserAccountModal' */),
});

const EditUserModal = Loader({
  loader: () =>
    import('./editUserModal' /* webpackChunkName: 'EditAccountModal' */),
});

const UserAccountContainer = ({
  modalActions,
  show,
  authActions: { createUser, editUser, changePasswordByAdmin, deleteUser },
  userActions: { getUsers, saveClickedUserData, resetClickedUserData },
  addFlashMessage,
  messageShow,
  clickedUserData,
  selectedSearchItem,
  deleteSelectedItem,
}) => {
  const [users, setUsers] = useState([]);
  const [clickedBtn, setClickedBtn] = useState(null);

  const fetchUsersData = async () => {
    const users = await getUsers();
    return setUsers(users);
  };

  useEffect(() => {
    fetchUsersData();
  }, []);

  const showModal = () => modalActions.showModal();
  const closeModal = () => {
    if (clickedBtn === 'edit') {
      resetClickedUserData();
      return modalActions.hideModal();
    }
    return modalActions.hideModal();
  };

  const handleCreateUserBtnClick = () => {
    setClickedBtn('create');
    return showModal();
  };

  const getClickedUserData = async userId => {
    const userData = await users.filter(user => user.id === userId);
    // convert the bankAccount value from number to string.
    const bankIdToString = await userData[0].bankAccountId.toString();
    userData[0].bankAccountId = await bankIdToString;
    return userData[0];
  };

  const handleEditUserBtnClick = async (event, userId) => {
    await setClickedBtn('edit');
    const userData = await getClickedUserData(userId);
    await saveClickedUserData(userData);
    return showModal();
  };

  // Render all users from a selected user row in List
  const renderAllUsers = () => {
    if (selectedSearchItem !== 0) deleteSelectedItem();
  };

  return (
    <div className="container">
      {/* auto complete search bar by companyName */}
      <h2 onClick={renderAllUsers}>고객 계정</h2>
      <div className="paper-label--box">
        <div className="flex">
          <SearchBar users={users} />
          <p className="f-mini ml3 user-account--user-number">
            총 고객 수&#8201;&#8201;
            <span className="b">{users.length}</span>
          </p>
        </div>
        <IconButton
          handleClick={handleCreateUserBtnClick}
          name="personAdd"
          width="36"
          height="36"
          viewBox="0 0 24 24"
        />
      </div>
      <Paper className="mt2 paper-padding">
        <UserTable
          handleEditUserBtnClick={handleEditUserBtnClick}
          users={users}
          selectedSearchItem={selectedSearchItem}
        />
      </Paper>
      <div className="flex justify-end mt3 pw1">
        <Icon
          name="info"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fillOuter="#2196F3"
          fillInner="#ffffff"
        />
        <p className="ml2" style={{ marginTop: '-.91px' }}>
          모든 고객 계정을 보길 원하신다면 상단의 고객 계정을 클릭해 주세요.
        </p>
      </div>
      {show && clickedBtn === 'create' ? (
        <CreateUserModal
          show={show}
          handleCloseModal={closeModal}
          createUser={createUser}
          addFlashMessage={addFlashMessage}
          messageShow={messageShow}
        />
      ) : (
        <EditUserModal
          show={show}
          handleCloseModal={closeModal}
          editUser={editUser}
          clickedBtn={clickedBtn}
          clickedUserData={clickedUserData}
          changePasswordByAdmin={changePasswordByAdmin}
          deleteUser={deleteUser}
          addFlashMessage={addFlashMessage}
          messageShow={messageShow}
        />
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  show: state.modal.show,
  messageShow: state.message.show,
  clickedUserData: state.user.userData,
  selectedSearchItem: state.selectedItem.value,
});

const mapDispatchToProps = dispatch => ({
  authActions: bindActionCreators(authActions, dispatch),
  modalActions: bindActionCreators(modalActions, dispatch),
  addFlashMessage: (variant, message) =>
    dispatch(addFlashMessage(variant, message)),
  userActions: bindActionCreators(userActions, dispatch),
  deleteSelectedItem: () => dispatch(deleteSelectedItem()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserAccountContainer);
