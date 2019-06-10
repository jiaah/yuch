/* eslint-disable no-alert */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Paper from '@material-ui/core/Paper';
/* --- Components --- */
import Loader from '../../../shared/loader';
import UserTable from './userTable';
import Icon from '../../../../assets/icons';
/* --- Actions --- */
import * as authActions from '../../../actions/authAction';
import * as modalActions from '../../../actions/modalAction';
import { addFlashMessage } from '../../../actions/flashMessageAction';
import { getUsers } from '../../../actions/userAction';

const CreateUserModal = Loader({
  loader: () =>
    import('./createUserModal' /* webpackChunkName: 'UserAccountModal' */),
});

const UserAccountContainer = ({
  modalActions,
  show,
  errorMessage,
  flashVariant,
  authActions: { createUser },
  getUsers,
  addFlashMessage,
}) => {
  const [rows, setRows] = useState([]);

  const fetchUsersData = async () => {
    const users = await getUsers();
    return setRows(users);
  };

  useEffect(() => {
    fetchUsersData();
  }, []);

  const showModal = () => modalActions.showModal();

  const closeModal = () => modalActions.hideModal();

  const handleEditBtnClick = (event, username) => {
    console.log(`open modal with ${username} data from local storage`);
  };

  return (
    <div className="container">
      {/* auto complete search bar by companyName */}
      <h2>고객 계정</h2>
      <div className="paper-label--box">
        <p className="f-mini">
          총 고객 수&#8201;&#8201;
          <span className="b">100</span>
        </p>
        <div onClick={showModal}>
          <Icon
            name="add"
            width="25"
            height="25"
            viewBox="0 0 25 25"
            fill="none"
          />
        </div>
      </div>
      <Paper className="mt2 paper-padding">
        <UserTable handleEditBtnClick={handleEditBtnClick} rows={rows} />
      </Paper>
      {show && (
        <CreateUserModal
          show={show}
          errorMessage={errorMessage}
          flashVariant={flashVariant}
          handleCloseModal={closeModal}
          createUser={createUser}
          addFlashMessage={addFlashMessage}
        />
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  show: state.modal.show,
  errorMessage: state.httpHandler.error,
  flashVariant: state.flashMessage.variant,
});

const mapDispatchToProps = dispatch => ({
  authActions: bindActionCreators(authActions, dispatch),
  modalActions: bindActionCreators(modalActions, dispatch),
  addFlashMessage: (variant, message) =>
    dispatch(addFlashMessage(variant, message)),
  getUsers: () => dispatch(getUsers()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserAccountContainer);
