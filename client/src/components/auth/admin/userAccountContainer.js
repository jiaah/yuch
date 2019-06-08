/* eslint-disable no-alert */
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
/* --- Components --- */
import Button from '../../../shared/button';
import Loader from '../../../shared/loader';
import UserTable from './userTable';
/* --- Actions --- */
import * as authActions from '../../../actions/authAction';
import * as modalActions from '../../../actions/modalAction';
import { addFlashMessage } from '../../../actions/flashMessageAction';

const CreateUserModal = Loader({
  loader: () =>
    import('./createUserModal' /* webpackChunkName: 'UserAccountModal' */),
});

class UserAccountContainer extends React.Component {
  showModal = () => this.props.modalActions.showModal();

  closeModal = () => this.props.modalActions.hideModal();

  render() {
    const {
      show,
      errorMessage,
      flashVariant,
      authActions: { createUser },
      addFlashMessage,
    } = this.props;

    return (
      <div className="container flex flex-column-m">
        <h2>고객 계정</h2>
        {/* auto complete search bar by client name (in korean) */}
        <div>
          {/* change this to '+' icon */}
          <Button
            typeValue="button"
            buttonName="신규등록"
            handleButtonClick={this.showModal}
            variantValue="contained"
            width="small"
            className="float-right"
          />
        </div>

        {/* button dropdown list order by alphabet, updated_at(default) */}
        {/*
        map List of Clients with account information order by updated_at desc;
        */}
        {show && (
          <CreateUserModal
            show={show}
            errorMessage={errorMessage}
            flashVariant={flashVariant}
            handleCloseModal={this.closeModal}
            createUser={createUser}
            addFlashMessage={addFlashMessage}
          />
        )}
        <div className="center">
          <UserTable />
        </div>
      </div>
    );
  }
}

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
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserAccountContainer);
