/* eslint-disable no-alert */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Paper from '@material-ui/core/Paper';
/* --- Components --- */
import Loader from '../../../shared/loader';
import UserTable from './userTable';
import IconButton from '../../../shared/iconButton';
/* --- Actions --- */
import * as authActions from '../../../actions/authAction';
import * as modalActions from '../../../actions/modalAction';
import { addFlashMessage } from '../../../actions/messageAction';
import * as userActions from '../../../actions/userAction';

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
}) => {
  const [rows, setRows] = useState([]);
  const [clickedBtn, setClickedBtn] = useState(null);

  const fetchUsersData = async () => {
    const users = await getUsers();
    return setRows(users);
  };

  useEffect(() => {
    fetchUsersData();
  }, []);

  const showModal = () => modalActions.showModal();
  const closeModal = () => {
    if (clickedBtn === 'edit') resetClickedUserData();
    return modalActions.hideModal();
  };

  const handleCreateUserBtnClick = () => {
    setClickedBtn('create');
    return showModal();
  };

  const getClickedUserData = async clickedUsername => {
    const userData = await rows.filter(
      user => user.username === clickedUsername,
    );
    // convert the bankAccount value from number to string.
    const bankIdToString = await userData[0].bankAccountId.toString();
    userData[0].bankAccountId = await bankIdToString;
    return userData[0];
  };

  const handleEditUserBtnClick = async (event, clickedUsername) => {
    await setClickedBtn('edit');
    const userData = await getClickedUserData(clickedUsername);
    await saveClickedUserData(userData);
    return showModal();
  };

  return (
    <div className="container">
      {/* auto complete search bar by companyName */}
      <h2>고객 계정</h2>
      <div className="paper-label--box">
        <p className="f-mini user-account--user-number">
          총 고객 수&#8201;&#8201;
          <span className="b">{rows.length}</span>
        </p>
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
          rows={rows}
        />
      </Paper>
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
});

const mapDispatchToProps = dispatch => ({
  authActions: bindActionCreators(authActions, dispatch),
  modalActions: bindActionCreators(modalActions, dispatch),
  addFlashMessage: (variant, message) =>
    dispatch(addFlashMessage(variant, message)),
  userActions: bindActionCreators(userActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserAccountContainer);
