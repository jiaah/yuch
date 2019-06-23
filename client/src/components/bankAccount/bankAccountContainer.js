import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
/* --- Components --- */
import IconButton from '../../shared/iconButton';
import CreateBankModal from './createBankModal';
/* --- Actions --- */
import * as modalActions from '../../actions/modalAction';

const BankAccountContainer = ({
  modalActions: { showModal, hideModal },
  show,
}) => {
  const closeModal = () => hideModal();
  useEffect(() => {
    // fetch bankAccountData
  }, []);
  const handleCreateBankAccountBtnClick = () => showModal();
  return (
    <div className="container">
      <h2>유청 은행 계좌</h2>
      <IconButton
        handleClick={handleCreateBankAccountBtnClick}
        name="personAdd"
        width="36"
        height="36"
        viewBox="0 0 24 24"
      />
      {show && <CreateBankModal show={show} handleCloseModal={closeModal} />}
    </div>
  );
};

const mapStateToProps = state => ({
  show: state.modal.show,
});

const mapDispatchToProps = dispatch => ({
  modalActions: bindActionCreators(modalActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BankAccountContainer);
