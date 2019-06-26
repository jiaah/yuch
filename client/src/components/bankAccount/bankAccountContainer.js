import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
/* --- Components --- */
import IconButton from '../../shared/iconButton';
import CreateBankModal from './createBankModal';
import BankTable from './bankTable';
import { bankAccountTableHeadRows } from '../../shared/data';
/* --- Actions --- */
import * as modalActions from '../../actions/modalAction';
import * as bankActions from '../../actions/bankAction';

const BankAccountContainer = ({
  modalActions: { showModal, hideModal },
  bankActions: { getBankAccount },
  show,
}) => {
  const closeModal = () => hideModal();
  const fetchBankAccount = () => getBankAccount();
  useEffect(() => {
    fetchBankAccount();
  }, []);
  const handleCreateBankAccountBtnClick = () => showModal();
  const handleEditBankBtnClick = () => console.log('edit user bank clicked');

  const bankAccount = [
    {
      id: 1,
      accountHolder: 'jiah',
      bankName: 'bank',
      accountNo: '010',
    },
  ];
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
      <BankTable
        bankAccountTableHeadRows={bankAccountTableHeadRows}
        handleEditBankBtnClick={handleEditBankBtnClick}
        bankAccount={bankAccount}
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
  bankActions: bindActionCreators(bankActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BankAccountContainer);
